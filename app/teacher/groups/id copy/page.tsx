'use client'
import React, { useState } from "react";
import { Tabs, List, Avatar, Tag, Button, Card, Space, Typography, Badge, Modal, Input, Form, Divider } from 'antd';
import { FileTextOutlined, PlusOutlined, UserOutlined, StarOutlined, EllipsisOutlined, SearchOutlined, MailOutlined } from '@ant-design/icons';
import UserCard from "./user-card";
import TestCard from "./test-card";
import TestSearch from "./test-search";
import UserSearch from "./user-search";
import ViewToggleTest from "./test-segmented ";
import ViewToggleUser from "./user-segmented";
import GroupPagination from "./pagination";
import type { TestGroup, Participant } from "@/types/TestGroup";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Search } = Input;

// Mock data for tests
const testList = [
    { id: 1, title: 'Kiểm tra giữa kỳ', date: '2024-04-20', status: 'active' },
    { id: 2, title: 'Bài kiểm tra 15 phút', date: '2024-04-15', status: 'completed' },
    { id: 3, title: 'Bài kiểm tra cuối kỳ', date: '2024-05-20', status: 'upcoming' },
    { id: 11, title: 'Kiểm tra giữa kỳ', date: '2024-04-20', status: 'active' },
    { id: 12, title: 'Bài kiểm tra 15 phút', date: '2024-04-15', status: 'completed' },
    { id: 13, title: 'Bài kiểm tra cuối kỳ', date: '2024-05-20', status: 'upcoming' }
];

// Mock data for test group
const testGroup: TestGroup = {
    id: 1,
    name: 'Lớp học khoa học công nghệ',
    status: 'ongoing',
    users: [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        },
        {
            id: 3,
            name: 'Lê Văn C',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
        }
    ]
};

// Mock data for available tests to add
const availableTests = [
    { id: 101, title: 'Kiểm tra 15 phút Chương 1', subject: 'Toán học', duration: '15 phút' },
    { id: 102, title: 'Kiểm tra 1 tiết Chương 2', subject: 'Vật lý', duration: '45 phút' },
    { id: 103, title: 'Kiểm tra cuối kỳ', subject: 'Hóa học', duration: '90 phút' },
];

// Mock data for available members to add
const availableMembers = [
    { id: 201, name: 'Nguyễn Văn X', email: 'x@example.com', role: 'student' },
    { id: 202, name: 'Trần Thị Y', email: 'y@example.com', role: 'student' },
    { id: 203, name: 'Lê Văn Z', email: 'z@example.com', role: 'student' },
];

const GroupDetailPage = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [searchText, setSearchText] = useState('');
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
        setSelectedItems([]);
        setSearchText('');
        setEmail('');
        form.resetFields();
    };

    const handleOk = () => {
        if (activeTab === '2') {
            console.log('Adding member with email:', email);
        } else {
            console.log('Adding tests:', selectedItems);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedItems([]);
        setSearchText('');
        setEmail('');
        form.resetFields();
    };

    const handleSelect = (id: number) => {
        setSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const filteredTests = availableTests.filter(test => 
        test.title.toLowerCase().includes(searchText.toLowerCase()) ||
        test.subject.toLowerCase().includes(searchText.toLowerCase())
    );

    const modalContent = activeTab === '1' ? (
        <>
            <div className="mb-4">
                <Search
                    placeholder="Tìm kiếm đề thi..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <List
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
                                    <Text type="secondary">Môn học: {item.subject}</Text>
                                    <Text type="secondary">Thời gian: {item.duration}</Text>
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />
        </>
    ) : (
        <Form form={form} layout="vertical">
            <Form.Item
                label="Email thành viên"
                name="email"
                rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                ]}
            >
                <Input
                    size="large"
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Nhập email thành viên..."
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>
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
                            <h3 className="text-xl font-bold mb-2 text-[#003366]">{testGroup.name}</h3>
                            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                                <TabPane tab={<span><FileTextOutlined /> Đề thi</span>} key="1" />
                                <TabPane tab={<span><UserOutlined /> Thành viên</span>} key="2" />
                            </Tabs>
                        </div>
                        <Button type="primary" onClick={showModal} className="ml-4 self-start">
                            <PlusOutlined />
                            {activeTab === '1' ? 'Thêm đề thi' : 'Thêm thành viên'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                {activeTab === '1' ? (
                    <>
                        <TestSearch />
                        <ViewToggleTest />
                    </>
                ) : (
                    <>
                        <UserSearch />
                        <ViewToggleUser />
                    </>
                )}
            </div>
            {/* Modal for adding items */}
            <Modal
                title={
                    <div className="text-lg">
                        {activeTab === '1' ? 'Thêm đề thi vào nhóm' : 'Thêm thành viên vào nhóm'}
                    </div>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={activeTab === '1' ? 'Thêm đề thi' : 'Gửi lời mời'}
                cancelText="Hủy"
                width={600}
                className="custom-modal"
                okButtonProps={{ 
                    disabled: activeTab === '1' ? selectedItems.length === 0 : !email
                }}
            >
                {modalContent}
            </Modal>
            {/* Nội dung tương ứng với tab */}
            <div >
                {activeTab === '1' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testList.map((item) => (
                                <TestCard 
                                    key={item.id}
                                    title={item.title}
                                    status={item.status}
                                    date={item.date}
                                />
                            ))}
                        </div>
                        <div className="flex flex-row justify-end">
                            <GroupPagination />
                        </div>
                    </>
                )}

                {activeTab === '2' && (
                    <>
                        <div className="flex flex-col gap-4">
                            {testGroup.users.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                        <div className="flex flex-row justify-end">
                            <GroupPagination />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GroupDetailPage;
