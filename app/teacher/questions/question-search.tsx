'use client'

import { fetchCategories } from "@/redux/features/categorySlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Input } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Search } = Input;

export default function QuestionSearch() {
  
  const router = useRouter();
  const pathName = usePathname();
  
  const searchParam = useSearchParams();
  const content = searchParam.get('content') || "";
  const [search, setSearch] = useState(content);
  const {status} = useSelector((state: RootState) => state.questions);

  const onSearch = (value: string) => {
    if (value !== content) {
      router.push(`${pathName}?content=${value}`);
    }
  };

  useEffect(() => {
    setSearch(content);
  }, [content]);

  return (
    <div>
      <Search 
        placeholder="Nhập nội dung câu hỏi..." 
        onSearch={onSearch} 
        enterButton 
        defaultValue={search}
        disabled={status.includes('loading')}
      />
    </div>
  );
} 