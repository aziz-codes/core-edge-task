"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
