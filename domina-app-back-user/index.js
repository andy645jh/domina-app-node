const config = require('./utils/config');
const express = require("express");
const app = express();

const port = config.APP_PORT;

const users = require("./routes/user");

const cors = require('cors');
app.options('*', cors());
app.use(cors());

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/api/users", users);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});