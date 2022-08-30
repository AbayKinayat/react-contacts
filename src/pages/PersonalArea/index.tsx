import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Breadcrumb, Space, Statistic, Typography } from 'antd';

import { CustomTitle } from '../../components';
import { UserInfo } from '../../modules';
import { useAppSelector, useCurrentPages } from '../../hooks';
import "./PersonalArea.scss";

const PersonalArea: React.FC = () => {
  const { page } = useAppSelector(state => state.currentPageReducer);
  const { contacts } = useAppSelector(state => state.contactsReducer);
  const [breadcrumbs] = useCurrentPages();

  return (
    <div className="page-container contacts">
      <Breadcrumb>
        {
          breadcrumbs.map(breadcrumb =>
            <Breadcrumb.Item key={breadcrumb.title}>
              <Link to={breadcrumb.path}>
                {breadcrumb.title}
              </Link>
            </Breadcrumb.Item>)
        }
      </Breadcrumb>
      <Space direction='vertical' size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size="middle">
          <CustomTitle>
            {page?.title}
          </CustomTitle>
          <Typography.Text italic>
            Добро пожаловать в личный кабинет. Вы можете просматривать свои контакты, а также удалить их и добавлять новые.
          </Typography.Text>
        </Space>
        <Space size="large">
          <UserInfo />
          <Statistic title="Контакты" value={contacts.length} />
        </Space>
        <Outlet />
      </Space>
    </div>
  )
}

export default PersonalArea;