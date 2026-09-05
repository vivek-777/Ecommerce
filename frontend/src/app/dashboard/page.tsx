"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/services/auth.service";
import type { User } from "@/types/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to get current user", error);
      }
    }

    loadUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Email: {user.email}</p>
    </main>
  );
}