import { Controller, useFormContext } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";

export default function LocationStep() {
    const { control } = useFormContext();

    return (
        <div className="space-y-4">
            <h2 className="text-start py-4 text-xl font-semibold">Location of your property</h2>
            <p className="text-start text-sm text-muted-foreground">Enter the address of your property</p>

            <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        control={control}
                        name="address"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Address</FieldLabel>
                                <InputGroup>
                                    <Input placeholder="123 Main Street" {...field} />
                                </InputGroup>
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="city"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>City</FieldLabel>
                                <InputGroup>
                                    <Input placeholder="e.g Yaba" {...field} />
                                </InputGroup>
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="state"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>State</FieldLabel>
                                <InputGroup>
                                    <Input placeholder="e.g Oyo" {...field} />
                                </InputGroup>
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />

                    <Controller
                        control={control}
                        name="country"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Country</FieldLabel>
                                <InputGroup>
                                    <Input placeholder="Nigeria" {...field} />
                                </InputGroup>
                                <FieldError>{fieldState.error?.message}</FieldError>
                            </Field>
                        )}
                    />
                </div>
            </FieldGroup>
        </div>
    );
}