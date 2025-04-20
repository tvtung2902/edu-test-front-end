'use client'

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import PaginationUI from "@/components/ui/pag";

export default function CategoryPagination() {
  const { totalPages, status } = useSelector((state: RootState) => state.categories);
  const searchParams = useSearchParams();

  const pageNo = Number(searchParams.get('page-no')) || 1;
  return (
    <>
      {!status.includes('loading') && (
        <PaginationUI
          key={pageNo}
          pageNo={pageNo}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
