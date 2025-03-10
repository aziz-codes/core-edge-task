"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { supabase } from "@/lib/supabase";

export default function GroupDetail() {
  const params = useParams();
  const groupId = params.groupid;

  const [expenses, setExpenses] = useState<any[]>([]);
  const [groupName, setGroupName] = useState<null | string>("");
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
  });
  const fetchGroupExpenses = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("group_id", groupId);

    if (error) {
      console.error("Error fetching expenses:", error);
    } else {
      console.log("expense for this groups are", data);
      setExpenses(data || []);
    }
  };
  // Fetch group details
  useEffect(() => {
    const fetchGroupDetails = async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("name")
        .eq("id", groupId)
        .single();

      if (error || !data) {
        setGroupName(null); // Indicate that no group was found
      } else {
        setGroupName(data.name);
      }
    };

    fetchGroupDetails();
    fetchGroupExpenses();
  }, [groupId]);

  // Handle Adding Expense
  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount) {
      alert("Please enter description and amount.");
      return;
    }

    const { data, error } = await supabase.from("expenses").insert<any[]>([
      {
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        group_id: groupId,
      },
    ]);

    if (error) {
      console.error("Error adding expense:", error);
    }
    setNewExpense({ description: "", amount: "" }); // Clear input fields
    setExpenses([
      ...expenses,
      {
        description: newExpense.description,
        amount: Number(newExpense.amount),
      },
    ]);
  };

  return (
    <div className="w-full overflow-y-auto">
      {groupName === null ? (
        <h1 className="text-2xl font-bold text-center text-red-600">
          No group found with this ID
        </h1>
      ) : (
        <div className="flex justify-center gap-4  mt-3 mx-auto">
          <div className="md:w-1/3 p-4 rounded-lg shadow-md h-auto max-h-64">
            <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
            <div className="space-y-3">
              <Input
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              />
              <Input
                placeholder="Amount"
                type="number"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
              />
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            </div>
          </div>

          <div className="space-y-4 flex flex-col">
            <h1 className="text-2xl font-bold text-center mb-6">
              - {groupName} Expenses
            </h1>
            <label className="font-semibold">
              Total Expense{" "}
              <span className="text-green-500">
                {expenses.length > 0 &&
                  expenses.reduce((sum, expense) => (sum += expense.amount), 0)}
                $
              </span>
            </label>

            {expenses.map((expense) => (
              <Card
                key={expense.id}
                className="shadow-md border-l-4 border-blue-500 w-full"
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">
                      {expense.description}
                    </p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    ${expense.amount}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
