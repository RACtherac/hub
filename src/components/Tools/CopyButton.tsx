import { useEffect, useState } from "react";

interface CopyButtonProps {
    text: string;
    label?: string;
    className?: string;
}

// Copies text and says so for a moment. Disabled when there's nothing to copy.
export default function CopyButton({ text, label = "Copy", className = "tl-button tl-button--ghost" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 1500);
        return () => window.clearTimeout(timer);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        }
        catch {
            // Clipboard blocked (e.g. not a secure page); the text can still be selected by hand.
        }
    };

    return (
        <button type="button" className={className} onClick={copy} disabled={!text}>
            {copied ? "Copied ✓" : label}
        </button>
    );
}
