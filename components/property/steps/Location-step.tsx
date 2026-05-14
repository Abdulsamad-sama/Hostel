import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
export default function LocationStep() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div>
            <h2 className="text-start py-6 text-xl font-semibold">Location of your property</h2>
            <p className="text-start text-sm text-muted-foreground">Enter the address of your property</p>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Input placeholder="Address" {...register("address")} />
                    {errors.address && <p className="text-sm text-destructive">{String(errors.address.message)}</p>}
                </div>
                <div className="space-y-1">
                    <Input placeholder="City (e.g Yaba)" {...register("city")} />
                    {errors.city && <p className="text-sm text-destructive">{String(errors.city.message)}</p>}
                </div>
                <div className="space-y-1">
                    <Input placeholder="State" {...register("state")} />
                    {errors.state && <p className="text-sm text-destructive">{String(errors.state.message)}</p>}
                </div>
                <div className="space-y-1">
                    <Input placeholder="Country" {...register("country")} />
                    {errors.country && <p className="text-sm text-destructive">{String(errors.country.message)}</p>}
                </div>
            </div>
        </div>
    );
}