'use client'
import React from 'react';
import { Card, Avatar, Badge, Typography, Space, Button } from 'antd';
import { StarFilled, MoreOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UserCard = () => {
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
              src="/assets/images/avatar3.jpg"
              alt="Jannie Thompson"
            />
          </Badge>

          <div className="pl-4 self-center">
            <Title level={5} style={{ margin: 0 }}>
              Jannie Thompson
            </Title>
            <Text type="secondary">@tranvantung</Text>
          </div>
        </div>
      </div>

      {/* Role */}
      <div className="hidden sm:flex sm:basis-[28%] lg:basis-[18%]">
        <Text>jannie-thompson@gmail.com</Text>
      </div>

      {/* Buttons */}
      <div className="ml-auto hidden sm:block">
        <Button danger type="primary" size="small" style={{ minWidth: 80 }}>
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
