import { useState, useEffect } from "react";

const API_URL = "http://172.20.10.14:8081/api/suppliers";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const fetchSuppliers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setSuppliers(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.log(err);
        setSuppliers([]);
      });
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setSuppliers((prev) => prev.filter((s) => s.supplierID !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = () => {
    setSelectedSupplier({
      supplierName: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
    });
    setShowModal(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!selectedSupplier.supplierName) {
      alert("Please fill in Supplier Name");
      return;
    }

    const url = selectedSupplier.supplierID
      ? `${API_URL}/${selectedSupplier.supplierID}`
      : API_URL;

    const method = selectedSupplier.supplierID ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedSupplier),
    })
      .then((res) => res.json())
      .then(() => {
        fetchSuppliers();
        setShowModal(false);
        setSelectedSupplier(null);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedSupplier(null);
  };

  const filteredSuppliers = suppliers.filter((s) =>
    (s.supplierName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#FAF7F2", fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 pb-4" style={{ borderBottom: "2px solid #1F2A3D" }}>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C9A227", letterSpacing: "0.2em" }}>
              Inventory
            </p>
            <h1
              className="text-3xl font-semibold"
              style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#1F2A3D" }}
            >
              Suppliers
            </h1>
          </div>
          <button
            onClick={handleAdd}
            className="px-5 py-2.5 text-sm font-medium tracking-wide rounded transition-colors"
            style={{ background: "#1F2A3D", color: "#FAF7F2" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
          >
            + Add Supplier
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search suppliers by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded text-sm focus:outline-none transition-shadow"
            style={{
              border: "1px solid #E0DACE",
              background: "#FFFFFF",
              color: "#1F2A3D",
            }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        </div>

        {/* TABLE */}
        <div className="rounded overflow-hidden" style={{ border: "1px solid #E0DACE", background: "#FFFFFF" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#1F2A3D" }}>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>ID</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Supplier Name</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Contact Person</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Phone</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Email</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Address</th>
                <th className="p-3 text-center font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((s, idx) => (
                <tr
                  key={s.supplierID}
                  style={{
                    borderTop: "1px solid #E0DACE",
                    background: idx % 2 === 0 ? "#FFFFFF" : "#FCFAF6",
                  }}
                >
                  <td className="p-3" style={{ color: "#8A8275", fontFamily: "'Courier New', monospace" }}>
                    {String(s.supplierID).padStart(3, "0")}
                  </td>
                  <td className="p-3 font-medium" style={{ color: "#1F2A3D" }}>{s.supplierName}</td>
                  <td className="p-3" style={{ color: "#6B6354" }}>{s.contactPerson}</td>
                  <td className="p-3" style={{ color: "#6B6354" }}>{s.phone}</td>
                  <td className="p-3" style={{ color: "#6B6354" }}>{s.email}</td>
                  <td className="p-3" style={{ color: "#6B6354" }}>{s.address}</td>
                  <td className="p-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(s)}
                      className="px-3 py-1 mr-2 text-xs font-medium rounded transition-colors"
                      style={{ border: "1px solid #C9A227", color: "#1F2A3D", background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FBF4DD")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.supplierID)}
                      className="px-3 py-1 text-xs font-medium rounded transition-colors"
                      style={{ border: "1px solid #B5564B", color: "#B5564B", background: "transparent" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#B5564B";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#B5564B";
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredSuppliers.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center" style={{ color: "#C7BFAF" }}>
                    No suppliers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedSupplier && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 p-4"
          style={{ background: "rgba(31,42,61,0.45)" }}
        >
          <div className="w-full max-w-sm rounded-lg overflow-hidden" style={{ background: "#FFFFFF" }}>
            <div className="px-6 py-4" style={{ background: "#1F2A3D" }}>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#FAF7F2" }}
              >
                {selectedSupplier.supplierID ? "Edit Supplier" : "Add Supplier"}
              </h2>
            </div>

            <div className="p-6">
              {/* SUPPLIER NAME */}
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Supplier name
              </label>
              <input
                type="text"
                placeholder="e.g. ABC Distributors"
                value={selectedSupplier.supplierName}
                onChange={(e) =>
                  setSelectedSupplier({ ...selectedSupplier, supplierName: e.target.value })
                }
                className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />

              {/* CONTACT PERSON */}
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Contact person
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={selectedSupplier.contactPerson || ""}
                onChange={(e) =>
                  setSelectedSupplier({ ...selectedSupplier, contactPerson: e.target.value })
                }
                className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />

              {/* PHONE & EMAIL */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 09123456789"
                    value={selectedSupplier.phone || ""}
                    onChange={(e) =>
                      setSelectedSupplier({ ...selectedSupplier, phone: e.target.value })
                    }
                    className="w-full p-2.5 rounded text-sm focus:outline-none"
                    style={{ border: "1px solid #E0DACE" }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. supplier@mail.com"
                    value={selectedSupplier.email || ""}
                    onChange={(e) =>
                      setSelectedSupplier({ ...selectedSupplier, email: e.target.value })
                    }
                    className="w-full p-2.5 rounded text-sm focus:outline-none"
                    style={{ border: "1px solid #E0DACE" }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Address
              </label>
              <input
                type="text"
                placeholder="e.g. No. 123, Main Street, Yangon"
                value={selectedSupplier.address || ""}
                onChange={(e) =>
                  setSelectedSupplier({ ...selectedSupplier, address: e.target.value })
                }
                className="w-full p-2.5 mb-1 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-2 px-6 py-4" style={{ borderTop: "1px solid #E0DACE" }}>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{ border: "1px solid #E0DACE", color: "#6B6354", background: "#FFFFFF" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF7F2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{ background: "#1F2A3D", color: "#FAF7F2" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
              >
                {selectedSupplier.supplierID ? "Save changes" : "Add supplier"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
