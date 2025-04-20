'use client'
import { useDispatch } from "react-redux"
import { deleteGroup, fetchGroupDetail, fetchGroups } from "@/redux/features/groupSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { Modal } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { useEffect, useState } from "react"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import GroupItem from "./group-item"
import GroupForm from "./group-form"
import { Group } from "@/types/Group"

const GroupList = () => {
  const dispatch = useDispatch();
  const { groups, groupEdit } = useSelector((state: RootState) => state.groups);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleEdit = async (id: number) => {
    dispatch(fetchGroupDetail(id) as any);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (groupEdit) {
      setIsEditModalOpen(true);
    }
  }, [groupEdit]);

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
      {groupEdit && (
        <Modal
          title="Chỉnh sửa nhóm"
          open={isEditModalOpen}
          onCancel={handleCancelEdit}
          footer={null}
          width={600}
        >
          <GroupForm
            initialValues={groupEdit}
            isEdit
            handleCloseModal={handleCancelEdit}
          />
        </Modal>
      )}

      {groups.map((group) => (
        <GroupItem
          key={group.id}
          group={group}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default GroupList; 