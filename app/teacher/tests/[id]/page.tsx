import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import EditTestForm from "./EditTestForm"
import BtnBack from "./btn-back"
import { getTestDetail } from "@/utils/testsService"

export default async function EditTestPage({ params }: { params: { id: string } }) {
  const test = await getTestDetail(params.id);
  if (test) {
    test.id = Number(params.id);
  }
  console.log(test);
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
          />
        </CardContent>
      </Card>
    </div>
  )
} 