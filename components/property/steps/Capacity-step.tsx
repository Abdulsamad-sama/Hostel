import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function CapacityStep() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Input
          type="number"
          placeholder="Total Rooms"
          {...register("totalRooms", { valueAsNumber: true })}
        />
        {errors.totalRooms && <p className="text-sm text-destructive">{String(errors.totalRooms.message)}</p>}
      </div>

      <div className="space-y-1">
        <Input
          type="number"
          placeholder="Available Rooms"
          {...register("availableRooms", { valueAsNumber: true })}
        />
        {errors.availableRooms && <p className="text-sm text-destructive">{String(errors.availableRooms.message)}</p>}
      </div>

      <div className="space-y-1">
        <select {...register("roomType")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="SINGLE">Single</option>
          <option value="SHARED">Shared</option>
        </select>
        {errors.roomType && <p className="text-sm text-destructive">{String(errors.roomType.message)}</p>}
      </div>
    </div>
  );
}