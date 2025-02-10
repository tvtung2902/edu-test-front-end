import { Button, Select, Input, Upload, Form, Switch, Row, Col } from "antd";
import CustomModal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../action/category";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function AddUpdateCategory({ open, handleCloseModal, getData }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onCancel = () => {
        handleCloseModal();
    };

    const onOk = () => {
        form.validateFields()
            .then(async (values) => {
                handleCloseModal();
                form.resetFields();
                await dispatch(addCategory(values));
                dispatch(getData());
            })
            .catch((error) => {
                console.log("Validation Error:", error);
            });
    };
    return (
        <CustomModal
            title="THÊM DANH MỤC"
            open={open}
            onCancel={onCancel}
            onOk={onOk}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ width: '100%' }}
            >
                <Form.Item label='Tên danh mục' name='name' rules={[{ required: true, message: 'Nhập tên danh mục!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </CustomModal>
    )
}