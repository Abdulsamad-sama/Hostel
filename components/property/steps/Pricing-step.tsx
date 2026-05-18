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

export default function PricingStep() {
    const { control } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-start py-4 text-xl font-semibold">Pricing</h2>
            <p className="text-start text-sm text-muted-foreground">Set the rent price for your property</p>

            <FieldGroup>
                <Controller
                    control={control}
                    name="price"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Price (₦)</FieldLabel>
                            <InputGroup>
                                <Input
                                    type="number"
                                    placeholder="E.g. 500000"
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
                    name="priceType"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Price Period</FieldLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select price period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PER_YEAR">Per Year</SelectItem>
                                    <SelectItem value="PER_MONTH">Per Month</SelectItem>
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