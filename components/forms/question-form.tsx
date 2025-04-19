"use client"

import type React from "react"
import { Button, Form, Input, Radio, Select, Space, Card, Image, Typography, Checkbox, message, Upload, Row, Col, Flex } from "antd"
import { PlusOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons'
import Category from "@/types/Category";
import { Question } from "@/types/Question";
import { addQuestion, updateQuestion } from "@/redux/features/questionSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { Option as Choice } from "@/types/Option";

const { TextArea } = Input;

type QuestionFormProps = {
  initialData?: Question | null
  onSubmit: (question: Omit<Question, "id">) => void
  onCancel?: () => void,
  categories: Category[],
  isEdit: boolean
}

const initOption: Omit<Choice, "id">[] = [
  { content: "", isCorrect: false },
  { content: "", isCorrect: false },
  { content: "", isCorrect: false },
  { content: "", isCorrect: false },
]

export function QuestionForm({ initialData, isEdit, onCancel, categories }: QuestionFormProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: any) => {
    const formData = new FormData();
    console.log("values", values);

    const imageQuestion = values.questionImage?.[0]?.originFileObj;
    console.log("imageQuestion", imageQuestion);
    if (imageQuestion) {
      formData.append("imageQuestion", imageQuestion);
    }

    const answers = values.options.map((option: any) => {
      console.log("option", option);
      console.log("option.is", option.isCorrect);
      const base = {
        content: option.content,
        isCorrect: option.isCorrect,
      };

      const fileObj = option.image?.fileList?.[0]?.originFileObj;
      if (fileObj) {
        formData.append("imageAnswers", fileObj);
      } else {
        formData.append("imageAnswers", new Blob([]));
      }
      return base;
    });

    const questionDto = {
      content: values.content,
      explanation: values.explanation,
      categoryIds: values.categories || [],
      choices: answers
    }

    const jsonBlob = new Blob([JSON.stringify(questionDto)], { type: 'application/json' });
    formData.append("dataQuestion", jsonBlob);

    if (isEdit) {
      dispatch(updateQuestion({ question: formData, id: initialData?.id || -1 }) as any);
    } else {
      dispatch(addQuestion(formData) as any);
    }
  };

  return (
    <Form
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        borderRadius: 10,
        padding: 20,
      }}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        content: initialData?.content || "",
        categories: initialData?.categories.map((category: Category) => category.id) || [],
        explanation: initialData?.explanation || "",
        questionImage: initialData?.image
          ? [
            {
              uid: '-1',
              name: 'ảnh mô tả câu hỏi',
              status: 'done',
              url: initialData.image,
            },
          ]
          : [],
        options: initialData?.options ?
          initialData?.options.map((option: Choice, index: number) => ({
            content: option.content || "",
            isCorrect: option.isCorrect || false,
            image: option.image ? [
              {
                uid: -1 * index,
                name: 'ảnh mô tả đáp án ' + String.fromCharCode(65 + index),
                status: 'done',
                url: option.image,
              },
            ]
              : [],
          }))
          : initOption,
      }}
    >
      <Row>
        <Col span={12}>
          <Form.Item label="Ảnh mô tả" name="questionImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e?.fileList;
            }}>
            <Upload
              // fileList={initialData?.image ? [{
              //   uid: initialData?.image,
              //   name: initialData?.image,
              //   url: initialData?.image,
              // }] : []}
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh mô tả</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Loại câu hỏi" name="categories">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Chọn loại câu hỏi"
              options={categories && categories.map(c => ({ label: c.name, value: c.id }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Nội dung câu hỏi"
        name="content"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung câu hỏi' }]}
      >
        <TextArea rows={4} placeholder="Nhập nội dung câu hỏi" />
      </Form.Item>

      <Space direction="vertical" style={{ width: '100%' }} size={16}>
        <Card>
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Form.Item
                    required
                    key={key}
                    label={`Đáp án ${String.fromCharCode(65 + index)}`}
                    {...restField}
                    rules={[{ required: true, message: 'Vui lòng nhập đáp án!' }]}
                  >
                    <Card size="small">
                      <Flex gap={8}>

                        <Form.Item
                          name={[name, 'isCorrect']}
                          valuePropName="checked"
                          style={{ margin: 0 }}
                        >
                          <Checkbox

                          />
                        </Form.Item>

                        <Form.Item
                          name={[name, 'content']}
                          style={{ flex: 1, margin: 0 }}
                        >
                          <Input
                            style={{
                              width: '100%',
                              flex: 1,
                              minWidth: 0,
                            }}
                            placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
                          />
                        </Form.Item>

                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            if (fields.length > 2) {
                              remove(name);
                            } else {
                              message.warning('Tối thiểu 2 lựa chọn');
                            }
                          }}
                        />
                      </Flex>

                      <div style={{ marginLeft: 24, marginTop: 8 }}>
                        <Form.Item
                          name={[name, 'image']}
                          style={{ margin: 0 }}
                          valuePropName="fileList"
                          getValueFromEvent={(e) => {
                            if (Array.isArray(e)) return e;
                            return e?.fileList;
                          }}
                        >  
                          <Upload
                            beforeUpload={() => false}
                            listType="picture"
                            maxCount={1}
                            accept="image/*"
                          >
                            <Button icon={<UploadOutlined />}>Ảnh mô tả</Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </Card>
                  </Form.Item>
                ))}

                <Button
                  type="dashed"
                  onClick={() => {
                    if (fields.length < 8) {
                      add();
                    } else {
                      message.warning('Tối đa 8 lựa chọn');
                    }
                  }}
                  icon={<PlusOutlined />}
                >
                  Thêm lựa chọn
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Form.Item
          label="Giải thích"
          name="explanation"
          rules={[{ required: true, message: 'Vui lòng nhập giải thích' }]}
        >
          <TextArea rows={4} placeholder="Nhập giải thích" />
        </Form.Item>

        <Form.Item
          style={{
            margin: 0,
          }}
        >
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              {initialData ? "Cập nhật câu hỏi" : "Thêm câu hỏi"}
            </Button>
          </Space>
        </Form.Item>
      </Space>
    </Form>
  );
}
