import { Segmented } from 'antd';
import { useState } from 'react';

export default function ViewToggleTest() {
  const [mode, setMode] = useState('Tất cả');

  return (
    <Segmented
      options={['Tất cả', 'Công khai', 'Riêng tư']}
      value={mode}
      onChange={(val) => {
        console.log('Chọn chế độ:', val);
        setMode(val);
        // Gọi API hoặc thay đổi view ở đây nếu cần
      }}
    />
  );
};
