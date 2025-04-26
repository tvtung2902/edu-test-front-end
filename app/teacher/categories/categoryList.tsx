'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { deleteCategory, fetchCategories, startUpdateCategory, updateCategory } from '@/redux/features/categorySlice';
import { message, Table, Button, Space, Popconfirm, Tag, Avatar } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import Category from '@/types/Category';
import ModalEdit from './modalEdit';
import { EditOutlined, DeleteOutlined, EyeOutlined, BookOutlined } from '@ant-design/icons';
import { pageSizeOfCategoryPage } from '@/const/teacher';
import { BookOpen, FolderKanban } from 'lucide-react';

export default function CategoryList() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error, totalPages } = useSelector((state: RootState) => state.categories);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pageNo = Number(searchParams.get('page-no')) || 1;
  const search = searchParams.get('name') || "";

  useEffect(() => {
    dispatch(fetchCategories({ search, pageNo }) as any);
  }, [dispatch, search, pageNo]);

  const handleOpenModalEdit = useCallback((id: number) => {
    dispatch(startUpdateCategory(id));
    setOpenModalEdit(true);
  }, [dispatch]);

  const handleDeleteCategory = useCallback(async (id: number) => {
    await dispatch(deleteCategory(id) as any);
  }, [dispatch]);

  const handleUpdateCategory = useCallback(async (category: Category): Promise<void> => {
    await dispatch(updateCategory(category) as any);
    setOpenModalEdit(false);
  }, [dispatch]);

  const handleCloseModalEdit = useCallback(() => {
    setOpenModalEdit(false);
  }, []);

  const handleTableChange = (pagination: any) => {
    router.push(
      `/teacher/categories?page-no=${pagination.current}&name=${search}`
    );
  };

  const columns = [
    {
      title: 'Danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Category) => (
        <Space>
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">{text}</span>
        </Space>
      ),
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'questionCount',
      key: 'questionCount',
      render: (count: number) => <Tag color={count > 0 ? 'cyan' : 'error'}>{count}</Tag>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString("vi-VN"),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleOpenModalEdit(record.id)}
          />
          <Popconfirm
            placement="topRight"
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true, type: 'primary' }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <ModalEdit
        closeModalEdit={handleCloseModalEdit}
        openModalEdit={openModalEdit}
        handleUpdateCategory={handleUpdateCategory}
      />
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={status === "fetch loading"}
        pagination={{
          current: pageNo,
          pageSize: pageSizeOfCategoryPage,
          showSizeChanger: false,
          total: totalPages ? totalPages * pageSizeOfCategoryPage : 0,
        }}
        onChange={handleTableChange}
        className="!rounded-lg [&_.ant-table-tbody>tr:hover]:bg-blue-50"
      />
      {status === 'fetch failed' && (
        <div className="text-red-500 text-center py-4">Lỗi: {error}</div>
      )}
      {categories.length === 0 && status !== 'fetch loading' && (
        <div className="text-center py-4">Không có danh mục nào!</div>
      )}
    </div>
  );
}