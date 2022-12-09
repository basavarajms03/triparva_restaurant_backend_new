module.exports = {
    apps: [
        {
            name: "Financial-Application",
            script: "./index.js",
            env: {
                NODE_ENV: "development",
                secret_key: "TriparvaRestaurant@123",
                PORT: 3000,
                DB_URL: "mongodb+srv://basavarajms05:fq93yWdg2ZBBzbDN@cluster0.hlv4oba.mongodb.net/test",
                watch: true,
                ignore_watch: ["node_modules"],
            }
        },
    ],
};