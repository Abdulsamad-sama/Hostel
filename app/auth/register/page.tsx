import RegisterForm from "@/components/auth/Register-form";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div>
      <Suspense fallback={<div className="flex items-center justify-center p-8">Loading form...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
