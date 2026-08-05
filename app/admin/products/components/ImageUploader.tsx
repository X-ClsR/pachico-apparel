"use client";

type Props = {
  onUpload: (url: string) => void;
};

export default function ImageUploader({ onUpload }: Props) {
  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    onUpload(data.url);
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      className="block w-full rounded-lg border border-zinc-700 p-3"
    />
  );
}