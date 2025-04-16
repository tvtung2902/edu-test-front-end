import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CategoryList from "./categoryList"
import CategorySearch from "./categorySearch"
import CategoryPagination from "./categoryPagination"
import ModalAdd from "./modalAdd"
import { Breadcrumb } from "@/components/breadcrumb"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lí danh mục câu hỏi</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModalAdd />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3" />
        <CardContent>
          <div className="flex items-center justify-between pb-4">
            <div className="relative">
              <CategorySearch />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Câu hỏi</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <CategoryList />
              </TableBody>
            </Table>
          </div>
          <div className="pt-4 flex justify-end">
            <CategoryPagination />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
