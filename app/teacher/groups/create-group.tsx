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

export default function CreateGroup() {
    return (
        <Card className="mt-6 border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <UsersRound className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-medium">Create a New Group</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Create a new group to organize your students and assign tests
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </CardContent>
      </Card>
    )
}
