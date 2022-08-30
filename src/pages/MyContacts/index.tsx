import React from 'react';
import { Avatar, Button, Modal, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';

import { FixedButton } from '../../components';
import { useAppDispatch, useAppSelector, useColumnSearchProps, useContactDelete } from "../../hooks";
import { fetchContactsByParams } from '../../app/reducers/contacts-slice/actionCreators';
import { Contact } from '../../models/Contact';
import { routes } from '../../routes';
import "./MyContacts.scss";

const MyContacts: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(state => state.authReducer);
  const { contacts, isLoading } = useAppSelector(state => state.contactsReducer);
  const [getColumnSearchProps] = useColumnSearchProps<Contact>();
  const {
    contactDelete,
    modalIsVisible,
    loading: deleteLoading,
    showModal,
    handleCancel
  } = useContactDelete({ userId: user?.id });

  const columns: ColumnsType<Contact> = [
    {
      title: "Аватар",
      dataIndex: "image",
      key: "image",
      render: (_, { image }) => <div>
        <Avatar
          src={image || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"}
          size="large"
        />
      </div>,
      width: "70px"
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      width: "50px",
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Имя',
      dataIndex: 'fullname',
      key: 'name',
      ...getColumnSearchProps('fullname'),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      render: (text) => <a href={`mailto:${text}`}>
        {text}
      </a>,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      render: (text) => <a href={`tel:${text}`}>
        {text}
      </a>,
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, contact) => (
        <Space size="middle">
          <Tooltip title="Редактировать">
            <Link to={routes.updateContacts.generatePath(contact.id)}>
              <Button>
                <EditOutlined />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Удалить">
            <Button
              type="primary"
              onClick={showModal.bind(null, contact.id)}
              danger
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    }
  ];

  const navigateToCreateContact = React.useCallback(() => {
    if (routes.createContacts.generateFullPath)
      navigate(routes.createContacts.generateFullPath());
  }, [])

  React.useEffect(() => {
    dispatch(fetchContactsByParams({ userId: user?.id }))
  }, []);

  return <>
    <Table
      columns={columns}
      dataSource={contacts}
      loading={isLoading}
    />
    <FixedButton
      onClick={navigateToCreateContact}
    >
      <PlusOutlined className="create-contact" />
    </FixedButton>
    <Modal
      title="Внимание"
      visible={modalIsVisible}
      onOk={contactDelete}
      confirmLoading={deleteLoading}
      onCancel={handleCancel}
      okText="Да"
      okType="danger"
      cancelText="Нет"
      okButtonProps={{
        type: "primary"
      }}
      cancelButtonProps={{
        type: "primary",
        danger: true
      }}
    >
      Вы действительно хотите удалить контакт?
    </Modal>
  </>
}

export default MyContacts;