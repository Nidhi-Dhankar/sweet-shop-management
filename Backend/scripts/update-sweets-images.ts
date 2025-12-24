import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sweetsUpdates = [
    {
        name: "Chocolate Truffle",
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Red Velvet Cupcake",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Gummy Bears",
        image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Macarons",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Blueberry Cheesecake",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Mint Chocolate Chip",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
];

async function main() {
    console.log("Starting image update...");

    for (const update of sweetsUpdates) {
        try {
            const result = await prisma.sweet.updateMany({
                where: { name: update.name },
                data: { image: update.image },
            });
            console.log(`Updated ${result.count} record(s) for ${update.name}`);
        } catch (error) {
            console.error(`Error updating ${update.name}:`, error);
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
