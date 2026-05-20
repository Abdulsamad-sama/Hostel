"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Trash2, 
  UserCheck, 
  ShieldAlert, 
  Users, 
  RefreshCw, 
  AlertCircle 
} from "lucide-react";
import type { UserRole } from "@/types";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  image?: string | null;
};

type UserManagementProps = {
  currentUser: {
    id: string;
    role: string;
  };
};

export default function UserManagement({ currentUser }: UserManagementProps) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not retrieve user records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdatingId(userId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update role");
      }

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setUpdatingId(userId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setDeletingId(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to delete user.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "OWNER":
        return "default";
      case "AGENT":
        return "outline";
      case "OCCUPANT":
        return "secondary";
      case "GUEST":
      default:
        return "outline";
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "OWNER":
        return "bg-violet-500/10 text-violet-500 border-violet-500/20";
      case "AGENT":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "OCCUPANT":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "GUEST":
      default:
        return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Directory
            </CardTitle>
            <CardDescription>
              Manage platform members, assign user roles, and moderate access.
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUsers} 
            disabled={loading}
            className="self-start md:self-auto gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full sm:w-[200px]">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="OWNER">OWNER</SelectItem>
                <SelectItem value="AGENT">AGENT</SelectItem>
                <SelectItem value="OCCUPANT">OCCUPANT</SelectItem>
                <SelectItem value="GUEST">GUEST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {/* User list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg border-border">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-3 animate-bounce" />
            <p className="font-semibold text-lg">No members found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search criteria or role filters.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border font-medium text-muted-foreground">
                    <th className="p-4">User</th>
                    <th className="p-4">Current Role</th>
                    <th className="p-4">Date Joined</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => {
                    const isSelf = user.id === currentUser.id;
                    const isAdminUser = user.role === "ADMIN";
                    const canModify = !isSelf && !isAdminUser;

                    return (
                      <tr key={user.id} className="hover:bg-accent/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border border-border"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                {user.name.substring(0, 2)}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-foreground flex items-center gap-1.5">
                                {user.name}
                                {isSelf && (
                                  <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                                    You
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Role Select */}
                            <div className="w-[140px] text-left">
                              <Select
                                disabled={!canModify || updatingId === user.id}
                                value={user.role}
                                onValueChange={(val) => handleRoleChange(user.id, val as UserRole)}
                              >
                                <SelectTrigger className="h-8 py-0">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="GUEST">GUEST</SelectItem>
                                  <SelectItem value="OCCUPANT">OCCUPANT</SelectItem>
                                  <SelectItem value="OWNER">OWNER</SelectItem>
                                  <SelectItem value="AGENT">AGENT</SelectItem>
                                  <SelectItem value="ADMIN" disabled>ADMIN</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Delete Action */}
                            {deletingId === user.id ? (
                              <div className="flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="h-8 px-2"
                                  onClick={() => handleDeleteUser(user.id)}
                                  disabled={updatingId === user.id}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2"
                                  onClick={() => setDeletingId(null)}
                                  disabled={updatingId === user.id}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                disabled={!canModify || updatingId === user.id}
                                onClick={() => setDeletingId(user.id)}
                                title="Delete user"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Grid View */}
            <div className="md:hidden space-y-4">
              {filteredUsers.map((user) => {
                const isSelf = user.id === currentUser.id;
                const isAdminUser = user.role === "ADMIN";
                const canModify = !isSelf && !isAdminUser;

                return (
                  <Card key={user.id} className="border border-border">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-10 h-10 rounded-full border border-border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm uppercase">
                              {user.name.substring(0, 2)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-foreground flex items-center gap-1.5">
                              {user.name}
                              {isSelf && (
                                <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full font-semibold">
                                  You
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-border pt-3">
                        <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>

                      {canModify && (
                        <div className="flex items-center justify-end gap-2 pt-2">
                          <div className="w-full sm:w-[150px]">
                            <Select
                              disabled={updatingId === user.id}
                              value={user.role}
                              onValueChange={(val) => handleRoleChange(user.id, val as UserRole)}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="GUEST">GUEST</SelectItem>
                                <SelectItem value="OCCUPANT">OCCUPANT</SelectItem>
                                <SelectItem value="OWNER">OWNER</SelectItem>
                                <SelectItem value="AGENT">AGENT</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {deletingId === user.id ? (
                            <div className="flex items-center gap-1 animate-in fade-in zoom-in-95">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={updatingId === user.id}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setDeletingId(null)}
                                disabled={updatingId === user.id}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="icon"
                              variant="outline"
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              disabled={updatingId === user.id}
                              onClick={() => setDeletingId(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
