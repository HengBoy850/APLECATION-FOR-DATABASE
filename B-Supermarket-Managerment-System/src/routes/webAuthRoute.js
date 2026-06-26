// const express = require("express");
// const router = express.Router();

// const { register, login, me } = require("../controller/webAuthController");
// const { requireCustomerAuth } = require("../middleware/webAuth");

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", requireCustomerAuth, me);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { register, login, me } = require("../controller/webAuthController");
const { requireCustomerAuth } = require("../middleware/webAuth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireCustomerAuth, me);

module.exports = router;
