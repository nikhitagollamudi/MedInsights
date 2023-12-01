const { PrismaClient } = require("@prisma/client");

let DATABASE_URL = "";
if (process.env.RENDER_GIT_BRANCH === "main") {
    DATABASE_URL = process.env.PROD_DATABASE_URL;
} else {
    DATABASE_URL = process.env.DEV_DATABASE_URL;
}

const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
});

module.exports = prisma;
