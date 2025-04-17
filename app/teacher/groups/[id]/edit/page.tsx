"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getGroupDetail } from "@/utils/groupsService";
import { Group } from "@/types/Group";
import GroupForm from "../../group-form";

export default function EditGroupPage() {
  const { id } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = await getGroupDetail(id as string);
        setGroup(data);
      } catch (err) {
        setError("Failed to load group details");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !group) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error || "Group not found"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Group</h1>
      <GroupForm initialValues={group} isEdit />
    </div>
  );
} 