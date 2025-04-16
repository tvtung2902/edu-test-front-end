import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, FileQuestion, FolderPlus, MoreHorizontal, Pencil, Plus, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumb } from "@/components/breadcrumb"
import TestSearch from "./test-search"
import TestList from "./test-list"
import TestPagination from "./test-pagination"

export default function TestsPage() {
  return (
    <div className="container mx-auto space-y-6">
      <Breadcrumb />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lí đề thi</h1>
        </div>
        <div className="flex items-center gap-2">

          <Link href="/teacher/tests/create">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Test
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">My Tests</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="relative">
            <TestSearch />
          </div>
        </div>
        <TabsContent value="all" className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TestList />
            </div>
            <div className="flex justify-end">
              <TestPagination />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
