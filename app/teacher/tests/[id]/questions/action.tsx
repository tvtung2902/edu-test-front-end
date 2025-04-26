'use client'
// File: Questions.tsx
import { Card, Radio, Button, Space, Drawer, message, Modal, Table, Tag, Image } from "antd";
import { useState, useRef, useEffect } from "react";
import { PlusOutlined, UploadOutlined, AppstoreOutlined, DatabaseOutlined, RobotOutlined, EyeOutlined, FilePdfOutlined, BarsOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PreviewPage from "./preview/page";
import { QuestionInTest } from "@/types/Question";
import QuestionLibrary from "./library";
import { fetchQuestions } from "@/redux/features/questionSlice";

interface QuestionsActionProps {
    testId: string;
    setQuestionEdit: (questionEdit: QuestionInTest | null) => void;
    onStartSort: () => void;
    isSorting: boolean;
}

export default function QuestionsAction({
    testId,
    setQuestionEdit,
    onStartSort,
    isSorting
}: QuestionsActionProps) {
    const dispatch = useDispatch();
    
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
    const { questions } = useSelector((state: RootState) => state.questionTest);

    const handlePreview = () => {
        setIsPreviewOpen(true);
    };

    const handleExportPDF = async () => {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.style.padding = '20px';
            tempDiv.style.backgroundColor = 'white';
            
            const title = document.createElement('h1');
            title.textContent = 'Bài kiểm tra';
            title.style.textAlign = 'center';
            title.style.marginBottom = '20px';
            tempDiv.appendChild(title);

            for (const [index, question] of questions.entries()) {
                const questionDiv = document.createElement('div');
                questionDiv.style.marginBottom = '20px';
                
                const questionContent = document.createElement('p');
                questionContent.innerHTML = `<strong>Câu ${index + 1}:</strong> ${question.content}`;
                questionDiv.appendChild(questionContent);

                // Add question image if exists
                if (question.image) {
                    const img = document.createElement('img');
                    img.src = question.image;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '300px';
                    img.style.margin = '10px 0';
                    img.style.display = 'block';
                    questionDiv.appendChild(img);
                }

                const optionsList = document.createElement('div');
                optionsList.style.marginLeft = '20px';
                
                for (const [optIndex, option] of question.options.entries()) {
                    const optionDiv = document.createElement('div');
                    optionDiv.style.marginBottom = '10px';
                    
                    const optionContent = document.createElement('p');
                    optionContent.innerHTML = `${String.fromCharCode(65 + optIndex)}. ${option.content}`;
                    optionDiv.appendChild(optionContent);

                    // Add option image if exists
                    if (option.image) {
                        const img = document.createElement('img');
                        img.src = option.image;
                        img.style.maxWidth = '200px';
                        img.style.maxHeight = '150px';
                        img.style.margin = '5px 0';
                        img.style.display = 'block';
                        optionDiv.appendChild(img);
                    }

                    optionsList.appendChild(optionDiv);
                }
                questionDiv.appendChild(optionsList);
                tempDiv.appendChild(questionDiv);
            }

            document.body.appendChild(tempDiv);

            const canvas = await html2canvas(tempDiv, {
                useCORS: true,
                logging: false,
                allowTaint: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('bai-kiem-tra.pdf');

            document.body.removeChild(tempDiv);
            message.success('Đã tải xuống file PDF');
        } catch (error) {
            console.error('PDF export error:', error);
            message.error('Có lỗi khi tạo PDF');
        }
    };

    const handleOpenLibrary = () => {
        dispatch(fetchQuestions({}) as any);
        setIsLibraryOpen(true);
    };

    const handleSort = () => {
        const questionListSection = document.querySelector('[data-section="question-list"]');
        if (questionListSection) {
            const yOffset = -100;
            const y = questionListSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }

        if (isSorting) {
            message.warning('Đang trong chế độ sắp xếp');
            return;
        }
    
        onStartSort();
    };

    const handleAddQuestion = () => {
        const questionFormSection = document.querySelector('[data-section="question-form"]');
        if (questionFormSection) {
            const yOffset = -100;
            const y = questionFormSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        } else {
            message.warning('Không tìm thấy phần thêm câu hỏi');
        }
    };

    const handleAddFromLibrary = () => {
        if (selectedQuestions.length === 0) {
            message.warning('Vui lòng chọn ít nhất một câu hỏi');
            return;
        }
        message.success('Đã thêm câu hỏi vào đề thi');
        setIsLibraryOpen(false);
        setSelectedQuestions([]);
    };

    useEffect(() => {
        dispatch(fetchQuestions({}) as any);
    }, []);

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px 24px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 12,
                    zIndex: 1000,
                    // backgroundColor: "white"
                }}
            >
                <div
                    className="flex flex-row gap-4"
                    style={{
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "12px 24px",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}>
                    <div style={{ display: "flex", gap: "24px" }}>
                        <div 
                            style={{ textAlign: "center", cursor: "pointer" }}
                            onClick={handlePreview}
                        >
                            <EyeOutlined style={{ fontSize: 24 }} />
                            <div style={{ marginTop: 4 }}>Xem trước</div>
                        </div>
                        <div 
                            style={{ textAlign: "center", cursor: "pointer" }}
                            onClick={handleExportPDF}
                        >
                            <FilePdfOutlined style={{ fontSize: 24 }} />
                            <div style={{ marginTop: 4 }}>Xuất PDF</div>
                        </div>
                        <div 
                            style={{ textAlign: "center", cursor: "pointer" }}
                            onClick={handleOpenLibrary}
                        >
                            <FolderOpenOutlined style={{ fontSize: 24 }} />
                            <div style={{ marginTop: 4 }}>Thư viện</div>
                        </div>
                        <div 
                            style={{ textAlign: "center", cursor: "pointer" }}
                            onClick={handleSort}
                        >
                            <BarsOutlined style={{ fontSize: 24 }} />
                            <div style={{ marginTop: 4 }}>Sắp xếp</div>
                        </div>
                    </div>
                    <Button 
                        className="h-full" 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={handleAddQuestion}
                    >
                        Add question
                    </Button>
                </div>
            </div>

            {/* Preview Modal */}
            <Modal
                title="Preview bài kiểm tra"
                open={isPreviewOpen}
                onCancel={() => setIsPreviewOpen(false)}
                width={1100}
                footer={null}
                style={{ top: 20 }}
                bodyStyle={{ maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}
            >
                <PreviewPage 
                    testName="Bài kiểm tra"
                    questions={questions}
                />
            </Modal>

            {/* Question Library */}
            <QuestionLibrary
                isOpen={isLibraryOpen}
                onClose={() => {
                    setIsLibraryOpen(false);
                    setSelectedQuestions([]);
                }}
                selectedQuestions={selectedQuestions}
                onSelectionChange={(selectedRowKeys) => {
                    setSelectedQuestions(selectedRowKeys as number[]);
                }}
                onAddToTest={handleAddFromLibrary}
                testId={testId}
            />
        </>
    );
}
