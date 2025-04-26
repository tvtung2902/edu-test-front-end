'use client'
import { Card, Button, Modal } from "antd";
import { PlusOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import GroupForm from "./group-form";
import { useState } from "react";

export default function CreateGroup() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Card
                className="mt-6 border-dashed text-center shadow-box-white"
                bordered
                style={{ borderStyle: "dashed" }}
            >
                <div className="flex flex-col items-center justify-center p-6">
                    <div className="mb-4 rounded-full bg-blue-50 p-3">
                        <UsergroupAddOutlined className="text-blue-500 text-2xl" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">Tạo nhóm mới</h3>
                    <p className="mb-4 text-center text-sm text-gray-500">
                        Tạo nhóm để tổ chức học sinh và phân công bài kiểm tra dễ dàng hơn
                    </p>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                        size="middle"
                    >
                        Tạo nhóm
                    </Button>
                </div>
            </Card>
            <Modal
                title="Tạo nhóm mới"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <GroupForm handleCloseModal={handleCancel} />
            </Modal>
        </>
    );
}