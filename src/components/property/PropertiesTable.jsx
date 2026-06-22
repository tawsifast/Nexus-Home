"use client";

import React, { useState } from "react";
import {
  Table,
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
  
  // State for Rejection Feedback Modal
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState("");
  const [feedbackPropertyTitle, setFeedbackPropertyTitle] = useState("");

  // Helper function to extract ID easily
  const getItemId = (item) => item?._id?.$oid || item?._id || item?.id;

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await deleteOwnerBooking(id);
      setProperties(properties.filter((item) => getItemId(item) !== id));
      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete property.");
    }
  };

  // এডিট বাটন ক্লিক হ্যান্ডলার
  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsOpen(true);
  };

  // রিজেকশন ফিডব্যাক দেখার হ্যান্ডলার
  const handleViewFeedback = (property) => {
    setFeedbackPropertyTitle(property.title || "Property");
    setFeedbackReason(property.rejectionReason || "No feedback reason provided by administration.");
    setIsFeedbackOpen(true);
  };

  // আপডেট ফর্ম সাবমিট হ্যান্ডলার
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const propertyId = getItemId(selectedProperty);

    const updatedData = {
      ...selectedProperty, // Keep metadata intact (like status, rejectionReason)
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
        ? rawData.amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
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

      setProperties(
        properties.map((item) =>
          getItemId(item) === propertyId ? updatedData : item
        )
      );

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
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold border";
      case "rejected":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400 text-xs px-2.5 py-1 rounded-full font-semibold border";
      default:
        return "bg-amber-500/10 border-amber-500/30 text-amber-400 text-xs px-2.5 py-1 rounded-full font-semibold border";
    }
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400 border border-dashed border-white/5 rounded-xl">
        No properties found.
      </div>
    );
  }

  return (
    <>
      <Table aria-label="Properties List Table">
        <Table.ScrollContainer>
          <Table.Content className="min-w-175" aria-label="Owner Properties Layout">
            <Table.Header>
              <Table.Column isRowHeader>Property Title</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Rent Price</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column align="end">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {properties.map((item) => {
                const itemId = getItemId(item);
                const isRejected = item.status?.toLowerCase() === "rejected";

                return (
                  <Table.Row
                    key={itemId}
                    className="hover:bg-transparent data-[hovered=true]:bg-transparent transition-none"
                  >
                    <Table.Cell className="font-medium text-slate-200">
                      {item.title}
                    </Table.Cell>
                    <Table.Cell className="text-slate-400">
                      {item.location}
                    </Table.Cell>
                    <Table.Cell className="text-slate-400">
                      {item.propertyType}
                    </Table.Cell>
                    <Table.Cell className="text-slate-300 font-semibold">
                      ${item.price} /{" "}
                      <span className="text-xs font-normal text-slate-500">
                        {item.rentType}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {/* Wrapped inside a standard div to avoid breaking Table alignments */}
                      <div className="flex flex-col items-start gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className={getStatusStyle(item.status)}>
                            {item.status || "Pending"}
                          </span>
                          {isRejected && (
                            <button
                              onClick={() => handleViewFeedback(item)}
                              className="p-1 rounded-md bg-white/5 border border-white/10 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                              title="View Rejection Feedback"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                        </div>
                        {/* {isRejected && item.rejectionReason && (
                          <p className="text-[10px] text-rose-400/70 italic max-w-37.5 line-clamp-1">
                            {item.rejectionReason}
                          </p>
                        )} */}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-cyan-400 border border-white/5 bg-white/5 hover:bg-cyan-500/10 rounded-lg cursor-pointer"
                          onClick={() => handleEditClick(item)}
                        >
                          <Edit2 size={15} /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-rose-400 border border-white/5 bg-white/5 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                          onClick={() => handleDelete(itemId)}
                        >
                          <Trash2 size={15} /> Delete
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

      {/* আপডেট মোডাল */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-2xl bg-[#0e0e15] text-left border border-white/10 rounded-2xl">
              <Modal.CloseTrigger className="cursor-pointer" onClick={() => setIsOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-cyan-500/10 text-cyan-400">
                  <Home className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-white">
                  Update Property Information
                </Modal.Heading>
                <p className="mt-1.5 text-xs text-slate-400">
                  Modify the fields below to update your property post details.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto">
                {selectedProperty && (
                  <form id="update-property-form" className="flex flex-col gap-4" onSubmit={handleUpdateSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField isRequired name="title" defaultValue={selectedProperty.title}>
                        <Label>Property Title</Label>
                        <Input />
                        <FieldError />
                      </TextField>
                      <TextField isRequired name="location" defaultValue={selectedProperty.location}>
                        <Label>Location / Address</Label>
                        <Input />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField isRequired name="description" defaultValue={selectedProperty.description}>
                      <Label>Description</Label>
                      <TextArea />
                      <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-slate-300 mb-1 block">Property Type</Label>
                        <Select name="propertyType" placeholder="Select Type" defaultValue={selectedProperty.propertyType}>
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="Apartment" textValue="Apartment">Apartment <ListBox.ItemIndicator /></ListBox.Item>
                              <ListBox.Item id="Duplex" textValue="Duplex Villa">Duplex Villa <ListBox.ItemIndicator /></ListBox.Item>
                              <ListBox.Item id="Studio" textValue="Studio Flat">Studio Flat <ListBox.ItemIndicator /></ListBox.Item>
                              <ListBox.Item id="Commercial" textValue="Commercial Space">Commercial Space <ListBox.ItemIndicator /></ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      <TextField isRequired name="price" type="number" defaultValue={selectedProperty.price}>
                        <Label>Rent Price ($)</Label>
                        <Input />
                        <FieldError />
                      </TextField>

                      <div>
                        <Label className="text-xs font-medium text-slate-300 mb-1 block">Rent Type</Label>
                        <Select name="rentType" placeholder="Select Period" defaultValue={selectedProperty.rentType}>
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="Monthly" textValue="Monthly">Monthly <ListBox.ItemIndicator /></ListBox.Item>
                              <ListBox.Item id="Weekly" textValue="Weekly">Weekly <ListBox.ItemIndicator /></ListBox.Item>
                              <ListBox.Item id="Daily" textValue="Daily">Daily <ListBox.ItemIndicator /></ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <TextField isRequired name="bedrooms" type="number" defaultValue={selectedProperty.bedrooms}>
                        <Label>Bedrooms</Label>
                        <Input min={0} />
                        <FieldError />
                      </TextField>
                      <TextField isRequired name="bathrooms" type="number" defaultValue={selectedProperty.bathrooms}>
                        <Label>Bathrooms</Label>
                        <Input min={0} />
                        <FieldError />
                      </TextField>
                      <TextField isRequired name="propertySize" defaultValue={selectedProperty.propertySize}>
                        <Label>Property Size</Label>
                        <Input />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField name="amenities" defaultValue={Array.isArray(selectedProperty.amenities) ? selectedProperty.amenities.join(", ") : selectedProperty.amenities || ""}>
                        <Label>Amenities (Comma Separated)</Label>
                        <Input />
                      </TextField>
                      <TextField isRequired name="imageUrls" defaultValue={Array.isArray(selectedProperty.images) ? selectedProperty.images.join(", ") : selectedProperty.images || ""}>
                        <Label>Image URLs (Comma Separated)</Label>
                        <Input />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField name="extraFeatures" defaultValue={selectedProperty.extraFeatures}>
                      <Label>Extra Features / Notes</Label>
                      <Input />
                    </TextField>
                  </form>
                )}
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5 p-4 flex justify-end gap-2">
                <Button variant="secondary" className="cursor-pointer" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" form="update-property-form" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white cursor-pointer">Save Changes</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* রিজেকশন ফিডব্যাক মোডাল */}
      <Modal isOpen={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-[#0e0e15] text-left border border-rose-500/20 rounded-2xl">
              <Modal.CloseTrigger className="cursor-pointer" onClick={() => setIsFeedbackOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <AlertCircle className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-white">
                  Rejection Feedback
                </Modal.Heading>
                <p className="mt-1 text-xs text-slate-400">
                  Review comments for: <span className="text-slate-200 font-semibold">{feedbackPropertyTitle}</span>
                </p>
              </Modal.Header>
              <Modal.Body className="p-5 text-sm text-slate-300 leading-relaxed bg-white/2 rounded-xl border border-white/5 m-5">
                <p className="whitespace-pre-wrap font-sans">{feedbackReason}</p>
              </Modal.Body>
              <Modal.Footer className="border-t border-white/5 p-4 flex justify-end">
                <Button
                  className="bg-rose-600 text-white hover:bg-rose-500 font-medium transition-colors cursor-pointer"
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