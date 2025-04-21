'use client'
import { pageSizeOfCategoryPage } from "@/const/teacher";
import { Pagination } from "antd";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationType {
    pageNo: number;
    totalPages: number;
}

export default function PaginationUI({ pageNo, totalPages }: PaginationType) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChangePage = (newPageNo: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page-no', newPageNo.toString());
        const newUrl = `${pathname}?${params.toString()}`;   
        window.history.replaceState(null, '', newUrl);
    };
    
    return (
         true && (
            <Pagination
                showSizeChanger={false}
                defaultCurrent={pageNo}
                pageSize={pageSizeOfCategoryPage}
                total={totalPages * pageSizeOfCategoryPage}
                onChange={(pageNo) => handleChangePage(pageNo)}
            />
        )
    );
}
