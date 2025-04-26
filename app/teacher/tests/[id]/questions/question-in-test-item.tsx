"use client"

import { Card, Button, Space, Tag, Collapse, Image, Popconfirm, message } from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Question, QuestionInTest } from "@/types/Question"

type QuestionItemProps = {
    question: QuestionInTest
    index: number
    onEdit: (question: QuestionInTest) => void
    onDelete: () => void
    onMove: (dragIndex: number, hoverIndex: number) => void
}

export default function QuestionItem({ question, index, onEdit, onDelete }: QuestionItemProps) {
    const handleEdit = () => {
        onEdit(question);
        const questionFormSection = document.querySelector('[data-section="question-form"]');
        if (questionFormSection) {
            const yOffset = -100;
            const y = questionFormSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };

    const handleDelete = () => {
        onDelete();
        message.success('Đã xóa câu hỏi');
    };

    const items = [{
        key: '1',
        label: (
            <div className="flex items-center justify-between" style={{ width: '100%' }}>
                <Space>
                    <span>{question.orderNumber}. {question.content}</span>
                    <Space>
                        {question.categories?.map((category) => (
                            <Tag key={category.id} color="cyan">
                                {category.name}
                            </Tag>
                        ))}
                    </Space>
                </Space>
            </div>
        ),
        children: (
            <div>
                {question.image && (
                    <div style={{ 
                        border: '1px solid #f0f0f0', 
                        borderRadius: 8, 
                        padding: 8, 
                        maxWidth: 400, 
                        marginBottom: 16,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            src={question.image || "/placeholder.svg"}
                            alt="Question image"
                            style={{ 
                                maxHeight: 200, 
                                objectFit: 'contain',
                                display: 'block',
                                margin: '0 auto'
                            }}
                            fallback="/placeholder.svg?height=200&width=300"
                        />
                    </div>
                )}

                <Space direction="vertical" style={{ width: '100%' }}>
                    {question?.options?.map((option, i) => (
                        <div key={option.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            <div style={{ 
                                width: 20, 
                                height: 20, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backgroundColor: option.isCorrect ? '#f6ffed' : '#f5f5f5',
                                color: option.isCorrect ? '#52c41a' : '#595959',
                                border: option.isCorrect ? '1px solid #b7eb8f' : 'none',
                                borderRadius: '50%',
                                fontSize: 12
                            }}>
                                {String.fromCharCode(65 + i)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <span>{option.content}</span>
                                {option.image && (
                                    <div style={{ 
                                        marginTop: 8, 
                                        border: '1px solid #f0f0f0', 
                                        borderRadius: 8, 
                                        padding: 8, 
                                        maxWidth: 200,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image
                                            src={option.image || "/placeholder.svg"}
                                            alt={`Option ${String.fromCharCode(65 + i)} image`}
                                            style={{ 
                                                maxHeight: 100, 
                                                objectFit: 'contain',
                                                display: 'block',
                                                margin: '0 auto'
                                            }}
                                            fallback="/placeholder.svg?height=100&width=150"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </Space>
            </div>
        ),
    }];

    return (
        <Card 
            style={{ 
                marginBottom: 12
            }}
            bodyStyle={{ padding: 16 }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                    <Collapse 
                        items={items}
                        bordered={false}
                        expandIcon={({ isActive }) => null}
                        style={{ background: 'transparent' }}
                    />
                </div>
                <Space>
                    <Button 
                        type="text" 
                        icon={<EditOutlined />} 
                        onClick={handleEdit}
                    />
                    <Popconfirm
                        placement="topRight"
                        title="Xóa câu hỏi"
                        description="Bạn có chắc chắn muốn xóa câu hỏi này?"
                        onConfirm={handleDelete}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button 
                            type="text" 
                            icon={<DeleteOutlined />} 
                            danger
                        />
                    </Popconfirm>
                </Space>
            </div>
        </Card>
    )
}  