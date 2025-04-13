'use client'
import { AppDispatch, RootState } from "@/redux/store/store";
import { Form, Input, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories, updateCategory } from "@/redux/features/categorySlice";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { pageSizeOfCategoryPage } from "@/const/teacher";
import Category from "@/types/Category";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ModalEditProps {
    category: Category | null;
    openModalEdit: boolean;
    closeModalEdit: () => void;
}

export default function ModalEdit({ category, openModalEdit, closeModalEdit }: ModalEditProps) {
    const searchParams = useSearchParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [messageApi, contextHolder] = message.useMessage();
    const { status } = useSelector((state: RootState) => state.categories);

    const pageNo = Number(searchParams.get('page-no')) || 1;
    const pageSize = pageSizeOfCategoryPage;
    const search = searchParams.get('name') || "";

    useEffect(() => {
        if (openModalEdit) {
            form.setFieldsValue({
                name: category?.name
            });
        }
    }, [openModalEdit, category, form]);

    const onCancel = () => {
        closeModalEdit();
    };

    const onOk = () => {
        form.validateFields()
            .then(async (values) => {
                await dispatch(updateCategory({ id: category?.id, ...values }) as any);
                if (status === 'succeeded') {
                    await dispatch(fetchCategories({ search, pageNo, pageSize }) as any);
                    await messageApi.success('Cập nhật danh mục thành công');
                    }
                else {
                    messageApi.error('Cập nhật danh mục thất bại');
                }
            })
            .catch((error) => {
                console.log("Validation Error:", error);
            });
    };

    return (
        <>
            {contextHolder}
            <Modal 
                title="Chỉnh sửa danh mục" 
                open={openModalEdit} 
                onCancel={onCancel} 
                onOk={onOk}
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: '100%' }}
                >
                    <Form.Item 
                        label='Tên danh mục' 
                        name='name' 
                        rules={[{ required: true, message: 'Nhập tên danh mục!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
