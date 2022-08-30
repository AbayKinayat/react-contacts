import React from "react";
import { Col, Row, Card } from "antd";
import { Link } from "react-router-dom";

import { LoginForm } from "../../modules";
import { routes } from "../../routes";
import "./Login.scss";

const Login: React.FC = () => {
    return <Row className="login" justify="center" align="middle">
        <Col span={10}>
            <Card
                title="Авторизация"
                className="login__card"
            >
                <LoginForm />
                У вас нет аккаунта?{" "}
                <Link to={routes.registration.path}>
                    Зарегистрируйтесь
                </Link>
            </Card>
        </Col>
    </Row>
}

export default Login;