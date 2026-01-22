import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // Your Better-Auth config
import { headers } from "next/headers";
import Link from "next/link";
import { LayoutDashboard, Package, PlusCircle, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as any)?.role;
  
  console.log("👮 DEBUGGING ROLE:");
  console.log(`Role from DB: '${role}'`); // Wrapped in quotes to see spaces
  console.log(`Is Admin?: ${role === "admin"}`); // Should be TRUE

  // FIX: Cast user to 'any' to access the custom 'role' property
  if (!session || (session.user as any).role !== "admin") {
    console.log("⛔ REDIRECTING USER - ACCESS DENIED");
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-tighter">
          SHOP<span className="text-yellow-300">ADMIN</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600 text-white">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors">
            <Package className="h-5 w-5" /> All Products
          </Link>
          <Link href="/admin/products/new" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors">
            <PlusCircle className="h-5 w-5" /> Add Product
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-3 text-sm text-slate-400">
             <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
                A
             </div>
             <div>
               <p className="text-white font-medium">Admin User</p>
               <p className="text-xs">Manager</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}