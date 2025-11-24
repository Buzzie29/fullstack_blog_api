import React, { useState } from "react";
import api from "../api/api";

/*
  Techno-Themed Edit Modal
  Props:
    - post: Post data being edited
    - onClose: Function to close the modal
    - onSave: Callback with updated post after successful save
*/

const EditPostModal = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    category: post.category,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.put(`/posts/${post._id}`, formData);
      onSave(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post.");
    }
  };

  return (
    // --- Backdrop ---
    <div
      className="fixed inset-0 bg-[#1b1a17]/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 font-['Lora']"
      onClick={onClose}
    >
      {/* --- Modal Container --- */}
      <div
        className="bg-[#f8f4ec] border border-[#d2c2a8] rounded-2xl shadow-xl shadow-[#00000022]
                   w-full max-w-lg p-8 transition-all duration-300 transform hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Header --- */}
        <h2 className="font-['Playfair_Display'] text-3xl text-[#2d2926] mb-6 text-center">
          ✎ Edit Your Note
        </h2>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-[#b33a3a] bg-[#fceaea] border border-[#e5b4b4] rounded-md px-3 py-2 text-sm mb-4">
              {error}
            </p>
          )}

          {/* --- Title --- */}
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#6b625b]">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-[#b8a089] focus:border-[#6b5842]
                         text-lg py-2 px-1 outline-none transition-all duration-200"
            />
          </div>

          {/* --- Content --- */}
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#6b625b]">
              Content
            </label>
            <textarea
              name="content"
              rows="5"
              value={formData.content}
              onChange={handleChange}
              className="w-full bg-[#fdfaf6] border border-[#d4c3a8] rounded-md
                         shadow-inner px-3 py-2 focus:ring-1 focus:ring-[#6b5842] focus:border-[#6b5842]
                         transition-all duration-200 resize-none"
            />
          </div>

          {/* --- Category --- */}
          <div>
            <label className="block mb-1 font-semibold text-sm text-[#6b625b]">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-[#b8a089] focus:border-[#6b5842]
                         py-2 px-1 outline-none transition-all duration-200"
            />
          </div>

          {/* --- Buttons --- */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#e9e3da] text-[#4f4a45] px-5 py-2 rounded-md
                         hover:bg-[#ddd2c4] transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#3b2f2f] text-[#fdfaf6] px-5 py-2 rounded-md
                         hover:bg-[#2a211f] transition-all duration-200 font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
