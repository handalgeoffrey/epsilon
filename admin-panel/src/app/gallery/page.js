'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaEdit, FaCamera, FaEye, FaSearchPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([
    { 
      id: 1, 
      src: '/Gallary image 1.jpg', 
      caption: 'Event 1', 
      description: 'Mathematics workshop for class 12 students',
      category: 'Events',
      active: true,
      order: 1
    },
    { 
      id: 2, 
      src: '/logo.jpg', 
      caption: 'Epsilon Logo', 
      description: 'Official Epsilon Mathematics Institute logo',
      category: 'Branding',
      active: true,
      order: 2
    }
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newImage, setNewImage] = useState({ 
    file: null, 
    caption: '', 
    description: '', 
    category: 'Events',
    order: 1
  });

  const categories = ['Events', 'Branding', 'Students', 'Faculty', 'Campus', 'Achievements'];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewImage(prev => ({ ...prev, file }));
    } else if (file) {
      toast.error('Please select an image file');
    }
  };

  const addImage = () => {
    if (!newImage.file || !newImage.caption.trim()) {
      toast.error('Please select an image and provide a caption');
      return;
    }

    const newId = Math.max(...galleryImages.map(img => img.id)) + 1;
    const imageUrl = URL.createObjectURL(newImage.file);
    
    setGalleryImages(prev => [...prev, {
      id: newId,
      src: imageUrl,
      caption: newImage.caption,
      description: newImage.description,
      category: newImage.category,
      active: true,
      order: newImage.order
    }]);

    setNewImage({ file: null, caption: '', description: '', category: 'Events', order: galleryImages.length + 1 });
    setShowUpload(false);
    toast.success('Image added successfully');
  };

  const editImage = (image) => {
    setNewImage({
      file: null,
      caption: image.caption,
      description: image.description,
      category: image.category,
      order: image.order
    });
    setEditingId(image.id);
    setShowUpload(true);
  };

  const updateImage = () => {
    if (!newImage.caption.trim()) {
      toast.error('Please provide a caption');
      return;
    }

    setGalleryImages(prev => prev.map(img => 
      img.id === editingId 
        ? { 
            ...img, 
            caption: newImage.caption, 
            description: newImage.description, 
            category: newImage.category,
            order: newImage.order
          }
        : img
    ));

    setNewImage({ file: null, caption: '', description: '', category: 'Events', order: 1 });
    setShowUpload(false);
    setEditingId(null);
    toast.success('Image updated successfully');
  };

  const deleteImage = (id) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
    toast.success('Image deleted successfully');
  };

  const toggleActive = (id) => {
    setGalleryImages(prev => prev.map(img => 
      img.id === id ? { ...img, active: !img.active } : img
    ));
    toast.success('Image status updated');
  };

  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...galleryImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    
    // Update order numbers
    newImages.forEach((img, index) => {
      img.order = index + 1;
    });
    
    setGalleryImages(newImages);
    toast.success('Images reordered successfully');
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
              <FaCamera className="text-3xl text-brandGold" />
              <h1 className="text-3xl font-bold gradient-text">Gallery</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingId ? 'Edit Image' : 'Gallery Images'}
            </h2>
            <button
              onClick={() => {
                setShowUpload(!showUpload);
                if (showUpload) {
                  setEditingId(null);
                  setNewImage({ file: null, caption: '', description: '', category: 'Events', order: 1 });
                }
              }}
              className="btn-primary flex items-center gap-2"
            >
              {showUpload ? 'Cancel' : <><FaPlus /> Add New Image</>}
            </button>
          </div>

          {showUpload && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCamera className="inline mr-2 text-brandGold" />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPG, PNG, GIF. Maximum size: 5MB
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={newImage.caption}
                    onChange={(e) => setNewImage(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Enter image caption"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newImage.description}
                    onChange={(e) => setNewImage(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter image description"
                    rows={3}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newImage.category}
                      onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value }))}
                      className="input-field"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={newImage.order}
                      onChange={(e) => setNewImage(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                      min="1"
                      max={galleryImages.length + 1}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={editingId ? updateImage : addImage}
                    className="btn-primary"
                  >
                    {editingId ? 'Update Image' : 'Add Image'}
                  </button>
                  {editingId && (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setNewImage({ file: null, caption: '', description: '', category: 'Events', order: 1 });
                      }}
                      className="btn-secondary"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="relative group">
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={() => editImage(image)}
                        className="p-2 bg-white rounded-full text-brandBlue hover:bg-brandBlue hover:text-white transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => toggleActive(image.id)}
                        className={`p-2 rounded-full transition-colors ${
                          image.active 
                            ? 'bg-white text-gray-600 hover:bg-gray-100' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        title={image.active ? 'Deactivate' : 'Activate'}
                      >
                        {image.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.caption}</h3>
                  <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">{image.category}</span>
                    <span>Order: {image.order}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      image.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {image.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {galleryImages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FaCamera className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No images uploaded yet. Upload your first image to get started.</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <FaCamera className="text-3xl text-brandGold mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{galleryImages.length}</div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl text-brandPurple mx-auto mb-2">📁</div>
            <div className="text-2xl font-bold text-gray-900">
              {galleryImages.filter(img => img.active).length}
            </div>
            <div className="text-sm text-gray-600">Active Images</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl text-brandBlue mx-auto mb-2">🏷️</div>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(galleryImages.map(img => img.category)).size}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl text-brandGreen mx-auto mb-2">👁️</div>
            <div className="text-2xl font-bold text-gray-900">
              {galleryImages.reduce((total, img) => total + (img.order || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Order</div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery Preview</h3>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {galleryImages.filter(img => img.active).map((img) => (
              <div key={img.id} className="break-inside-avoid mb-4">
                <div className="relative group rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                      <h4 className="font-semibold text-lg">{img.caption}</h4>
                      <p className="text-sm">{img.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">How gallery works:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Images are displayed in a responsive masonry layout</li>
            <li>• Only active images are visible to users</li>
            <li>• Images can be categorized for better organization</li>
            <li>• Order determines the display sequence</li>
            <li>• Hover effects show image details and actions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
