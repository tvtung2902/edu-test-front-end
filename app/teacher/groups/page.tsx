"use client";

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGroups } from "@/redux/features/groupSlice"
import { pageSizeOfTestPage } from "@/const/teacher"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import GroupList from "./GroupList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Modal } from "antd"
import GroupForm from "./GroupForm"

export default function GroupsPage() {
  const dispatch = useDispatch();
  const { groups, status, error, totalPages } = useSelector((state: any) => state.groups);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGroups({ 
      search,
      pageNo: currentPage,
    }));
  }, [dispatch, search, currentPage, ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    setCurrentPage(1);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (status.includes('failed')) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error || 'Đã có lỗi xảy ra khi tải danh sách nhóm'}
        </AlertDescription>
      </Alert>
    );
  }

  const renderGroupCards = () => {
    if (status === 'fetch loading' && groups.length === 0) {
      return Array(6).fill(0).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-[140px] w-full" />
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Skeleton className="h-3 w-24" />
          </CardFooter>
        </Card>
      ));
    }

    return <GroupList groups={groups} currentTab={currentTab} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={showModal}>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>
  
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Groups</TabsTrigger>
            <TabsTrigger value="publish">Active</TabsTrigger>
            <TabsTrigger value="draft">Archived</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={search}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <TabsContent value={currentTab} className="mt-6">
          {renderGroupCards()}
        </TabsContent>
      </Tabs>

      <Modal
        title="Create New Group"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <GroupForm />
      </Modal>
    </div>
  );
}
