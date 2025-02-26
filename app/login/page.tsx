"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    await login(data);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Sign in
          </CardTitle>
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
          <Button className="w-full" onClick={handleLogin}>
            {loading ? "Loading..." : "Sign in"}
          </Button>

          <div className="flex items-center text-xs gap-1 justify-center">
            Don't have an account?
            <Link href="/signup" className="text-sky-500">
              Signup
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
