import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        remark: '',
        image: null
    });

    // Image preview state
    const [imagePreview, setImagePreview] = useState(null);

    // Edit mode
    const [editMode, setEditMode] = useState(false);
    const [currentTeacherId, setCurrentTeacherId] = useState(null);

    // Fetch teachers
    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/teachers');
            setTeachers(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch teachers data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const teacherData = new FormData();
        teacherData.append('name', formData.name);
        teacherData.append('subject', formData.subject);
        teacherData.append('remark', formData.remark);
        if (formData.image) {
            teacherData.append('image', formData.image);
        }

        try {
            if (editMode) {
                // Update existing teacher
                await axios.put(`/api/teachers/${currentTeacherId}`, teacherData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Add new teacher
                await axios.post('/api/teachers', teacherData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            // Reset form and fetch updated list
            setFormData({ name: '', subject: '', remark: '', image: null });
            setImagePreview(null);
            setEditMode(false);
            setCurrentTeacherId(null);
            fetchTeachers();
        } catch (err) {
            setError(editMode ? 'Failed to update teacher' : 'Failed to add teacher');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Edit teacher
    const handleEdit = (teacher) => {
        setFormData({
            name: teacher.name,
            subject: teacher.subject,
            remark: teacher.remark,
            image: null, // Can't set the file object from the server response
        });

        // Ensure imagePreview is set to the teacher's existing image URL
        if (teacher.imageUrl) {
            setImagePreview(teacher.imageUrl.startsWith("http") ? teacher.imageUrl : `http://localhost:5000${teacher.imageUrl}`);
        } else {
            setImagePreview(null);
        }

        setEditMode(true);
        setCurrentTeacherId(teacher._id);
    };

    // Delete teacher
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            setLoading(true);
            try {
                await axios.delete(`/api/teachers/${id}`);
                fetchTeachers();
            } catch (err) {
                setError('Failed to delete teacher');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    // Cancel edit
    const handleCancel = () => {
        setFormData({ name: '', subject: '', remark: '', image: null });
        setImagePreview(null);
        setEditMode(false);
        setCurrentTeacherId(null);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Star Teachers Admin Dashboard</h1>

                {/* Error message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Add/Edit Teacher Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {editMode ? 'Edit Teacher' : 'Add New Teacher'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Subject:</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Remark:</label>
                                    <textarea
                                        name="remark"
                                        value={formData.remark}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Image:</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                            Choose Image
                                            <input
                                                type="file"
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </label>
                                        {formData.image && <span className="text-gray-700">{formData.image.name}</span>}
                                    </div>
                                    {editMode && (
                                        <p className="text-gray-500 text-sm mt-1">Leave empty to keep the current image</p>
                                    )}
                                </div>

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mt-4">
                                        <label className="block text-gray-700 mb-2">Image Preview:</label>
                                        <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-w-full h-auto max-h-64 rounded mx-auto"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            {editMode && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            )}

                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : (editMode ? 'Update Teacher' : 'Add Teacher')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Teachers List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-xl font-semibold p-4 border-b">All Teachers</h2>

                    {loading && !teachers.length ? (
                        <div className="p-4 text-center text-gray-600">Loading...</div>
                    ) : teachers.length === 0 ? (
                        <div className="p-4 text-center text-gray-600">No teachers found</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-gray-700">Image</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Name</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Subject</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Remark</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {teachers.map((teacher) => (
                                        <tr key={teacher._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={teacher.imageUrl.startsWith("http") ? teacher.imageUrl : `http://localhost:5000${teacher.imageUrl}`}
                                                    alt={teacher.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://placehold.co/150';
                                                    }}
                                                />
                                            </td>
                                            <td className="px-6 py-4">{teacher.name}</td>
                                            <td className="px-6 py-4">{teacher.subject}</td>
                                            <td className="px-6 py-4">{teacher.remark}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(teacher)}
                                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(teacher._id)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;