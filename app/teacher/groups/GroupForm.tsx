import { Form, Input, Switch, Button, message } from 'antd';
import { Group } from '@/types/Group';
import { useDispatch } from 'react-redux';
import { addGroup, updateGroup } from '@/redux/features/groupSlice';
import { useRouter } from 'next/navigation';

interface GroupFormProps {
  initialValues?: Group;
  isEdit?: boolean;
}

const GroupForm = ({ initialValues, isEdit = false }: GroupFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values: any) => {
    
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
        name="public"
        label="Public Group"
        valuePropName="checked"
      >
        <Switch />
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