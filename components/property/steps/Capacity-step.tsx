import { Controller, useFormContext } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { InfoIcon } from "lucide-react";

export default function CapacityStep() {
    const { control } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-start py-4 text-xl font-semibold">Capacity</h2>
            <p className="text-start text-sm text-muted-foreground">What is the capacity of this property?</p>

            <FieldGroup>
                <Controller
                    control={control}
                    name="totalRooms"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Total number of rooms in your apartment</FieldLabel>
                            <InputGroup>
                                <Input
                                    type="number"
                                    placeholder="Total Rooms"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </InputGroup>
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </Field>
                    )}
                />

                <Controller
                    control={control}
                    name="availableRooms"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Number of currently available rooms</FieldLabel>
                            <InputGroup>
                                <Input
                                    type="number"
                                    placeholder="Available Rooms"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </InputGroup>
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </Field>
                    )}
                />

                <Controller
                    control={control}
                    name="roomType"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Room type available in your apartment</FieldLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SHARED">Shared</SelectItem>
                                    <SelectItem value="SINGLE">Single</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </Field>
                    )}
                />
            </FieldGroup>

            <p className="flex justify-center items-center gap-1 text-xs text-muted-foreground mt-6">
                <InfoIcon className="h-3.5 w-3.5" />
                Only choose single if you don&apos;t allow multiple students in a room
            </p>
        </div>
    );
}