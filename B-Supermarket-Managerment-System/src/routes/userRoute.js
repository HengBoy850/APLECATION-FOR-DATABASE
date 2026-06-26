// const express = require("express");
// const router = express.Router();

// const upload = require("../config/upload");

// const {
//   getUsers,
//   updateUser,
//   deleteUser,
//   registerUser,
//   loginUser
// } = require("../controller/userController");

// router.get("/", getUsers);

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// router.put("/:id", upload.single("image"), updateUser);

// router.delete("/:id", deleteUser);

// module.exports = router;

const express = require("express");
const router = express.Router();

const upload = require("../config/upload");

const {
  getUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  getUserById,
  changePassword
} = require("../controller/userController");

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/:id", upload.single("image"), updateUser);
router.put("/:id/password", changePassword);

router.delete("/:id", deleteUser);

module.exports = router;