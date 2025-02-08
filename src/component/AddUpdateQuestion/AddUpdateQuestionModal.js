import { Button, Select, Input, Upload, Form, Switch, Row, Col } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import CustomModal from "../Modal";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../action/question";

export default function AddUpdateQuestionModal({ open, handleCloseModal }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const onCancel = () => {
        handleCloseModal();
    };

    const onOk = () => {
        form.validateFields()
            .then((values) => {
                console.log("values", values);
                const formData = new FormData();
                const choices = values.choices.map((choice, index) => {
                    const choiceData = {
                        content: choice.content,
                        isCorrect: choice.isCorrect,
                    };

                    if (choice.imageChoice && choice.imageChoice[0]) {
                        console.log("ok")
                        formData.append(`choiceImages_${index}`, choice.imageChoice[0].originFileObj);
                    }

                    return choiceData;
                });
                const newQuestion = {
                    ...values,
                    choices
                };

                console.log(newQuestion);

                formData.append(
                    "questionRequestDTO",
                    new Blob([JSON.stringify(newQuestion)], { type: "application/json" })
                );

                if (values.imageQuestion?.fileList?.[0]?.originFileObj) {
                    formData.append("imageQuestion", values.imageQuestion.fileList[0].originFileObj);
                }

                dispatch(addQuestion(newQuestion, formData));
            })
            .catch((error) => {
                console.log("Validation Error:", error);
            });
    };

    return (
        <CustomModal
            title="THÊM CÂU HỎI"
            open={open}
            onCancel={onCancel}
            onOk={onOk}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ width: '100%', maxHeight: '450px', overflowY: 'auto' }}
            >

                <Row gutter={16} style={{ maxWidth: '100%' }}>
                    <Col span={12}>
                        <Form.Item name="categoryIds" label="Danh mục">
                            <Select
                                mode="tags"
                                placeholder="Chọn danh mục"
                                options={options}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Tải ảnh" name="imageQuestion">
                            <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
                                <Button icon={<UploadOutlined />} />
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="content"
                    label="Câu hỏi"
                    rules={[{ required: true, message: 'Nhập câu hỏi!' }]}
                >
                    <TextArea rows={3} placeholder="Nhập câu hỏi..." style={{ width: '100%' }} />
                </Form.Item>

                <Form.List name="choices">
                    {(fields, { add, remove }) => (
                        <>

                            {fields.map(({ key, name, ...restField }) => (
                                <>
                                    <Button type="link" danger onClick={() => remove(name)}>Xóa</Button>
                                    <Form.Item key={key} label={`Câu trả lời ${name + 1}`}>
                                        <Row style={{ maxWidth: '100%' }} gutter={20}>
                                            <Col span={12}>
                                                <Row gutter={20}>
                                                    <Col span={18}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "content"]}
                                                            rules={[{ required: true, message: "Nhập câu trả lời!" }]}
                                                            noStyle
                                                        >
                                                            <Input placeholder={`Nhập câu trả lời ${name + 1}...`} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "isCorrect"]}
                                                            valuePropName="checked"
                                                            noStyle
                                                        >
                                                            <Switch />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    // {...restField}
                                                    // name={[name, 'imageChoice']}
                                                    // valuePropName="fileList"
                                                    // getValueFromEvent={(e) => e.fileList}
                                                >
                                                    <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
                                                        <Button icon={<UploadOutlined />} />
                                                    </Upload>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </>

                            ))}
                            <Form.Item>
                                <Button type="dashed" color="green" variant="dashed" onClick={() => add()} >
                                    Thêm câu trả lời
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item name="explanation" label="Giải thích">
                    <TextArea rows={3} placeholder="Giải thích..." />
                </Form.Item>
            </Form>
        </CustomModal>
    );
}
