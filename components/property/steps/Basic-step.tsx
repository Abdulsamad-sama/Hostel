import { Controller, useForm, useFormContext } from "react-hook-form";
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
    const form = useForm

    return (
        <div className="space-y-4">
            <Field>
                <FieldGroup>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <>
                                <FieldLabel> Hostel name</FieldLabel>
                                <InputGroup>
                                    <Input placeholder="Excellency Hostel" {...field} />
                                </InputGroup>
                                <FieldError />
                            </>
                        )}
                    />
                </FieldGroup>
            </Field>

            <Field>
                <FieldGroup>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <>
                                <FieldLabel> Hostel name</FieldLabel>
                                <InputGroup>
                                    <Textarea placeholder="Describe your hostel" {...field} />
                                </InputGroup>
                                <FieldError />
                            </>
                        )}
                    />
                </FieldGroup>
            </Field>


        </div >
    );
}