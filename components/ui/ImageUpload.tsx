"use client";

export default function ImageUpload({ onUploaded }: { onUploaded: (path: string) => void }) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/upload", { method: "POST", body: formData });
        if (!response.ok) return;
        const data = (await response.json()) as { path: string };
        onUploaded(data.path);
      }}
    />
  );
}
