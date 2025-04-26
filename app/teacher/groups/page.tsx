import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileQuestion, MoreHorizontal, Plus, Search, Share2, Users, UsersRound } from "lucide-react"
import Image from "next/image"
import GroupSearch from "./group-search"
import GroupPagination from "./group-pagination"
import GroupList from "./group-list"
import CreateGroup from "./create-group"

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <CreateGroup /> 
      <div className="flex justify-end">
        <GroupSearch />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <GroupList />
      </div>
      <div className="flex justify-end">
        <GroupPagination />
      </div>
    </div>
  )
}
