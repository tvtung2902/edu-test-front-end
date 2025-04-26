import { getTestDetail } from "@/utils/testsService"
import ContentPage from "./content-page"

export default async function EditTestPage({ params }: { params: { id: string } }) {
  const test = await getTestDetail(params.id);
  if (test) {
    test.id = Number(params.id);
  }
  console.log(test);
  return (
    <ContentPage test={test} />
  )
} 