// Pricing Section

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";


interface PricingPlan {
    title: string;
    price: string;
    description: string;
    features: string[];
    highlight?: boolean;
}

export default function PricingSection() {
    const plans: PricingPlan[] = [
        {
            title: "Basic",
            price: "$29",
            description: "Perfect for small hostels",
            features: [
                "Up to 20 rooms",
                "Basic payment tracking",
                "Complaint management",
                "Email support",
                "Monthly reports"
            ]
        },
        {
            title: "Professional",
            price: "$79",
            description: "For growing hostels",
            features: [
                "Up to 100 rooms",
                "Advanced payment tracking",
                "Priority complaint resolution",
                "24/7 support",
                "Real-time analytics",
                "Custom branding",
                "API access"
            ],
            highlight: true
        },
        {
            title: "Enterprise",
            price: "$199",
            description: "For large operations",
            features: [
                "Unlimited rooms",
                "Full payment automation",
                "Dedicated account manager",
                "Custom integrations",
                "Advanced security",
                "White-label solution",
                "Training & onboarding"
            ]
        }
    ];

    return (
        <section id="pricing" className="py-24 px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your hostel size and needs. All plans include core features.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className={cn(
                                "h-full flex flex-col",
                                plan.highlight && "border-primary shadow-lg scale-105"
                            )}>
                                <CardHeader>
                                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                        <span className="text-muted-foreground">/month</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col">
                                    <ul className="space-y-3 mb-6 flex-1">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className="w-full"
                                        variant={plan.highlight ? "default" : "outline"}
                                    >
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
