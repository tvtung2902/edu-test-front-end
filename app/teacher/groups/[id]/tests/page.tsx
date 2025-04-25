'use client'
import React, { useEffect, useState } from "react";
import { List, Avatar, Tag, Button, Card, Space, Typography, Badge, Modal, Input, Form, Divider } from 'antd';
import { FileTextOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TestCard from "../test-card";
import TestSearch from "../test-search";
import ViewToggleTest from "../test-segmented ";
import GroupPagination from "../pagination";
import type { TestGroupWithStatus, TestStatus } from "@/types/TestGroup";
import { Group } from "@/types/Group";
import { fetchTestGroups } from "@/redux/features/testGroupSlice";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "@/redux/features/groupSlice";
import { useParams, useSearchParams } from "next/navigation";
import { getGroupDetail } from "@/utils/groupsService";
import { fetchAvailableTests } from "@/utils/testsService";

const { Text } = Typography;
const { Search } = Input;

interface TestPageProps {
    params: {
        id: string;
      };
}

export default function TestPage() {
    const [group, setGroup] = useState<Group | null>(null);
    const {testGroups, totalPages} = useSelector((state: RootState) => state.testGroups);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();

    const handleOk = () => {
        console.log('Adding tests:', selectedItems);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedItems([]);
        setSearchText('');
        form.resetFields();
    };

    const handleSelect = (id: number) => {
        setSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };


    const searchParams = useSearchParams();
    const pageNo = Number(searchParams.get('page-no')) || 1;
    const search = searchParams.get('name') || "";  
    const status = searchParams.get('status') || null;
    
    const pr = useParams();
    const groupId = Number(pr.id);
    
    const getGroup = async () => {
        const group = await getGroupDetail(groupId);
        setGroup(group);
    }

    useEffect(() => {
        console.log("groupId", groupId);
        const obj: { search: string; pageNo: number; status?: TestStatus } = {
            search,
            pageNo,
        }
        if (status && status !== 'all') {
            obj.status = status as TestStatus;
        }
        dispatch(fetchTestGroups({ groupId: groupId, ...obj }) as any);
        getGroup();
    }, [pageNo, search, status]);

    useEffect(() => {
        getGroup();
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
                <TestSearch />
                <ViewToggleTest />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testGroups.map((item) => (
                    <TestCard
                        key={item.id}
                        testGroup={item}
                        group={group}
                    />
                ))}
            </div>
            <div className="flex flex-row justify-end">
                <GroupPagination totalPages={totalPages} />
            </div>
        </div>
    );
};