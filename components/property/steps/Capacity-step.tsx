import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react"

export default function CapacityStep() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <p className="py-6">
        What is the capacity of this property?
      </p>
      <div className="space-y-1">
        <Label>Total number of Rooms are in your apartment</Label>
        <Input
          type="number"
          placeholder="Total Rooms"
          {...register("totalRooms", { valueAsNumber: true })}
        />
        {errors.totalRooms && <p className="text-sm text-destructive">{String(errors.totalRooms.message)}</p>}
      </div>

      <div className="space-y-1">
        <Label>Number of current available room</Label>
        <Input
          type="number"
          placeholder="Available Rooms"
          {...register("availableRooms", { valueAsNumber: true })}
        />
        {errors.availableRooms && <p className="text-sm text-destructive">{String(errors.availableRooms.message)}</p>}
      </div>

      <div className="space-y-1">
        <Label>What type of room is available in your apartment</Label>
        <select {...register("roomType")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="SHARED">Shared</option>
          <option value="SINGLE">Single</option>
        </select>
        {errors.roomType && <p className="text-sm text-destructive">{String(errors.roomType.message)}</p>}
      </div>
      <p className="flex justify-center items-center text-xs text-muted-foreground mt-6"> <InfoIcon />Only Choose single if you don't allow multiple students in a room</p>
    </div>
  );
}