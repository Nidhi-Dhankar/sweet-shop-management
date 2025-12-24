import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const sweets = await prisma.sweet.findMany({
        where: {
            name: { in: ["Gulab Jamun", "Rasmalai"] }
        }
    });

    console.log("Database Records:");
    console.log(JSON.stringify(sweets, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
