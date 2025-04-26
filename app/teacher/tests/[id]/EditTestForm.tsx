"use client"
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, DatePicker, Checkbox, Button, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Test } from "@/types/Test";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { updateTest } from "@/redux/features/testSlice";
const { RangePicker } = DatePicker;

interface EditTestFormProps {
  test: Test;
}

const EditTestForm = ({ test }: EditTestFormProps) => {
  const [form] = Form.useForm();
  const { status } = useSelector((state: RootState) => state.tests);
  const dispatch = useDispatch<AppDispatch>();

  const initialImage = [
    {
      uid: "-1",
      name: "Ảnh hiện tại",
      status: "done",
      url: test.image,
    }
  ];

  const [image, setImage] = useState<any[]>(test.image ? initialImage : []);

  useEffect(() => {
    form.setFieldsValue({
      name: test.name,
      description: test.description,
      duration: test.duration,
      shuffled: test.shuffled,
      dateRange: test.startDate && test.endDate ? [dayjs(test.startDate), dayjs(test.endDate)] : undefined,
      isPublic: test.isPublic,
    });
  }, [form, test]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    console.log("test.image", !test.image);
    console.log("image", image?.[0]?.url);
    

    const dto = {
      name: values.name,
      description: values.description || null,
      duration: values.duration,
      shuffled: values.shuffled,
      startDate: values.dateRange?.[0]?.format('YYYY-MM-DDTHH:mm:ss') || null,
      endDate: values.dateRange?.[1]?.format('YYYY-MM-DDTHH:mm:ss') || null,
      isPublic: values.isPublic,
      changedImg: (test.image && !image?.[0]?.url) ||
        (!test.image && image.length !== 0) ||
        (test.image && image.length === 0)
    };
    
    const jsonBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
    formData.append("data", jsonBlob);

    if (values.image && values.image.fileList && values.image.fileList[0]) {
      formData.append("imageUrl", values.image.fileList[0].originFileObj);
    }

    dispatch(updateTest({ test: formData, id: test.id }) as any);
  };

  const handleImageChange = ({ fileList }: any) => {
    console.log("fileList", fileList);
    setImage(fileList || []);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
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
              fileList={image}
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
              accept="image/*"
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Ảnh mô tả</Button>
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