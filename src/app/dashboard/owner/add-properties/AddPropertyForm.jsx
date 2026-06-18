"use client";

import React from "react";
import { PlusCircle } from "lucide-react";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import toast from "react-hot-toast";
import { createProperty } from "@/lib/actions/property";

export default function AddPropertyForm({owner}) {
  console.log(owner, "owner");
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const propertyData = {
      title: rawData.title,
      description: rawData.description,
      location: rawData.location,
      propertyType: rawData.propertyType,
      rentPrice: Number(rawData.rentPrice),
      rentType: rawData.rentType,
      bedrooms: Number(rawData.bedrooms),
      bathrooms: Number(rawData.bathrooms),
      propertySize: rawData.propertySize,
      amenities: rawData.amenities ? rawData.amenities.split(",").map(item => item.trim()) : [],
      images: rawData.imageUrls,
      extraFeatures: rawData.extraFeatures,
      status: "Pending",
      ownerId: owner.id,
      ownerEmail: owner.email,
      ownerLogo: owner.image,
    };

    console.log("Structured Property Data:", propertyData);
    const res = await createProperty(propertyData)
    if (res.insertedId) {
      toast.success("Property posted successfully");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-[#0a0a0f]/40 border border-white/5 rounded-2xl backdrop-blur-md flex justify-center">
      <Form className="w-full flex flex-col gap-4 text-left" onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend className="text-xl font-bold text-white uppercase tracking-wider">
            Add New Property
          </Fieldset.Legend>
          <Description>Fill up the required details to list your property.</Description>
          
          <FieldGroup className="flex flex-col gap-5 mt-4">
            
            {/* 1. Property Title & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField isRequired name="title">
                <Label>Property Title</Label>
                <Input placeholder="Luxury 3BR Apartment in Gulshan" />
                <FieldError />
              </TextField>

              <TextField isRequired name="location">
                <Label>Location / Address</Label>
                <Input placeholder="Road 12, Gulshan 2, Dhaka" />
                <FieldError />
              </TextField>
            </div>

            {/* 2. Description */}
            <TextField isRequired name="description">
              <Label>Description</Label>
              <TextArea placeholder="Describe the beautiful features of your property..." />
              <FieldError />
            </TextField>

            {/* 3. Property Type, Rent Price & Rent Type (Using your Custom Select) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Property Type Custom Select */}
              <Select name="propertyType" isRequired placeholder="Select Type">
                <Label>Property Type</Label>
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

              {/* Rent Price */}
              <TextField isRequired name="rentPrice" type="number">
                <Label>Rent Price ($)</Label>
                <Input placeholder="550" />
                <FieldError />
              </TextField>

              {/* Rent Type Custom Select */}
              <Select name="rentType" isRequired placeholder="Select Period" defaultValue="Monthly">
                <Label>Rent Type</Label>
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

            {/* 4. Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextField isRequired name="bedrooms" type="number">
                <Label>Bedrooms</Label>
                <Input placeholder="3" min={0} />
                <FieldError />
              </TextField>

              <TextField isRequired name="bathrooms" type="number">
                <Label>Bathrooms</Label>
                <Input placeholder="2" min={0} />
                <FieldError />
              </TextField>

              <TextField isRequired name="propertySize">
                <Label>Property Size</Label>
                <Input placeholder="1450 sqft" />
                <FieldError />
              </TextField>
            </div>

            {/* 5. Amenities & Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField name="amenities">
                <Label>Amenities (Comma Separated)</Label>
                <Input placeholder="WiFi, Parking, Lift, Generator" />
                <Description>Optional features</Description>
              </TextField>

              <TextField isRequired name="imageUrls">
                <Label>Property Image URLs (Comma Separated)</Label>
                <Input placeholder="https://img1.com, https://img2.com" />
                <FieldError />
              </TextField>
            </div>

            {/* 6. Extra Features */}
            <TextField name="extraFeatures">
              <Label>Extra Features / Notes</Label>
              <Input placeholder="Pet friendly, South facing, 2 balconies" />
            </TextField>

            <hr className="border-white/5 my-2 w-full" />

            {/* 7. Owner Information */}
            <div>
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3">Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField isRequired name="ownerName">
                  <Label>Owner Name</Label>
                  <Input placeholder="John Doe" />
                  <FieldError />
                </TextField>

                <TextField isRequired name="ownerEmail" type="email">
                  <Label>Contact Email</Label>
                  <Input placeholder="johndoe@example.com" />
                  <FieldError />
                </TextField>

                <TextField isRequired name="ownerPhone">
                  <Label>Contact Phone</Label>
                  <Input placeholder="+88017XXXXXXXX" />
                  <FieldError />
                </TextField>
              </div>
            </div>

          </FieldGroup>

          {/* Actions */}
          <Fieldset.Actions className="flex gap-2 pt-4 justify-end">
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl px-6 cursor-pointer">
              <PlusCircle size={16} className="mr-1" />
              Submit Property
            </Button>
            <Button type="reset" variant="secondary" className="cursor-pointer rounded-xl">
              Reset
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
}