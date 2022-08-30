import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Col, Row, Typography } from 'antd';

import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../app/reducers/auth-slice/actionCreators';
import { routes } from '../../routes';

const UserInfo: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isLoading } = useAppSelector(state => state.authReducer);

    const onLogout = () => {
        dispatch(logout());
    }

    React.useEffect(() => {
        if (!user)
            navigate(routes.login.path);
    }, [user])

    return (
        <Card
            style={{ width: 600 }}
        >
            <Row gutter={20} align="middle">
                <Col>
                    <Avatar
                        src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
                        style={{ width: "80px", height: "80px" }}
                    />
                </Col>
                <Col flex="1">
                    <Typography.Title level={4}>
                        {user?.name}
                    </Typography.Title>
                    <Typography.Text>
                        {user?.email}
                    </Typography.Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={onLogout}
                        loading={isLoading}
                        danger
                    >
                        <LogoutOutlined /> Выйти
                    </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default UserInfo