module.exports = (project,description,author,license) => ({
    "name": project,
    "version": "0.0.1",
    "description": description,
    "main":  "index.js",
    "scripts": {
        "start": "node dist/index.js",
        "build": "npx tsc",
        "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
    },
    "keywords": [],
    "author": author,
    "license": license,
    "devDependencies": {
        "@types/node": "*",
        "@types/express": "*",
        "concurrently": "*",
        "nodemon": "*",
        "typescript": "*",
    },
    "dependencies": {
        "dotenv": "*",
        "express": "*",
        "morgan": "*",
        "winston": "*",
    },
    "files": [
        "index.js",
        "routes/api.js",
        "tools/logger.js",
        "middlewares/morgan.js",
    ]
})