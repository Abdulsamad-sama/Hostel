"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PlatformSettingsToggle from "@/components/admin/Platform-settings";
import AdminPropertiesList from "@/components/admin/Properties-list";
import UserManagement from "@/components/admin/User-management";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  TrendingUp,
  ClipboardCheck,
  Clock,
  CreditCard,
} from "lucide-react";

type AdminStats = {
  totalUsers: number;
  totalProperties: number;
  pendingProperties: number;
  approvedProperties: number;
  totalBookings: number;
  totalRevenue: number;
};

type AdminDashboardClientProps = {
  user: { id: string; name: string; role: string };
};

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <Card className="relative overflow-hidden border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
          </div>
          <div className={`p-3 rounded-xl ${accent}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const defaultStats: AdminStats = {
  totalUsers: 0,
  totalProperties: 0,
  pendingProperties: 0,
  approvedProperties: 0,
  totalBookings: 0,
  totalRevenue: 0,
};

export default function AdminDashboardClient({
  user,
}: AdminDashboardClientProps) {
  const [stats, setStats] = useState<AdminStats>(defaultStats);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => console.error("[AdminDashboard] Stats fetch error:", err))
      .finally(() => setStatsLoading(false));
  }, []);

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Signed in as{" "}
            <span className="font-semibold text-foreground">{user.name}</span> · ADMIN
          </p>
        </div>
        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          <LayoutDashboard className="h-3.5 w-3.5" />
          Platform Control Centre
        </span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full sm:w-auto flex overflow-x-auto">
          <TabsTrigger value="overview" className="gap-1.5 flex-1 sm:flex-none">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="approvals" className="gap-1.5 flex-1 sm:flex-none">
            <ClipboardCheck className="h-4 w-4" />
            Approvals
            {stats.pendingProperties > 0 && (
              <span className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {stats.pendingProperties}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-1.5 flex-1 sm:flex-none">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-1.5 flex-1 sm:flex-none">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* ── Overview ── */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {statsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-28 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                sub="All registered accounts"
                icon={Users}
                accent="bg-blue-500/10 text-blue-500"
              />
              <StatCard
                title="Total Properties"
                value={stats.totalProperties}
                sub={`${stats.approvedProperties} approved · ${stats.pendingProperties} pending`}
                icon={Building2}
                accent="bg-violet-500/10 text-violet-500"
              />
              <StatCard
                title="Total Bookings"
                value={stats.totalBookings}
                sub="Across all properties"
                icon={ClipboardCheck}
                accent="bg-emerald-500/10 text-emerald-500"
              />
              <StatCard
                title="Total Revenue"
                value={formatCurrency(stats.totalRevenue)}
                sub="Paid & partial bookings"
                icon={CreditCard}
                accent="bg-amber-500/10 text-amber-500"
              />
            </div>
          )}

          {/* Pending approvals callout */}
          {stats.pendingProperties > 0 && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {stats.pendingProperties} listing
                    {stats.pendingProperties !== 1 ? "s" : ""} awaiting approval
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Switch to the <strong>Approvals</strong> tab to review and moderate them.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Platform Snapshot</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border text-sm">
                {[
                  { label: "Approval rate", value: stats.totalProperties > 0 ? `${Math.round((stats.approvedProperties / stats.totalProperties) * 100)}%` : "—" },
                  { label: "Pending listings", value: stats.pendingProperties },
                  { label: "Approved listings", value: stats.approvedProperties },
                  { label: "Total bookings placed", value: stats.totalBookings },
                  { label: "Confirmed revenue", value: formatCurrency(stats.totalRevenue) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-3">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Approvals ── */}
        <TabsContent value="approvals" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Property Approvals
              </CardTitle>
              <CardDescription>
                Review and moderate all hostel listings before they go live.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminPropertiesList />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Users ── */}
        <TabsContent value="users" className="mt-6">
          <UserManagement currentUser={{ id: user.id, role: user.role }} />
        </TabsContent>

        {/* ── Settings ── */}
        <TabsContent value="settings" className="mt-6 space-y-4">
          <PlatformSettingsToggle />
        </TabsContent>
      </Tabs>
    </div>
  );
}
