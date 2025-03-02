"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please provide a video");
        return false;
      }
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size should not exceed 100 MB");
      return false;
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Image File not supported");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 100 MB");
        return false;
      }
    }

    return false;
  };

  return (
    <div className="p-4 bg-amber-300 border border-amber-900 rounded-lg">
      <h1 className="m-auto font-semibold text-blue-300">FILE UPLAOD CHECK</h1>
      <IKUpload
        fileName={fileType === "image" ? "image" : "video"}
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileType === "image" ? "/images" : "/videos"}
      />
      {uploading && (
        <div className="flex justify-center gap-2 items-center text-primary">
          <Loader2 size={36} className="animate-spin" />
          <span>Uploading...</span>
        </div>
      )}

      {error && <p className="text-error text-xl">{error}</p>}
    </div>
  );
}
