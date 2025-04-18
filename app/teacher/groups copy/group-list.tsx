'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FileQuestion, MoreHorizontal, Share2, Users } from "lucide-react"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { deleteGroup, fetchGroups } from "@/redux/features/groupSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { Modal } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { useEffect, useState } from "react"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import GroupItem from "./group-item"

const GroupList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { groups } = useSelector((state: RootState) => state.groups);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const pageNo = Number(searchParams.get('page-no')) || 1;
  const search = searchParams.get('name') || "";

  useEffect(() => {
    dispatch(fetchGroups({ search, pageNo }) as any);
  }, [dispatch, search, pageNo]);

  const handleDelete = (id: number) => {
    setGroupToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (groupToDelete) {
      dispatch(deleteGroup(groupToDelete));
      setGroupToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setGroupToDelete(null);
  };

  const handleEdit = (id: number) => {
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-2 text-red-500">
            <ExclamationCircleOutlined />
            <span>Xác nhận xóa</span>
          </div>
        }
        open={groupToDelete !== null}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{
          danger: true,
        }}
      >
        <p>Bạn có chắc chắn muốn xóa nhóm này?</p>
      </Modal>
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))}
    </>
  );
};

export default GroupList; 