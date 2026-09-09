import React from 'react';
import { getAllUserList } from '@/lib/api/user';
import UsersTable from './UsersTable';



const AllUsersPage = async () => {
    // Fetch live users array directly on Server Lifecycle execution
    const users = await getAllUserList();
    // const users = data?.users;
    console.log(users);
    
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
                    System User Directory
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                    System Node // Authorization & Access Control Overview
                </p>
            </div>
            <UsersTable initialUsers={users} />
        </div>
    );
};

export default AllUsersPage;