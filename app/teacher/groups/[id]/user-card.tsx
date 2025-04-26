    'use client'
    import React from 'react';
    import { Card, Avatar, Badge, Typography, Space, Button, message } from 'antd';
    import { StarFilled, MoreOutlined } from '@ant-design/icons';
    import type { Participant } from '@/types/TestGroup';
    import { UserGroup } from '@/types/UserGroup';
    import { useParams, useSearchParams } from 'next/navigation';
    import { useDispatch } from 'react-redux';
    import { deleteUserGroup, addUserGroup } from '@/redux/features/userGroupSlice';
    import { AppDispatch } from '@/redux/store/store';

    const { Title, Text } = Typography;

    interface UserCardProps {
        user: UserGroup;
    }

    const UserCard: React.FC<UserCardProps> = ({ user }) => {
        const dispatch = useDispatch<AppDispatch>();
        const searchParams = useSearchParams();
        const status = searchParams.get('status') || 'PENDING';
        const pr = useParams();
        const groupId = Number(pr.id);

        const handleDelete = () => {
            dispatch(deleteUserGroup({ groupId, userId: user.id }) as any);
        };

        const handleAccept = () => {
            dispatch(addUserGroup({ groupId, emails: [user.email] }) as any);
        };

        return (
            <div className="flex flex-row justify-between items-center bg-white rounded-xl p-4" style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.03)' }}>
                {/* Left section with Avatar and Name */}
                <div className="flex items-center flex-1 sm:flex-[0_1_60%] lg:flex-[0_1_35%]">
                    <div className="flex">
                        <Badge
                            dot
                            status="success"
                            offset={[-4, 8]}
                        >
                            <Avatar
                                size={53}
                                src={user.avatar}
                                alt={user.name}
                            />
                        </Badge>

                        <div className="pl-4 self-center">
                            <Title level={5} style={{ margin: 0 }}>
                                {user.name}
                            </Title>
                            <Text type="secondary">@{user.username.toLowerCase().replace(/\s+/g, '')}</Text>
                        </div>
                    </div>
                </div>

                {/* Role */}
                <div className="hidden sm:flex sm:basis-[28%] lg:basis-[18%]">
                    <Text>{user.email}</Text>
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-2">
                    <div className="ml-auto hidden sm:block">
                        <Button
                            danger
                            type="primary"
                            size="small"
                            style={{ minWidth: 80 }}
                            onClick={handleDelete}
                        >
                            Xóa
                        </Button>
                    </div>

                    {status === 'PENDING' && (
                        <div className="ml-auto hidden sm:block">
                            <Button
                                type="primary"
                                size="small"
                                style={{ minWidth: 80 }}
                                onClick={handleAccept}
                            >
                                Đồng ý
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default UserCard;
