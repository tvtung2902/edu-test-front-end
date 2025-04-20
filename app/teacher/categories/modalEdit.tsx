'use client'

import { Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store/store";
import { endUpdateCategory } from "@/redux/features/categorySlice";
import Category from "@/types/Category";

interface ModalEditProps {
    openModalEdit: boolean;
    closeModalEdit: () => void;
    handleUpdateCategory: (category: Category) => Promise<void>;
}

function ModalEdit({ openModalEdit, closeModalEdit, handleUpdateCategory }: ModalEditProps) {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const category = useSelector((state: RootState) => state.categories.categoryUpdated);

    useEffect(() => {
        if (openModalEdit && category) {
            form.setFieldsValue({
                name: category?.name
            });
        }
    }, [openModalEdit, category, form]);

    const onCancel = () => {
        closeModalEdit();
        dispatch(endUpdateCategory());
    };

    const onOk = () => {
        form.validateFields()
            .then(async (values) => {
                await handleUpdateCategory({ id: category?.id, ...values });
                dispatch(endUpdateCategory());
                closeModalEdit();
            })
            .catch((error) => {
                console.log("Validation Error:", error);
                dispatch(endUpdateCategory());
                closeModalEdit();
            });
    };

    return (
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
    );
}

export default memo(ModalEdit);

