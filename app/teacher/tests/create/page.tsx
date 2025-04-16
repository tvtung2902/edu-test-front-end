"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Breadcrumb } from "@/components/breadcrumb"
import AddTestForm from "./TestFormCreate"

// Sample categories
const categories = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "English" },
  { id: 4, name: "History" },
  { id: 5, name: "Computer Science" },
  { id: 6, name: "Geography" },
]

export default function CreateTestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Creating test:", data)
    setIsSubmitting(false)
    router.push("/teacher/tests/1/questions") // Redirect to add questions
  }

  return (
    <div className="container mx-auto space-y-6 ">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tạo bài thi</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Thông tin bài thi</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTestForm />
        </CardContent>
      </Card>
    </div>
  )
}
