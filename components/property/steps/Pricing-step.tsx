import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function PricingStep() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Input
                    type="number"
                    placeholder="Price"
                    {...register("price", { valueAsNumber: true })}
                />
                {errors.price && <p className="text-sm text-destructive">{String(errors.price.message)}</p>}
            </div>

            <div className="space-y-1">
                <select {...register("priceType")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="PER_YEAR">Per Year</option>
                    <option value="PER_ROOM">Per Room</option>
                </select>
                {errors.priceType && <p className="text-sm text-destructive">{String(errors.priceType.message)}</p>}
            </div>
        </div>
    );
}