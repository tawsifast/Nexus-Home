
import { getUserSession } from "@/lib/core/session";
import {
  Bars,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  LayoutCellsLarge,
  Bookmark,     
  FileText,     
  CreditCard, 
  Persons,      
  Display,     
  Activity,     
  PlusSquare,    
  Building,      
  CalendarCheck, 
  User,
  MagnifierPlus,
  Calendar,
  PlusShape,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {

  const user = await getUserSession();
  console.log(user?.role, "role");

  const adminNavItems = [
  {icon: LayoutCellsLarge,href: "/dashboard/admin",label: "Dashboard"},
  {icon: Persons,href: "/dashboard/admin/all-users",label: "Users"},
  {icon: Display,href: "/dashboard/admin/all-properties",label: "Properties"},
  {icon: Briefcase,href: "/dashboard/admin/all-bookings",label: "Bookings"},
  {icon: CreditCard,href: "/dashboard/admin/transactions",label: "Transactions"}
];

  const ownerNavLinks = [
  { icon: House, href: "/dashboard/owner", label: "Dashboard" },
  {icon: MagnifierPlus,href: "/dashboard/owner/overview",label: "Overview"},
  {icon: PlusShape, href: "/dashboard/owner/add-properties", label: "Add Property"},
  {icon: House,href: "/dashboard/owner/my-properties",label: "My Property"},
  {icon: Calendar, href: "/dashboard/owner/bookings",label: "Bookings"},
  {icon: Person, href: "/dashboard/owner/profile",label: "Profile"},
];
  const tenantNavLinks = [
  {icon: LayoutCellsLarge,href: "/dashboard/tenant",label: "Dashboard",},
  {icon: Briefcase,href: "/dashboard/tenant/overview",label: "OverView",},
  {icon: Bookmark,href: "/dashboard/tenant/bookings",label: "My Bookings",},
  {icon: FileText,href: "/dashboard/tenant/favourites",label: "Favourite",},
  {icon: CreditCard,href: "/dashboard/tenant/profile",label: "Profile",},
];

  const navLinksMap = {
    tenant : tenantNavLinks,
    owner : ownerNavLinks,
    admin : adminNavItems,
  }

  const navItems = navLinksMap[user?.role?.toLowerCase() || "tenant"]
  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-50 shrink-0 border-r p-4">
        {navContent}
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden p-2">
        <Drawer>
          <Button variant="flat">
            <Bars />
           <span className="text-red-500">Sidebar</span>
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading>Navigation</Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body>{navContent}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}