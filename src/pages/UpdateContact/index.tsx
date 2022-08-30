import React from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';

import fieldIsRequired from '../../helpers/fieldIsRequired';
import { Contact } from '../../models/Contact';
import { routes } from '../../routes';
import ContactsService from '../../service/contacts-service';

const UpdateContact: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [contact, setContact] = React.useState<Contact | null>(null);
    const [form] = useForm();

    const navigate = useNavigate();

    const onFinish = (values: Omit<Contact, "id" | "key" | "userId">) => {
        const contactModel: Contact = {
            ...values,
            id: Number(id),
            key: `${contact?.key}`,
            userId: Number(contact?.userId)
        };
        ContactsService.update({
            value: contactModel,
            successHandler() {
                message.success("Вы успешно отредактировали контакт");
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

    React.useEffect(() => {
        setLoading(true);
        ContactsService.getById({
            value: Number(id),
            errorHandler(e) {
                message.error(e.message);
                navigate(routes.myContacts.generateFullPath());
            },
            finallyHandler() {
                setLoading(false);
            }
        }).then((data) => {
            if (!data) {
                navigate(routes.myContacts.generateFullPath());
                message.error("Данные не найдены");
            }
            if (data) {
                form.setFieldsValue({
                    fullname: data.fullname,
                    email: data.email,
                    phone: data.phone,
                    age: data.age || "",
                    image: data.image || ""
                })
                setContact(data);
            }
        })
    }, [])

    return (
        <Row>
            <Col span={15}>
                <Form
                    form={form}
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
                            Изменить
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>

    );
}

export default UpdateContact;