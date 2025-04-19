'use client';

import React, { useEffect, useState } from 'react';
import { Button, Popover, Select, Divider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store/store';
import { fetchCategories } from '@/redux/features/categorySlice';
import { fetchQuestions } from '@/redux/features/questionSlice';
import { useRouter, useSearchParams } from 'next/navigation';

const { Option } = Select;

const FilterPopover: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories({ showAll: true }) as any);
  }, [dispatch]);

  const pageNo = Number(useSearchParams().get('page-no')) || 0; 
  const cnt = useSearchParams().get('content') || '';

  const handleSubmit = () => {
    console.log('Selected Categories:', selectedValues);
    router.push(`/teacher/questions?page-no=${pageNo}&content=${cnt}&categoryIds=${selectedValues.join(',')}`);
    setVisible(false);
  };

  const handleReset = () =>{
    setSelectedValues([])
    router.push(`/teacher/questions?page-no=${pageNo}&content=${cnt}`);
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

      <Divider style={{ margin: '12px 0' }} />

      <div style={{ display: 'flex', gap: 8 }}>
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
