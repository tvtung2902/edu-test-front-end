'use client'
import React from 'react';
import { Card, Avatar, Typography, Progress, Button, Tag, Space } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface TestCardProps {
    title?: string;
    status?: string;
    progress?: number;
    tasks?: string;
}

const TestCard: React.FC<TestCardProps> = ({
    title = "Jumbo React Admin Template",
    status = "In Progress",
    progress = 57,
    tasks = "26/30 tasks In Progress"
}) => {
    return (
        <Card
            style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.03)' }}
            headStyle={{ border: 0 }}
            title={<Tag color="geekblue">{status}</Tag>}
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
                    src="https://mtv.vn/uploads/2023/02/25/meo-gg.jpg"
                    size={72}
                />

                <Title level={4}>{title}</Title>

                <Avatar.Group>
                    <Avatar
                        src="https://mtv.vn/uploads/2023/02/25/meo-gg.jpg"
                        size={40}
                    />
                    <Avatar
                        src="https://mtv.vn/uploads/2023/02/25/meo-gg.jpg"
                        size={40}
                    />
                    <Avatar
                        src="https://mtv.vn/uploads/2023/02/25/meo-gg.jpg"
                        size={40}
                    />
                    <Avatar size={40}>+1</Avatar>
                </Avatar.Group>

                <div className="w-full max-w-[260px]">
                    <Progress
                        percent={progress}
                        size="small"
                        strokeColor="geekblue"
                        showInfo={false}
                        className="w-[85%]"
                    />
                    <Text type="secondary">{tasks}</Text>
                </div>

                <Button type="primary" size="small">
                    Access Dashboard
                </Button>
            </div>
        </Card>
    );
};

export default TestCard;
