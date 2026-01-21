import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  const products = [
    {
      name: "Minimalist Wireless Headphones",
      description: "Premium noise-cancelling headphones with 30h battery life.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      category: "Audio",
      rating: 4.8,
      reviews: 124
    },
    {
      name: "Ergonomic Mechanical Keyboard",
      description: "Tactile switches for the ultimate typing experience.",
      price: 149.50,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b91a91e?w=500&q=80",
      category: "Accessories",
      rating: 4.6,
      reviews: 89
    },
    {
      name: "4K Ultra HD Monitor",
      description: "Crystal clear display perfect for designers and gamers.",
      price: 399.00,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
      category: "Displays",
      rating: 4.9,
      reviews: 56
    },
    {
      name: "Smart Home Speaker",
      description: "Voice controlled assistant with premium sound quality.",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80",
      category: "Smart Home",
      rating: 4.3,
      reviews: 210
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }
  
  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })