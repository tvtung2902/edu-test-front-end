'use client'
import { fetchCategories } from "@/redux/features/categorySlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Input } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { Search } = Input;

export default function CategorySearch() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const pathName = usePathname()
    const searchParam = useSearchParams()
    const searchValue = searchParam.get('name') || ""
    const [search, setSearch] = useState(searchValue)
    const onSearch = (value: string) => {
        if (value !== searchValue) {
            router.push(`${pathName}?name=${value}`)
            dispatch(fetchCategories({ "search": value }) as any)
        }
    }
    useEffect(() => {setSearch(searchValue)}, [searchValue])

    return (
        <div>
            <Search placeholder="Nhập tên danh mục..." onSearch={onSearch} enterButton defaultValue={search} />
        </div>
    )
}   
