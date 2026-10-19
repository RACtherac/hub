// Imported images are scaled down and re-encoded so the DM screen still fits in localStorage.
const IMAGE_MAX_SIDE = 800;

export async function readImageFile(file: File): Promise<string> {
    const url = URL.createObjectURL(file);
    try {
        const image = new Image();
        await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () => reject(new Error("That file isn't an image the browser can read."));
            image.src = url;
        });
        const scale = Math.min(1, IMAGE_MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext("2d")!.drawImage(image, 0, 0, canvas.width, canvas.height);
        // WebP keeps transparency and stays small.
        return canvas.toDataURL("image/webp", 0.85);
    }
    finally {
        URL.revokeObjectURL(url);
    }
}

export const imageFileIn = (dataTransfer: DataTransfer | null) =>
    Array.from(dataTransfer?.files ?? []).find((f) => f.type.startsWith("image/"));
