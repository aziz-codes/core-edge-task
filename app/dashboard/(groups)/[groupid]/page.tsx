"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams } from "next/navigation";
const dummyExpenses = [
  { id: 1, description: "Lunch", amount: 20, category: "Food" },
  { id: 2, description: "Office Supplies", amount: 50, category: "Work" },
];

export default function GroupDetail() {
  const params = useParams();
  const [expenses, setExpenses] = useState(dummyExpenses);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category)
      return;
    const expense = {
      ...newExpense,
      id: expenses.length + 1,
      amount: Number(newExpense.amount),
    };
    setExpenses([...expenses, expense]);
    setNewExpense({ description: "", amount: "", category: "" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Group Expenses for {params.groupid}</h1>
      <div className="space-y-4 mt-4">
        {expenses.map((expense) => (
          <Card key={expense.id}>
            <CardContent className="p-4 flex justify-between">
              <div>
                <p className="font-semibold">{expense.description}</p>
                <p className="text-sm text-gray-500">{expense.category}</p>
              </div>
              <p className="font-bold">${expense.amount}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 space-y-2">
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
        <Input
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
        />
        <Button onClick={addExpense} className="w-full">
          Add Expense
        </Button>
      </div>
    </div>
  );
}
