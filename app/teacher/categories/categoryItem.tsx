import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import Category from "@/types/Category"
import { BookOpen, MoreHorizontal } from "lucide-react"
import { memo } from "react"

interface CategoryType {
    category: Category,
    handleDelete: (id: number) => void,
    handleOpenModalEdit: (id: number) => void,
}

function CategoryItem({ category, handleDelete, handleOpenModalEdit }: CategoryType) {
    return (
        <TableRow key={category.id}>
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-medium">{category.name}</div>
                </div>
            </TableCell>
            <TableCell>{category.questionCount}</TableCell>
            <TableCell>{category.createdAt}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem>Xem đề thi</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenModalEdit(category.id)}>
                            Sửa danh mục
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="text-red-600 hover:!text-red-600" 
                            onClick={() => handleDelete(category.id)}
                        >
                            Xóa Danh mục
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default memo(CategoryItem);