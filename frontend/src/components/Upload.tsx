import React, { useState } from "react";
import { uploadApplicants } from "../services/api";
import { UploadResult } from '../types/upload'; // Import UploadResult

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("⚠️ Please select a file first.");
      return;
    }
    try {
      setStatus("⏳ Uploading...");
      const result: UploadResult = await uploadApplicants(file); // Use UploadResult
      setStatus(`✅ Upload successful: ${JSON.stringify(result)}`);
    } catch (error: any) { // Keep any for now, or define a more specific error interface
      setStatus(`❌ Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload Applicants</h2>
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

export default Upload;
