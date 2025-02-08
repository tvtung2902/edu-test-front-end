import { Button, Select, Input, Upload, Form, Switch, Row, Col } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import CustomModal from "../Modal";
import { useDispatch } from "react-redux";
import { addCategory } from "../../action/category";

export default function AddUpdateCategory({ open, handleCloseModal }){
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onCancel = () => {
            handleCloseModal();
        };
    
        const onOk = () => {
            form.validateFields()
                .then((values) => {
                    console.log("values", values);
                    
                    dispatch(addCategory(values));
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