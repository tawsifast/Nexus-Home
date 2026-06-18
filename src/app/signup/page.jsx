"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  RadioGroup,
  Radio
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    
    console.log("Form Data Captured:", user);

    // Better-Auth এর signUp মেথড কল
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
      // auth.js এর user.additionalFields এ সেট করা কাস্টম 'role' পাস করা হচ্ছে
      role: user.role, 
    });
    console.log(data, "data");
    if (data) {
      toast.success("Signup Successful!");
      // router.push("/");
    }
    if (error) {
      toast.error(error.message || "Signup Unsuccessful");
    }
  };

  return (
    <div className="w-6/12 mx-auto mt-10 mb-20 flex justify-center">
      <Form className="flex w-96 flex-col gap-4 text-left" onSubmit={onSubmit}>
        
        {/* Name */}
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>

        {/* Image */}
        <TextField isRequired name="image" type="url">
          <Label>Image URL</Label>
          <Input placeholder="Enter your image url" />
          <FieldError />
        </TextField>

        {/* 👑 HeroUI v3 ডট-সিনট্যাক্স স্টাইলড রেডিও গ্রুপ (রোল সিলেকশন) */}
        <RadioGroup defaultValue="tenant" name="role" isRequired>
          <Label>Select Account Type</Label>
          <Description>Choose how you want to use NexusHome</Description>
          
          {/* Tenant Option */}
          <Radio value="tenant" className="border border-white/5 rounded-xl p-2.5 hover:bg-white/[0.02] transition">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <span className="text-sm font-medium text-slate-200">Tenant</span>
            </Radio.Content>
            <Description>Search and enroll or book smart properties</Description>
          </Radio>

          {/* Owner Option */}
          <Radio value="owner" className="border border-white/5 rounded-xl p-2.5 hover:bg-white/[0.02] transition">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <span className="text-sm font-medium text-slate-200">Property Owner</span>
            </Radio.Content>
            <Description>List, monitor, and manage your properties easily</Description>
          </Radio>
        </RadioGroup>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" type="password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl px-5 cursor-pointer">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary" className="cursor-pointer rounded-xl">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;