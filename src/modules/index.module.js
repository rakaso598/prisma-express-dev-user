const express = require("express");
const healthCheckRouter = require("./healthCheck.module");
const usersRouter = require("./users.module");

const router = express.Router();

router.use("/health-check", healthCheckRouter);
router.use("/users", usersRouter);

module.exports = router;
