"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion"
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Home, FileText, MessageSquare, Users2, CalendarCheck, } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/layout/Header";




const HeroSection: React.FC = () => {
    return (
        <section id="hero-section" className="bg-muted ">
            <div className="py-32 px-6 flex flex-col md:flex-row items-center justify-center gap-20">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-bold mb-4">
                        List Your Hostel and Reach More Students
                    </h2>
                    <p className="text-lg mb-6">
                        Join HostelHub and connect with thousands of students looking for the perfect place to stay.
                    </p>
                    <p>Get your property in front of verified student renters. Manage bookings, track interest, and grow occupancy—all from one dashboard.</p>
                </div>
                <Button asChild variant="default" size="lg">
                    <Link href="/auth/login">Get Started for free</Link>
                </Button>
            </div>

        </section >
    );
};

//featureSection
interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeaturesSection: React.FC = () => {
    const features: Feature[] = [
        {
            icon: <CalendarCheck className="h-8 w-8 text-primary" />,
            title: "Booking Requests",
            description: "Receive and manage booking requests from students. Approve or decline requests with ease and keep track of your bookings in one place."
        },
        {
            icon: <Users2 className="h-8 w-8 text-primary" />,
            title: "Reach a wealth of students",
            description: "Access a large pool of student renters actively searching for accommodations."
        },
        {
            icon: <MessageSquare className="h-8 w-8 text-primary" />,
            title: "Complaints and Maintenance",
            description: "Easily manage tenant complaints and maintenance requests. Communicate directly with tenants and track the status of each issue until it's resolved."
        },
        {
            icon: <FileText className="h-8 w-8 text-primary" />,
            title: "Grow your business",
            description: "Increase your visibility to thousands of students looking for accommodations."
        },
    ];

    return (
        <section id="features" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Connect with students instantly
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join HostelHub and connect with thousands of students looking for the perfect place to stay. Get your property in front of verified student renters. Manage bookings, track interest, and grow occupancy—all from one dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="mb-4">{feature.icon}</div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Testimonials Section
interface Testimonial {
    name: string;
    role: string;
    content: string;
    avatar: string;
}

const TestimonialsSection: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            name: "Sarah Johnson",
            role: "Hostel Manager",
            content: "HostelHub has transformed how we manage our property. Payment tracking is seamless and tenants love the easy complaint system.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        {
            name: "Michael Chen",
            role: "Property Owner",
            content: "The best investment for our hostel business. Everything is automated and organized. Highly recommend!",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        },
        {
            name: "Emily Davis",
            role: "Property Owner",
            content: "HostelHub has made managing our property so much easier. The booking system is fantastic and the support team is always helpful.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
        },
    ];

    return (
        <section className="  py-24 px-6 bg-muted">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What people think about HostelHub
                    </h2>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        skipSnaps: false,
                        containScroll: "keepSnaps",
                        slidesToScroll: 1,
                    }}
                    className="w-full max-w-48 md:max-w-2xl m-auto">

                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (

                            <CarouselItem key={index}>
                                <Card className="h-full rounded-lg shadow-md ">
                                    <CardContent className="pt-6">
                                        <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold text-foreground">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>

                        ))
                        }
                    </CarouselContent >


                </Carousel >
            </div >
        </section >
    );
};

// FAQ Section
interface FAQ {
    question: string;
    answer: string;
}
const FAQSection: React.FC = () => {
    const faqs: FAQ[] = [
        {
            question: "Is listing free?",
            answer: "You can start listing for free. Premium features may be introduced later."
        },
        {
            question: "How do students contact me?",
            answer: "They can either book directly or request a consultation through the platform. You'll receive notifications for all interactions and can respond through the dashboard."
        },
        {
            question: "Can I book a hostel online?",
            answer: "Yes. Depending on the listing, you can either book directly or schedule a consultation/inspection with the hostel management. Look for the 'Book Now' or 'Schedule Visit' options on the hostels of your choice."
        },
        {
            question: "Is my payment information secure?",
            answer: "Absolutely. We use bank-level encryption and comply with all security standards to protect your financial information."
        },
        {
            question: "Can I change my room?",
            answer: "Yes, you can request a room change through the platform. The hostel management will review your request and respond accordingly."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept credit/debit cards, bank transfers, and digital wallets. Multiple payment options are available for your convenience."
        }
    ];

    return (
        <section id="faq" className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Find answers to common questions about our platform.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-foreground font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};


const IntakeSection: React.FC = () => {
    return (
        <section id="intake-section" className="py-20">

            <Card className="max-w-3xl mx-auto text-center shadow-2xl bg-accent">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Ready to list your property?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join HostelHub today and start connecting with students looking for the perfect place to stay.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/auth/login">Get Started for free</Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
};



const Listproperty: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground scroll-smooth">
            <Header logoText="Partner with us" />
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <IntakeSection />

        </div>
    );
};

export default Listproperty;
