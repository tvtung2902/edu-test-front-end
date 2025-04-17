    "use client"
    import React from "react";
    import { Form, Input, InputNumber, DatePicker, Select, Checkbox, Button, message, Col, Row, Upload } from "antd";
    import { UploadOutlined } from "@ant-design/icons";
    import { addTest } from "@/redux/features/testSlice";
    import { useDispatch } from "react-redux";
    import { AppDispatch, RootState } from "@/redux/store/store";
    import { useSelector } from "react-redux";
    const { RangePicker } = DatePicker;

    const AddTestForm = () => {
        const [form] = Form.useForm();
        const dispatch = useDispatch<AppDispatch>();
        const { status } = useSelector((state: RootState) => state.tests);

        const onFinish = (values: any) => {
            const formData = new FormData();

            const dto = {
                name: values.name,
                description: values.description || null,
                duration: values.duration,
                shuffled: values.shuffled,
                startDate: values.dateRange?.[0]?.format('YYYY-MM-DDTHH:mm:ss') || null,
                endDate: values.dateRange?.[1]?.format('YYYY-MM-DDTHH:mm:ss') || null,
            };

            // Convert object -> JSON string -> Blob để gửi với multipart/form-data
            const jsonBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
            formData.append("data", jsonBlob);

            if (values.image && values.image.fileList[0]) {
                formData.append("imageUrl", values.image.fileList[0].originFileObj);
            }

            dispatch(addTest(formData) as any);
        };


        return (
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: "auto" }}
            >
                <Form.Item
                    label="Tên đề thi"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên đề thi" }]}
                >
                    <Input placeholder="Nhập tên đề thi..." />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: false }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập mô tả cho đề thi..."
                        showCount
                        maxLength={500}
                    />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Thời gian làm bài (phút)"
                            name="duration"
                            rules={[{ required: true, message: "Vui lòng nhập thời gian làm bài" }]}
                        >
                            <InputNumber min={1} max={10800} placeholder="Nhập thời gian làm bài..." style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ngày bắt đầu và ngày kết thúc"
                            name="dateRange"
                            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu và ngày kết thúc" }]}
                        >
                            <RangePicker showTime style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="shuffled" valuePropName="checked">
                            <Checkbox>Trộn câu hỏi</Checkbox>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="image">
                            <Upload
                                beforeUpload={() => false}
                                listType="picture-card"
                                maxCount={1}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />}>Ảnh mô tả</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" className="w-full" htmlType="submit" disabled={status === "add loading"} loading={status === "add loading"}>
                        {status === "add loading" ? "Đang tạo đề thi..." : "Tạo đề thi"}
                    </Button>
                </Form.Item>
            </Form>
        );
    };

    export default AddTestForm;
