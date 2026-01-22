import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import Image from "next/image";

// 1. Fetch products from DB
async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Products</h1>
           <p className="text-slate-500">Manage your store inventory</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" /> Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-700">
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Image</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Name</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Category</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Price</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 relative">
                       <img 
                         src={product.image} 
                         alt={product.name} 
                         className="object-cover w-full h-full"
                       />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    ${product.price}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      
                      {/* We will make this button functional in the next step */}
                      <form action={`/api/products/${product.id}`} method="DELETE"> 
                         <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                           <Trash2 className="h-4 w-4" />
                         </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}