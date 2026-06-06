"use client";

export default function ImageUpload({
  onUploaded,
  onError,
}: {
  onUploaded: (path: string) => void;
  onError?: (message: string) => void;
}) {
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
        if (!response.ok) {
          const payload = (await response.json()) as { error?: string };
          onError?.(payload.error || "Upload failed");
          return;
        }
        const data = (await response.json()) as { path: string };
        onUploaded(data.path);
      }}
    />
  );
}
