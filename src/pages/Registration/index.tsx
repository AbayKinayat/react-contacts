import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

import { RegistrationForm } from "../../modules";
import { routes } from "../../routes";
import "./Registration.scss";

const Registration: React.FC = () => {
    return <Row className="registration" justify="center" align="middle">
        <Col span={10}>
            <Card
                title="Регистрация"
                className="registration__card"
            >
                <RegistrationForm />
                У вас есть аккаунт?{" "}
                <Link to={routes.login.path}>
                    Авторизуйтесь
                </Link>
            </Card>
        </Col>
    </Row>
}

export default Registration;