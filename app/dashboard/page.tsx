"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const supabase = useSupabaseClient();
  const { user } = useAuth();

  useEffect(() => {
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      } else {
        console.log("Session restored:", data);
      }
    };

    restoreSession();
  }, []);

  const [groups, setGroups] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const { data: groups, error: fetchError } = await supabase
        .from("groups")
        .select("*")
        .eq("user_id", user.id); // Correctly access user ID

      if (fetchError) throw fetchError;
      setLoading(false);
      console.log("Groups fetched:", groups);
      setGroups(groups);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setLoading(false);
    }
  };
  console.log("user session is ", user);
  const createGroup = async () => {
    if (!groupName) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("groups")
        .insert([{ name: groupName, user_id: user?.id }]) // Ensure user_id is passed
        .select();

      if (error) throw error;
      setLoading(false);
      toast.success("Group created successfully");
      setOpen(false);
      fetchGroups(); // Refresh the list
    } catch (err) {
      console.error("Error creating group:", err);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">
        {" "}
        {user && user.email.slice(0, user?.email?.indexOf("@"))} Groups
      </h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Create Group
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button
            onClick={createGroup}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="h-5 w-5 rounded-full animate-spin transition-transform duration-500 ease-linear" />
            ) : (
              "Create Group"
            )}
          </Button>
        </DialogContent>
      </Dialog>
      <div className="space-y-4">
        {loading && (
          <LoaderCircle className="mx-auto h-5 w-5 rounded-full animate-spin transition-transform duration-500 ease-linear" />
        )}
        {groups.length > 0 ? (
          groups.map((group: any) => (
            <Card
              key={group.id}
              className="shadow-md border-l-4 border-blue-500"
            >
              <CardContent className="p-4 flex justify-between items-center">
                <Link
                  href={`/dashboard/group/${group.id}`}
                  className="text-lg font-semibold hover:text-sky-500"
                >
                  {group.name}
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">
            You are not a member of any groups yet.
          </p>
        )}
      </div>

      {/* Create Group Modal */}
    </div>
  );
}
