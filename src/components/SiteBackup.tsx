import { useRef, useState } from "react";
import { buildBackup, parseBackup, restoreBackup, summarizeBackup } from "../utils/siteBackup";

function describe(summary: Record<string, number>) {
    return Object.keys(summary).sort().join(", ");
}

/** Export / import of everything every project has saved in this browser. */
export default function SiteBackup() {
    const fileInput = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

    function exportAll() {
        const backup = buildBackup(localStorage);
        const summary = summarizeBackup(backup);
        if (Object.keys(summary).length === 0) {
            setMessage({ text: "Nothing saved yet — use a project first.", error: true });
            return;
        }
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `hub-backup-${backup.exportedAt.slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
        setMessage({ text: `Exported: ${describe(summary)}.` });
    }

    async function importAll(file: File) {
        try {
            const backup = parseBackup(await file.text());
            const summary = summarizeBackup(backup);
            const ok = window.confirm(
                `Import ${file.name}?\n\nThis replaces the saved data for: ${describe(summary)}.\nProjects not in the file are left as they are.`,
            );
            if (!ok) return;
            restoreBackup(backup, localStorage);
            setMessage({ text: `Imported: ${describe(summary)}.` });
        } catch (error) {
            const text = error instanceof Error ? error.message : "The import failed.";
            // QuotaExceededError when the browser's storage is full.
            setMessage({ text: text.includes("quota") ? "The browser's storage is full." : text, error: true });
        }
    }

    return (
        <div className="site-backup">
            <button type="button" className="site-backup-btn" onClick={exportAll}>
                Export all data ↓
            </button>
            <button type="button" className="site-backup-btn" onClick={() => fileInput.current?.click()}>
                Import all data ↑
            </button>
            <input
                ref={fileInput}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (file) void importAll(file);
                }}
            />
            {message && (
                <span className={`site-backup-msg${message.error ? " is-error" : ""}`} role="status">
                    {message.text}
                </span>
            )}
        </div>
    );
}
