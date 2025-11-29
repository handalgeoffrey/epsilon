'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function HeroManagement() {
  const [heroImages, setHeroImages] = useState([
    { id: 1, src: '/porsche.jpg', alt: 'Hero Background 1', order: 1, active: true }
  ]);
  const [showUpload, setShowUpload] = useState(false);
  const [newImage, setNewImage] = useState({ file: null, alt: '', order: 1 });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(prev => ({ ...prev, file }));
    }
  };

  const addImage = () => {
    if (!newImage.file || !newImage.alt.trim()) {
      toast.error('Please select an image and provide alt text');
      return;
    }

    const newId = Math.max(...heroImages.map(img => img.id)) + 1;
    const imageUrl = URL.createObjectURL(newImage.file);
    
    setHeroImages(prev => [...prev, {
      id: newId,
      src: imageUrl,
      alt: newImage.alt,
      order: newImage.order,
      active: true
    }]);

    setNewImage({ file: null, alt: '', order: heroImages.length + 1 });
    setShowUpload(false);
    toast.success('Image added successfully');
  };

  const deleteImage = (id) => {
    setHeroImages(prev => prev.filter(img => img.id !== id));
    toast.success('Image deleted successfully');
  };

  const toggleActive = (id) => {
    setHeroImages(prev => prev.map(img => 
      img.id === id ? { ...img, active: !img.active } : img
    ));
    toast.success('Image status updated');
  };

  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...heroImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    
    // Update order numbers
    newImages.forEach((img, index) => {
      img.order = index + 1;
    });
    
    setHeroImages(newImages);
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
            <h1 className="text-3xl font-bold gradient-text">Hero Management</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Hero Images</h2>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="btn-primary flex items-center gap-2"
            >
              <FaPlus />
              Add New Image
            </button>
          </div>

          {showUpload && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image
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
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={newImage.alt}
                    onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                    placeholder="Enter image description"
                    className="input-field"
                  />
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
                    max={heroImages.length + 1}
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addImage}
                    className="btn-primary"
                  >
                    Add Image
                  </button>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Images List */}
          <div className="space-y-4">
            {heroImages.map((image, index) => (
              <div key={image.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{image.alt}</h3>
                  <p className="text-sm text-gray-600">Order: {image.order}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      image.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {image.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(image.id)}
                    className={`px-3 py-1 text-sm rounded ${
                      image.active 
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                        : 'bg-green-200 text-green-700 hover:bg-green-300'
                    } transition-colors`}
                  >
                    {image.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Reorder Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Images will automatically cycle every 5 seconds in the order specified</li>
              <li>• Only active images will be displayed</li>
              <li>• The first image will be shown by default</li>
              <li>• Images should be high quality and optimized for web</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
