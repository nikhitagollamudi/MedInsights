const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err.name, err);
    console.log('UNCAUGHT EXCEPTION SERVER SHUTDOWN');
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB Connection Successful'))
    .catch((err) => console.log(err));

let DATABASE_URL = "";
if (process.env.RENDER_GIT_BRANCH === "main") {
    DATABASE_URL = process.env.PROD_DATABASE_URL;
} else {
    DATABASE_URL = process.env.DEV_DATABASE_URL;
}

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION SERVER SHUTDOWN');
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECIEVED, shutting down gracefully !!!');
    server.close(() => {
        console.log('Process terminated');
    });
});
