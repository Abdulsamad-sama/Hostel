import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export default function MediaStep() {
    const { setValue, formState: { errors } } = useFormContext();

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).map((f) => f.name);
        setValue("images", files, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <div className="space-y-4">
            <Field>
                <FieldGroup>
                    <Controller
                        control={control}
                        name="images"
                        render={({ field }) => (
                            <>
                                <FieldLabel className="text-sm font-medium">Upload Images</FieldLabel>
                                <Input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFiles}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {field.value?.length > 0 && (
                                    <div className="flex gap-2">
                                        {Array.from(field.value).map((file: any, index: number) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-sm">{file.name}</span>
                                                <Button
                                                    type="button"
                                                    onClick={() => field.onChange([...field.value].filter((_, i) => i !== index))}
                                                    variant="destructive"
                                                >
                                                    <Trash2 size={16} />
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
            {errors.images?.message && (
                                    <p className="text-sm text-destructive">{String(errors.images.message)}</p>
                                )}
                    />
                            </FieldGroup>
                        <FieldError />
                    </Field>
                </div>
                );
}