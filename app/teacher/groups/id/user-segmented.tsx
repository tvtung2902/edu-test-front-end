import { Segmented } from 'antd';
import { useState } from 'react';

export default function ViewToggleUser() {
  const [mode, setMode] = useState('Đang chờ');

  return (
    <Segmented
      options={['Đang chờ', 'Đã tham gia']}
      value={mode}
      onChange={(val) => {
        console.log('Chọn chế độ:', val);
        setMode(val);
      }}
    />
  );
};
