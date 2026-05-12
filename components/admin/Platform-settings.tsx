"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlatformSettingsToggle() {
  const [allowAgents, setAllowAgents] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial settings
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setAllowAgents(data.allowAgents))
      .catch((err) => {
        console.error("Failed to fetch settings", err);
        setError("Could not load settings.");
      });
  }, []);

  const handleToggle = async () => {
    if (allowAgents === null) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allowAgents: !allowAgents }),
      });

      if (!res.ok) {
        throw new Error("Failed to update settings");
      }

      const data = await res.json();
      setAllowAgents(data.allowAgents);
    } catch (err) {
      console.error(err);
      setError("Failed to update setting.");
    } finally {
      setLoading(false);
    }
  };

  if (allowAgents === null && !error) {
    return <div className="animate-pulse h-32 bg-muted rounded-lg" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Settings</CardTitle>
        <CardDescription>
          Global controls for the HostelHub platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <div>
            <p className="font-medium">Allow Agents</p>
            <p className="text-sm text-muted-foreground">
              When disabled, new users cannot register as agents and agent features are restricted.
            </p>
          </div>
          <Button 
            variant={allowAgents ? "default" : "secondary"} 
            onClick={handleToggle}
            disabled={loading}
          >
            {loading ? "Updating..." : allowAgents ? "Enabled" : "Disabled"}
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
