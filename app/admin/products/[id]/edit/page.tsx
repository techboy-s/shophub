import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/admin/EditProductForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  // 1. Get ID from params
  const { id } = await params;

  // 2. Fetch the product from DB
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  // 3. Handle 404
  if (!product) {
    notFound();
  }

  // 4. Render the Client Form with data
  return (
    <div className="py-8">
      {/* We pass the 'price' as a number just to be safe with types */}
      <EditProductForm 
        product={{
          ...product,
          price: Number(product.price)
        }} 
      />
    </div>
  );
}