import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, ChevronLeft, ChevronRight, MoreHorizontal, Plus } from "lucide-react"
import CategoryList from "./categoryList"
import { Input, message } from "antd";
import { useSearchParams } from "next/navigation"
import CategorySearch from "./categorySearch"
import CategoryPagination from "./categoryPagination"
import ModalAdd from "./modalAdd"
const { Search } = Input;

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lí danh mục câu hỏi</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModalAdd />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
        </CardHeader>
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
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <CategoryList />
              </TableBody>
            </Table>
          </div>
          <div className="pt-4 flex justify-end">
            <CategoryPagination/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
