import React from 'react';
import AddPropertyForm from './AddPropertyForm';
import { getUserSession } from '@/lib/core/session';

const AddPropertyPage = async () => {
    const user = await getUserSession();

    return (
        <div>
            <h2 className='text-center text-2xl'>Property adding page</h2>
            <AddPropertyForm owner={user}/>
        </div>
    );
};

export default AddPropertyPage;