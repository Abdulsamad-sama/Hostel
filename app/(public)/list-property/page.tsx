"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion"
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
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Home, FileText, MessageSquare, Users2, CalendarCheck, } from "lucide-react";


const HeaderSection: React.FC = () => {
    return (
        <header className="py-6 bg-primary text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold ">HostelHub {""}
                    <span className="text-sm text-secondary">List Your Property</span>
                </h1>
                <nav>
                    <Button asChild variant="outline">
                        <Link href="/auth/login">Log in</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
};

const HeroSection: React.FC = () => {
    return (
        <section id="hero-section" className="bg-muted ">
            <div className="py-15 px-10 flex flex-col md:flex-row items-center justify-center gap-20">
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
        <section className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What people think about HostelHub
                    </h2>
                </div>

                <Carousel className="w-full max-w-48 sm:max-w-xs">
                    <CarouselContent>
                        {testimonials.from({ length: 3 }).map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <CarouselItem>
                                    <Card className="h-full">
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
                            </motion.div>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section >
    );
};

const FAQSection: React.FC = () => {
    return (
        <section id="faq-section" className="py-20">
        </section>
    );
};

const IntakeSection: React.FC = () => {
    return (
        <section id="intake-section" className="py-20">
        </section>
    );
};

const Listproperty: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground scroll-smooth">
            <HeaderSection />
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <IntakeSection />

        </div>
    );
};

export default Listproperty;
