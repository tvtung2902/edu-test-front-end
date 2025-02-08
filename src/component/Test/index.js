import { Form, Input, Select, Button, Upload, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Test1() {
    const [form] = Form.useForm();
    const [choices, setChoices] = useState([]);

    const handleChoiceChange = (index, key, value) => {
        const newChoices = [...choices];
        newChoices[index] = { ...newChoices[index], [key]: value };
        setChoices(newChoices);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            console.log("Form Data:", { ...values, choices });
        }).catch(errorInfo => {
            console.error("Validation Failed:", errorInfo);
        });
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            style={{ width: '100%', maxHeight: '450px', overflowY: 'auto' }}
        >
            <Form.Item name="categoryIds" label="Danh mục">
                <Select mode="tags" placeholder="Chọn danh mục" />
            </Form.Item>

            <Form.Item name="content" label="Câu hỏi" rules={[{ required: true, message: 'Nhập câu hỏi!' }]}>
                <Input.TextArea rows={3} placeholder="Nhập câu hỏi..." />
            </Form.Item>

            {choices.map((choice, index) => (
                <Form.Item key={index} label={`Câu trả lời ${index + 1}`}>
                    <Input.Group compact>
                        <Input
                            style={{ width: '70%' }}
                            placeholder={`Nhập câu trả lời ${index + 1}...`}
                            onChange={(e) => handleChoiceChange(index, "content", e.target.value)}
                        />
                        <Switch
                            checked={choice.isCorrect}
                            onChange={(checked) => handleChoiceChange(index, "isCorrect", checked)}
                        />
                        <Upload beforeUpload={() => false} listType="picture">
                            <Button icon={<UploadOutlined />} />
                        </Upload>
                    </Input.Group>
                </Form.Item>
            ))}

            <Form.Item>
                <Button type="dashed" onClick={() => setChoices([...choices, { content: "", isCorrect: false }])}>
                    Thêm câu trả lời
                </Button>
            </Form.Item>

            <Form.Item label="Giải thích" name="explanation">
                <Input.TextArea rows={3} placeholder="Giải thích..." />
            </Form.Item>

            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                    Gửi dữ liệu
                </Button>
            </Form.Item>
        </Form>
    );
};