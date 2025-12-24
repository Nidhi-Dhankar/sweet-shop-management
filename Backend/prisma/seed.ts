import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sweets = [
    {
        name: "Chocolate Truffle",
        category: "Chocolate",
        price: 15.0,
        quantity: 50,
        description: "Rich dark chocolate ganache rolled in cocoa powder.",
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Red Velvet Cupcake",
        category: "Cake",
        price: 12.0,
        quantity: 30,
        description: "Classic red velvet with cream cheese frosting.",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Gummy Bears",
        category: "Candy",
        price: 5.0,
        quantity: 100,
        description: "Assorted fruit flavored gummy bears.",
        image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Macarons",
        category: "Cookie",
        price: 20.0,
        quantity: 40,
        description: "Delicate french almond cookies in pastel colors.",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Blueberry Cheesecake",
        category: "Cake",
        price: 25.0,
        quantity: 15,
        description: "Creamy cheesecake topped with fresh blueberry compote.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Mint Chocolate Chip",
        category: "Ice Cream",
        price: 8.0,
        quantity: 0, // Out of stock
        description: "Refreshing mint ice cream with dark chocolate chips.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Gulab Jamun",
        category: "Indian",
        price: 10.0,
        quantity: 50,
        description: "Soft, spongy milk solids soaked in rose flavored sugar syrup.",
        image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=800&q=80",
    },
    {
        name: "Rasmalai",
        category: "Indian",
        price: 12.0,
        quantity: 40,
        description: "Soft paneer balls immersed in chilled creamy milk.",
        image: "https://images.unsplash.com/photo-1616031025547-0744de57463f?w=800&q=80",
    },
];

async function main() {
    console.log("Start seeding...");

    for (const sweet of sweets) {
        // Only create if not exists
        const existing = await prisma.sweet.findFirst({ where: { name: sweet.name } });
        if (!existing) {
            const result = await prisma.sweet.create({
                data: sweet,
            });
            console.log(`Created sweet: ${result.name}`);
        } else {
            console.log(`Skipping ${sweet.name}, already exists.`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
