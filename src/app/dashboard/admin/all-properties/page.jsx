import React from 'react';
import { getAllProperty } from '@/lib/api/property';
import AdminPropertiesTable from './AdminPropertiesTable';


const AllPropertiesPage = async () => {
    // Fetch properties directly server-side
    const properties = await getAllProperty() || [];

    
    return (
        <div className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
                        Property Asset Control
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">
                        System Node  Administrative Inventory Verification
                    </p>
                </div>
                
                <AdminPropertiesTable initialProperties={properties} />
            </div>
        </div>
    );
};

export default AllPropertiesPage;