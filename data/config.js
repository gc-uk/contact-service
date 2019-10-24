const config = {
    user: process.env.DBUser,
    password: process.env.DBPassword,
    server: process.env.DBServer,
    database: process.env.DBName,
    options: {
        encrypt: true
    }
}

module.exports = config;