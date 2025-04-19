'use client';
import React, { useState } from 'react';
import { Button, Popover, Input, Checkbox, Divider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const allCategories = ['học toán', 'eeee', 'bbbb', 'ccc', 'ddd', 'aa'];

const FilterPopover = () => {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const visibleCategories = Array.from(
    new Set([
      ...allCategories.filter(item =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      ),
      ...selectedValues,
    ])
  );

  const handleReset = () => setSelectedValues([]);
  const handleChoose = () => {
    console.log('Selected Categories:', selectedValues);
    setSelectedValues(selectedValues);
    setVisible(false);
  };

  const content = (
    <div style={{ width: 250 }}>
      <Input
        placeholder="Tìm kiếm..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Checkbox.Group
        value={selectedValues}
        onChange={checked => setSelectedValues(checked as string[])}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          maxHeight: 200,
          overflowY: 'auto',
          paddingRight: 5,
        }}
      >
        {visibleCategories.map(item => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <Divider style={{ margin: '12px 0' }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={handleReset} style={{ flex: 1 }}>
          Reset
        </Button>
        <Button type="primary" onClick={handleChoose} style={{ flex: 1 }}>
          Choose
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
