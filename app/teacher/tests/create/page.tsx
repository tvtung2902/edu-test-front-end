"use client"

import { useRouter } from "next/navigation"
import { Button, Card, Breadcrumb } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import AddTestForm from "./TestFormCreate"

export default function CreateTestPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto space-y-6">
      <Breadcrumb
        items={[
          { title: "Trang chủ", href: "/teacher" },
          { title: "Quản lí đề thi", href: "/teacher/tests" },
          { title: "Tạo bài thi" },
        ]}
      />
      <Card className="mx-auto max-w-[75%] shadow-box-white">
        <Card.Meta
          title={<span className="font-semibold text-lg">Thông tin bài thi</span>}
        />
        <div className="pt-4">
          <AddTestForm />
        </div>
      </Card>
    </div>
  )
}
