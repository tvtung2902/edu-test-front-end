import { useEffect } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addGroup, updateGroup } from '@/redux/features/groupSlice';
import { Group, GroupRequestDTO } from '@/types/Group';
import type { UploadFile } from 'antd/es/upload/interface';

interface GroupFormProps {
  initialValues?: Group;
  isEdit?: boolean;
  handleCloseModal: () => void;
}

const GroupForm = ({ initialValues, isEdit = false, handleCloseModal }: GroupFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && initialValues) {
      const imageFileList: UploadFile[] = initialValues.image
        ? [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: initialValues.image,
            },
          ]
        : [];

      form.setFieldsValue({
        name: initialValues.name,
        description: initialValues.description,
        image: imageFileList,
      });
    }
  }, [initialValues, isEdit, form]);

  const onFinish = async (values: any) => {
    const formData = new FormData();

    const dto: GroupRequestDTO = {
      name: values.name,
      description: values.description,
    };
    
    if(isEdit){
      const hasImageChanged = !!(initialValues?.image && !values.image?.[0]?.url) ||
        !!(!initialValues?.image && values.image.length !== 0) ||
        !!(initialValues?.image && values.image.length === 0);
      
      if (hasImageChanged) {
        dto.changedImg = true;
      }
    }

    formData.append(
      'groupRequestDTO',
      new Blob([JSON.stringify(dto)], { type: 'application/json' })
    );

    const imageFile = values.image?.[0]?.originFileObj;
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    }
    
    handleCloseModal();
    form.resetFields();

    try {
      if (isEdit && initialValues) {
         dispatch(updateGroup({ group: formData, groupDTO: dto, id: initialValues.id }));
      } else {
         dispatch(addGroup(formData));
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Group Name"
        rules={[{ required: true, message: 'Please input group name!' }]}
      >
        <Input placeholder="Enter group name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter group description" />
      </Form.Item>

      <Form.Item
        name="image"
        label="Group Image"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList;
        }}
      >
        <Upload
          listType="picture"
          maxCount={1}
          accept="image/*"
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Update Group' : 'Create Group'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GroupForm;