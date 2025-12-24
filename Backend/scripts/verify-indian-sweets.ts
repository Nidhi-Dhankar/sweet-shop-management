import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const sweets = await prisma.sweet.findMany({
        where: {
            name: { in: ["Gulab Jamun", "Rasmalai"] }
        }
    });

    console.log(`Found ${sweets.length} Indian sweets.`);
    sweets.forEach(s => {
        console.log(`- ${s.name}: ${s.image ? "Has Image" : "MISSING IMAGE"} (${s.image})`);
    });

    if (sweets.length === 2 && sweets.every(s => s.image)) {
        console.log("VERIFICATION SUCCESS");
    } else {
        console.error("VERIFICATION FAILED");
        process.exit(1);
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
