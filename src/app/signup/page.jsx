"use client";

import React, { useState } from "react";
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
import { UserPlus, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    
    console.log("Form Data Captured:", user);

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
      role: user.role, 
    });

    if (data) {
      toast.success("Signup Successful!");
      router.push("/");
    }
    if (error) {
      toast.error(error.message || "Signup Unsuccessful");
    }
  };

  // const handleGogleSignIn = async () => {
  //   try {
  //     const data = await authClient.signIn.social({
  //       provider: "google",
  //       callbackURL: "/",
  //       newUserOptions: {
  //         data: {
  //           role: "tenant"
  //         }
  //       }
  //     });
  //     console.log("Google Auth Init:", data);
  //   } catch (err) {
  //     toast.error("Google sign in failed");
  //     console.error(err);
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#0e0f19] text-slate-200 flex items-center justify-center p-4 py-12 antialiased relative overflow-hidden">
      
      {/* Dynamic Colorful Neon Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-purple-500/20 to-cyan-500/0 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-500/15 to-fuchsia-500/0 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Main Glassmorphic Card Container */}
      <div className="w-full max-w-xl bg-[#161726]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative z-10 space-y-6 my-6">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center size-13 bg-gradient-to-tr from-purple-500 to-cyan-400 p-[1px] rounded-xl shadow-lg shadow-purple-500/20">
            <div className="size-full bg-[#161726] rounded-[11px] flex items-center justify-center text-purple-400">
              <UserPlus className="size-5" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Create Your Account
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Join NexusHome network matrix ecosystem today
            </p>
          </div>
        </div>

        {/* Form Element */}
        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          
          {/* Two Column Structure for General Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <TextField
              isRequired
              name="name"
              className="space-y-1.5"
              validate={(value) => value.length < 3 ? "Name must be at least 3 characters" : null}
            >
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Name</Label>
              <Input 
                placeholder="John Doe" 
                className="w-full bg-[#0d0e16] border border-white/10 rounded-xl text-slate-100 placeholder-slate-600 focus:border-purple-500/50 px-4 py-2.5 transition-all text-sm outline-none"
              />
              <FieldError className="text-xs font-medium text-rose-400 pt-1 block" />
            </TextField>

            {/* Image */}
            <TextField isRequired name="image" type="url" className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Image URL</Label>
              <Input 
                placeholder="https://example.com/avatar.jpg" 
                className="w-full bg-[#0d0e16] border border-white/10 rounded-xl text-slate-100 placeholder-slate-600 focus:border-purple-500/50 px-4 py-2.5 transition-all text-sm outline-none"
              />
              <FieldError className="text-xs font-medium text-rose-400 pt-1 block" />
            </TextField>
          </div>

          {/* Account Type Option Selection Grid */}
          <RadioGroup defaultValue="tenant" name="role" isRequired className="space-y-2">
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Account Type</Label>
            <Description className="text-xs text-slate-500 block -mt-1">Choose your operations hub terminal clearance</Description>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Tenant Option */}
              <Radio 
              value="tenant" 
              className="border border-white/[0.06] rounded-xl p-3.5 bg-[#0d0e16]/50 hover:bg-white/[0.02] data-[selected=true]:border-cyan-500/50 data-[selected=true]:bg-cyan-500/[0.03] transition-all cursor-pointer">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-200">Tenant Hub</span>
                    <span className="text-[11px] text-slate-400 leading-normal mt-0.5">Search and securely book smart real estate properties.</span>
                  </div>
                </Radio.Content>
              </Radio>

              {/* Owner Option */}
              <Radio value="owner" className="border border-white/[0.06] rounded-xl p-3.5 bg-[#0d0e16]/50 hover:bg-white/[0.02] data-[selected=true]:border-purple-500/50 data-[selected=true]:bg-purple-500/[0.03] transition-all cursor-pointer">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-200">Property Owner</span>
                    <span className="text-[11px] text-slate-400 leading-normal mt-0.5">List, monitor, and manage your asset vectors perfectly.</span>
                  </div>
                </Radio.Content>
              </Radio>
            </div>
          </RadioGroup>

          {/* Email Form Control */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="space-y-1.5"
            validate={(value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Please enter a valid email address" : null}
          >
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Address</Label>
            <Input 
              placeholder="john@example.com" 
              className="w-full bg-[#0d0e16] border border-white/10 rounded-xl text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 px-4 py-2.5 transition-all text-sm outline-none"
            />
            <FieldError className="text-xs font-medium text-rose-400 pt-1 block" />
          </TextField>

          {/* Password with Eye Toggler Option */}
          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
            className="space-y-1.5"
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
              if (!/[0-9]/.test(value)) return "Password must contain a number";
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Password Matrix</Label>
            <div className="relative w-full">
              <Input 
                placeholder="Lock key encryption sequence" 
                className="w-full bg-[#0d0e16] border border-white/10 rounded-xl text-slate-100 placeholder-slate-600 focus:border-purple-500/50 px-4 py-2.5 pr-11 transition-all text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </div>
            <Description className="text-[11px] font-medium text-slate-500 pt-0.5 block leading-relaxed">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs font-medium text-rose-400 pt-1 block" />
          </TextField>

          {/* Form Trigger Group Row */}
          <div className="flex items-center gap-3 pt-2 w-full">
            <Button 
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              <Check className="size-4 shrink-0" />
              Register Authorization
            </Button>
            
            <Button 
              type="reset" 
              variant="secondary"
              className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              Reset
            </Button>
          </div>

          {/* Alternative Line Splitter */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/[0.06]"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">Or Core Cloud Link</span>
            <div className="flex-grow border-t border-white/[0.06]"></div>
          </div>

          {/* Social Trigger */}
          {/* <Button 
            type="button"
            // onClick={handleGogleSignIn}
            className="w-full bg-[#111221] hover:bg-[#18192c] border border-white/[0.08] text-slate-200 font-semibold rounded-xl h-11 flex items-center justify-center gap-2.5 transition active:scale-[0.98] cursor-pointer"
          >
            <FcGoogle className="size-5" />
            <span className="text-sm">Register with Google Link</span>
          </Button> */}

        </Form>
      </div>
    </div>
  );
};

export default SignupPage;