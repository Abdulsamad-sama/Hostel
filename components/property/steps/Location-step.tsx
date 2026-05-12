import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function LocationStep() {
    const { register, formState: { errors } } = useFormContext();

    return (
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
    );
}