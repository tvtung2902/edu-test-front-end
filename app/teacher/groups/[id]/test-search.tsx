'use client';

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
  const { status } = useSelector((state: RootState) => state.testGroups);

  const onSearch = (value: string) => {
    const params = new URLSearchParams(searchParam.toString());
    params.set("name", value);
    router.push(`${pathName}?${params.toString()}`);
  };

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  return (
    <div>
      <Search
        placeholder="Nhập tên đề thi..."
        onSearch={onSearch}
        enterButton
        defaultValue={search}
        disabled={status.includes('loading')}
      />
    </div>
  );
}
