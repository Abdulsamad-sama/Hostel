import { useFormContext } from "react-hook-form";

export default function BookingStep() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <select {...register("bookingType")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="INSTANT_BOOK">Instant Booking</option>
          <option value="INSPECTION_REQUIRED">Inspection Required</option>
        </select>
        {errors.bookingType && <p className="text-sm text-destructive">{String(errors.bookingType.message)}</p>}
      </div>
    </div>
  );
}