'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteCategory, fetchCategories, startUpdateCategory, updateCategory } from '@/redux/features/categorySlice';
import { message, Modal } from 'antd';
import { useSearchParams } from 'next/navigation';
import Category from '@/types/Category';
import CategoryItem from './categoryItem';
import ModalEdit from './modalEdit';
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default function CategoryList() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector((state: RootState) => state.categories);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const pageNo = Number(searchParams.get('page-no')) || 1;
  const search = searchParams.get('name') || "";

  const showStatus = () => {
    switch (status) {
      case 'add succeeded':
        messageApi.destroy();
        messageApi.success("Thêm danh mục thành công");
        if (categories.length === 1) {
          dispatch(fetchCategories({ search, pageNo: pageNo - 1 }) as any);
        } else {
          dispatch(fetchCategories({ search, pageNo }) as any);
        }
        break;
      case 'delete succeeded':
        messageApi.destroy();
        messageApi.success("Xóa danh mục thành công!");
        if (categories.length === 1) {
          dispatch(fetchCategories({ search, pageNo: pageNo - 1 }) as any);
        } else {
          dispatch(fetchCategories({ search, pageNo }) as any);
        }
        break;
      case 'update succeeded':
        messageApi.destroy();
        messageApi.success('Sửa danh mục thành công');
        break;
      case 'add failed':
        messageApi.destroy();
        messageApi.error('Thêm danh mục thất bại');
        break;
      case 'update failed':
        messageApi.destroy();
        messageApi.error('Sửa danh mục thất bại');
        break;
      case 'delete failed':
        messageApi.destroy();
        messageApi.error('Xóa danh mục thất bại');
        break;
      case 'add loading':
        messageApi.open({
          type: 'loading',
          content: 'Đang thêm danh mục',
          duration: 0,
        });
        break;
      case 'update loading':
        messageApi.open({
          type: 'loading',
          content: 'Đang sửa danh mục',
          duration: 0,
        });
        break;
      case 'delete loading':
        messageApi.open({
          type: 'loading',
          content: 'Đang xóa danh mục',
          duration: 0,
        });
        break;
    }
  }

  useEffect(() => {
    showStatus();
  }, [status]);

  useEffect(() => {
    dispatch(fetchCategories({ search, pageNo }) as any);
  }, [dispatch, search, pageNo]);

  const handleOpenModalEdit = useCallback((id: number) => {
    dispatch(startUpdateCategory(id));
    setOpenModalEdit(true);
  }, [dispatch]);

  const handleDeleteCategory = useCallback(async (id: number) => {
    await dispatch(deleteCategory(id) as any);
  }, []);

  const handleUpdateCategory = useCallback(async (category: Category): Promise<void> => {
    await dispatch(updateCategory(category) as any);
  }, []);

  const showDeleteConfirm = useCallback((id: number) => {
    setCategoryToDelete(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (categoryToDelete) {
      handleDeleteCategory(categoryToDelete);
      setCategoryToDelete(null);
    }
  }, [categoryToDelete, handleDeleteCategory]);

  const handleCancelDelete = useCallback(() => {
    setCategoryToDelete(null);
  }, []);

  const handleCloseModalEdit = useCallback(() => {
    setOpenModalEdit(false);
  }, []);

  return (
    <>
      {contextHolder}
      {status === 'fetch loading' ? (
        <TableRow>
          <TableCell colSpan={4}>Loading...</TableCell>
        </TableRow>
      ) : 
      status === 'fetch failed' ? (
        <TableRow>
          <TableCell colSpan={4}>Lỗi: {error}</TableCell>
        </TableRow>
      ) :
      categories.length === 0 ? (
        <TableRow>
          <TableCell colSpan={4}>Không có danh mục nào!</TableCell>
        </TableRow>
      ) : (
        <>
          <ModalEdit
            closeModalEdit={handleCloseModalEdit}
            openModalEdit={openModalEdit}
            handleUpdateCategory={handleUpdateCategory}
          />
          <Modal
            title={
              <div className="flex items-center gap-2 text-red-500">
                <ExclamationCircleOutlined />
                <span>Xác nhận xóa</span>
              </div>
            }
            open={categoryToDelete !== null}
            onOk={handleConfirmDelete}
            onCancel={handleCancelDelete}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <p>Bạn có chắc chắn muốn xóa danh mục này không?</p>
          </Modal>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              handleDelete={showDeleteConfirm}
              handleOpenModalEdit={handleOpenModalEdit}
            />
          ))}
        </>
      )}
    </>
  );
  
}