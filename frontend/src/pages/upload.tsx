import React, { useState } from 'react';

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setMessage('');
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setMessage('Uploading...');
    setError('');

    // Placeholder for actual upload logic
    // This will be implemented in the next steps (API integration)
    console.log('Uploading file:', selectedFile.name);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage('File upload simulated successfully!');
    setSelectedFile(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Applicant Data</h1>
      <div className="mb-4">
        <input
          type="file"
          accept=".csv,.json"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Upload File
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default UploadPage;
