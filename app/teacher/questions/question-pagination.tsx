'use client'

import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import PaginationUI from "@/components/ui/pag";

export default function QuestionPagination() {
  const { totalPages, status } = useSelector((state: RootState) => state.questions);
  const searchParams = useSearchParams();

  const pageNo = Number(searchParams.get('page-no')) || 0;
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