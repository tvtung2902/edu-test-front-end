'use client'
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import Link from "next/link"
import TestSearch from "./test-search"
import TestList from "./test-list"
import TestPagination from "./test-pagination"
import { useState } from "react"
import TestTabs from "./TestTabs"
export default function TestsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Quản lí đề thi</h1>
          <Link href="/teacher/tests/create">
            <Button type="primary" icon={<PlusOutlined />} size="middle">
              Tạo đề thi
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between mb-4 gap-2">
          <TestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <TestSearch />
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TestList tab={activeTab} />
        </div>
        <div className="flex justify-end">
          <TestPagination />
        </div>
      </div>
    </div>
  )
}
