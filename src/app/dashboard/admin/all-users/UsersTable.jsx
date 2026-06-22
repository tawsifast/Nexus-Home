"use client";

import React, { useState } from "react";
import { Table, Button, AlertDialog } from "@heroui/react";
import { ShieldAlert, User, Building, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { updateUsersRole } from "@/lib/actions/user";

export default function UsersTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);

  // Track state context for the active confirmation dialog interaction
  const [pendingAction, setPendingAction] = useState(null);
  const [isMutating, setIsMutating] = useState(false);

  // Triggered when a quick action node button is pressed
  const initiateRoleChange = (userId, userName, currentRole, newRole) => {
    // If clicking the role they already have, bypass entirely
    if (currentRole === newRole) return;

    setPendingAction({
      userId,
      userName,
      newRole,
    });
  };

  // Triggered when confirmed inside the HeroUI AlertDialog wrapper
  const handleConfirmRoleChange = async () => {
    if (!pendingAction) return;

    const { userId, newRole } = pendingAction;
    setIsMutating(true);

    try {
      // Execute live Database State sync via Server Action
      await updateUsersRole(userId, newRole);

      // Sync Client View Layer state map using standardized normalization fallbacks
      setUsers((prev) =>
        prev.map((user) => {
          const currentId = user._id?.$oid || user._id || user.id;
          return currentId === userId ? { ...user, role: newRole } : user;
        })
      );

      toast.success(`Role updated to ${newRole} successfully.`);
    } catch (error) {
      console.error("Role update failed:", error);
      toast.error("Failed to update user role.");
    } finally {
      setIsMutating(false);
      setPendingAction(null); // Clear context & drop dialog state
    }
  };

  return (
    <div className="bg-[#09090f] border border-white/5 rounded-xl overflow-hidden shadow-2xl p-6">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-bold text-slate-200">System User Directory</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage system privileges, authorization contexts, and active user credentials with secure authorization verification.
        </p>
      </div>

      <Table aria-label="Global User Management Ledger">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="User Data List Map"
            className="min-w-[750px]"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-white/2 text-slate-400 font-semibold text-xs py-4 px-6 border-b border-white/5"
              >
                Name
              </Table.Column>
              <Table.Column className="bg-white/2 text-slate-400 font-semibold text-xs py-4 px-4 border-b border-white/5">
                Email
              </Table.Column>
              <Table.Column className="bg-white/2 text-slate-400 font-semibold text-xs py-4 px-4 border-b border-white/5">
                Current Status Badge
              </Table.Column>
              <Table.Column className="bg-white/2 text-slate-400 font-semibold text-xs py-4 px-6 text-right border-b border-white/5">
                Quick Role Action Node
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => {
                const targetId = user._id?.$oid || user._id || user.id;
                const activeRole = user.role || "tenant";

                return (
                  <Table.Row
                    key={targetId}
                    className="border-b border-white/2 hover:bg-white/1 transition-colors"
                  >
                    <Table.Cell className="py-4 px-6 text-slate-200 font-medium text-sm">
                      {user.name || "Unknown User"}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4 text-slate-400 font-mono text-xs tracking-tight">
                      {user.email}
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          activeRole === "admin"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : activeRole === "Owner"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {activeRole}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Tenant Trigger Button */}
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => initiateRoleChange(targetId, user.name, activeRole, "tenant")}
                          className={`px-3 h-8 text-xs font-medium rounded-lg cursor-pointer border flex items-center gap-1 transition-all ${
                            activeRole === "Tenant"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)]"
                              : "bg-white/2 text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-300"
                          }`}
                        >
                          <User className="size-3 shrink-0" />
                          Tenant
                        </Button>

                        {/* Owner Trigger Button */}
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => initiateRoleChange(targetId, user.name, activeRole, "owner")}
                          className={`px-3 h-8 text-xs font-medium rounded-lg cursor-pointer border flex items-center gap-1 transition-all ${
                            activeRole === "Owner"
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.05)]"
                              : "bg-white/2 text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-300"
                          }`}
                        >
                          <Building className="size-3 shrink-0" />
                          Owner
                        </Button>

                        {/* Admin Trigger Button */}
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => initiateRoleChange(targetId, user.name, activeRole, "admin")}
                          className={`px-3 h-8 text-xs font-medium rounded-lg cursor-pointer border flex items-center gap-1 transition-all ${
                            activeRole === "Admin"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.05)]"
                              : "bg-white/2 text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-300"
                          }`}
                        >
                          <ShieldAlert className="size-3 shrink-0" />
                          Admin
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* HeroUI Custom Confirmation Portal Root Node using your strict structure format */}
      <AlertDialog 
        isOpen={!!pendingAction} 
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <AlertDialog.Backdrop className="bg-black/60 backdrop-blur-sm" variant="blur">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[420px] bg-[#0c0c14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-200 dark">
              <AlertDialog.CloseTrigger className="text-slate-400 hover:text-white transition-colors" />
              
              <AlertDialog.Header className="flex items-center gap-3 p-5 border-b border-white/5">
                <AlertDialog.Icon className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="size-5" />
                </AlertDialog.Icon>
                <AlertDialog.Heading className="text-base font-semibold tracking-tight text-slate-100">
                  Confirm Security Role Change
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body className="p-5 text-sm text-slate-400 leading-relaxed">
                <p>
                  Are you sure you want to update the privileges for{" "}
                  <strong className="text-slate-200 font-semibold">{pendingAction?.userName || "this account"}</strong>? 
                  This user will immediately inherit all permissions assigned to the{" "}
                  <span className="text-cyan-400 font-mono text-xs font-bold uppercase px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/10 rounded">
                    {pendingAction?.newRole}
                  </span>{" "}
                  group layer.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer className="bg-white/1 px-5 py-4 flex items-center justify-end gap-2 border-t border-white/5">
                <Button 
                  slot="close"
                  variant="tertiary" 
                  className="bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-medium px-4 h-9 cursor-pointer transition-colors"
                  onPress={() => setPendingAction(null)}
                  isDisabled={isMutating}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg rounded-xl text-xs font-semibold px-4 h-9 cursor-pointer transition-all"
                  onPress={handleConfirmRoleChange}
                  isLoading={isMutating}
                >
                  Confirm Update
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}