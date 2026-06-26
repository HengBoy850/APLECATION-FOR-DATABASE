// const db = require("../config/db");


// // GET USERS
// const getUsers = (req, res) => {
//   db.query(
//     "SELECT * FROM users WHERE isDeleted = 0",
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json(result);
//     }
//   );
// };


// // SOFT DELETE
// const deleteUser = (req, res) => {
//   const id = req.params.id;

//   db.query(
//     "UPDATE users SET isDeleted = 1 WHERE userID=?",
//     [id],
//     (err, result) => {
//       if (err) return res.status(500).json(err);

//       res.json({
//         success: true,
//         message: "User deleted"
//       });
//     }
//   );
// };
// const registerUser = (req, res) => {
//   const { name, email, password } = req.body;

//   const sql = `
//     INSERT INTO users
//     (name, email, password, role, status)
//     VALUES (?, ?, ?, 'cashier', 'active')
//   `;

//   db.query(
//     sql,
//     [name, email, password],
//     (err, result) => {
//       if (err) return res.status(500).json(err);

//       res.json({
//         success: true,
//         message: "Registration successful"
//       });
//     }
//   );
// };


// const loginUser = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   const sql = `
//     SELECT *
//     FROM users
//     WHERE email = ?
//     AND password = ?
//     AND isDeleted = 0
//   `;

//   db.query(sql, [email, password], (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "DB error" });
//     }

//     console.log("LOGIN RESULT:", result);

//     if (result.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     return res.json({ user: result[0] });
//   });
// };
// const updateUser = (req, res) => {
//     console.log("FILE:", req.file);
//   console.log("BODY:", req.body);
//   const id = req.params.id;

//   const {
//     name,
//     email,
//     phone,
//     address,
//     role,
//     status
//   } = req.body;

//   const image = req.file ? req.file.filename : null;

//   let sql;
//   let values;

//   if (image) {
//     sql = `
//       UPDATE users
//       SET name=?, email=?, phone=?, address=?, role=?, status=?, image=?
//       WHERE userID=?
//     `;

//     values = [name, email, phone, address, role, status, image, id];
//   } else {
//     sql = `
//       UPDATE users
//       SET name=?, email=?, phone=?, address=?, role=?, status=?
//       WHERE userID=?
//     `;

//     values = [name, email, phone, address, role, status, id];
//   }

//   db.query(sql, values, (err, result) => {
//     if (err) return res.status(500).json(err);

//     res.json({
//       success: true,
//       message: "User updated successfully"
//     });
//   });
// };

// module.exports = {
//   getUsers,
//   updateUser,
//   deleteUser,
//   registerUser,
//   loginUser
// };

const db = require("../config/db");


// GET USERS
const getUsers = (req, res) => {
  db.query(
    "SELECT * FROM users WHERE isDeleted = 0",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};


// SOFT DELETE
const deleteUser = (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE users SET isDeleted = 1 WHERE userID=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "User deleted"
      });
    }
  );
};
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const sql = `
    INSERT INTO users
    (name, email, password, role, status)
    VALUES (?, ?, ?, 'cashier', 'active')
  `;

  db.query(
    sql,
    [name, email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Registration successful"
      });
    }
  );
};


const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
    AND password = ?
    AND isDeleted = 0
  `;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }

    console.log("LOGIN RESULT:", result);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({ user: result[0] });
  });
};
const updateUser = (req, res) => {
    console.log("FILE:", req.file);
  console.log("BODY:", req.body);
  const id = req.params.id;

  const {
    name,
    email,
    phone,
    address,
    role,
    status
  } = req.body;

  const image = req.file ? req.file.filename : null;

  let sql;
  let values;

  if (image) {
    sql = `
      UPDATE users
      SET name=?, email=?, phone=?, address=?, role=?, status=?, image=?
      WHERE userID=?
    `;

    values = [name, email, phone, address, role, status, image, id];
  } else {
    sql = `
      UPDATE users
      SET name=?, email=?, phone=?, address=?, role=?, status=?
      WHERE userID=?
    `;

    values = [name, email, phone, address, role, status, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "User updated successfully"
    });
  });
};

// GET single user by ID (for settings page)
const getUserById = (req, res) => {
  db.query(
    "SELECT userID, name, email, phone, address, image, role, status FROM users WHERE userID=? AND isDeleted=0",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    }
  );
};

// Change password
const changePassword = (req, res) => {
  const id = req.params.id;
  const { currentPassword, newPassword } = req.body;

  db.query("SELECT password FROM users WHERE userID=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    if (result[0].password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    db.query("UPDATE users SET password=? WHERE userID=?", [newPassword, id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ success: true, message: "Password changed successfully" });
    });
  });
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  getUserById,
  changePassword
};