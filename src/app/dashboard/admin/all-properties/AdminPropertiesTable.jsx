"use client";

import React, { useState } from "react";
import { Button, Modal, TextField, Input } from "@heroui/react";
import {
  Home,
  Check,
  X,
  Trash2,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { deletePropertyByAdmin, updatedPropertyByAdmin } from "@/lib/actions/property";

export default function AdminPropertiesTable({ initialProperties }) {
  const [properties, setProperties] = useState(initialProperties || []);
  
  // Controlled modal display state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Structural context flags for the shared modal wrapper
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [modalActionType, setModalActionType] = useState(null); // "REJECT" | "DELETE"
  const [feedbackText, setFeedbackText] = useState("");

  const handleApprove = async (id) => {
    try {
      await updatedPropertyByAdmin(id, { status: "Approved" });
      setProperties((prev) =>
        prev.map((item) =>
          (item._id?.$oid || item._id) === id
            ? { ...item, status: "Approved", rejectionReason: null }
            : item
        )
      );
      toast.success("Property approved successfully.");
    } catch (error) {
      toast.error("Failed to approve property.");
    }
  };

  const handleOpenModal = (id, actionType) => {
    setSelectedPropertyId(id);
    setModalActionType(actionType);
    setFeedbackText("");
    setIsModalOpen(true);
  };

  const handleModalActionTrigger = async () => {
    if (modalActionType === "REJECT" && !feedbackText.trim()) {
      toast.error("Feedback confirmation notes are required for rejection.");
      return;
    }

    try {
      if (modalActionType === "REJECT") {
        await updatedPropertyByAdmin(selectedPropertyId, { 
          status: "Rejected",
          rejectionReason: feedbackText 
        });
        
        setProperties((prev) =>
          prev.map((item) =>
            (item._id?.$oid || item._id) === selectedPropertyId
              ? { ...item, status: "Rejected", rejectionReason: feedbackText }
              : item
          )
        );
        toast.success("Property request rejected with feedback notes.");
      } else if (modalActionType === "DELETE") {
        await deletePropertyByAdmin(selectedPropertyId);
        
        setProperties((prev) =>
          prev.filter((item) => (item._id?.$oid || item._id) !== selectedPropertyId)
        );
        toast.success("Property permanently dropped from system logs.");
      }

      setFeedbackText("");
      setModalActionType(null);
      setSelectedPropertyId(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        `Failed to execute system action: ${modalActionType?.toLowerCase()}`
      );
    }
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-16 bg-transparent">
        <p className="text-sm text-slate-400 font-mono">
          No properties found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 max-w-full">
      <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90">
              <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Property Info
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Specs & Space
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Financial Valuation
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Ownership Context
              </th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Verification State
              </th>
              <th className="py-4 px-6 text-right text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Action Nodes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-transparent">
            {properties.map((item) => {
              const targetId = item._id?.$oid || item._id;
              return (
                <tr 
                  key={targetId} 
                  className="hover:bg-cyan-950/20 transition-all duration-200 group"
                >
                  {/* Property Info */}
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-950/50 text-cyan-400 rounded-lg border border-cyan-500/30 shrink-0">
                        <Home className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-100 tracking-wide text-sm line-clamp-1 block group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="size-3 text-cyan-400" /> {item.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Specs & Space */}
                  <td className="py-4 px-4 align-middle">
                    <div className="text-[11px] text-slate-300 font-mono space-y-0.5">
                      <span className="block">
                        {item.propertyType} • {item.rentType}
                      </span>
                      <span className="text-slate-500 block">
                        {item.bedrooms} Beds / {item.bathrooms} Baths • {item.propertySize} sqft
                      </span>
                    </div>
                  </td>

                  {/* Financial Valuation */}
                  <td className="py-4 px-4 align-middle">
                    <span className="text-sm font-black font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]">
                      ${item.price?.toLocaleString() || item.rentPrice?.toLocaleString()}
                    </span>
                  </td>

                  {/* Ownership Context */}
                  <td className="py-4 px-4 align-middle">
                    <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                      <span className="block text-slate-300 line-clamp-1">
                        {item.ownerEmail}
                      </span>
                    </div>
                  </td>

                  {/* Verification State */}
                  <td className="py-4 px-4 align-middle">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border uppercase tracking-wider whitespace-nowrap ${
                        item.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : item.status === "Rejected"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}>
                        {item.status === "Approved" ? (
                          <CheckCircle className="size-3" />
                        ) : item.status === "Rejected" ? (
                          <XCircle className="size-3" />
                        ) : (
                          <Clock className="size-3" />
                        )}
                        {item.status || "Pending"}
                      </span>
                    </div>
                  </td>

                  {/* Action Nodes */}
                  <td className="py-4 px-6 text-right align-middle">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status === "Pending" && (
                        <>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onPress={() => handleApprove(targetId)}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/10 rounded-lg cursor-pointer"
                          >
                            <Check className="size-3.5" />
                          </Button>

                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onPress={() => handleOpenModal(targetId, "REJECT")}
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/10 rounded-lg cursor-pointer"
                          >
                            <X className="size-3.5" />
                          </Button>
                        </>
                      )}

                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleOpenModal(targetId, "DELETE")}
                        className="bg-white/5 hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-white/5 hover:border-rose-500/20 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Controlled Confirmation Modal Wrapper */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto" className="dark text-slate-200">
            <Modal.Dialog className="sm:max-w-md bg-[#0c0c14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <Modal.CloseTrigger className="text-slate-400 hover:text-slate-200" />

              <Modal.Header className={`border-b border-white/5 p-6 flex gap-2 items-center font-bold ${
                modalActionType === "DELETE" ? "text-rose-500" : "text-amber-400"
              }`}>
                <AlertTriangle className="size-5" />
                {modalActionType === "DELETE" ? "Confirm Property Removal" : "Collect Rejection Feedback"}
              </Modal.Header>

              <Modal.Body className="p-6 space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  {modalActionType === "DELETE"
                    ? "Are you sure you want to permanently delete this property listing? This action cannot be undone."
                    : "Provide descriptive remarks explaining why this property listing fails guidelines. Owners will see this feedback inside their tracking view."}
                </p>
                
                {modalActionType === "REJECT" && (
                  <TextField className="w-full" variant="secondary">
                    <Input
                      placeholder="Input explanatory tracking notes here..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="bg-[#06060a] border border-white/10 hover:border-white/20 focus:border-amber-500/50 text-slate-200 text-sm rounded-xl px-3 py-2 w-full min-h-[80px]"
                    />
                  </TextField>
                )}
              </Modal.Body>

              <Modal.Footer className="border-t border-white/5 p-4 flex justify-end gap-2 bg-[#09090f]">
                <Button
                  slot="close"
                  variant="secondary"
                  className="bg-white/5 text-slate-400 hover:bg-white/10 rounded-lg cursor-pointer text-xs h-9"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleModalActionTrigger}
                  className={`font-semibold rounded-lg cursor-pointer text-xs h-9 border ${
                    modalActionType === "DELETE"
                      ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20"
                      : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {modalActionType === "DELETE" ? "Permanently Erase" : "Log Rejection"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}