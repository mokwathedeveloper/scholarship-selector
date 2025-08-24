import React, { useState } from "react";
import { uploadApplicants } from "../services/api";
import withAuth from "../components/withAuth"; // Import the HOC

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("CV"); // Default to CV
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDocumentType(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus("⚠️ Please select a file first.");
      return;
    }
    if (!documentType) {
      setStatus("⚠️ Please select a document type.");
      return;
    }

    try {
      setStatus("⏳ Uploading...");
      const result = await uploadApplicants(selectedFile, documentType);
      setStatus(`✅ ${result.message}: ${result.file}`);
    } catch (error: any) {
      setStatus(`❌ Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload Document</h2>
      <div className="mb-4">
        <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Document Type</label>
        <select
          id="documentType"
          name="documentType"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={documentType}
          onChange={handleDocumentTypeChange}
        >
          <option value="CV">CV</option>
          <option value="Transcript">Transcript</option>
          <option value="Certificate">Certificate</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};

// Wrap the component with withAuth
export default withAuth(UploadPage, { roles: ['user', 'admin'] });
