import React, { useState } from 'react';
import { Input } from './input';

type ImageInputProps = {
  error?: string; // Specify the type of the error prop as a string
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

const ImageInput: React.FC<ImageInputProps> = ({ error, setImage }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      setImage(file);
    }
  };

  return (
    <div className="mt-8">
      <label htmlFor="image" className="font-bold mb-2">
        Image
      </label>
      <div className="relative">
        <Input
          placeholder=""
          type="file"
          className="h-12 w-full border rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleImageChange} 
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 16v-4a6 6 0 0 1 12 0v4M8 9h12a2 2 0 0 1-2 2v5H8V9z" />
          </svg>
        </div>
        {!preview && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        )}
      </div>
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="w-32 h-auto rounded-md w-32" />
        </div>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageInput;