"use client"
import PropertyWizardForm from "@/components/property/Wizard-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Listproperty() {
    const router = useRouter();
    const session = authClient.useSession();
    const user = session?.data?.user;
    if (!user) {
        const currentPath = window.location.pathname;
        router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
        return null;
    }

    return (
        <PropertyWizardForm userId={user.id} />
    );
}