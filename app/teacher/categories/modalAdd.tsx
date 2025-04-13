'use client'
import { AppDispatch, RootState } from "@/redux/store/store";
import { Form, Input, message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addCategory, fetchCategories } from "@/redux/features/categorySlice";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { pageSizeOfCategoryPage } from "@/const/teacher";

export default function ModalAdd() {
    const searchParams = useSearchParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { status } = useSelector((state: RootState) => state.categories);
    const onCancel = () => {
        setOpen(false);
    };
    const pageNo = Number(searchParams.get('page-no')) || 1;
    const pageSize = pageSizeOfCategoryPage;
    const search = searchParams.get('name') || "";
    const onOk = () => {
        form.validateFields()
            .then(async (values) => {
                await dispatch(addCategory(values) as any);
                if (status === 'succeeded') {
                    messageApi.success('Thêm danh mục thành công');
                    setOpen(false);
                    form.resetFields();
                    dispatch(fetchCategories({ search, pageNo, pageSize }) as any);
                }
                else {
                    messageApi.error('Thêm danh mục thất bại');
                }
            })
            .catch((error) => {
                console.log("Validation Error:", error);
            });
    };
    return (
        <>
            {contextHolder}
            <Button size="sm" onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm danh mục
            </Button>
            <Modal open={open} onCancel={onCancel} onOk={onOk}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: '100%' }}
                >
                    <Form.Item label='Tên danh mục' name='name' rules={[{ required: true, message: 'Nhập tên danh mục!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
