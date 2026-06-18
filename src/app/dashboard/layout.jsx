import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";


const DashBoardlayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar/>
            <div className='flex-1'>{children}</div>
        </div>
    );
};
export default DashBoardlayout;