'use client'
import { Test } from "@/types/Test"
import TestItem from "./testItem"
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { fetchTests, deleteTest } from "@/redux/features/testSlice";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useSearchParams } from "next/navigation";

export default function TestList() {
    const {tests} = useSelector((state: RootState) => state.tests);
    const dispatch = useDispatch<AppDispatch>();
    const [testToDelete, setTestToDelete] = useState<Test | null>(null);

    const searchParams = useSearchParams();
    const pageNo = Number(searchParams.get('page-no')) || 1;
    const search = searchParams.get('name') || "";
  

    useEffect(() => {
        dispatch(fetchTests({search, pageNo}) as any);
    }, [dispatch, search, pageNo]);

    const handleDeleteTest = (test: Test) => {
        setTestToDelete(test);
    };

    const handleConfirmDelete = async () => {
        if (testToDelete) {
            try {
                await dispatch(deleteTest(testToDelete.id) as any);
                setTestToDelete(null);
            } catch (error) {
                console.error("Failed to delete test:", error);
            }
        }
    };

    const handleCancelDelete = () => {
        setTestToDelete(null);
    };

    return (
        <>
          <Modal
            title={
              <div className="flex items-center gap-2 text-red-500">
                <ExclamationCircleOutlined />
                <span>Xác nhận xóa</span>
              </div>
            }
            open={testToDelete !== null}
            onOk={handleConfirmDelete}
            onCancel={handleCancelDelete}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <p>Bạn có chắc chắn muốn xóa bài kiểm tra này không?</p>
          </Modal>
          {tests.map((test: Test) => (
              <TestItem 
                key={test.id} 
                test={test} 
                onDelete={() => handleDeleteTest(test)}
              />
          ))}
        </>
    )
}
