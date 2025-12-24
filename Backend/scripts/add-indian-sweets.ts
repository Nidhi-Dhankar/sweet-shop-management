import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newSweets = [
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
    console.log("Adding Indian sweets...");

    for (const sweet of newSweets) {
        const existing = await prisma.sweet.findFirst({
            where: { name: sweet.name },
        });

        if (!existing) {
            const result = await prisma.sweet.create({
                data: sweet,
            });
            console.log(`Created sweet: ${result.name}`);
        } else {
            console.log(`Sweet ${sweet.name} already exists. Updating image...`);
            await prisma.sweet.update({
                where: { id: existing.id },
                data: { image: sweet.image }
            });
            console.log(`Updated image for ${sweet.name}`);
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
