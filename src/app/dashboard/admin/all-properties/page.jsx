import React from 'react';
import { getAllProperty } from '@/lib/api/property';
import AdminPropertiesTable from './AdminPropertiesTable';


const AllPropertiesPage = async () => {
    // Fetch properties directly server-side
    const properties = await getAllProperty() || [];

    
    return (
        <div className="p-6 space-y-6">
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
    );
};

export default AllPropertiesPage;