"use client"
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, DatePicker, Checkbox, Button, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Test } from "@/types/Test";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
const { RangePicker } = DatePicker;

interface EditTestFormProps {
  test: Test;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

const EditTestForm = ({ test, onSubmit, isSubmitting }: EditTestFormProps) => {
  const [form] = Form.useForm();
  const {status} = useSelector((state: RootState) => state.tests);
  const [fileList, setFileList] = useState<any[]>([]);
  
  useEffect(() => {
    // Set initial form values
    form.setFieldsValue({
      name: test.name,
      description: test.description,
      duration: test.duration,
      shuffled: test.shuffled,
      dateRange: test.startDate && test.endDate ? [dayjs(test.startDate), dayjs(test.endDate)] : undefined,
      isPublic: test.isPublic,
    });

    // Set initial image if exists
    if (test.image) {
      setFileList([
        {
          uid: '-1',
          name: 'current-image',
          status: 'done',
          url: test.image,
        }
      ]);
    }
  }, [form, test]);

  const onFinish = (values: any) => {
    const formData = new FormData();
  
    const dto = {
      name: values.name,
      description: values.description || null,
      duration: values.duration,
      shuffled: values.shuffled,
      startDate: values.dateRange?.[0]?.toISOString() || null,
      endDate: values.dateRange?.[1]?.toISOString() || null,
      isPublic: values.isPublic,
    };
  
    // Convert object -> JSON string -> Blob để gửi với multipart/form-data
    const jsonBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
    formData.append("data", jsonBlob);
  
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("imageUrl", fileList[0].originFileObj);
    }
  
    onSubmit(formData);
  };

  const handleImageChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Bạn chỉ có thể tải lên file ảnh!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isImage && isLt2M;
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
                    <Form.Item 
                        name="image"
                        label="Ảnh mô tả"
                        extra="Hỗ trợ định dạng: JPG, PNG. Kích thước tối đa: 2MB"
                    >
                        <Upload
                            beforeUpload={beforeUpload}
                            listType="picture-card"
                            maxCount={1}
                            accept="image/*"
                            fileList={fileList}
                            onChange={handleImageChange}
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" className="w-full" htmlType="submit" disabled={status === "update loading"} loading={status === "add loading"}>
                    {status === "update loading" ? "Đang sửa đề thi..." : "Sửa đề thi"}
                </Button>
            </Form.Item>
        </Form>
  );
};

export default EditTestForm; 