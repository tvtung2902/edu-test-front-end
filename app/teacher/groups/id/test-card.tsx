'use client'
import React, { useState } from 'react';
import { Card, Avatar, Typography, Progress, Button, Tag, Popconfirm, Dropdown, Menu, Modal } from 'antd';
import { EllipsisOutlined, DeleteOutlined, EyeOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { TestGroupWithStatus, TestStatus } from '@/types/TestGroup';
import { Group } from '@/types/Group';
import { useRouter } from 'next/navigation';
const { Title, Text } = Typography;

interface TestCardProps {
    group: Group | null;
    testGroup: TestGroupWithStatus;
}

const TestCard: React.FC<TestCardProps> = ({ group, testGroup }: TestCardProps) => {
    const router = useRouter();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            // Add your delete logic here
            console.log('Deleting test:', testGroup.id);
        } finally {
            setDeleteLoading(false);
            setShowDeleteModal(false);
        }
    };

    const handleView = () => {
        router.push(`/teacher/tests/`);
    };

    const menu = (
        <Menu>
            <Menu.Item key="view" icon={<EyeOutlined />} onClick={handleView}>
                Xem đề thi
            </Menu.Item>
            <Menu.Item key="delete" danger onClick={() => setShowDeleteModal(true)}>
                <div className="flex items-center">
                    <DeleteOutlined className="mr-2" />
                    Xóa đề thi
                </div>
            </Menu.Item>
        </Menu>
    );

    const getStatusColor = (status: TestStatus) => {
        switch (status) {
            case 'ongoing':
                return 'green';
            case 'ended':
                return 'blue';
            case 'incoming':
                return 'orange';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'ongoing':
                return 'Đang diễn ra';
            case 'ended':
                return 'Đã Kết thúc';
            case 'incoming':
                return 'Sắp diễn ra';
            default:
                return status;
        }
    };

    return (
        <>
            <Card
                style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.03)' }}
                headStyle={{ border: 0 }}
                title={<Tag color={getStatusColor(testGroup.status)}>{getStatusText(testGroup.status)}</Tag>}
                extra={
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                            type="text"
                            shape="circle"
                            icon={<EllipsisOutlined />}
                            loading={deleteLoading}
                        />
                    </Dropdown>
                }
                bodyStyle={{ paddingTop: '0.5rem' }}
            >
                <div className="flex flex-col text-center items-center gap-4">
                    {/* Avatar nhóm bài kiểm tra */}
                    <Avatar src={testGroup.image} size={72} />

                    {/* Tên bài kiểm tra và thời gian */}
                    <div className="flex flex-col gap-2">
                        <Title level={4}>{testGroup.name}</Title>
                        <Text type="secondary">
                            Từ {testGroup.startDate} đến {testGroup.endDate}
                        </Text>
                    </div>

                    {/* Trạng thái: INCOMING */}
                    {testGroup.status === 'incoming' && (
                        <>
                            <Avatar.Group>
                                <Avatar size={40} icon={<UserOutlined />} />
                            </Avatar.Group>
                            <Text type="secondary">Chưa có học sinh tham gia</Text>
                        </>
                    )}

                    {/* Trạng thái: ONGOING hoặc ENDED */}
                    {(testGroup.status === 'ongoing' || testGroup.status === 'ended') && (
                        <>
                            <Avatar.Group maxCount={3}>
                                {testGroup.users && testGroup.users.length > 0 ? (
                                    testGroup.users.slice(0, 3).map((user, index) => (
                                        <Avatar key={index} src={user.avatar} size={40} />
                                    ))
                                ) : (
                                    <Avatar size={40} icon={<UserOutlined />} />
                                )}
                            </Avatar.Group>

                            <div className="w-full flex flex-col items-center gap-2">
                                <Progress
                                    percent={
                                        testGroup.users && group?.numberOfMembers
                                            ? Math.round((testGroup.users.length / group.numberOfMembers) * 100)
                                            : 0
                                    }
                                    size="small"
                                    strokeColor="geekblue"
                                    showInfo={false}
                                    className="w-[85%]"
                                />
                                <Text type="secondary">
                                    {testGroup.users && testGroup.users.length > 0
                                        ? `Đã hoàn thành ${testGroup.users.length} / ${group?.numberOfMembers} học sinh`
                                        : 'Chưa có học sinh nào hoàn thành'}
                                </Text>
                            </div>
                        </>
                    )}

                    {/* Button hành động */}
                    <Button type="primary" size="small" onClick={handleView}>
                        {testGroup.status === 'incoming' ? 'Xem đề thi' : 'Lịch sử làm bài'}
                    </Button>
                </div>
            </Card>

            <Modal 
                title={
                    <div className="flex items-center gap-2 text-red-500">
                        <ExclamationCircleOutlined />
                        <span>Xác nhận xóa</span>
                    </div>
                }
                open={showDeleteModal}
                onOk={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p>Bạn có chắc chắn muốn xóa đề thi này ra khỏi nhóm này không?</p>
            </Modal>
        </>
    );
};

export default TestCard;
