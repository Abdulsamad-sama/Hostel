import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function LocationStep() {
    const { register } = useFormContext();

    return (
        <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Address" {...register("address")} />
            <Input placeholder="City (e.g Yaba)" {...register("city")} />
            <Input placeholder="State" {...register("state")} />
            <Input placeholder="Country" {...register("country")} />
        </div>
    );
}