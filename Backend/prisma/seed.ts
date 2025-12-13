import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sweets = [
    {
        name: "Chocolate Truffle",
        category: "Chocolate",
        price: 15.0,
        quantity: 50,
        description: "Rich dark chocolate ganache rolled in cocoa powder.",
    },
    {
        name: "Red Velvet Cupcake",
        category: "Cake",
        price: 12.0,
        quantity: 30,
        description: "Classic red velvet with cream cheese frosting.",
    },
    {
        name: "Gummy Bears",
        category: "Candy",
        price: 5.0,
        quantity: 100,
        description: "Assorted fruit flavored gummy bears.",
    },
    {
        name: "Macarons",
        category: "Cookie",
        price: 20.0,
        quantity: 40,
        description: "Delicate french almond cookies in pastel colors.",
    },
    {
        name: "Blueberry Cheesecake",
        category: "Cake",
        price: 25.0,
        quantity: 15,
        description: "Creamy cheesecake topped with fresh blueberry compote.",
    },
    {
        name: "Mint Chocolate Chip",
        category: "Ice Cream",
        price: 8.0,
        quantity: 0, // Out of stock
        description: "Refreshing mint ice cream with dark chocolate chips.",
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
