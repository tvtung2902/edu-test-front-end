"use client"

import EditTestForm from "./EditTestForm"
import BtnBack from "./btn-back"
import { getTestDetail } from "@/utils/testsService"
import AddTestForm from "../create/TestFormCreate"
import { Breadcrumb, Card } from "antd"
import { Test } from "@/types/Test"

export default function ContentPage({ test }: { test: Test }) {
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
              <EditTestForm test={test} />
            </div>
          </Card>
        </div>
      )
}
