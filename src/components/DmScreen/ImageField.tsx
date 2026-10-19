import { useRef, useState } from "react";

import { imageFileIn, readImageFile } from "./imageFile";

interface ImageFieldProps {
    image?: string;
    alt: string;
    onChange: (image: string | undefined) => void;
}

// Import, replace or remove an image. Image files can also be dropped on it.
export default function ImageField({ image, alt, onChange }: ImageFieldProps) {
    const fileInput = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const importFile = (file: File | undefined) => {
        if (!file) return;
        setError("");
        readImageFile(file)
            .then(onChange)
            .catch((err: Error) => setError(err.message));
    };

    return (
        <div
            className="dms-inspector-section"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
                event.preventDefault();
                importFile(imageFileIn(event.dataTransfer));
            }}
        >
            <span className="dms-subtitle">Image</span>
            {image && <img className="dms-image-preview" src={image} alt={alt} />}
            <input
                ref={fileInput}
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => {
                    importFile(event.target.files?.[0]);
                    event.target.value = "";
                }}
            />
            <div className="dms-inspector-buttons">
                <button type="button" className="dms-button" onClick={() => fileInput.current?.click()}>
                    {image ? "Replace image" : "Import image"}
                </button>
                {image && (
                    <button type="button" className="dms-button dms-button--ghost" onClick={() => onChange(undefined)}>
                        Remove
                    </button>
                )}
            </div>
            {error && <p className="dms-inspector-help">{error}</p>}
        </div>
    );
}
