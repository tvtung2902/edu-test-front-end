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
import { FileQuestion, MoreHorizontal, Share2, Users } from "lucide-react"
import Image from "next/image"
import { Group } from "@/types/Group"
import { useDispatch } from "react-redux"
import { deleteGroup, fetchGroups } from "@/redux/features/groupSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { message } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { useEffect } from "react"

const GroupList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { groups, status } = useSelector((state: RootState) => state.groups);

  const searchParams = useSearchParams();
  const pageNo = Number(searchParams.get('page-no')) || 1;
  const search = searchParams.get('name') || "";

  useEffect(() => {
    dispatch(fetchGroups({ search, pageNo }) as any);
  }, [dispatch, search, pageNo]);

  const handleDelete = async (id: number) => {
    try {
      dispatch(deleteGroup(id));
    } catch (error) {

    }
  };

  const handleEdit = (id: number) => {
    router.push(`/teacher/groups/${id}/edit`);
  };

  return (
    <>
      {groups.map((group) => (
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
                    Edit group
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share invite link
                  </DropdownMenuItem>
                  <DropdownMenuItem>Manage members</DropdownMenuItem>
                  <DropdownMenuItem>Assign tests</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(group.id)}
                  >
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
              Created {new Date(group.createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default GroupList; 