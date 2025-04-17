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
import CreateGroup from "./create-group"

// Sample group data
const groups = [
  {
    id: 1,
    name: "Mathematics 101",
    description: "Introductory mathematics course",
    members: 28,
    tests: 5,
    thumbnail: "/placeholder.svg?height=100&width=200",
    createdAt: "2 weeks ago",
  },
  {
    id: 2,
    name: "Advanced Physics",
    description: "Physics for senior students",
    members: 15,
    tests: 8,
    thumbnail: "/placeholder.svg?height=100&width=200",
    createdAt: "1 month ago",
  },
  {
    id: 3,
    name: "English Literature",
    description: "Analysis of classic literature",
    members: 22,
    tests: 4,
    thumbnail: "/placeholder.svg?height=100&width=200",
    createdAt: "3 days ago",
  },
  {
    id: 4,
    name: "Computer Science Basics",
    description: "Introduction to programming concepts",
    members: 18,
    tests: 6,
    thumbnail: "/placeholder.svg?height=100&width=200",
    createdAt: "1 week ago",
  },
  {
    id: 5,
    name: "Biology 202",
    description: "Advanced biology concepts",
    members: 12,
    tests: 3,
    thumbnail: "/placeholder.svg?height=100&width=200",
    createdAt: "5 days ago",
  },
  {
    id: 6,
    name: "History Club",
    description: "World history discussion group",
    members: 25,
    tests: 7,
    thumbnail: "/placeholder.svg?height=100&width=200",
    createdAt: "2 months ago",
  },
]

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <CreateGroup />
  
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          
        </div>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <div className="relative h-[140px] w-full overflow-hidden bg-muted">
                  <Image src={group.thumbnail || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
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
                        <DropdownMenuItem>Edit group</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share invite link
                        </DropdownMenuItem>
                        <DropdownMenuItem>Manage members</DropdownMenuItem>
                        <DropdownMenuItem>Assign tests</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Archive group</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileQuestion className="h-4 w-4 text-muted-foreground" />
                      <span>{group.tests} tests</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="text-xs text-muted-foreground">Created {group.createdAt}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.slice(0, 4).map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <div className="relative h-[140px] w-full overflow-hidden bg-muted">
                  <Image src={group.thumbnail || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
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
                        <DropdownMenuItem>Edit group</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share invite link
                        </DropdownMenuItem>
                        <DropdownMenuItem>Manage members</DropdownMenuItem>
                        <DropdownMenuItem>Assign tests</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Archive group</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileQuestion className="h-4 w-4 text-muted-foreground" />
                      <span>{group.tests} tests</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="text-xs text-muted-foreground">Created {group.createdAt}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.slice(4, 6).map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <div className="relative h-[140px] w-full overflow-hidden bg-muted">
                  <Image src={group.thumbnail || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
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
                        <DropdownMenuItem>Restore group</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete permanently</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileQuestion className="h-4 w-4 text-muted-foreground" />
                      <span>{group.tests} tests</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="text-xs text-muted-foreground">Created {group.createdAt}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
