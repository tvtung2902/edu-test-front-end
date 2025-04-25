'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FileQuestion, MoreHorizontal, Link as LinkIcon, Users, Pencil, UserPlus, FileCheck, Trash2 } from "lucide-react"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { deleteGroup, fetchGroups } from "@/redux/features/groupSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { Modal } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { useEffect, useState } from "react"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Group } from "@/types/Group"
import Link from "next/link"

interface GroupItemProps {
  group: Group;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export default function GroupItem({ group, handleEdit, handleDelete }: GroupItemProps) {
  return (
    <>
      <Link href={`/teacher/groups/${group.id}/tests`}>
        <Card key={group.id} className="overflow-hidden">
          <div className="relative h-[140px] w-full overflow-hidden bg-muted">
            <Image src={group.image || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-bold text-white">{group.name}</h3>
            </div>
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="line-clamp-2">{group.description}</CardDescription>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleEdit(group.id)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit group
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Share invite link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Manage members
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Assign tests
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(group.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{group.numberOfMembers} members</span>
              </div>
              <div className="flex items-center gap-1">
                <FileQuestion className="h-4 w-4 text-muted-foreground" />
                <span>{group.numberOfTests} tests</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="text-xs text-muted-foreground">
              Created {group.createdAt}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  )
}

