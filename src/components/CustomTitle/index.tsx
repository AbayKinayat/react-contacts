import React from 'react';
import { Space, Typography } from 'antd';

import "./CustomTitle.scss";

interface CustomTitleProps {
  children: any,
}

const CustomTitle: React.FC<CustomTitleProps> = (props) => {
  return (
    <Space size="middle">
      <div className="custom-title-block"></div>
      <Typography.Title className="custom-title" {...props}>
        {props.children}
      </Typography.Title>
    </Space>
  )
}

export default CustomTitle;