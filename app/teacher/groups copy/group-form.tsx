import { Form, Input, Switch, Button, message, Upload } from 'antd';
import { Group } from '@/types/Group';
import { useDispatch } from 'react-redux';
import { addGroup, updateGroup } from '@/redux/features/groupSlice';
import { useRouter } from 'next/navigation';
import { UploadOutlined } from '@ant-design/icons';
import { updateTest } from '@/redux/features/testSlice';

interface GroupFormProps {
  initialValues?: Group;
  isEdit?: boolean;
  handleCloseModal: () => void;
}

const GroupForm = ({ initialValues, isEdit = false, handleCloseModal }: GroupFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    const formData = new FormData();
  
    const dto = {
      name: values.name,
      description: values.description,
    };
  
    formData.append('groupRequestDTO', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
  
    if (values.image?.[0]?.originFileObj) {
      formData.append('imageUrl', values.image[0].originFileObj);
    }
    handleCloseModal();
    form.resetFields();

    try {
      if (isEdit && initialValues) {
        dispatch(updateGroup({ group: formData, id: initialValues.id }));
      } else {
        dispatch(addGroup(formData));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
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
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
      >
        <Upload
          name="image"
          listType="picture"
          maxCount={1}
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