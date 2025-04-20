'use client'
import React from "react";
import { Tabs, Card, List, Avatar, Space, Tag } from 'antd';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const UserProfileHeader = () => {
    return (
        <div className="relative py-12 px-8 mb-8 rounded-xl overflow-hidden text-white 
                    bg-[#003366] bg-[url('https://wieldy.g-axon.work/assets/images/profile-bg.jpg')] 
                    bg-center bg-cover bg-no-repeat after:inline-block 
                    after:absolute after:inset-0 after:bg-black/60
                    w-full h-[260px]">
        </div>
    );
};

// Mock data
const testList = [
    { id: 1, title: 'Kiểm tra giữa kỳ', date: '2024-04-20', status: 'active' },
    { id: 2, title: 'Bài kiểm tra 15 phút', date: '2024-04-15', status: 'completed' },
    { id: 3, title: 'Bài kiểm tra cuối kỳ', date: '2024-05-20', status: 'upcoming' },
];

const memberList = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'student' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'student' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'teacher' },
];

const GroupDetailPage = () => {
    return (
        <div className="container mx-auto px-4">
            <UserProfileHeader />
            
            <div className="rounded-xl p-[20px]" style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.03)' }}>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <FileTextOutlined />
                                Đề thi
                            </span>
                        }
                        key="1"
                    >
                        <List
                            dataSource={testList}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <a key="view">Xem</a>,
                                        <a key="edit">Sửa</a>,
                                        <a key="delete">Xóa</a>
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={item.title}
                                        description={`Ngày: ${item.date}`}
                                    />
                                    <Tag color={
                                        item.status === 'active' ? 'green' :
                                        item.status === 'completed' ? 'blue' : 'orange'
                                    }>
                                        {item.status === 'active' ? 'Đang diễn ra' :
                                         item.status === 'completed' ? 'Đã hoàn thành' : 'Sắp diễn ra'}
                                    </Tag>
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    
                    <TabPane
                        tab={
                            <span>
                                <UserOutlined />
                                Thành viên
                            </span>
                        }
                        key="2"
                    >
                        <List
                            dataSource={memberList}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <a key="message">Nhắn tin</a>,
                                        <a key="remove">Xóa</a>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={item.name}
                                        description={item.email}
                                    />
                                    <Tag color={item.role === 'teacher' ? 'gold' : 'blue'}>
                                        {item.role === 'teacher' ? 'Giáo viên' : 'Học sinh'}
                                    </Tag>
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default GroupDetailPage;
