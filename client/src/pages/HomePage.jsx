import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import EditPostModal from "../components/EditPostModal";

const HomePage = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Technology");
    const [formError, setFormError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await api.get("/posts");
            setPosts(res.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!title || !content) return setFormError("Title and Content required.");

        try {
            const res = await api.post("/posts", { title, content, category });
            const newPost = { ...res.data, user: { username: user.username } };
            setPosts([newPost, ...posts]);
            setTitle("");
            setContent("");
            setCategory("Technology");
            setFormError("");
        } catch (err) {
            setFormError("Failed to create post.");
        }
    };

    const handleDeletePost = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        try {
            await api.delete(`/posts/${id}`);
            setPosts(posts.filter((p) => p._id !== id));
        } catch (err) {
            setError("Failed to delete post.");
        }
    };

    const openEditModal = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const handleUpdatePost = (updatedPost) => {
        setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
    };

    return (
        <div className="font-lora text-ink-700 bg-cream-100 min-h-screen p-6 sm:p-10 transition-all duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {user && (
                    <div className="md:col-span-1">
                        <div className="bg-parchment p-6 rounded-2xl shadow-vintage border border-cream-200 sticky top-8">
                            <h3 className="font-playfair text-3xl text-ink-900 mb-4">
                                ✏️ Create a New Note
                            </h3>
                            <form onSubmit={handleCreatePost} className="space-y-5">
                                {formError && (
                                    <p className="text-red-600 text-sm">{formError}</p>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:border-ink-700 transition-colors"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Content
                                    </label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 shadow-inner focus:ring-1 focus:ring-ink-700 focus:outline-none"
                                        rows="5"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none focus:border-ink-700 transition-colors"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#3e2f26] text-[#fffaf2] py-2 rounded-md font-semibold tracking-wide hover:bg-[#2a1f1b] transition-colors duration-200"
                                >
                                    📌 Pin to Board
                                </button>

                            </form>
                        </div>
                    </div>
                )}

                {/* Post List */}
                <div className={user ? "md:col-span-2" : "md:col-span-3"}>
                    <h2 className="font-playfair text-5xl text-ink-900 mb-8">
                        The Note Board
                    </h2>

                    {loading && <p>Loading notes...</p>}
                    {error && <p className="text-red-600">{error}</p>}

                    <div className="space-y-8">
                        {posts.map((post) => {
                            const isAuthor = user && post.user && user._id === post.user._id;
                            return (
                                <div
                                    key={post._id}
                                    className="bg-parchment p-6 rounded-2xl shadow-vintage border border-cream-200 hover:shadow-lg hover:-translate-y-1 transition-all"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-semibold text-yellow-900 bg-yellow-200 px-3 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            by {post.user?.username || "Unknown"}
                                        </span>
                                    </div>

                                    <h3 className="font-playfair text-3xl text-ink-900 mb-3">
                                        {post.title}
                                    </h3>

                                    <p className="text-ink-700 whitespace-pre-wrap leading-relaxed text-[1.05rem]">
                                        {post.content}
                                    </p>

                                    {isAuthor && (
                                        <div className="mt-4 flex justify-end space-x-4 text-sm">
                                            <button
                                                onClick={() => openEditModal(post)}
                                                className="text-gray-500 hover:text-blue-700 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post._id)}
                                                className="text-gray-500 hover:text-red-700 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {isModalOpen && editingPost && (
                    <EditPostModal
                        post={editingPost}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleUpdatePost}
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
