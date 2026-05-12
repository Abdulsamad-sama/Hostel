"use client"
import { useEffect } from "react";
import PropertyWizardForm from "@/components/property/Wizard-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Listproperty() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        if (!isPending && !user) {
            router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
    }, [user, isPending, router]);

    if (isPending) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    if (!user) return null;

    return (
        <PropertyWizardForm userId={user.id} />
    );
}