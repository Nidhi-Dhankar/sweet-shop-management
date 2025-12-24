import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const sweet = await prisma.sweet.findFirst({
        where: { name: "Chocolate Truffle" },
    });

    if (sweet && sweet.image) {
        console.log("VERIFICATION SUCCESS: Chocolate Truffle has an image.");
        console.log("Image URL:", sweet.image);
    } else {
        console.error("VERIFICATION FAILED: Chocolate Truffle is missing an image.");
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
