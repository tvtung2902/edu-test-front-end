'use client'

import { QuestionInTest } from "@/types/Question";
import { Card, Typography, Radio, Checkbox, Space, Image, Divider } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;

type PreviewPageProps = {
    testName: string;
    questions: QuestionInTest[];
}

export default function PreviewPage({ testName, questions }: PreviewPageProps) {
    const hasMultipleCorrectAnswers = (options: any[]) => {
        return options.filter(opt => opt.isCorrect).length > 1;
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
            <style jsx global>{`
                .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: #52c41a !important;
                    border-color: #52c41a !important;
                }
                .ant-radio-checked .ant-radio-inner {
                    background-color: #52c41a !important;
                    border-color: #52c41a !important;
                }
            `}</style>
            <Card>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={2}>{testName}</Title>
                </div>

                <div>
                    {questions.map((question, qIndex) => (
                        <div key={question.id} style={{ marginBottom: 32 }}>
                            <div style={{ marginBottom: 16 }}>
                                <Text strong>{`Câu ${qIndex + 1}: `}</Text>
                                <Text>{question.content}</Text>
                            </div>

                            {question.image && (
                                <Image
                                    src={question.image}
                                    alt={`Hình ảnh câu ${qIndex + 1}`}
                                    style={{
                                        maxHeight: 300,
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: '0 auto 16px'
                                    }}
                                    fallback="/placeholder.svg"
                                />
                            )}

                            {hasMultipleCorrectAnswers(question.options) ? (
                                <Checkbox.Group
                                    value={question.options.filter(opt => opt.isCorrect).map(opt => opt.id)}
                                    style={{ width: '100%' }}
                                    disabled
                                >
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        {question.options.map((option, oIndex) => (
                                            <div key={option.id} style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 8,
                                                padding: '8px 0'
                                            }}>

                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                                                        <Checkbox
                                                            value={option.id}
                                                        />
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8
                                                        }}>
                                                            <Text>{`${String.fromCharCode(65 + oIndex)}. `}</Text>
                                                            <Text>{option.content}</Text>
                                                        </div>
                                                    </div>
                                                    {option.image && (
                                                        <Image
                                                            src={option.image}
                                                            alt={`Hình ảnh đáp án ${String.fromCharCode(65 + oIndex)}`}
                                                            style={{
                                                                maxHeight: 150,
                                                                objectFit: 'contain',
                                                                display: 'block',
                                                                margin: '8px auto 0'
                                                            }}
                                                            fallback="/placeholder.svg"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </Space>
                                </Checkbox.Group>
                            ) : (
                                <Radio.Group
                                    value={question.options.find(opt => opt.isCorrect)?.id}
                                    style={{ width: '100%' }}
                                    disabled
                                >
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        {question.options.map((option, oIndex) => (
                                            <div key={option.id} style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 8,
                                                padding: '8px 0'
                                            }}>

                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                                                        <Radio
                                                            value={option.id}
                                                        />
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8
                                                        }}>
                                                            <Text>{`${String.fromCharCode(65 + oIndex)}. `}</Text>
                                                            <Text>{option.content}</Text>
                                                        </div>
                                                    </div>
                                                    {option.image && (
                                                        <Image
                                                            src={option.image}
                                                            alt={`Hình ảnh đáp án ${String.fromCharCode(65 + oIndex)}`}
                                                            style={{
                                                                maxHeight: 150,
                                                                objectFit: 'contain',
                                                                display: 'block',
                                                                margin: '8px auto 0'
                                                            }}
                                                            fallback="/placeholder.svg"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            )}

                            {qIndex < questions.length - 1 && (
                                <Divider style={{ margin: '24px 0' }} />
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
