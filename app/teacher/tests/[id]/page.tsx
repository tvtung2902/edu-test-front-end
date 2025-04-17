import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import EditTestForm from "./EditTestForm"
import BtnBack from "./btn-back"
import { Test } from "@/types/Test"
import { get, put } from "@/utils/request"
import { ApiGetResponse, ApiResponse } from "@/types/ApiResponse"
import { redirect } from "next/navigation"
import { getTestDetail } from "@/utils/testsService"

export default async function EditTestPage({ params }: { params: { id: string } }) {
  const test = await getTestDetail(params.id);
  console.log("test", test);
  // if (testResponse.status !== 200) {
  //   redirect("/teacher/tests");
  // }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    try {
      await put<ApiResponse>(`tests/${params.id}`, formData);
      redirect("/teacher/tests");
    } catch (error) {
      console.error("Failed to update test:", error);
      redirect("/teacher/tests");
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Test</h1>
        </div>
        <BtnBack />
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Test Information</CardTitle>
        </CardHeader>
        <CardContent>
          <EditTestForm 
            test={test}
            onSubmit={handleSubmit} 
            isSubmitting={false} 
          />
        </CardContent>
      </Card>
    </div>
  )
} 