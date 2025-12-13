const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sweets = [
    {
        name: "Chocolate Truffle",
        category: "Chocolate",
        price: 15.0,
        quantity: 50,
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Red Velvet Cupcake",
        category: "Cake",
        price: 12.0,
        quantity: 30,
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Gummy Bears",
        category: "Candy",
        price: 5.0,
        quantity: 100,
        image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Macarons",
        category: "Cookie",
        price: 20.0,
        quantity: 40,
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Blueberry Cheesecake",
        category: "Cake",
        price: 25.0,
        quantity: 15,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Mint Chocolate Chip",
        category: "Ice Cream",
        price: 8.0,
        quantity: 0, // Out of stock
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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

    // Create default admin user
    const adminEmail = "admin4@example.com";
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
        const hashedPassword = await require("bcryptjs").hash("password@123", 10);
        await prisma.user.create({
            data: {
                name: "Admin User",
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true,
            },
        });
        console.log(`Created admin user: ${adminEmail}`);
    } else {
        console.log(`Admin user ${adminEmail} already exists`);
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
