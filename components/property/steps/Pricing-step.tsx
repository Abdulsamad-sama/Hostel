import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function PricingStep() {
    const { register } = useFormContext();

    return (
        <div className="space-y-4">
            <Input
                type="number"
                placeholder="Price"
                {...register("price", { valueAsNumber: true })}
            />

            <select {...register("priceType")} className="w-full border p-2 rounded">
                <option value="PER_YEAR">Per Year</option>
                <option value="PER_ROOM">Per Room</option>
            </select>
        </div>
    );
}