'use client'
import { Card, Avatar, Badge, Typography, Button, Space } from 'antd';
import { StarFilled, MoreOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserCard = () => {
    return (
        <Card className="mb-2">
            <Button
                type="primary"
                danger
                size="small"
                className="min-w-[92px]"
            >
                Text here
            </Button>

            <div className="flex items-center p-4">
                {/* Avatar + Info */}
                <div className="flex items-center xs:flex-1 sm:flex-[0_1_60%] lg:flex-[0_1_35%]">
                    <div className="mr-3">
                        <Button
                            shape="circle"
                            type="text"
                            icon={<StarFilled />}
                            size="large"
                        />
                    </div>
                    <div className="flex">
                        <Badge
                            status="success"
                            offset={[-4, 8]}
                            dot
                        >
                            <Avatar
                                size={56}
                                src="/assets/images/avatars/avatar3.jpg"
                                alt="Jannie Thompson"
                            />
                        </Badge>
                        <div className="flex-1 self-center pl-4">
                            <Title level={5} className="mb-0">Jannie Thompson</Title>
                            <Text type="secondary">@jannie</Text>
                        </div>
                    </div>
                </div>

                {/* Role */}
                <div className="hidden sm:flex sm:basis-[28%] lg:basis-[18%]">
                    <Text>Admin</Text>
                </div>

                {/* Stats */}
                <div className="basis-[30%] hidden lg:block">
                    <Space size={30} align="center">
                        <div>
                            <Title level={5} className="mb-0">689</Title>
                            <Text type="secondary">Views</Text>
                        </div>
                        <div>
                            <Title level={5} className="mb-0">243</Title>
                            <Text type="secondary">Project</Text>
                        </div>
                        <div>
                            <Title level={5} className="mb-0">457</Title>
                            <Text type="secondary">Followers</Text>
                        </div>
                    </Space>
                </div>

                {/* Actions */}
                <div className="ml-auto sm:block hidden">
                    <Button type="primary" danger size="small" className="min-w-[92px]">
                        Unfollow
                    </Button>
                </div>

                <div>
                    <Button
                        shape="circle"
                        type="text"
                        icon={<MoreOutlined />}
                        size="large"
                    />
                </div>
            </div>
        </Card>
    );
};

export default UserCard;
