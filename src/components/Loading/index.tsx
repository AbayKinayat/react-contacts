import React from 'react';
import { Spin } from 'antd';

import "./Loading.scss";

enum SpinSizes {
    small = 'small',
    default = 'default',
    large = 'large',
}

interface LoadingProps {
    height: number | string,
    flex?: number,
    size?: keyof typeof SpinSizes
}

const Loading: React.FC<LoadingProps> = ({ height = "100%", flex = 1, size = "default" }) => {
    return (
        <div
            style={{
                height,
                flex
            }}
            className="custom-loading"
        >
            <Spin size={size} />
        </div>
    )
}

export default Loading