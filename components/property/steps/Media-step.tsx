import { Controller, useFormContext } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Trash2, ImagePlus } from "lucide-react";
import { useCallback } from "react";
import Script from "next/script";
import Image from "next/image";

export default function MediaStep() {
    const { control } = useFormContext();

    const openUploadWidget = useCallback(
        (onChange: (urls: string[]) => void, currentImages: string[]) => {
            if (typeof window === "undefined") return;

            // Access the Cloudinary global loaded via the script tag
            const cloudinary = (window as unknown as Record<string, unknown>).cloudinary as {
                createUploadWidget: (
                    config: Record<string, unknown>,
                    callback: (error: unknown, result: { event: string; info: { secure_url: string } }) => void
                ) => { open: () => void };
            } | undefined;

            if (!cloudinary) {
                console.error("[MediaStep] Cloudinary widget not loaded");
                return;
            }

            const widget = cloudinary.createUploadWidget(
                {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                    sources: ["local", "url", "camera"],
                    multiple: true,
                    maxFiles: 10,
                    resourceType: "image",
                    folder: "hostelhub/properties",
                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                    maxFileSize: 5_000_000, // 5MB
                },
                (error: unknown, result: { event: string; info: { secure_url: string } }) => {
                    if (error) {
                        console.error("[MediaStep] Upload error:", error);
                        return;
                    }
                    if (result.event === "success") {
                        const newUrl = result.info.secure_url;
                        onChange([...currentImages, newUrl]);
                    }
                }
            );

            widget.open();
        },
        []
    );

    return (
        <div className="space-y-4">
            <h2 className="text-start py-4 text-xl font-semibold">Property Images</h2>
            <p className="text-start text-sm text-muted-foreground">
                Upload images of your property. At least one image is required.
            </p>

            {/* Cloudinary Upload Widget Script */}
            <Script
                src="https://upload-widget.cloudinary.com/global/all.js"
                strategy="lazyOnload"
            />

            <FieldGroup>
                <Controller
                    control={control}
                    name="images"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Images</FieldLabel>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-32 border-dashed border-2 flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors"
                                onClick={() => openUploadWidget(field.onChange, field.value || [])}
                            >
                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Click to upload images
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    JPG, PNG, WebP up to 5MB
                                </span>
                            </Button>

                            {/* Image preview grid */}
                            {field.value && field.value.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                    {(field.value as string[]).map((url: string, index: number) => (
                                        <div
                                            key={`img-${index}`}
                                            className="relative group rounded-lg overflow-hidden border border-border"
                                        >
                                            <Image
                                                src={url}
                                                alt={`Property image ${index + 1}`}
                                                width={300}
                                                height={112}
                                                className="w-full h-28 object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() =>
                                                    field.onChange(
                                                        (field.value as string[]).filter((_: string, i: number) => i !== index)
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs text-muted-foreground mt-1">
                                {field.value?.length || 0} image(s) uploaded
                            </p>

                            <FieldError>{fieldState.error?.message}</FieldError>
                        </Field>
                    )}
                />
            </FieldGroup>
        </div>
    );
}