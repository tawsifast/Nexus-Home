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
} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    console.log(user, "user");
    
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    
    console.log(data, error);
    if (data) {
      redirect("/");
    }
    if (error) {
      toast.error("Sign in Unsuccessful");
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
    <div className="min-h-screen bg-[#0e0f19] text-slate-200 flex items-center justify-center p-4 antialiased relative overflow-hidden">
      
      {/* Dynamic Colorful Neon Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-linear-to-br from-cyan-500/20 to-purple-500/0 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-linear-to-tl from-fuchsia-500/15 to-blue-500/0 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size-32px_32px] pointer-events-none" />
      
      {/* Main Glassmorphic Card Container */}
      <div className="w-full max-w-md bg-[#161726]/80 backdrop-blur-xl border border-white/8 rounded-2xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shadow-purple-500/3 relative z-10 space-y-6">
        
        {/* Header Section with Colorful Icon Halo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center size-13 bg-linear-to-tr from-purple-500 to-cyan-400 p-px rounded-xl shadow-lg shadow-purple-500/20">
            <div className="size-full bg-[#161726] rounded-[11px] flex items-center justify-center text-cyan-400">
              <Lock className="size-5 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white bg-clip-text">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Sign in to access your secure management console
            </p>
          </div>
        </div>

        {/* Input Form */}
        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          
          {/* Email Input Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full space-y-1.5"
            defaultValue={"mitsuha@gmail.com"}
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Email Address
            </Label>
            <Input 
              placeholder="Enter your email" 
              
              className="w-full bg-[#0d0e16] border border-white/10 rounded-xl text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] px-4 py-2.5 transition-all text-sm outline-none"
            />
            <FieldError className="text-xs font-medium text-rose-400 pt-1 block" />
          </TextField>

          {/* Password Input Field with Visibility Toggle */}
          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
             defaultValue={"Mitsuha12345"} 
            className="w-full space-y-1.5"
          >
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Password
            </Label>
            <div className="relative w-full">
              <Input 
                placeholder="Enter your password"
               
                className="w-full bg-[#0d0e16] border border-white/10 rounded-xl text-slate-100 placeholder-slate-600 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] px-4 py-2.5 pr-11 transition-all text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4.5" />
                ) : (
                  <Eye className="size-4.5" />
                )}
              </button>
            </div>
            <Description className="text-[11px] font-medium text-slate-500 pt-0.5 leading-relaxed block">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs font-medium text-rose-400 pt-1 block" />
          </TextField>

          {/* Action Buttons Group */}
          <div className="flex items-center gap-3 pt-2 w-full">
            <Button 
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md shadow-purple-500/10 active:scale-[0.98] cursor-pointer"
            >
              <Check className="size-4 shrink-0" />
              Sign In
            </Button>
            
            <Button 
              type="reset" 
              variant="secondary"
              className="px-4 py-2.5 bg-white/4 hover:bg-white/8 text-slate-300 border border-white/10 rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              Reset
            </Button>
          </div>

          {/* Custom Divider */}
          <div className="relative flex py-2 items-center">
            <div className="grow border-t border-white/6"></div>
            <span className="shrink mx-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">Or Secure Connect</span>
            <div className="grow border-t border-white/6"></div>
          </div>

          {/* Google Sign In Button */}
          {/* <Button 
            type="button"
            onClick={handleGogleSignIn}
            className="w-full bg-[#111221] hover:bg-[#18192c] border border-white/[0.08] text-slate-200 font-semibold rounded-xl h-11 flex items-center justify-center gap-2.5 transition active:scale-[0.98] cursor-pointer shadow-sm"
          >
            <FcGoogle className="size-5" />
            <span className="text-sm">Continue with Google</span>
          </Button> */}
          
        </Form>
      </div>
    </div>
  );
};

export default SigninPage;