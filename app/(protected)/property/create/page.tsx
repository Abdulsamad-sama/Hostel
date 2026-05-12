import { requireServerAuth } from "@/lib/server-auth";
import PropertyWizardForm from "@/components/property/Wizard-form";

export default async function CreatePropertyPage() {
    const user = await requireServerAuth();

    return (
        <PropertyWizardForm userId={user.id} />
    );
}