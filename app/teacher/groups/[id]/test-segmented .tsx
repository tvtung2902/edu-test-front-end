'use client'
import { Segmented } from 'antd';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function ViewToggleTest() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status') || 'all';

  const statusMap: Record<string, string> = {
    'Tất cả': 'all',
    'Sắp tới': 'incoming',
    'Đang diễn ra': 'ongoing',
    'Kết thúc': 'ended',
  };

  const reverseStatusMap = useMemo(() => {
    return Object.fromEntries(Object.entries(statusMap).map(([k, v]) => [v, k]));
  }, []);

  const selectedLabel = reverseStatusMap[status] || 'Tất cả';

  const handleChange = (val: string) => {
    const statusValue = statusMap[val] || 'all';
    router.push(`${pathName}?status=${statusValue}`);
  };

  return (
    <Segmented
      options={Object.keys(statusMap)}
      value={selectedLabel}
      onChange={handleChange}
    />
  );
}
