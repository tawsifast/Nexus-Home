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
import { Edit2, Trash2, Home } from "lucide-react";
import toast from "react-hot-toast";
import { updatedProperty } from "@/lib/actions/property";


export default function PropertiesTable({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Helper function to extract ID easily
  const getItemId = (item) => item?._id?.$oid || item?._id || item?.id;

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((item) => getItemId(item) !== id));
      toast.success("Property deleted successfully!");
    }
  };

  // এডিট বাটন ক্লিক হ্যান্ডলার
  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsOpen(true);
  };

  // আপডেট ফর্ম সাবমিট হ্যান্ডলার
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    
    const propertyId = getItemId(selectedProperty);

    // ইমেজ ইউআরএল গুলোকে কমা দিয়ে স্প্লিট করে অ্যারেতে কনভার্ট করা হয়েছে
    // const processedImages = 
    //   ? rawData.imageUrls.split(",").map((url) => url.trim()).filter(Boolean)
    //   : [];

    const updatedData = {
      title: rawData.title,
      description: rawData.description,
      location: rawData.location,
      propertyType: rawData.propertyType || selectedProperty.propertyType,
      rentPrice: Number(rawData.rentPrice),
      rentType: rawData.rentType || selectedProperty.rentType,
      bedrooms: Number(rawData.bedrooms),
      bathrooms: Number(rawData.bathrooms),
      propertySize: rawData.propertySize,
      amenities: rawData.amenities
        ? rawData.amenities.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      images: rawData.imageUrls, // ফিক্সড ইমেজ ডাটা স্ট্রাকচার
      extraFeatures: rawData.extraFeatures,
    };

    try {
      // API CALL
      const res = await updatedProperty(propertyId, updatedData);

      if (!res?.acknowledged && !res?.success) {
        toast.error("Update failed!");
        return;
      }

      // UI STATE UPDATE (সহজ আইডি ম্যাচিং লজিক দিয়ে ফিক্সড)
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
      <Table aria-label="Properties List Table" >
        <Table.ScrollContainer>
          <Table.Content
            className="min-w-[700px]"
            aria-label="Owner Properties Layout"
          >
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
                return (
                  // hover ইফেক্ট বন্ধ করার জন্য টেইলউইন্ড ক্লাস যুক্ত করা হয়েছে
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
                      ${item.rentPrice} /{" "}
                      <span className="text-xs font-normal text-slate-500">
                        {item.rentType}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className={getStatusStyle(item.status)}>
                        {item.status || "Pending"}
                      </span>
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
              <Modal.CloseTrigger
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />

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
                  <form
                    id="update-property-form"
                    className="flex flex-col gap-4"
                    onSubmit={handleUpdateSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField
                        isRequired
                        name="title"
                        defaultValue={selectedProperty.title}
                      >
                        <Label>Property Title</Label>
                        <Input />
                        <FieldError />
                      </TextField>

                      <TextField
                        isRequired
                        name="location"
                        defaultValue={selectedProperty.location}
                      >
                        <Label>Location / Address</Label>
                        <Input />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField
                      isRequired
                      name="description"
                      defaultValue={selectedProperty.description}
                    >
                      <Label>Description</Label>
                      <TextArea />
                      <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-medium text-slate-300 mb-1 block">
                          Property Type
                        </Label>
                        <Select
                          name="propertyType"
                          placeholder="Select Type"
                          defaultValue={selectedProperty.propertyType}
                        >
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="Apartment" textValue="Apartment">
                                Apartment
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Duplex" textValue="Duplex Villa">
                                Duplex Villa
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Studio" textValue="Studio Flat">
                                Studio Flat
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Commercial" textValue="Commercial Space">
                                Commercial Space
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      <TextField
                        isRequired
                        name="rentPrice"
                        type="number"
                        defaultValue={selectedProperty.rentPrice}
                      >
                        <Label>Rent Price ($)</Label>
                        <Input />
                        <FieldError />
                      </TextField>

                      <div>
                        <Label className="text-xs font-medium text-slate-300 mb-1 block">
                          Rent Type
                        </Label>
                        <Select
                          name="rentType"
                          placeholder="Select Period"
                          defaultValue={selectedProperty.rentType}
                        >
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="Monthly" textValue="Monthly">
                                Monthly
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Weekly" textValue="Weekly">
                                Weekly
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Daily" textValue="Daily">
                                Daily
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <TextField
                        isRequired
                        name="bedrooms"
                        type="number"
                        defaultValue={selectedProperty.bedrooms}
                      >
                        <Label>Bedrooms</Label>
                        <Input min={0} />
                        <FieldError />
                      </TextField>

                      <TextField
                        isRequired
                        name="bathrooms"
                        type="number"
                        defaultValue={selectedProperty.bathrooms}
                      >
                        <Label>Bathrooms</Label>
                        <Input min={0} />
                        <FieldError />
                      </TextField>

                      <TextField
                        isRequired
                        name="propertySize"
                        defaultValue={selectedProperty.propertySize}
                      >
                        <Label>Property Size</Label>
                        <Input />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField
                        name="amenities"
                        defaultValue={
                          Array.isArray(selectedProperty.amenities)
                            ? selectedProperty.amenities.join(", ")
                            : selectedProperty.amenities || ""
                        }
                      >
                        <Label>Amenities (Comma Separated)</Label>
                        <Input />
                      </TextField>

                      <TextField
                        isRequired
                        name="imageUrls"
                        defaultValue={
                          Array.isArray(selectedProperty.images)
                            ? selectedProperty.images.join(", ")
                            : selectedProperty.images || ""
                        }
                      >
                        <Label>Image URLs (Comma Separated)</Label>
                        <Input />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField
                      name="extraFeatures"
                      defaultValue={selectedProperty.extraFeatures}
                    >
                      <Label>Extra Features / Notes</Label>
                      <Input />
                    </TextField>
                  </form>
                )}
              </Modal.Body>

              <Modal.Footer className="border-t border-white/5 p-4 flex justify-end gap-2">
                <Button
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="update-property-form"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white cursor-pointer"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}