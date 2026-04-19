"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  MapPin,
  CalendarDays,
  BedDouble,
  Users2,
  ArrowRight,
  Menu,
  X,
  Check,
  Home,
  CreditCard,
  FileText,
  DollarSign,
  MessageSquare,
  Mail,
  Phone,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SearchForm from '@/components/shared/Search-section';

// Utility function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};


// Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 bg-gradient-to-br from-primary/10 via-background to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >

        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
          <span className="text-xs text-muted-foreground">
            Streamline Your Hostel Management
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Manage Your Hostel with{" "}
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ease & Efficiency
          </span>
        </h1>

        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Complete hostel management solution for tenants and administrators. Pay rent, track payments, file complaints, and manage everything in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="w-full sm:w-auto">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            View Demo
          </Button>
        </div>


        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=600&fit=crop"
            alt="Hostel management dashboard preview"
            className="w-full h-auto rounded-lg shadow-2xl border border-border"
          />
        </div>
      </motion.div>
    </section>
  );
};

// Features Section
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "Easy Rent Payment",
      description: "Pay your rent online securely with multiple payment options. Get instant receipts and payment confirmations."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Payment Tracking",
      description: "Track all your payments in one place. View payment history, pending dues, and download statements anytime."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "File Complaints",
      description: "Report maintenance issues or concerns directly through the platform. Track complaint status in real-time."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Digital Documents",
      description: "Access your lease agreements, receipts, and important documents digitally. No more paper hassles."
    },
    {
      icon: <Home className="h-8 w-8 text-primary" />,
      title: "Room Management",
      description: "View room details, amenities, and occupancy information. Request room changes or upgrades easily."
    },
    {
      icon: <Users2 className="h-8 w-8 text-primary" />,
      title: "Tenant Portal",
      description: "Dedicated portal for tenants with personalized dashboard, notifications, and quick access to all features."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive features designed to make hostel management simple and efficient for everyone.
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
      name: "Emily Rodriguez",
      role: "Tenant",
      content: "As a tenant, I appreciate how easy it is to pay rent and report issues. The platform is intuitive and responsive.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    }
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied hostel managers and tenants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How do I pay my rent?",
      answer: "Simply log into your tenant portal, navigate to the payments section, and choose your preferred payment method. You'll receive an instant receipt upon successful payment."
    },
    {
      question: "Can I track my payment history?",
      answer: "Yes! All your payment history is available in your dashboard. You can view, download, and print receipts for any past payment."
    },
    {
      question: "How do I file a complaint?",
      answer: "Go to the complaints section in your portal, describe your issue, and submit. You'll receive updates on the status of your complaint in real-time."
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
    <section id="faq" className="py-24 px-6 bg-muted/30">
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
              <AccordionTrigger className="text-left">
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

// Contact Section
const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                    <Textarea
                      placeholder="Your message..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">support@hostelhub.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Office</h3>
                    <p className="text-muted-foreground">123 Business Street<br />San Francisco, CA 94102</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// // Footer
// const Footer: React.FC = () => {
// return (
//     <footer className="bg-muted/50 border-t border-border py-12 px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Home className="h-6 w-6 text-primary" />
//               <span className="text-xl font-bold text-foreground">HostelHub</span>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               Complete hostel management solution for modern living.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-semibold text-foreground mb-4">Product</h3>
//             <ul className="space-y-2">
//               <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
//               <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></li>
//               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Demo</a></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-foreground mb-4">Support</h3>
//             <ul className="space-y-2">
//               <li><a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a></li>
//               <li><a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
//               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</a></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-foreground mb-4">Legal</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
//               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-border pt-8 text-center">
//           <p className="text-sm text-muted-foreground">
//             © 2024 HostelHub. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// Main Component
const HostelWebApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <SearchForm />
      <HeroSection />
      <FeaturesSection />
      {/* <PricingSection /> */}
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      {/* <Footer /> */}
    </div>
  );
};

export default HostelWebApp;
