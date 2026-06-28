import { useState, useEffect } from "react";

const API_URL = "http://172.20.10.14:8081/api/users";

export default function Settings() {
  // Get logged-in user from localStorage (set this on login)
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUserID = storedUser ? storedUser.userID : null;

  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!currentUserID) return;

    fetch(`${API_URL}/${currentUserID}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setPreviewImage(data.image ? `http://172.20.10.14:8081/uploads/${data.image}` : null);
      })
      .catch((err) => console.log(err));
  }, [currentUserID]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSaveProfile = () => {
  if (!profile.name || !profile.email) {
    alert("Name and email are required");
    return;
  }

  const formData = new FormData();
  formData.append("name", profile.name);
  formData.append("email", profile.email);
  formData.append("phone", profile.phone || "");
  formData.append("address", profile.address || "");
  formData.append("role", profile.role);
  formData.append("status", profile.status);
  if (imageFile) formData.append("image", imageFile);

  fetch(`${API_URL}/${currentUserID}`, { method: "PUT", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);

      // Re-fetch the updated user so we get the real image filename from DB
      return fetch(`${API_URL}/${currentUserID}`)
        .then((res) => res.json())
        .then((updatedProfile) => {
          setProfile(updatedProfile);

          // Sync localStorage with fresh data
          const updatedUser = {
            ...storedUser,
            name:  updatedProfile.name,
            email: updatedProfile.email,
            image: updatedProfile.image,   // ← real filename from server
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Tell Navbar to re-read localStorage
          window.dispatchEvent(new Event("userUpdated"));
        });
    })
    .catch((err) => console.log(err));
};

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    fetch(`${API_URL}/${currentUserID}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => console.log(err));
  };

  if (!currentUserID) {
    return <div className="p-8 text-center text-gray-400">Please log in to view settings.</div>;
  }

  if (!profile) {
    return <div className="p-8 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#FAF7F2", fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 pb-4" style={{ borderBottom: "2px solid #1F2A3D" }}>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C9A227", letterSpacing: "0.2em" }}>
            Account
          </p>
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#1F2A3D" }}
          >
            Settings
          </h1>
        </div>

        {/* PROFILE CARD */}
        <div className="rounded p-6 mb-6" style={{ border: "1px solid #E0DACE", background: "#FFFFFF" }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "#1F2A3D" }}>
            Profile information
          </h2>

          {/* IMAGE */}
          <div className="flex justify-center mb-4">
            {previewImage ? (
              <img
                src={previewImage}
                alt="profile"
                className="w-24 h-24 object-cover rounded-full"
                style={{ border: "1px solid #E0DACE" }}
              />
            ) : (
              <div
                className="w-24 h-24 flex items-center justify-center rounded-full text-xs"
                style={{ border: "1px dashed #E0DACE", color: "#C7BFAF" }}
              >
                No image
              </div>
            )}
          </div>

          <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
            Profile picture
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 w-full text-xs" />

          {/* NAME */}
          <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
            Name
          </label>
          <input
            type="text"
            value={profile.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
            style={{ border: "1px solid #E0DACE" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />

          {/* EMAIL */}
          <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
            Email
          </label>
          <input
            type="email"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
            style={{ border: "1px solid #E0DACE" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />

          {/* PHONE & ROLE */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Phone
              </label>
              <input
                type="text"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2.5 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Role
              </label>
              <input
                type="text"
                value={profile.role || ""}
                disabled
                className="w-full p-2.5 rounded text-sm"
                style={{ border: "1px solid #E0DACE", background: "#FAF7F2", color: "#8A8275" }}
              />
            </div>
          </div>

          {/* ADDRESS */}
          <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
            Address
          </label>
          <textarea
            value={profile.address || ""}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            rows={2}
            className="w-full p-2.5 mb-4 rounded text-sm focus:outline-none"
            style={{ border: "1px solid #E0DACE" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />

          <button
            onClick={handleSaveProfile}
            className="px-5 py-2.5 text-sm font-medium tracking-wide rounded transition-colors"
            style={{ background: "#1F2A3D", color: "#FAF7F2" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
          >
            Save profile
          </button>
        </div>

        {/* PASSWORD CARD */}
        <div className="rounded p-6" style={{ border: "1px solid #E0DACE", background: "#FFFFFF" }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "#1F2A3D" }}>
            Change password
          </h2>

          <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
            style={{ border: "1px solid #E0DACE" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            className="px-5 py-2.5 text-sm font-medium tracking-wide rounded transition-colors"
            style={{ background: "#1F2A3D", color: "#FAF7F2" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
          >
            Update password
          </button>
        </div>
      </div>
    </div>
  );
}