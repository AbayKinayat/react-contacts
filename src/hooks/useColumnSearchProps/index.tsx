import React, { useRef } from "react";
import { ColumnType, FilterConfirmProps } from "antd/lib/table/interface";
import { Button, Input, InputRef, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';

interface IDataType {
    key: string;
}

function useColumnSearchProps<DataType extends IDataType>() {
    type DataIndex = keyof DataType;
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => confirm();
    const handleReset = (clearFilters: () => void) => clearFilters();

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Найти ${dataIndex.toString()}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Искать
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Очистить
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            return `${record[dataIndex]}`
                .toLowerCase()
                .includes((value as string).toLowerCase())
        }
        ,
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            text
    });


    return [getColumnSearchProps];
}

export default useColumnSearchProps;