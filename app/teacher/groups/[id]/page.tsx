'use client'
import React, { useState } from "react";
import { Tabs, List, Avatar, Tag, Button, Card, Space, Typography, Badge } from 'antd';
import { FileTextOutlined, PlusOutlined, UserOutlined, StarOutlined, EllipsisOutlined } from '@ant-design/icons';
import UserCard from "./user-card";
import TestCard from "./test-card";
import TestSearch from "./test-search";
import UserSearch from "./user-search";
import ViewToggleTest from "./test-segmented ";
import ViewToggleUser from "./user-segmented";


const { TabPane } = Tabs;

const testList = [
    { id: 1, title: 'Kiểm tra giữa kỳ', date: '2024-04-20', status: 'active' },
    { id: 2, title: 'Bài kiểm tra 15 phút', date: '2024-04-15', status: 'completed' },
    { id: 3, title: 'Bài kiểm tra cuối kỳ', date: '2024-05-20', status: 'upcoming' },
    
    { id: 11, title: 'Kiểm tra giữa kỳ', date: '2024-04-20', status: 'active' },
    { id: 12, title: 'Bài kiểm tra 15 phút', date: '2024-04-15', status: 'completed' },
    { id: 13, title: 'Bài kiểm tra cuối kỳ', date: '2024-05-20', status: 'upcoming' }
];

const memberList = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'a@example.com',
        role: 'student',
        avatar: 'https://mtv.vn/uploads/2023/02/25/meo-gg.jpg',
        stats: { views: 689, projects: 243, followers: 457 }
    },
    {
        id: 2,
        name: 'Trần Thị B',
        email: 'b@example.com',
        role: 'student',
        avatar: 'https://mtv.vn/uploads/2023/02/25/meo-gg.jpg',
        stats: { views: 102, projects: 38, followers: 64 }
    },
    {
        id: 3,
        name: 'Lê Văn C',
        email: 'c@example.com',
        role: 'teacher',
        avatar: 'https://mtv.vn/uploads/2023/02/25/meo-gg.jpg',
        stats: { views: 504, projects: 117, followers: 312 }
    },
];

const GroupDetailPage = () => {
    const [activeTab, setActiveTab] = useState('1');
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
                            <h3 className="text-xl font-bold mb-2 text-[#003366]">Lớp học khoa học công nghệ</h3>
                            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                                <TabPane tab={<span><FileTextOutlined /> Đề thi</span>} key="1" />
                                <TabPane tab={<span><UserOutlined /> Thành viên</span>} key="2" />
                            </Tabs>
                        </div>
                        <Button type="primary" className="ml-4 self-start">
                            <PlusOutlined />
                            Add
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
                ):(
                    <>
                        <UserSearch />
                        <ViewToggleUser />
                    </>
                )}
            </div>
            {/* Nội dung tương ứng với tab */}
            <div >
                {activeTab === '1' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testList.map((item) => (
                            <TestCard key={item.id} />
                        ))}
                    </div>
                )}

                {activeTab === '2' && (
                    <div className="flex flex-col gap-4">
                        {memberList.map((item) => (
                            <UserCard key={item.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupDetailPage;
