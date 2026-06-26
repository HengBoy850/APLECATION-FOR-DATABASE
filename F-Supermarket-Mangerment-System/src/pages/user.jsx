import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield, FaCashRegister, FaSearch, FaPen, FaTrash, FaTimes } from "react-icons/fa";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ FETCH USERS
  const fetchUsers = () => {
    axios.get("http://172.20.10.14:8081/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🗑️ DELETE USER (soft delete API)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://172.20.10.14:8081/api/users/${id}`)
        .then(() => fetchUsers())
        .catch(err => console.log(err));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    const formData = new FormData();

    formData.append("name", selectedUser.name);
    formData.append("email", selectedUser.email);
    formData.append("phone", selectedUser.phone || "");
    formData.append("address", selectedUser.address || "");
    formData.append("role", selectedUser.role);
    formData.append("status", selectedUser.status);

    if (selectedUser.imageFile) {
      formData.append("image", selectedUser.imageFile);
    }

    axios.put(
      `http://172.20.10.14:8081/api/users/${selectedUser.userID}`,
      formData
    )
      .then(() => {
        fetchUsers();
        setShowEditModal(false);
      })
      .catch(err => console.log(err));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-10 font-[Georgia,serif]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[#D9D3C7] pb-5">
          <div>
            <h1 className="text-3xl font-bold text-[#2B2A28] tracking-tight">
              User Management
            </h1>
            <p className="text-sm text-[#8A8378] mt-1 font-sans">
              View, search, and manage staff accounts
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B7AE9E]" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#D9D3C7] bg-white
                       text-sm font-sans text-[#2B2A28] placeholder-[#B7AE9E]
                       focus:outline-none focus:ring-2 focus:ring-[#C7A77B] focus:border-[#C7A77B]
                       shadow-sm transition"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E7E2D8] overflow-hidden">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="bg-[#2B2A28] text-[#F7F5F0] text-left uppercase tracking-wider text-xs">
                <th className="py-3.5 px-4 font-semibold">ID</th>
                <th className="py-3.5 px-4 font-semibold">Photo</th>
                <th className="py-3.5 px-4 font-semibold">Name</th>
                <th className="py-3.5 px-4 font-semibold">Email</th>
                <th className="py-3.5 px-4 font-semibold">Phone</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Address</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-[#B7AE9E]">
                    No users match your search.
                  </td>
                </tr>
              )}

              {filteredUsers.map((user, idx) => (
                <tr
                  key={user.userID}
                  className={`border-t border-[#EFEBE3] hover:bg-[#FBF9F4] transition-colors ${
                    idx % 2 === 1 ? "bg-[#FCFBF8]" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 text-[#8A8378] font-medium">#{user.userID}</td>

                  <td className="py-3 px-4">
                    <img
                      src={
                        user.image
                          ? `http://172.20.10.14:8081/uploads/${user.image}`
                          : "/default-avatar.png"
                      }
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover border border-[#E7E2D8]"
                    />
                  </td>

                  <td className="py-3 px-4 text-[#2B2A28] font-semibold">{user.name}</td>
                  <td className="py-3 px-4 text-[#5B5650]">{user.email}</td>
                  <td className="py-3 px-4 text-[#5B5650]">{user.phone}</td>

                  <td className="py-3 px-4">
                    {user.role === "admin" ? (
                      <span className="inline-flex items-center gap-1.5 text-[#8A5A2B] bg-[#F3E7D6] px-2.5 py-1 rounded-full text-xs font-semibold">
                        <FaUserShield className="text-[10px]" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[#3E5C76] bg-[#E3EAF1] px-2.5 py-1 rounded-full text-xs font-semibold">
                        <FaCashRegister className="text-[10px]" />
                        Cashier
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-[#E4EFE6] text-[#3E7350]"
                          : "bg-[#F6E6E4] text-[#A14A3F]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "active" ? "bg-[#3E7350]" : "bg-[#A14A3F]"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#5B5650] max-w-45 truncate">
                    {user.address}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        title="Edit user"
                        className="w-9 h-9 flex items-center justify-center rounded-full
                                   border border-[#D9D3C7] text-[#8A8378]
                                   hover:bg-[#C7A77B] hover:text-white hover:border-[#C7A77B]
                                   transition-colors"
                      >
                        <FaPen className="text-xs" />
                      </button>

                      <button
                        onClick={() => handleDelete(user.userID)}
                        title="Delete user"
                        className="w-9 h-9 flex items-center justify-center rounded-full
                                   border border-[#D9D3C7] text-[#8A8378]
                                   hover:bg-[#A14A3F] hover:text-white hover:border-[#A14A3F]
                                   transition-colors"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#FBF9F4] rounded-2xl shadow-xl w-full max-w-md border border-[#E7E2D8] overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E2D8] bg-white">
              <h2 className="text-xl font-bold text-[#2B2A28] tracking-tight">
                Edit User
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#B7AE9E] hover:text-[#2B2A28] transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4 font-sans max-h-[70vh] overflow-y-auto">

              <div>
                <label className="block text-xs font-semibold text-[#8A8378] uppercase tracking-wide mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="w-full border border-[#D9D3C7] rounded-lg px-3.5 py-2.5 text-sm
                             text-[#2B2A28] bg-white focus:outline-none focus:ring-2
                             focus:ring-[#C7A77B] focus:border-[#C7A77B] transition"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8378] uppercase tracking-wide mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full border border-[#D9D3C7] rounded-lg px-3.5 py-2.5 text-sm
                             text-[#2B2A28] bg-white focus:outline-none focus:ring-2
                             focus:ring-[#C7A77B] focus:border-[#C7A77B] transition"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8378] uppercase tracking-wide mb-1.5">
                  Phone
                </label>
                <input
                  type="text"
                  value={selectedUser.phone || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, phone: e.target.value })
                  }
                  className="w-full border border-[#D9D3C7] rounded-lg px-3.5 py-2.5 text-sm
                             text-[#2B2A28] bg-white focus:outline-none focus:ring-2
                             focus:ring-[#C7A77B] focus:border-[#C7A77B] transition"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8378] uppercase tracking-wide mb-1.5">
                  Profile photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, imageFile: e.target.files[0] })
                  }
                  className="w-full text-sm text-[#5B5650] border border-[#D9D3C7] rounded-lg
                             px-3.5 py-2 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-full
                             file:border-0 file:bg-[#F3E7D6] file:text-[#8A5A2B] file:text-xs
                             file:font-semibold cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8378] uppercase tracking-wide mb-1.5">
                  Address
                </label>
                <textarea
                  value={selectedUser.address || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, address: e.target.value })
                  }
                  rows={2}
                  className="w-full border border-[#D9D3C7] rounded-lg px-3.5 py-2.5 text-sm
                             text-[#2B2A28] bg-white focus:outline-none focus:ring-2
                             focus:ring-[#C7A77B] focus:border-[#C7A77B] transition resize-none"
                  placeholder="Street, city, postal code"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#8A8378] uppercase tracking-wide mb-1.5">
                    Role
                  </label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                    className="w-full border border-[#D9D3C7] rounded-lg px-3.5 py-2.5 text-sm
                               text-[#2B2A28] bg-white focus:outline-none focus:ring-2
                               focus:ring-[#C7A77B] focus:border-[#C7A77B] transition"
                  >
                    <option value="admin">Admin</option>
                    <option value="cashier">Cashier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8A8378] uppercase tracking-wide mb-1.5">
                    Status
                  </label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, status: e.target.value })
                    }
                    className="w-full border border-[#D9D3C7] rounded-lg px-3.5 py-2.5 text-sm
                               text-[#2B2A28] bg-white focus:outline-none focus:ring-2
                               focus:ring-[#C7A77B] focus:border-[#C7A77B] transition"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E7E2D8] bg-white">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#8A8378]
                           border border-[#D9D3C7] hover:bg-[#F3F1EB] transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white
                           bg-[#2B2A28] hover:bg-[#46443F] transition-colors shadow-sm"
              >
                Save changes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}