"use client"

import { QuestionInTest } from "@/types/Question"
import QuestionItem from "./question-in-test-item"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

type QuestionListProps = {
  questions: QuestionInTest[]
  onEdit: (question: QuestionInTest) => void
  onDelete: (question: QuestionInTest) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
  isSorting?: boolean
}

export function QuestionList({ questions, onEdit, onDelete, onMove, isSorting }: QuestionListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    if (result.source.index !== result.destination.index) {
      onMove(result.source.index, result.destination.index);
    }
  };

  if (!isSorting) {
    // Giao diện bình thường
    return (
      <div>
        {questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            onEdit={onEdit}
            onDelete={() => onDelete(question)}
            onMove={onMove}
          />
        ))}
      </div>
    );
  }

  // Giao diện kéo thả khi sort
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="question-list" direction="vertical">
        {(provided: any) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {questions.map((question, index) => (
              <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                {(provided: any, snapshot: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      background: snapshot.isDragging
                        ? '#90ee90'
                        : '#e3f2fd',
                      transition: 'background 0.2s',
                      marginBottom: 12,
                      borderRadius: 12,
                      boxShadow: snapshot.isDragging ? '0 4px 16px rgba(0,0,0,0.10)' : undefined,
                      padding: 16,
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>
                      <span style={{ marginRight: 8 }}>≡ Câu {index + 1}:</span>
                    </div>
                    <div>{question.content}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}