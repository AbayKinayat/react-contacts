import React from 'react';
import { Affix, Button, Tooltip } from 'antd';
import classNames from "classnames";

import "./FixedButton.scss";

interface FixedButtonProps {
    children: React.ReactNode;
    positionStyle?: React.CSSProperties;
    positionClass?: string;
    style?: React.CSSProperties,
    className?: string,
    onClick?: () => void
    [index: string]: any
}

const FixedButton: React.FC<FixedButtonProps> = (props) => {
    const { positionStyle, positionClass, className } = props;
    return (
        <Affix
            style={positionStyle}
            className={classNames("fixed-affix", positionClass)}
        >
            <Tooltip title="Создать контакт">
                <Button
                    type="primary"
                    shape="circle"
                    {...props}
                    className={classNames("fixed-affix__btn", className)}
                >
                    {props.children}
                </Button>
            </Tooltip>
        </Affix>
    )
}

export default FixedButton