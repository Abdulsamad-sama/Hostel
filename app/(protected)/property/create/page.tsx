import { requireServerAuth } from "@/lib/server-auth";
import PropertyWizardForm from "@/components/property/Wizard-form";

export default async function CreatePropertyPage() {
    // Require authentication (role will be updated upon successful creation)
    await requireServerAuth();

    return (
        <PropertyWizardForm />
    );
}