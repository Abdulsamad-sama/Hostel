import { Controller, useFormContext } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function BookingStep() {
    const { control } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-start py-4 text-xl font-semibold">Booking Type</h2>
            <p className="text-start text-sm text-muted-foreground">
                Will you like to get started with instant booking or inspection required?
            </p>

            <FieldGroup>
                <Controller
                    control={control}
                    name="bookingType"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Booking Type</FieldLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select booking type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INSTANT_BOOK">Instant Booking</SelectItem>
                                    <SelectItem value="INSPECTION_REQUIRED">Inspection Required</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </Field>
                    )}
                />
            </FieldGroup>
        </div>
    );
}