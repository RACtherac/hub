import { useEffect, useRef } from "react";

import { NODE_KINDS, type StoryRecap } from "../../utils/dmScreen";

interface RecapDialogProps {
    recap: StoryRecap;
    // False when the board was never ended, so this is the story so far.
    ended: boolean;
    onClose: () => void;
}

const kindLabel = (kind: string) => NODE_KINDS.find((k) => k.value === kind)?.label ?? "Note";

// "Previously on…": what happened on a story board, as a modal.
export default function RecapDialog({ recap, ended, onClose }: RecapDialogProps) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialog.current?.showModal();
    }, []);

    return (
        <dialog
            ref={dialog}
            className="dms-dialog dms-recap-dialog"
            aria-labelledby="dms-recap-title"
            onClose={onClose}
            // A click on the backdrop lands on the dialog itself.
            onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        >
            <div className="dms-dialog-body">
                <div className="dms-dialog-header">
                    <h2 id="dms-recap-title" className="dms-panel-title">Previously on {recap.boardName}…</h2>
                    <button type="button" className="dms-icon-button" aria-label="Close" onClick={() => dialog.current?.close()}>×</button>
                </div>
                <p className="dms-inspector-help">
                    {ended
                        ? <>Ended {new Date(recap.endedAt).toLocaleDateString()}{recap.endedOn && ` · ${recap.endedOn} in game`}</>
                        : "This board hasn't been ended yet, so this is the story so far."}
                </p>

                {recap.steps.length === 0 ? (
                    <p className="dms-empty">Nothing happened on this board yet.</p>
                ) : (
                    <ol className="dms-recap-list">
                        {recap.steps.map((step, index) => (
                            <li key={index} className={`dms-recap-step dms-node--${step.kind}`}>
                                {step.via && <span className="dms-recap-via">{step.via}</span>}
                                <span className="dms-node-kind">{kindLabel(step.kind)}</span>
                                <strong className="dms-recap-title">
                                    {step.title}
                                    {step.taken && <span className="dms-recap-taken"> ✓ chosen</span>}
                                </strong>
                                {step.passedOver.length > 0 && (
                                    <span className="dms-recap-meta">Instead of: {step.passedOver.join(", ")}</span>
                                )}
                                {step.details.map((detail) => <span key={detail} className="dms-recap-meta">{detail}</span>)}
                                {step.text && <p className="dms-recap-text">{step.text}</p>}
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </dialog>
    );
}
