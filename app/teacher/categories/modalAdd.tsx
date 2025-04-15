'use client'

import { Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/redux/store/store";
import { addCategory } from "@/redux/features/categorySlice";

export default function ModalAdd() {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);

    const onCancel = () => {
        setOpen(false);
    };

    const onOk = () => {
        form.validateFields()
            .then(async (values) => {
                await dispatch(addCategory(values) as any);
                setOpen(false);
                form.resetFields();
            })
            .catch((error) => {
                console.log("Validation Error:", error);
            });
    };

    return (
        <>
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
    );
}
