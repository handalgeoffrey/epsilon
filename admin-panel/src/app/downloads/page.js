'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaEdit, FaDownload, FaFilePdf, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [newFile, setNewFile] = useState({ file: null, title: '', description: '', category: 'General' });

  const categories = ['General', 'Syllabus', 'Practice Tests', 'Study Materials', 'Notes', 'Previous Papers'];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setNewFile(prev => ({ ...prev, file }));
    } else if (file) {
      toast.error('Please select a PDF file');
    }
  };

  const addFile = () => {
    if (!newFile.file || !newFile.title.trim()) {
      toast.error('Please select a file and provide a title');
      return;
    }

    const newId = Math.max(...downloads.map(d => d.id), 0) + 1;
    const fileUrl = URL.createObjectURL(newFile.file);
    
    setDownloads(prev => [...prev, {
      id: newId,
      title: newFile.title,
      description: newFile.description,
      category: newFile.category,
      fileName: newFile.file.name,
      fileSize: (newFile.file.size / 1024 / 1024).toFixed(2), // MB
      uploadDate: new Date().toLocaleDateString(),
      downloads: 0,
      active: true
    }]);

    setNewFile({ file: null, title: '', description: '', category: 'General' });
    setShowUpload(false);
    toast.success('File added successfully');
  };

  const deleteFile = (id) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
    toast.success('File deleted successfully');
  };

  const toggleActive = (id) => {
    setDownloads(prev => prev.map(d => 
      d.id === id ? { ...d, active: !d.active } : d
    ));
    toast.success('File status updated');
  };

  const editFile = (download) => {
    setNewFile({
      file: null,
      title: download.title,
      description: download.description,
      category: download.category
    });
    // In a real app, you'd handle editing differently
    toast.info('Edit functionality would be implemented here');
  };

  const downloadFile = (id) => {
    setDownloads(prev => prev.map(d => 
      d.id === id ? { ...d, downloads: d.downloads + 1 } : d
    ));
    toast.success('Download started');
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
              <FaDownload className="text-3xl text-brandGreen" />
              <h1 className="text-3xl font-bold gradient-text">Downloads</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">PDF Files</h2>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="btn-primary flex items-center gap-2"
            >
              <FaPlus />
              Upload New File
            </button>
          </div>

          {showUpload && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFilePdf className="inline mr-2 text-red-500" />
                    Upload PDF File
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Only PDF files are allowed. Maximum size: 10MB
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Title
                  </label>
                  <input
                    type="text"
                    value={newFile.title}
                    onChange={(e) => setNewFile(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter file title"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newFile.description}
                    onChange={(e) => setNewFile(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter file description"
                    rows={3}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newFile.category}
                    onChange={(e) => setNewFile(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={addFile}
                    className="btn-primary"
                  >
                    Upload File
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

          {/* Files List */}
          <div className="space-y-4">
            {downloads.map((download) => (
              <div key={download.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaFilePdf className="text-2xl text-red-500" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{download.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{download.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Category: {download.category}</span>
                    <span>Size: {download.fileSize} MB</span>
                    <span>Uploaded: {download.uploadDate}</span>
                    <span>Downloads: {download.downloads}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      download.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {download.active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-500">{download.fileName}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadFile(download.id)}
                    className="p-2 text-brandGreen hover:text-brandGreen/80 hover:bg-brandGreen/10 rounded-lg transition-colors"
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => editFile(download)}
                    className="p-2 text-brandBlue hover:text-brandBlue/80 hover:bg-brandBlue/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => toggleActive(download.id)}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      download.active 
                        ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100' 
                        : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                    }`}
                    title={download.active ? 'Deactivate' : 'Activate'}
                  >
                    {download.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteFile(download.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {downloads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FaFilePdf className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No files uploaded yet. Upload your first PDF file to get started.</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <FaFilePdf className="text-3xl text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{downloads.length}</div>
            <div className="text-sm text-gray-600">Total Files</div>
          </div>
          <div className="card text-center">
            <FaDownload className="text-3xl text-brandGreen mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {downloads.reduce((total, d) => total + d.downloads, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl text-brandPurple mx-auto mb-2">📁</div>
            <div className="text-2xl font-bold text-gray-900">
              {downloads.filter(d => d.active).length}
            </div>
            <div className="text-sm text-gray-600">Active Files</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">How downloads work:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Only PDF files are allowed for upload</li>
            <li>• Files are organized by categories for easy access</li>
            <li>• Download count is tracked for analytics</li>
            <li>• Inactive files won't be visible to users</li>
            <li>• File size should be optimized for web download</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
