// frontend/src/pages/upload.js
import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Handle file upload logic here
      console.log('Uploading file:', file.name);
      alert(`File ${file.name} ready for upload! (Upload logic not yet implemented)`);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload Applicant List</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors duration-200
              ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            {file ? (
              <p className="text-gray-700">Selected file: <span className="font-semibold">{file.name}</span></p>
            ) : (
              <p className="text-gray-500">Drag & drop your file here, or click to select</p>
            )}
            <p className="text-sm text-gray-400 mt-1">(.csv, .xlsx, .xls files accepted)</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            disabled={!file}
          >
            Upload File
          </button>
        </form>

        {/* File information (optional) */}
        {file && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
            <p>File Name: {file.name}</p>
            <p>File Type: {file.type || 'N/A'}</p>
            <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
      </div>
    </div>
  );
}