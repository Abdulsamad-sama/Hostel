import { Controller, useFormContext } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputGroup } from "@/components/ui/input-group";

export default function BasicStep() {
    const { control } = useFormContext();

    return (
        <div className="space-y-4">
            <FieldGroup>
                <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <Field>
                            <FieldLabel> Hostel name</FieldLabel>
                            <InputGroup>
                                <Input placeholder="Excellency Hostel" {...field} />
                            </InputGroup>
                            <FieldError />
                        </Field>

                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <InputGroup>
                                <Textarea placeholder="Describe your hostel" {...field} />
                            </InputGroup>
                            <FieldError />
                        </Field>
                    )}
                />
            </FieldGroup>
        </div >
    );
}