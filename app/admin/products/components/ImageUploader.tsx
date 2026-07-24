"use client";

import { CldUploadWidget } from "next-cloudinary";

type Props = {
  onUpload: (url: string) => void;
};

export default function ImageUploader({ onUpload }: Props) {
  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onSuccess={(result) => {
          const info = result?.info as { secure_url?: string };

          if (info?.secure_url) {
            onUpload(info.secure_url);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="rounded-xl bg-white px-6 py-3 font-bold text-black"
          >
            Upload Gambar
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}