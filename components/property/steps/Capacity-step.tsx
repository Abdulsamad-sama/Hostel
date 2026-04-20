import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function CapacityStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <Input
        type="number"
        placeholder="Total Rooms"
        {...register("totalRooms", { valueAsNumber: true })}
      />

      <Input
        type="number"
        placeholder="Available Rooms"
        {...register("availableRooms", { valueAsNumber: true })}
      />

      <select {...register("roomType")} className="w-full border p-2 rounded">
        <option value="SINGLE">Single</option>
        <option value="SHARED">Shared</option>
      </select>
    </div>
  );
}