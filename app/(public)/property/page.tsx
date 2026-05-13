"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion"
import Image from "next/image";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/layout/Header";




const HeroSection: React.FC = () => {
    return (
        <section id="hero-section" className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&h=900&fit=crop"
                    alt="Hostel Room"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                    List your property on HostelHub
                </h1>
                <p className="text-xl md:text-2xl text-zinc-200 mb-10 max-w-2xl font-light">
                    Join the premier student accommodation platform. Manage bookings, track interest, and maximize your occupancy with zero hassle.
                </p>
                <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full font-semibold shadow-xl">
                    <Link href="/property/create">Add Property</Link>
                </Button>
            </div>
        </section>
    );
};

const FeaturesSection: React.FC = () => {
    const features = [
        {
            title: "The Go-To Platform for Students",
            description: "HostelHub is the first stop for students seeking quality accommodations. By listing with us, you instantly tap into a massive, highly-targeted audience of verified student renters looking for exactly what you offer.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
            reversed: false
        },
        {
            title: "Cost-Effective & Better Returns",
            description: "Maximize your rental income with our streamlined processes. We minimize vacancy periods by connecting you directly with students, bypassing expensive intermediary fees and ensuring a better return on your investment.",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
            reversed: true
        },
        {
            title: "High Efficiency & Easy Management",
            description: "Manage everything from a single, intuitive dashboard. Handle booking requests, track maintenance issues, communicate with tenants, and oversee your entire property portfolio with unprecedented ease.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
            reversed: false
        }
    ];

    return (
        <section id="features" className="py-24 px-6 bg-background">
            <div className="max-w-6xl mx-auto space-y-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Why partner with HostelHub?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We provide the tools and audience you need to succeed in student housing.
                    </p>
                </div>

                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`flex flex-col gap-12 items-center ${feature.reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                    >
                        <div className="flex-1 space-y-6">
                            <h3 className="text-3xl font-bold text-foreground leading-tight">{feature.title}</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
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
                                        <p className="text-muted-foreground mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                width={48}
                                                height={48}
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
                    <CarouselPrevious />
                    <CarouselNext />

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
            answer: "They can either book directly or request a consultation through the platform. You&apos;ll receive notifications for all interactions and can respond through the dashboard."
        },
        {
            question: "Can I book a hostel online?",
            answer: "Yes. Depending on the listing, you can either book directly or schedule a consultation/inspection with the hostel management. Look for the &apos;Book Now&apos; or &apos;Schedule Visit&apos; options on the hostels of your choice."
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
                    <Button asChild size="lg" className="h-12 px-8 rounded-full font-semibold">
                        <Link href="/property/create">Get Started for free</Link>
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
