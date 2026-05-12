"use client";

import { useState } from "react";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { propertySchema } from "@/schema/index";
import { createProperty } from "@/action/create-property";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import BasicStep from "@/components/property/steps/Basic-step";
import LocationStep from "@/components/property/steps/Location-step";
import PricingStep from "@/components/property/steps/Pricing-step";
import CapacityStep from "@/components/property/steps/Capacity-step";
import BookingStep from "@/components/property/steps/Booking-step";
import MediaStep from "@/components/property/steps/Media-step";
import { useRouter } from "next/navigation";

type PropertyFormValues = z.infer<typeof propertySchema>;

interface StepConfig {
    component: React.ComponentType;
    fields: FieldPath<PropertyFormValues>[];
}

const steps: StepConfig[] = [
    { component: BasicStep, fields: ["title", "description"] },
    { component: LocationStep, fields: ["address", "city", "state", "country"] },
    { component: PricingStep, fields: ["price", "priceType"] },
    { component: CapacityStep, fields: ["totalRooms", "availableRooms", "roomType"] },
    { component: BookingStep, fields: ["bookingType"] },
    { component: MediaStep, fields: ["images"] },
];

export default function PropertyWizardForm({ userId }: { userId: string }) {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(propertySchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            address: "",
            city: "",
            state: "",
            country: "Nigeria",
            price: 0,
            priceType: "PER_YEAR",
            totalRooms: 1,
            availableRooms: 1,
            roomType: "SINGLE",
            bookingType: "INSPECTION_REQUIRED",
            images: [],
        },
    });

    const StepComponent = steps[step].component;
    const currentStepFields = steps[step].fields;

    const nextStep = async () => {
        const valid = await methods.trigger(currentStepFields);
        if (!valid) return;
        setError(null);
        setStep((s) => Math.min(s + 1, steps.length - 1));
    };

    const prevStep = () => {
        setError(null);
        setStep((s) => Math.max(s - 1, 0));
    };

    const onSubmit = methods.handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const result = await createProperty({
                hostelName: data.title,
                description: data.description,
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                latitude: undefined,
                longitude: undefined,
                roomType: data.roomType,
                price: data.price,
                priceType: data.priceType,
                totalRooms: data.totalRooms,
                availableRooms: data.availableRooms,
                bookingType: data.bookingType,
                ownerId: userId,
                images: data.images,
            });

            if (!result.success) {
                setError(result.error || "Failed to create property");
                return;
            }

            // Reset form and redirect or show success message
            methods.reset();
            router.push("/Dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    });

    return (
        <div className="flex items-center justify-center w-full mx-auto px-5 h-screen overflow-hidden">
            <FormProvider {...methods}>
                <Card className="lg:max-w-4xl md:max-w-3xl max-w-lg w-full mx-auto mt-10">
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Step {step + 1} of {steps.length}
                            </p>
                            <div className="w-full bg-secondary rounded-full h-2 mt-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <StepComponent />

                        <div className="flex justify-between gap-4">
                            {step > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={isSubmitting}
                                >
                                    Back
                                </Button>
                            )}

                            {step < steps.length - 1 ? (
                                <Button
                                    onClick={nextStep}
                                    className="ml-auto"
                                    disabled={isSubmitting}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={onSubmit}
                                    disabled={isSubmitting}
                                    className="ml-auto"
                                >
                                    {isSubmitting ? "Creating..." : "Create Property"}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </FormProvider>
        </div>
    )
}