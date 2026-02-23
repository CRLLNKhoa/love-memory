"use client";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

export default function Nav(): React.ReactNode {
  const { user, isAdmin } = useAuth();
  const provider = new GoogleAuthProvider();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/"); // quay về trang login
  };

  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <header className="postion-sticky top-0 flex items-center justify-between border-b border-primary/10 px-6 py-4 lg:px-40">
      <div className="flex items-center gap-3">
        <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
          <span className="material-symbols-outlined text-xl ">❤︎</span>
        </div>

        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold select-none">
          Love Memory
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Chỉ admin mới thấy settings */}
        {isAdmin && (
          <button
            onClick={handleLogin}
            className="flex items-center justify-center rounded-lg h-10 bg-green-500 text-white hover:bg-green-500/90 transition-colors px-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">Chỉnh sửa</span>
          </button>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center rounded-lg h-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">Logout</span>
          </button>
        )}
        {!user && (
          <button
            onClick={handleLogin}
            className="flex items-center justify-center rounded-lg h-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">Login</span>
          </button>
        )}
      </div>
    </header>
  );
}
