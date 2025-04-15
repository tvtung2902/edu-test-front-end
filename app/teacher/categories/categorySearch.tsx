'use client'

import { RootState } from "@/redux/store/store";
import { Input } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const { Search } = Input;

export default function CategorySearch() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const searchValue = searchParam.get('name') || "";
  const [search, setSearch] = useState(searchValue);
  const {status} = useSelector((state: RootState) => state.categories);
  const onSearch = (value: string) => {
    if (value !== searchValue) {
      router.push(`${pathName}?name=${value}`);
    }
  };

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  return (
    <div>
      <Search 
        placeholder="Nhập tên danh mục..." 
        onSearch={onSearch} 
        enterButton 
        defaultValue={search}
        disabled={status.includes('loading')}
      />
    </div>
  );
}   
