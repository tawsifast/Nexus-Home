"use client";

import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  FieldError,
} from "@heroui/react";
import { Edit2, Trash2, Home, Eye, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { updatedProperty } from "@/lib/actions/property";
import { deleteOwnerBooking } from "@/lib/actions/ownerBooking";

export default function PropertiesTable({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties || []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState("");
  const [feedbackPropertyTitle, setFeedbackPropertyTitle] = useState("");

  const getItemId = (item) => item?._id?.$oid || item?._id || item?.id;

  const handleDelete = async (id) => {
    try {
      await deleteOwnerBooking(id);
      setProperties(properties.filter((item) => getItemId(item) !== id));
      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete property.");
    }
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsOpen(true);
  };

  const handleViewFeedback = (property) => {
    setFeedbackPropertyTitle(property.title || "Property");
    setFeedbackReason(property.rejectionReason || "No feedback reason provided by administration.");
    setIsFeedbackOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const propertyId = getItemId(selectedProperty);

    const updatedData = {
      ...selectedProperty,
      title: rawData.title,
      description: rawData.description,
      location: rawData.location,
      propertyType: rawData.propertyType || selectedProperty.propertyType,
      price: Number(rawData.price),
      rentType: rawData.rentType || selectedProperty.rentType,
      bedrooms: Number(rawData.bedrooms),
      bathrooms: Number(rawData.bathrooms),
      propertySize: rawData.propertySize,
      amenities: rawData.amenities
        ? rawData.amenities.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      images: rawData.imageUrls,
      extraFeatures: rawData.extraFeatures,
    };

    try {
      const res = await updatedProperty(propertyId, updatedData);
      if (!res?.acknowledged && !res?.success) {
        toast.error("Update failed!");
        return;
      }
      setProperties(properties.map((item) => getItemId(item) === propertyId ? updatedData : item));
      toast.success("Property updated successfully!");
      setIsOpen(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border shadow-[0_0_8px_rgba(16,185,129,0.15)]";
      case "rejected":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400 text-xs px-2.5 py-1 rounded-full font-bold border shadow-[0_0_8px_rgba(244,63,94,0.15)]";
      default:
        return "bg-amber-500/10 border-amber-500/30 text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold border shadow-[0_0_8px_rgba(245,158,11,0.15)]";
    }
  };

  // লাইটার ম্যাট ইনপুট স্টাইল ভ্যারিয়েবল
  const inputContainerStyles = "[&_input]:bg-[#1a1a26] [&_input]:text-white [&_input]:border-white/10 [&_input]:rounded-xl [&_label]:text-slate-200 [&_label]:font-semibold [&_label]:text-xs [&_label]:mb-1.5 [&_textarea]:bg-[#1a1a26] [&_textarea]:text-white [&_textarea]:border-white/10 [&_textarea]:rounded-xl focus-within:[&_input]:border-cyan-400/50 focus-within:[&_textarea]:border-purple-500/50 transition-all";

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400 border border-dashed border-white/10 bg-[#161622]/30 rounded-xl font-medium">
        No properties available in your repository.
      </div>
    );
  }

  return (
    <>
      {/* 🛠️ স্ট্যান্ডার্ড এইচটিএমএল টেবিল উইথ রেসপন্সিভ স্ক্রোল র‍্যাপার ও হাইলাইটেড রাইটিং */}
      <div className="w-full overflow-x-auto bg-[#09090f] border border-white/5 rounded-xl shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="bg-[#1a1a26] border-b border-white/10">
              <th className="text-slate-200 font-bold text-xs py-4 px-6 uppercase tracking-wider">Property Title</th>
              <th className="text-slate-200 font-bold text-xs py-4 px-4 uppercase tracking-wider">Location</th>
              <th className="text-slate-200 font-bold text-xs py-4 px-4 uppercase tracking-wider">Type</th>
              <th className="text-slate-200 font-bold text-xs py-4 px-4 uppercase tracking-wider">Rent Price</th>
              <th className="text-slate-200 font-bold text-xs py-4 px-4 uppercase tracking-wider">Status</th>
              <th className="text-slate-200 font-bold text-xs py-4 px-6 text-right uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item) => {
              const itemId = getItemId(item);
              const isRejected = item.status?.toLowerCase() === "rejected";

              return (
                <tr 
                  key={itemId} 
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-200"
                >
                  {/* Property Title - Highlighted */}
                  <td className="py-4 px-6 text-slate-100 font-bold tracking-wide text-sm">
                    {item.title}
                  </td>
                  
                  {/* Location - Highlighted */}
                  <td className="py-4 px-4 text-slate-300 font-semibold text-sm">
                    {item.location}
                  </td>
                  
                  {/* Type */}
                  <td className="py-4 px-4 text-slate-400 text-sm font-medium">
                    {item.propertyType}
                  </td>
                  
                  {/* Rent Price - Bold Cyan Highlight */}
                  <td className="py-4 px-4 text-cyan-400 font-extrabold text-sm font-mono">
                    ${item.price?.toLocaleString()} /{" "}
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {item.rentType}
                    </span>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className={getStatusStyle(item.status)}>
                        {item.status || "Pending"}
                      </span>
                      {isRejected && (
                        <button
                          onClick={() => handleViewFeedback(item)}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all cursor-pointer"
                          title="View Rejection Feedback"
                        >
                          <Eye size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                  
                  {/* Action Trigger Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="none"
                        className="text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 rounded-lg font-bold text-xs px-3 h-8 cursor-pointer transition-all"
                        onClick={() => handleEditClick(item)}
                      >
                        <Edit2 size={13} className="mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="none"
                        className="text-rose-400 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 rounded-lg font-bold text-xs px-3 h-8 cursor-pointer transition-all"
                        onClick={() => handleDelete(itemId)}
                      >
                        <Trash2 size={13} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* আপডেট মোডাল */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="backdrop-blur-md bg-black/60">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-2xl bg-[#12121a] text-left border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              <Modal.CloseTrigger className="cursor-pointer text-slate-400 hover:text-white" onClick={() => setIsOpen(false)} />
              
              <Modal.Header className="border-b border-white/5 pb-4">
                <Modal.Icon className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl">
                  <Home className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-white text-base font-bold">
                  Update Asset Information
                </Modal.Heading>
                <p className="mt-1 text-xs text-slate-400">
                  Modify the configuration matrix logs below to alter asset structures.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
                {selectedProperty && (
                  <form id="update-property-form" className="flex flex-col gap-4" onSubmit={handleUpdateSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField isRequired name="title" defaultValue={selectedProperty.title} className={inputContainerStyles}>
                        <Label>Property Title</Label>
                        <Input />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>
                      <TextField isRequired name="location" defaultValue={selectedProperty.location} className={inputContainerStyles}>
                        <Label>Location / Address</Label>
                        <Input />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>
                    </div>

                    <TextField isRequired name="description" defaultValue={selectedProperty.description} className={inputContainerStyles}>
                      <Label>Description</Label>
                      <TextArea rows={3} />
                      <FieldError className="text-xs text-rose-400 mt-1" />
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={inputContainerStyles}>
                        <Label className="text-xs font-semibold text-slate-200 mb-1.5 block">Property Type</Label>
                        <Select name="propertyType" placeholder="Select Type" defaultValue={selectedProperty.propertyType}>
                          <Select.Trigger className="bg-[#1a1a26] text-white border-white/10 rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover className="bg-[#12121a] border border-white/10 text-white rounded-xl">
                            <ListBox className="p-1">
                              {["Apartment", "Duplex Villa", "Studio Flat", "Commercial Space"].map(t => (
                                <ListBox.Item key={t} id={t.split(" ")[0]} textValue={t} className="rounded-lg text-slate-200 hover:bg-white/5 hover:text-white cursor-pointer px-3 py-2 text-xs">
                                  {t} <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      <TextField isRequired name="price" type="number" defaultValue={selectedProperty.price} className={inputContainerStyles}>
                        <Label>Rent Price ($)</Label>
                        <Input />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>

                      <div className={inputContainerStyles}>
                        <Label className="text-xs font-semibold text-slate-200 mb-1.5 block">Rent Type</Label>
                        <Select name="rentType" placeholder="Select Period" defaultValue={selectedProperty.rentType}>
                          <Select.Trigger className="bg-[#1a1a26] text-white border-white/10 rounded-xl">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover className="bg-[#12121a] border border-white/10 text-white rounded-xl">
                            <ListBox className="p-1">
                              {["Monthly", "Weekly", "Daily"].map(p => (
                                <ListBox.Item key={p} id={p} textValue={p} className="rounded-lg text-slate-200 hover:bg-white/5 hover:text-white cursor-pointer px-3 py-2 text-xs">
                                  {p} <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <TextField isRequired name="bedrooms" type="number" defaultValue={selectedProperty.bedrooms} className={inputContainerStyles}>
                        <Label>Bedrooms</Label>
                        <Input min={0} />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>
                      <TextField isRequired name="bathrooms" type="number" defaultValue={selectedProperty.bathrooms} className={inputContainerStyles}>
                        <Label>Bathrooms</Label>
                        <Input min={0} />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>
                      <TextField isRequired name="propertySize" defaultValue={selectedProperty.propertySize} className={inputContainerStyles}>
                        <Label>Property Size</Label>
                        <Input />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField name="amenities" defaultValue={Array.isArray(selectedProperty.amenities) ? selectedProperty.amenities.join(", ") : selectedProperty.amenities || ""} className={inputContainerStyles}>
                        <Label>Amenities (Comma Separated)</Label>
                        <Input />
                      </TextField>
                      <TextField isRequired name="imageUrls" defaultValue={Array.isArray(selectedProperty.images) ? selectedProperty.images.join(", ") : selectedProperty.images || ""} className={inputContainerStyles}>
                        <Label>Image URLs (Comma Separated)</Label>
                        <Input />
                        <FieldError className="text-xs text-rose-400 mt-1" />
                      </TextField>
                    </div>

                    <TextField name="extraFeatures" defaultValue={selectedProperty.extraFeatures} className={inputContainerStyles}>
                      <Label>Extra Features / Notes</Label>
                      <Input />
                    </TextField>
                  </form>
                )}
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5 p-4 flex justify-end gap-2 bg-[#161622]/50">
                <Button variant="none" className="cursor-pointer border border-white/10 rounded-xl text-slate-300 text-xs font-semibold hover:bg-white/5 px-4 h-9" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="update-property-form" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/10 px-5 h-9 cursor-pointer">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* রিজেকশন ফিডব্যাক মোডাল */}
      <Modal isOpen={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <Modal.Backdrop className="backdrop-blur-md bg-black/60">
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-[#12121a] text-left border border-rose-500/30 rounded-2xl shadow-2xl">
              <Modal.CloseTrigger className="cursor-pointer text-slate-400 hover:text-white" onClick={() => setIsFeedbackOpen(false)} />
              <Modal.Header className="pb-2">
                <Modal.Icon className="bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
                  <AlertCircle className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-white text-base font-bold">
                  Rejection Analysis Log
                </Modal.Heading>
                <p className="mt-1 text-xs text-slate-400">
                  Review comments for: <span className="text-cyan-400 font-bold">{feedbackPropertyTitle}</span>
                </p>
              </Modal.Header>
              <Modal.Body className="p-4 text-sm text-slate-200 leading-relaxed bg-[#1a1a26] rounded-xl border border-white/10 m-5">
                <p className="whitespace-pre-wrap font-semibold font-sans text-xs">{feedbackReason}</p>
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5 p-4 flex justify-end bg-[#161622]/50">
                <Button
                  variant="none"
                  className="bg-rose-600/90 text-white hover:bg-rose-600 font-bold text-xs rounded-xl px-4 h-9 transition-colors cursor-pointer"
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  Close Review
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}