import React from "react";
import { message } from 'antd';

import { fetchContactsByParams, FetchContactParams } from '../../app/reducers/contacts-slice/actionCreators';
import ContactsService from "../../service/contacts-service";
import useAppDispatch from '../useAppDispatch';

const useContactDelete = (getContactAfterProps: FetchContactParams) => {
    const dispatch = useAppDispatch();

    const [modalIsVisible, setModalIsVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [currentDeleteId, setCurrentDeleteId] = React.useState<number>();

    const showModal = (id: number) => {
        setModalIsVisible(true);
        setCurrentDeleteId(id);
    };

    const handleCancel = () => {
        setModalIsVisible(false);
    };

    const contactDelete = () => {
        if (currentDeleteId) {
            setLoading(true);
            ContactsService.delete({
                value: currentDeleteId,
                successHandler() {
                    message.success("Вы успешно удалил контакт");
                    handleCancel();
                    if (getContactAfterProps) {
                        dispatch(fetchContactsByParams(getContactAfterProps))
                    }
                },
                errorHandler(e) {
                    message.error(e.message);
                },
                finallyHandler() {
                    setLoading(false);
                }
            })
        }

    }

    return {
        contactDelete,
        currentDeleteId,
        modalIsVisible,
        loading,
        showModal,
        handleCancel
    };
}

export default useContactDelete;