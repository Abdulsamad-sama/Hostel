import LoginForm from "@/components/auth/Login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="">
      <Suspense fallback={<div className="flex items-center justify-center p-8">Loading form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}