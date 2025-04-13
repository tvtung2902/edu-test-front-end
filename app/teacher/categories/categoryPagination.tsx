'use client'

import PaginationUI from "@/components/ui/pag"
import { Skeleton } from "@/components/ui/skeleton";
import { pageSizeOfCategoryPage } from "@/const/teacher";
import { fetchCategories } from "@/redux/features/categorySlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function CategoryPagination() {
    const dispatch = useDispatch<AppDispatch>()
    const { totalPages, status } = useSelector((state: RootState) => state.categories)
    const searchParams = useSearchParams()
    const pageNo = Number(searchParams.get('page-no')) || 1
    const search = searchParams.get('name') || ""
    const onPageChange =  (pageNo: number) => {
        dispatch(fetchCategories({ search, pageNo }) as any);
    }
    return (
        <>
            {status === 'succeeded' ?  <PaginationUI key={pageNo} pageNo={pageNo} totalPages={totalPages} onPageChange={onPageChange} /> : ''}
        </>
    )
}
