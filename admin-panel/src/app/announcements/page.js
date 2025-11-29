'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaEdit, FaImage, FaSmile, FaBullhorn } from 'react-icons/fa';
import toast from 'react-hot-toast';

const emojis = ['🎉', '📚', '🎓', '🔥', '⭐', '💡', '🚀', '🎯', '📖', '✏️', '🧮', '📊', '🎨', '🎭', '🏆', '💪'];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      text: 'Admissions open for classes 10, 11, 12 — enroll now!',
      image: '/next.svg',
      emoji: '🎓',
      active: true,
      order: 1
    },
    {
      id: 2,
      text: 'Free trial classes available — book your slot today.',
      image: '/next.svg',
      emoji: '🎉',
      active: true,
      order: 2
    },
    {
      id: 3,
      text: 'New video just dropped — mastering quadratic equations.',
      image: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      emoji: '📚',
      active: true,
      order: 3
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    image: null,
    emoji: '🎓',
    order: 1
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = () => {
    if (!formData.text.trim()) {
      toast.error('Please enter announcement text');
      return;
    }

    if (editingId) {
      // Edit existing announcement
      setAnnouncements(prev => prev.map(ann => 
        ann.id === editingId 
          ? { 
              ...ann, 
              text: formData.text, 
              emoji: formData.emoji, 
              order: formData.order,
              image: formData.image ? URL.createObjectURL(formData.image) : ann.image
            }
          : ann
      ));
      toast.success('Announcement updated successfully');
    } else {
      // Add new announcement
      const newId = Math.max(...announcements.map(a => a.id)) + 1;
      const newAnnouncement = {
        id: newId,
        text: formData.text,
        emoji: formData.emoji,
        image: formData.image ? URL.createObjectURL(formData.image) : null,
        active: true,
        order: formData.order
      };
      
      setAnnouncements(prev => [...prev, newAnnouncement]);
      toast.success('Announcement added successfully');
    }

    // Reset form
    setFormData({ text: '', image: null, emoji: '🎓', order: announcements.length + 1 });
    setShowForm(false);
    setEditingId(null);
  };

  const editAnnouncement = (announcement) => {
    setFormData({
      text: announcement.text,
      image: null,
      emoji: announcement.emoji,
      order: announcement.order
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    toast.success('Announcement deleted successfully');
  };

  const toggleActive = (id) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, active: !ann.active } : ann
    ));
    toast.success('Announcement status updated');
  };

  const reorderAnnouncements = (fromIndex, toIndex) => {
    const newAnnouncements = [...announcements];
    const [movedAnnouncement] = newAnnouncements.splice(fromIndex, 1);
    newAnnouncements.splice(toIndex, 0, movedAnnouncement);
    
    // Update order numbers
    newAnnouncements.forEach((ann, index) => {
      ann.order = index + 1;
    });
    
    setAnnouncements(newAnnouncements);
    toast.success('Announcements reordered successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link href="/" className="mr-4 text-gray-600 hover:text-brandPurple transition-colors">
              <FaArrowLeft className="text-xl" />
            </Link>
            <div className="flex items-center gap-3">
              <FaBullhorn className="text-3xl text-brandBlue" />
              <h1 className="text-3xl font-bold gradient-text">Announcements</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Form */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingId ? 'Edit Announcement' : 'Add New Announcement'}
            </h2>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setEditingId(null);
                  setFormData({ text: '', image: null, emoji: '🎓', order: announcements.length + 1 });
                }
              }}
              className="btn-primary flex items-center gap-2"
            >
              {showForm ? 'Cancel' : <><FaPlus /> Add New</>}
            </button>
          </div>

          {showForm && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Announcement Text
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Enter your announcement text..."
                  rows={3}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaImage className="inline mr-2" />
                    Thumbnail Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaSmile className="inline mr-2" />
                    Emoji
                  </label>
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                        className={`p-2 text-2xl rounded-lg border-2 transition-colors ${
                          formData.emoji === emoji 
                            ? 'border-brandPurple bg-brandPurple/10' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                  min="1"
                  max={announcements.length + 1}
                  className="input-field w-32"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  {editingId ? 'Update' : 'Add'} Announcement
                </button>
                {editingId && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ text: '', image: null, emoji: '🎓', order: announcements.length + 1 });
                    }}
                    className="btn-secondary"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Announcements List */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Announcements</h2>
          
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={announcement.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  {announcement.image ? (
                    <img
                      src={announcement.image}
                      alt="Announcement thumbnail"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FaImage className="text-2xl text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{announcement.emoji}</span>
                    <h3 className="font-medium text-gray-900">{announcement.text}</h3>
                  </div>
                  <p className="text-sm text-gray-600">Order: {announcement.order}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      announcement.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {announcement.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => editAnnouncement(announcement)}
                    className="p-2 text-brandBlue hover:text-brandBlue/80 hover:bg-brandBlue/10 rounded-lg transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => toggleActive(announcement.id)}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      announcement.active 
                        ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100' 
                        : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                    }`}
                  >
                    {announcement.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteAnnouncement(announcement.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {announcements.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FaBullhorn className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No announcements found. Add your first announcement to get started.</p>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="mt-8 card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Live Preview</h3>
          <div className="glass rounded-xl shadow-glass px-4 py-3 ticker-container max-w-5xl mx-auto">
            <div className="ticker-track">
              {announcements.filter(ann => ann.active).map((announcement) => (
                <div key={announcement.id} className="ticker-item text-sm sm:text-base">
                  {announcement.image && (
                    <img 
                      className="ticker-thumb" 
                      src={announcement.image} 
                      alt="thumb" 
                    />
                  )}
                  <span className="mr-2">{announcement.emoji}</span>
                  <span>{announcement.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">How announcements work:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Announcements will automatically scroll in the order specified</li>
            <li>• Only active announcements will be displayed</li>
            <li>• Images and emojis make announcements more engaging</li>
            <li>• You can reorder announcements by changing the order number</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
