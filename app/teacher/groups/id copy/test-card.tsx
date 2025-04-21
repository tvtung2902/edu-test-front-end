'use client'
import React from 'react';
import { Card, Avatar, Typography, Progress, Button, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface TestCardProps {
    title?: string;
    status?: string;
    date?: string;
}

const TestCard: React.FC<TestCardProps> = ({
    title = "Test name",
    status = "active",
    date = "2024-04-20"
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'green';
            case 'completed':
                return 'blue';
            case 'upcoming':
                return 'orange';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Đang diễn ra';
            case 'completed':
                return 'Đã hoàn thành';
            case 'upcoming':
                return 'Sắp diễn ra';
            default:
                return status;
        }
    };

    return (
        <Card
            style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.03)' }}
            headStyle={{ border: 0 }}
            title={<Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>}
            extra={
                <Button
                    type="text"
                    shape="circle"
                    icon={<EllipsisOutlined />}
                />
            }
            bodyStyle={{ paddingTop: '0.5rem' }}
        >
            <div className="flex flex-col text-center items-center gap-4">
                <Avatar
                    src={`https://api.dicebear.com/7.x/shapes/svg?seed=${title}`}
                    size={72}
                />

                <Title level={4}>{title}</Title>

                <Avatar.Group>
                    <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
                        size={40}
                    />
                    <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=2"
                        size={40}
                    />
                    <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=3"
                        size={40}
                    />
                    <Avatar size={40}>+1</Avatar>
                </Avatar.Group>

                <div className="w-full flex flex-col items-center gap-2">
                    <Progress
                        percent={75}
                        size="small"
                        strokeColor="geekblue"
                        showInfo={false}
                        className="w-[85%]"
                    />
                    <Text type="secondary">Ngày: {date}</Text>
                </div>

                <Button type="primary" size="small">
                    Xem chi tiết
                </Button>
            </div>
        </Card>
    );
};

export default TestCard;
