'use client';
import { Segmented } from 'antd';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';

export default function ViewToggleUser() {

  const labelMap: Record<string, string> = {
    'Đang chờ': 'PENDING',
    'Đã tham gia': 'JOINED',
  };

  const reverseLabelMap = useMemo(() => {
    return Object.fromEntries(
      Object.entries(labelMap).map(([label, value]) => [value, label])
    );
  }, []);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'PENDING';
  const selectedLabel = reverseLabelMap[status] || 'Đang chờ';
  const handleChange = (val: string) => {
    const value = labelMap[val] || 'PENDING';
    router.push(`${pathName}?status=${value}`);
  };
  return (
    <Segmented
      options={Object.keys(labelMap)}
      value={selectedLabel}
      onChange={handleChange}
    />
  );
}
