import React from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import fieldIsRequired from '../../helpers/fieldIsRequired';
import { useAppSelector } from '../../hooks';
import { routes } from '../../routes';
import ContactsService from '../../service/contacts-service';

const CreateContact: React.FC = () => {
    const { user } = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        values.userId = user?.id;
        ContactsService.create({
            value: values,
            successHandler() {
                message.success("Вы успешно создали контакт");
                navigate(routes.myContacts.generateFullPath());
            },
            errorHandler(e: any) {
                message.error("Не предвиденная ошибка: " + e.message);
            },
            finallyHandler() {
                setLoading(false);
            }
        })
    };

    return (
        <Row>
            <Col span={15}>
                <Form
                    name="create-contact"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="ФИО"
                        name="fullname"
                        rules={[fieldIsRequired("Введите ФИО")]}
                    >
                        <Input disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        label="Почта"
                        name="email"
                        rules={[fieldIsRequired("Введите почту")]}
                    >
                        <Input disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        label="Телефон"
                        name="phone"
                        rules={[fieldIsRequired("Введите телефон")]}
                    >
                        <Input disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        label="Возраст"
                        name="age"
                        rules={[]}
                    >
                        <Input disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        label="Ссылка на изображение"
                        name="image"
                        rules={[]}
                    >
                        <Input disabled={loading} />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size='large'
                            loading={loading}
                            disabled={loading}
                            block
                        >
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>

    );
}

export default CreateContact;