import { useFormContext } from "react-hook-form";

export default function BookingStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <select {...register("bookingType")} className="w-full border p-2 rounded">
        <option value="INSTANT_BOOK">Instant Booking</option>
        <option value="INSPECTION_REQUIRED">Inspection Required</option>
      </select>
    </div>
  );
}