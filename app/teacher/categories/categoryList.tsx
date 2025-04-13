'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteCategory, fetchCategories, updateCategory } from '@/redux/features/categorySlice';
import CategoryItem from './categoryItem';
import { useSearchParams } from 'next/navigation';
import { message } from 'antd';
import Category from '@/types/Category';
export default function CategoryList() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector((state: RootState) => state.categories);

  const searchParams = useSearchParams();
  const pageNo = Number(searchParams.get('page-no')) || 1;
  const search = searchParams.get('name') || "";
  useEffect(() => {
    dispatch(fetchCategories({ search, pageNo }) as any);
  }, [dispatch]);

  const handleDeleteCategory = async (id: number) => {
    await dispatch(deleteCategory(id) as any);
    if (status === 'succeeded') {
      await dispatch(fetchCategories({ search, pageNo }) as any);
      await messageApi.success('Xóa danh mục thành công');
    } else if (status === 'failed') {
      await messageApi.error('Xóa danh mục thất bại');
    }
  }

  if (status === 'loading') {
    return <TableRow><TableCell colSpan={4}>Loading categories...</TableCell></TableRow>;
  }

  if (status === 'failed') {
    return <TableRow><TableCell colSpan={4}>Error: {error}</TableCell></TableRow>;
  }

  if (!categories?.length) {
    return <TableRow><TableCell colSpan={4}>No categories found</TableCell></TableRow>;
  }

  return (
    <>
    {contextHolder}
      {categories.map((category) => (
          <CategoryItem key={category.id} category={category} handleDelete={handleDeleteCategory} />
      ))}
    </>
  );
}