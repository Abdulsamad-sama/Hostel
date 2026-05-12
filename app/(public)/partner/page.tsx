import Header from "@/components/layout/Header";

export default function PartnerPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
            <Header logoText="Partners" />
            <div className="max-w-2xl text-center px-6">
                <h1 className="text-4xl font-bold mb-6">Become a Partner</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    Partner with HostelHub to reach more students and grow your accommodation business.
                </p>
                <div className="p-8 border rounded-lg bg-card text-card-foreground">
                    <p>Contact forms and partnership details will go here.</p>
                </div>
            </div>
        </div>
    );
}
