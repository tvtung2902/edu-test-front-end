'use client'

import { Input } from "antd";
import { useState } from "react";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const { Search } = Input;

interface QuestionSearchProps {
    onSearch: (content: string) => void;
}

export default function QuestionSearch({ onSearch }: QuestionSearchProps) {
    const [search, setSearch] = useState('');
    const { status } = useSelector((state: RootState) => state.questions);

    const handleSearch = (value: string) => {
        setSearch(value);
        onSearch(value);
    };

    return (
        <div>
            <Search 
                placeholder="Nhập nội dung câu hỏi..." 
                onSearch={handleSearch} 
                enterButton 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={status === 'fetch loading'}
            />
        </div>
    );
} 