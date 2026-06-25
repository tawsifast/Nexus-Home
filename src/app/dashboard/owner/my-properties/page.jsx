import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { getPropertyByOwnerId } from '@/lib/api/property';
import PropertiesTable from '@/components/property/PropertiesTable';


const MyPropertiesPage = async () => {
    // লগইন থাকা ওনারের সেশন ও ডাটা নেওয়া হচ্ছে
    const user = await getUserSession();
    const properties = await getPropertyByOwnerId(user?.id) || [];
    console.log(properties,"pro");

    return (
        <div className="w-full p-6 bg-[#030307] border border-white/5 rounded-2xl backdrop-blur-md">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-white uppercase tracking-wider">My Properties</h1>
                <p className="text-xs text-slate-400 mt-1">
                    Manage your listed properties, monitor approvals, or update specifications.
                </p>
            </div>
            
            {/* ক্লায়েন্ট টেবিল কম্পোনেন্টে ডাটা পাস করা হচ্ছে */}
            <PropertiesTable properties={properties} />
        </div>
    );
};

export default MyPropertiesPage;