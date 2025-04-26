'use client';

import React, { useEffect, useState } from 'react';
import { Button, Popover, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store/store';
import { fetchCategories } from '@/redux/features/categorySlice';

const { Option } = Select;

interface FilterPopoverProps {
    onFilterChange: (categories: string[]) => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({ onFilterChange }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [visible, setVisible] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const { categories } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories({ showAll: true }) as any);
    }, [dispatch]);

    const handleSubmit = () => {
        onFilterChange(selectedValues);
        setVisible(false);
    };

    const handleReset = () => {
        setSelectedValues([]);
        onFilterChange([]);
    };

    const content = (
        <div style={{ width: 250 }}>
            <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Chọn danh mục"
                value={selectedValues}
                onChange={setSelectedValues}
                style={{ width: '100%' }}
                filterOption={(input, option) =>
                    (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
            >
                {categories.map(cat => (
                    <Option key={cat.id} value={cat.id}>
                        {cat.name}
                    </Option>
                ))}
            </Select>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Button onClick={handleReset} style={{ flex: 1 }}>
                    Reset
                </Button>
                <Button type="primary" onClick={handleSubmit} style={{ flex: 1 }}>
                    Apply
                </Button>
            </div>
        </div>
    );

    return (
        <Popover
            content={content}
            trigger="click"
            open={visible}
            onOpenChange={setVisible}
            placement="bottom"
        >
            <Button icon={<FilterOutlined />}>Lọc danh mục</Button>
        </Popover>
    );
};

export default FilterPopover;
