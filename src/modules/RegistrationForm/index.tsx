import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IUser } from '../../models/IUser';
import {  registration } from '../../app/reducers/auth-slice/actionCreators';
import fieldIsRequired from '../../helpers/fieldIsRequired';
import { routes } from '../../routes';

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, user, isSuccess } = useAppSelector(state => state.authReducer);

    const onFinish = (values: Omit<IUser, "id">) => {
        dispatch(registration(values));
    };

    React.useEffect(() => {
        if (user && routes.myContacts.generateFullPath)
            navigate(routes.myContacts.generateFullPath());
    }, [isSuccess]);

    return (
        <Form
            name="registration"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Имя"
                name="name"
                rules={[fieldIsRequired("Введите имя")]}
            >
                <Input disabled={isLoading} />
            </Form.Item>
            <Form.Item
                label="Электронная почта"
                name="email"
                rules={[fieldIsRequired("Введите электронную почту")]}
            >
                <Input disabled={isLoading} />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[fieldIsRequired("Введите пароль")]}
            >
                <Input.Password disabled={isLoading} />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Регистрация
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;