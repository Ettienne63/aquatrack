require("dotenv").config();

const config = {
    PORT: process.env.port || 3000,
}

module.exports = config