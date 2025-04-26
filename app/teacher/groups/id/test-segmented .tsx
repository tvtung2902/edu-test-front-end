import { Segmented } from 'antd';
import { useState } from 'react';

export default function ViewToggleTest() {
  const [mode, setMode] = useState('Tất cả');

  return (
    <Segmented
      options={['Tất cả', 'Sắp tới', 'Đang diễn ra', 'Kết thúc']}
      value={mode}
      onChange={(val) => {
        console.log('Chọn chế độ:', val);
        setMode(val);
        // Gọi API hoặc thay đổi view ở đây nếu cần
      }}
    />
  );
};
