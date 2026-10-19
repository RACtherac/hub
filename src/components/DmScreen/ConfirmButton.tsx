import { useEffect, useState } from "react";

interface ConfirmButtonProps {
    label: string;
    confirmLabel?: string;
    className?: string;
    onConfirm: () => void;
}

// A delete button that needs a second click, instead of a browser confirm().
export default function ConfirmButton({ label, confirmLabel = "Click again to delete", className, onConfirm }: ConfirmButtonProps) {
    const [armed, setArmed] = useState(false);

    useEffect(() => {
        if (!armed) return;
        const timer = window.setTimeout(() => setArmed(false), 3000);
        return () => window.clearTimeout(timer);
    }, [armed]);

    return (
        <button
            type="button"
            className={`${className ?? "dms-link-button"}${armed ? " armed" : ""}`}
            onClick={() => {
                if (armed) {
                    setArmed(false);
                    onConfirm();
                }
                else setArmed(true);
            }}
            onBlur={() => setArmed(false)}
        >
            {armed ? confirmLabel : label}
        </button>
    );
}
