'use client'
import { pageSizeOfCategoryPage } from "@/const/teacher";
import { Pagination } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationType {
    pageNo: number;
    totalPages: number;
    onPageChange: (pageNo: number) => void;
}

export default function PaginationUI({ pageNo, totalPages, onPageChange }: PaginationType) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChangePage = (newPageNo: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page-no', newPageNo.toString());
        router.push(`${pathname}?${params.toString()}`);
        onPageChange(newPageNo);
    };

    return (
        <Pagination
            showSizeChanger={false}
            defaultCurrent={pageNo}
            pageSize={pageSizeOfCategoryPage}
            total={totalPages * pageSizeOfCategoryPage}
            onChange={(pageNo) => handleChangePage(pageNo)}
        />
    );
}
