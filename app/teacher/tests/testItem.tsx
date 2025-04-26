import { Card, Dropdown, Menu, Button, Tag } from "antd";
import {
    EllipsisOutlined,
    EditOutlined,
    ShareAltOutlined,
    FolderAddOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import { ListChecks, Timer, AlignLeft, CalendarClock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Test } from "@/types/Test";

interface TestItemProps {
    test: Test;
    onDelete: () => void;
}

export default function TestItem({ test, onDelete }: TestItemProps) {
    const menu = (
        <Menu>
            <Menu.Item key="edit" icon={<EditOutlined style={{ color: "#1890ff" }} />}>
                <Link href={`/teacher/tests/${test.id}`}>Chỉnh sửa</Link>
            </Menu.Item>
            <Menu.Item key="share" icon={<ShareAltOutlined style={{ color: "#52c41a" }} />}>
                Chia sẻ
            </Menu.Item>
            <Menu.Item key="add" icon={<FolderAddOutlined style={{ color: "#faad14" }} />}>
                Thêm vào nhóm
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                key="delete"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                    e.domEvent.stopPropagation();
                    onDelete();
                }}
            >
                Xóa đề thi
            </Menu.Item>
        </Menu>
    );

    return (
        <Card
            hoverable
            className="transition-all duration-200 shadow-md rounded-xl"
            cover={
                <div className="relative h-36 overflow-hidden rounded-t-xl">
                    <Image
                        src={test.image || "/placeholder.svg"}
                        alt={test.name}
                        fill
                        className="object-cover"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                    <Tag
                        color={test.isPublic ? "green" : "orange"}
                        style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
                    >
                        {test.isPublic ? "Công khai" : "Không công khai"}
                    </Tag>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                    <Link href={`/teacher/tests/${test.id}/questions`} className="block flex-1 min-w-0">
                        <div className="font-semibold text-base truncate mb-1 hover:text-blue-600 transition">
                            {test.name}
                        </div>
                    </Link>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 20 }} />} />
                    </Dropdown>
                </div>
                <div className="flex items-center text-gray-500 mb-2 text-sm gap-2">
                    <AlignLeft className="w-4 h-4 text-blue-400" />
                    <span className="line-clamp-2">{test.description}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <ListChecks className="w-4 h-4 text-blue-500" />
                        <span>{test.numberOfQuestions} câu hỏi</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4 text-green-500" />
                        <span>{test.duration} phút</span>
                    </div>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                    <CalendarClock className="w-4 h-4 text-gray-400" />
                    <span>Tạo lúc {test.createdAt}</span>
                </div>
                <Link href={`/teacher/tests/${test.id}/questions`}>
                    <Button type="primary" block className="mt-2">
                        Vào đề thi
                    </Button>
                </Link>
            </div>
        </Card>
    );
}
