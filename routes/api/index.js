const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const usersRoutes = require("./usersRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/user", usersRoutes);

module.exports = router;