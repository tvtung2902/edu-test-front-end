'use client';
import { Drawer, Table, Space, Button, Image, Tag, message } from "antd";
import { QuestionInTest } from "@/types/Question";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import QuestionSearch from "./question-search";
import FilterPopover from "./filter";
import { fetchQuestions } from "@/redux/features/questionSlice";
import { addQuestionsFromLibraryToTest } from "@/redux/features/questionTestSlice";
import { useParams } from "next/navigation";

interface QuestionLibraryProps {
    isOpen: boolean;
    onClose: () => void;
    selectedQuestions: number[];
    onSelectionChange: (selectedRowKeys: number[]) => void;
    onAddToTest: () => void;
    testId: string;
}

export default function QuestionLibrary({
    isOpen,
    onClose,
    selectedQuestions,
    onSelectionChange,
    onAddToTest,
    testId
}: QuestionLibraryProps) {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchContent, setSearchContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const { questions, totalPages, status } = useSelector((state: RootState) => state.questions);

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchQuestions({
                pageNo: currentPage - 1,
                pageSize,
                content: searchContent,
                categoryIds: selectedCategories.map(Number),
                testUnAssignedId: parseInt(params.id as string) || null
            }) as any);
        }
    }, [isOpen, currentPage, pageSize, searchContent, selectedCategories, dispatch]);

    const handleSearch = (content: string) => {
        setSearchContent(content);
        setCurrentPage(1);
    };

    const handleFilterChange = (categories: string[]) => {
        setSelectedCategories(categories);
        setCurrentPage(1);
    };

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleAddToTest = async () => {
        if (selectedQuestions.length === 0) {
            message.warning('Vui lòng chọn ít nhất một câu hỏi');
            return;
        }

        try {
            await dispatch(addQuestionsFromLibraryToTest({
                testId: parseInt(params.id as string),
                request: {
                    questionIds: selectedQuestions
                }
            }) as any);
            message.success('Đã thêm câu hỏi vào đề thi');
            onAddToTest();
            onClose();
        } catch (error) {
            message.error('Có lỗi xảy ra khi thêm câu hỏi');
        }
    };

    const columns = [
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: '40%',
            render: (text: string) => <div>{text}</div>,
        },
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
                        style={{ objectFit: 'cover' }}
                        fallback="/placeholder.svg"
                    />
                ) : (
                    <Image
                        width={100}
                        height={50}
                        style={{ objectFit: 'cover' }}
                        alt="No image"
                        src="/placeholder.svg"
                    />
                )
            ),
        },
        {
            title: 'Loại câu hỏi',
            dataIndex: 'categories',
            key: 'categories',
            render: (categories: any[]) => (
                <Space>
                    {categories?.map((category) => (
                        <Tag key={category.id} color="cyan">
                            {category.name}
                        </Tag>
                    ))}
                </Space>
            ),
        }
    ];

    return (
        <Drawer
            title="Thư viện câu hỏi"
            placement="right"
            width={720}
            open={isOpen}
            onClose={onClose}
            extra={
                <Space>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button type="primary" onClick={handleAddToTest}>Thêm vào đề thi</Button>
                </Space>
            }
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <QuestionSearch onSearch={handleSearch} />
                    <FilterPopover onFilterChange={handleFilterChange} />
                </div>
                <Table
                    columns={columns}
                    dataSource={questions}
                    rowKey="id"
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: selectedQuestions,
                        onChange: (selectedRowKeys) => onSelectionChange(selectedRowKeys as number[])
                    }}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalPages * pageSize,
                        showSizeChanger: false,
                    }}
                    onChange={handleTableChange}
                    loading={status === 'fetch loading'}
                    scroll={{ y: 500 }}
                />
            </div>
        </Drawer>
    );
}
