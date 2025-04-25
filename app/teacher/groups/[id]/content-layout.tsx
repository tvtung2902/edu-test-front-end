'use client';

import { Tabs, List, Input, Tag, Button, Card, Space, Typography, Badge, Modal, Form, Divider, Row, Col } from 'antd';
import { FileTextOutlined, PlusOutlined, UserOutlined, StarOutlined, EllipsisOutlined, SearchOutlined, MailOutlined, MinusCircleOutlined } from '@ant-design/icons';
import UserCard from "./user-card";
import TestCard from "./test-card";
import TestSearch from "./test-search";
import UserSearch from "./user-search";
import ViewToggleTest from "./test-segmented ";
import ViewToggleUser from "./user-segmented";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Group } from "@/types/Group";
import { ReactNode, useEffect, useState } from 'react';
import { fetchAvailableTests } from '@/utils/testsService';
import { addTestGroup } from '@/redux/features/testGroupSlice';
import { useDispatch } from 'react-redux';
import { addUserGroup } from '@/redux/features/userGroupSlice';
const { Text } = Typography;


const { Search } = Input;

export default function GroupDetailPage({ group, children }: { group: Group | null, children: ReactNode }) {
    const dispatch = useDispatch();

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [form] = Form.useForm();

    const [availableTests, setAvailableTests] = useState<any[]>([]);
    const getAvailableTests = async () => {
        const tests = await fetchAvailableTests(Number(group?.id));
        setAvailableTests(tests);
    }


    const filteredTests = availableTests;

    const showModal = async () => {
        setIsModalOpen(true);
        setSelectedItems([]);
        form.resetFields();
        await getAvailableTests();
    };

    const handleOk = () => {
        if (activeTab === 'members') {
            form.validateFields().then(values => {
                const emails = values.emails || [];
                dispatch(addUserGroup({ groupId: Number(group?.id), emails: emails }));
            });
        } else {
            dispatch(addTestGroup({ groupId: Number(group?.id), testsIds: selectedItems }));
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedItems([]);
        form.resetFields();
    };

    const handleTabChange = (key: string) => {
        router.push(`/teacher/groups/${group?.id}/${key}`);
    };
    const handleSelect = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const pathname = usePathname();
    const segments = pathname?.split('/') || [];
    const lastSegment = segments[segments.length - 1];
    const activeTab = lastSegment === 'members' ? 'members' : 'tests';

    const tabItems = [
        {
            key: 'tests',
            label: <span><FileTextOutlined /> Đề thi</span>,
        },
        {
            key: 'members',
            label: <span><UserOutlined /> Thành viên</span>,
        }
    ];
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        fields: { name: number }[],
        add: () => void
    ) => {
        const value = e.target.value;
        const isLast = index === fields.length - 1;

        if (isLast && value.trim() !== '') {
            add();
        }
    };

    const modalContent = activeTab === 'tests' ? (
        <>
            <div className="mb-4">
                <Search
                    placeholder="Tìm kiếm đề thi..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onChange={(e) => { }}
                />
            </div>
            <List
                style={{ height: '400px', overflowY: 'auto' }}
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={filteredTests}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                type={selectedItems.includes(item.id) ? 'primary' : 'default'}
                                onClick={() => handleSelect(item.id)}
                                size="middle"
                            >
                                {selectedItems.includes(item.id) ? 'Đã chọn' : 'Chọn'}
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={<Text strong>{item.title}</Text>}
                            description={
                                <Space direction="vertical" size={1}>
                                    <Text type="secondary">Môn học: {item.name}</Text>
                                    <Text type="secondary">Thời gian: {item.duration}</Text>
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />
        </>
    ) : (
        <Form form={form} layout="vertical"
            style={{
                maxHeight: '400px',
                overflowY: 'auto'
            }}
        >
            <Form.List 
                name="emails" 
                initialValue={['']}
                rules={[
                    {
                        validator: async (_, emails) => {
                            if (!emails || emails.length < 1) {
                                return Promise.reject(new Error('Ít nhất một email là bắt buộc'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field, index) => (
                            <Row key={field.key}>
                                <Col span={22}>
                                    <Form.Item
                                        {...field}
                                        label={'Email thành viên ' + (index + 1)}
                                        name={[field.name]}
                                        fieldKey={[field.fieldKey!]}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập email!' },
                                            { type: 'email', message: 'Email không hợp lệ!' },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            prefix={<MailOutlined className="text-gray-400" />}
                                            placeholder="Nhập email thành viên..."
                                            onChange={(e) => handleChange(e, index, fields, add)}
                                        />
                                    </Form.Item>
                                </Col>

                                {fields.length > 1 && (
                                    <Col span={2} className='self-center'>
                                        <Button
                                            type="text"
                                            icon={<MinusCircleOutlined />}
                                            onClick={() => remove(field.name)}
                                            danger
                                        />
                                    </Col>
                                )}
                            </Row>
                        ))}
                    </>
                )}
            </Form.List>
        </Form>
    );

    return (
        <div className="container mx-auto px-4 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col rounded-xl bg-white" style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.03)' }}>
                <div className="relative py-12 px-8 rounded-t-xl overflow-hidden text-white 
                    bg-[#003366] bg-[url('https://wieldy.g-axon.work/assets/images/profile-bg.jpg')] 
                    bg-center bg-cover bg-no-repeat after:inline-block 
                    after:absolute after:inset-0 after:bg-black/60
                    w-full h-[260px]">
                </div>
                <div className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col w-full">
                            <h3 className="text-xl font-bold mb-2 text-[#003366]">{group?.name}</h3>
                            <Tabs activeKey={activeTab} items={tabItems} onChange={handleTabChange} />
                        </div>
                        <Button type="primary" onClick={showModal} className="ml-4 self-start">
                            <PlusOutlined />
                            {activeTab === 'tests' ? 'Thêm đề thi' : 'Thêm thành viên'}
                        </Button>
                    </div>
                </div>
                <Modal
                    title={
                        <div className="text-lg">
                            {activeTab === 'tests' ? 'Thêm đề thi vào nhóm' : 'Thêm thành viên vào nhóm'}
                        </div>
                    }
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText={activeTab === 'tests' ? 'Thêm đề thi' : 'Gửi lời mời'}
                    cancelText="Hủy"
                    width={600}
                    className="custom-modal"
                    
                >
                    {modalContent}
                </Modal>
            </div>
            {children}
        </div>
    );
};
