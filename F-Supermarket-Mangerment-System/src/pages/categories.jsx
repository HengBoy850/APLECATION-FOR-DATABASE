import { useEffect, useState } from "react";

const API_URL = "http://172.20.10.14:8081/api/categories";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchCategories();
        setCategoryName("");
        setEditingId(null);
      });
  };

  const handleEdit = (category) => {
    setCategoryName(category.categoryName);
    setEditingId(category.categoryID);
  };

  const handleCancel = () => {
    setCategoryName("");
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => fetchCategories());
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-serif">
      <h1 className="text-2xl font-semibold mb-1">Categories</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage your product categories
      </p>

      {/* Add / Edit form */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <label className="block text-sm text-gray-600 mb-2 font-sans">
          Category name
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Electronics"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button
            onClick={handleSubmit}
            className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-sans px-4 py-2 rounded transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              onClick={handleCancel}
              className="border border-gray-300 text-gray-600 text-sm font-sans px-4 py-2 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
              <th className="px-4 py-3 font-medium w-16">ID</th>
              <th className="px-4 py-3 font-medium">Category name</th>
              <th className="px-4 py-3 font-medium text-right w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.categoryID}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-gray-500">
                  {category.categoryID}
                </td>
                <td className="px-4 py-3">{category.categoryName}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.categoryID)}
                    className="border border-red-200 text-red-600 text-xs px-3 py-1 rounded hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-400">
                  No categories yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}