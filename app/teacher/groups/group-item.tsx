'use client'
import { Card, Dropdown, Menu, Button } from "antd"
import { EllipsisOutlined, EditOutlined, LinkOutlined, UserAddOutlined, FileDoneOutlined, DeleteOutlined } from "@ant-design/icons"
import { Users, FileText, AlignLeft, CalendarClock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Group } from "@/types/Group"

interface GroupItemProps {
  group: Group;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export default function GroupItem({ group, handleEdit, handleDelete }: GroupItemProps) {
  const menu = (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined style={{ color: "#1890ff" }} />} onClick={() => handleEdit(group.id)}>
        Chỉnh sửa nhóm
      </Menu.Item>
      <Menu.Item key="share" icon={<LinkOutlined style={{ color: "#52c41a" }} />}>
        Chia sẻ link mời
      </Menu.Item>
      <Menu.Item key="members" icon={<UserAddOutlined style={{ color: "#faad14" }} />}>
        Quản lý thành viên
      </Menu.Item>
      <Menu.Item key="assign" icon={<FileDoneOutlined style={{ color: "#722ed1" }} />}>
        Giao bài kiểm tra
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" danger icon={<DeleteOutlined />} onClick={() => handleDelete(group.id)}>
        Xóa nhóm
      </Menu.Item>
    </Menu>
  );

  return (
    <Card hoverable className="overflow-hidden transition-all duration-200 shadow-md rounded-xl flex flex-col justify-between h-full" bodyStyle={{ padding: 0 }}>
      <div>
        <div className="relative h-[170px] w-full overflow-hidden bg-muted">
          <Image src={group.image || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-bold text-white">{group.name}</h3>
          </div>
        </div>
        <div className="px-4 pt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm flex-1 min-w-0">
              <AlignLeft className="w-4 h-4 text-blue-400" />
              <span className="line-clamp-2">{group.description}</span>
            </div>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 20 }} />} />
            </Dropdown>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{group.numberOfMembers} thành viên</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-green-500" />
              <span>{group.numberOfTests} bài kiểm tra</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
            <CalendarClock className="w-4 h-4 text-gray-400" />
            <span>Tạo lúc {group.createdAt}</span>
          </div>
          <div className="pb-4 pt-2">
            <Link href={`/teacher/groups/${group.id}/tests`}>
              <Button type="primary" block>
                Vào nhóm
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </Card>
  )
}

