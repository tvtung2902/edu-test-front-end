"use client"

import { useEffect, useMemo, useState } from "react"
import { fetchQuestions, deleteQuestion } from "@/redux/features/questionSlice"
import { Button, Table, Space, Modal, message, Tag, Image, Popconfirm } from "antd"
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Question } from "@/types/Question"
import { useRouter, useSearchParams } from "next/navigation"
import { RootState } from "@/redux/store/store"
import { AppDispatch } from "@/redux/store/store"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { pageSizeOfQuestionPage } from "@/const/teacher"
import FilterPopover from "./filter"

export default function QuestionList() {
  const dispatch = useDispatch<AppDispatch>()
  const { status, totalPages } = useSelector((state: RootState) => state.questions)
  const router = useRouter()
  const questions = useSelector((state: RootState) => state.questions.questions)

  const searchParams = useSearchParams();
  const pageNo = Number(searchParams.get('page-no')) || 0;
  const content = searchParams.get('content') || '';
  const categoryIds = useMemo(() => {
    const raw = searchParams.get('categoryIds');
    return raw ? raw.split(',').map(Number) : [];
  }, [searchParams]);

  useEffect(() => {
    console.log("content", content);
    console.log("categoryIds", categoryIds);
    console.log("pageNo", pageNo);
    dispatch(fetchQuestions({ content, categoryIds, pageNo }) as any);
  }, [content, pageNo, categoryIds]);

  const handleConfirmDelete = async (id: number) => {
    if (id) {
      try {
        await dispatch(deleteQuestion(id) as any);
      } catch (error) {
        console.error("Failed to delete question:", error);
      }
    }
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (image: string) => (
        image ? (
          <Image 
            src={image} 
            alt="Question image" 
            width={100}
            height={50}
            style={{
              objectFit: 'cover',
            }}
            fallback="/placeholder.svg"
          />
        ) : (
          <Image 
            width={100}
            height={50}
            style={{
              objectFit: 'cover',
            }}
            alt="No image"
            src="/placeholder.svg"
          />
        )
      ),
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: '40%',
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: 'Loại câu hỏi',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories: any[]) => (
        <Space>
          {categories?.map((category) => (
            <Tag key={category.id} color="blue">
              {category.name}
            </Tag>
          ))}
        </Space>
      ),
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
      render: (_: any, record: Question) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/teacher/questions/${record.id}`)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => router.push(`/teacher/questions/${record.id}/edit`)}
          />
          <Popconfirm
            placement="topRight"
            title="Xóa câu hỏi"
            description="Bạn có chắc chắn muốn xóa câu hỏi này?"
            onConfirm={() => handleConfirmDelete(record.id)}
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
    <div style={{
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      borderRadius: 10,
      padding: 20,
    }}>
      <Table
        columns={columns}
        dataSource={questions}
        rowKey="id"
        loading={status === "fetch loading"}
        pagination={{
          current: pageNo,
          pageSize: pageSizeOfQuestionPage,
          showSizeChanger: false,
          total: totalPages * pageSizeOfQuestionPage,
        }}
        onChange={(pagination) => {
          router.push(
            `/teacher/questions?page-no=${pagination.current}&content=${content}&categoryIds=${categoryIds.join(",")}`
          );
        }}
      />
    </div>
  )
} 