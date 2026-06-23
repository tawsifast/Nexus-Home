"use client";

import { getFeaturedProperty } from '@/lib/api/property';
import React, { useEffect, useState } from 'react';
import PropertyCard from './property/PropertyCard';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';

const Featured = () => {
    const [properties, setProperties] = useState([]);

    // ক্লায়েন্ট সাইড ডেটা লোড বা সিঙ্ক করার জন্য
    useEffect(() => {
        const fetchProps = async () => {
            const data = await getFeaturedProperty();
            setProperties(data?.slice(0, 6) || []);
        };
        fetchProps();
    }, []);

    if (properties.length === 0) return null;

    return (
        <section className="w-full bg-[#0e0f19] py-16 px-4 md:px-8 relative overflow-hidden">
            {/* Background Decorative Mesh & Subtle Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10 space-y-10">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-8 bg-cyan-400" />
                            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Live Matrix Stream</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Properties</span>
                        </h2>
                    </div>

                    <div>
                        <Link 
                            href="/properties" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider group"
                        >
                            <span>View All Listings</span>
                            <ArrowRight className="size-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Outer Mask Wrapper */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.04] bg-[#111222]/30 py-6">
                    
                    {/* Side Gradients for Seamless Blending */}
                    <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#0e0f19] to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#0e0f19] to-transparent z-20 pointer-events-none" />

                    {/* Framer Motion Animating Track */}
                    <motion.div 
                        className="flex gap-6 w-max"
                        animate={{ x: [0, -100 * properties.length - (24 * properties.length)] }}
                        transition={{
                            ease: "linear",
                            duration: 25, // স্পিড কন্ট্রোল করার জন্য (বেশি দিলে আস্তে ঘুরবে)
                            repeat: Infinity,
                        }}
                        whileHover={{ animationPlayState: "paused" }} // মাউস রাখলে পজ হবে
                    >
                        {/* Original Array Wrapper */}
                        <div className="flex gap-6 shrink-0">
                            {properties.map((property) => (
                                <div key={`framer-orig-${property._id}`} className="w-[290px] sm:w-[340px] md:w-[380px] shrink-0 transition-transform duration-300 hover:scale-[1.02]">
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>

                        {/* Duplicated Clone Array Wrapper for Infinite Effect */}
                        <div className="flex gap-6 shrink-0">
                            {properties.map((property) => (
                                <div key={`framer-clone-${property._id}`} className="w-[290px] sm:w-[340px] md:w-[380px] shrink-0 transition-transform duration-300 hover:scale-[1.02]">
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Featured;