'use client'
import React, { useEffect, useState } from "react";
import { List, Avatar, Tag, Button, Card, Space, Typography, Badge, Modal, Input, Form, Divider } from 'antd';
import { UserOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import UserCard from "../user-card";
import UserSearch from "../user-search";
import ViewToggleUser from "../user-segmented";
import GroupPagination from "../pagination";
import { Group } from "@/types/Group";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { fetchUserGroups } from "@/redux/features/userGroupSlice";
import { useParams, useSearchParams } from "next/navigation";

const { Text } = Typography;
const { Search } = Input;

interface MemberPageProps {
    group: Group | null;
}

const MemberPage: React.FC<MemberPageProps> = ({ group }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const {userGroups, totalPages} = useSelector((state: RootState) => state.userGroups);
    const dispatch = useDispatch();

    const availableUsers = [
        { id: 101, name: 'Phạm Thị D', email: 'phamthid@example.com' },
        { id: 102, name: 'Hoàng Văn E', email: 'hoangvane@example.com' },
        { id: 103, name: 'Đỗ Thị F', email: 'dothif@example.com' },
    ];

    const handleOk = () => {
        console.log('Adding users:', selectedItems);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedItems([]);
        setSearchText('');
        form.resetFields();
    };

    const handleSelect = (id: number) => {
        setSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const filteredUsers = availableUsers.filter(user => 
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    
    const searchParams = useSearchParams();
    const pageNo = Number(searchParams.get('page-no')) || 1;
    const search = searchParams.get('name') || "";  
    const status = searchParams.get('status') || null;
    const pr = useParams();
    const groupId = Number(pr.id);

    useEffect(() => {
        dispatch(fetchUserGroups({
            groupId: groupId,
            pageNo: pageNo,
            status: status as "PENDING" | "JOINED"
        }));
    }, [pageNo, search, status]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
                <UserSearch />
                <ViewToggleUser />
            </div>

            <Modal
                title={
                    <div className="text-lg">
                        Thêm thành viên vào nhóm
                    </div>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm thành viên"
                cancelText="Hủy"
                width={600}
                className="custom-modal"
                okButtonProps={{ 
                    disabled: selectedItems.length === 0
                }}
            >
                <div className="mb-4">
                    <Search
                        placeholder="Tìm kiếm thành viên..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={filteredUsers}
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
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={<Text strong>{item.name}</Text>}
                                description={<Text type="secondary">{item.email}</Text>}
                            />
                        </List.Item>
                    )}
                />
            </Modal>

            <div className="grid grid-cols-1 gap-6">
                {userGroups.map((item) => (
                    <UserCard

                        key={item.id}
                        user={item}
                    />
                ))}
            </div>
            <div className="flex flex-row justify-end">
                <GroupPagination totalPages={totalPages} />
            </div>
        </div>
    );
};

export default MemberPage; 