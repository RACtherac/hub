import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

import {
  CODE_LANGUAGES,
  backspacePair,
  indentSelection,
  isCloser,
  isOpener,
  lineCount,
  newlineWithIndent,
  typeCloser,
  typeOpener,
  type Edit,
} from "../../utils/codeEditing";

interface CodeBlockProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  onLanguageChange: (language: string) => void;
}

// A place to keep code snippets. The code is only ever text in a textarea:
// it's never run, evaluated or turned into HTML.
export default function CodeBlock({ value, language, onChange, onLanguageChange }: CodeBlockProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLPreElement>(null);
  // Where the cursor should go after an edit made by setting the value directly.
  const pendingSelection = useRef<[number, number] | null>(null);
  // After Esc, Tab moves focus out again instead of indenting (until the next edit).
  const [tabMovesFocus, setTabMovesFocus] = useState(false);
  const [copied, setCopied] = useState(false);
  const hintId = useId();

  useLayoutEffect(() => {
    const selection = pendingSelection.current;
    const textarea = textareaRef.current;
    if (!selection || !textarea) return;
    textarea.setSelectionRange(selection[0], selection[1]);
    pendingSelection.current = null;
  });

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  // Applies an edit through the browser's own editing, so Ctrl+Z still works,
  // falling back to setting the value where that isn't supported.
  const apply = (edit: Edit) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const old = textarea.value;
    // Only the cursor moves (stepping over a closing bracket).
    if (old === edit.value) {
      textarea.setSelectionRange(edit.selectionStart, edit.selectionEnd);
      return;
    }
    let from = 0;
    while (from < old.length && from < edit.value.length && old[from] === edit.value[from]) from++;
    let oldEnd = old.length;
    let newEnd = edit.value.length;
    while (oldEnd > from && newEnd > from && old[oldEnd - 1] === edit.value[newEnd - 1]) {
      oldEnd--;
      newEnd--;
    }
    textarea.setSelectionRange(from, oldEnd);
    const inserted = edit.value.slice(from, newEnd);
    const native = inserted === ""
      ? document.execCommand("delete")
      : document.execCommand("insertText", false, inserted);
    if (native && textarea.value === edit.value) {
      textarea.setSelectionRange(edit.selectionStart, edit.selectionEnd);
    }
    else {
      pendingSelection.current = [edit.selectionStart, edit.selectionEnd];
      onChange(edit.value);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { selectionStart, selectionEnd, value: text } = event.currentTarget;
    if (event.key === "Escape") {
      setTabMovesFocus(true);
      return;
    }
    if (event.key === "Tab" && !tabMovesFocus && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      apply(indentSelection(text, selectionStart, selectionEnd, event.shiftKey));
      return;
    }
    // AltGr (how { and [ are typed on Swedish and other layouts) arrives as
    // Ctrl+Alt on Windows, so it mustn't count as a shortcut.
    const altGr = event.nativeEvent.getModifierState?.("AltGraph") ?? false;
    if (event.nativeEvent.isComposing || (!altGr && (event.ctrlKey || event.metaKey || event.altKey))) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      apply(newlineWithIndent(text, selectionStart, selectionEnd));
      return;
    }
    // {, [ and ( get their closer; typing the closer steps over it; Backspace
    // in an empty pair removes both. Anything else types as usual.
    const edit = isOpener(event.key)
      ? typeOpener(text, selectionStart, selectionEnd, event.key)
      : isCloser(event.key)
        ? typeCloser(text, selectionStart, selectionEnd, event.key)
        : event.key === "Backspace"
          ? backspacePair(text, selectionStart, selectionEnd)
          : null;
    if (edit) {
      event.preventDefault();
      apply(edit);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    }
    catch {
      // Clipboard blocked; the code can still be selected by hand.
    }
  };

  const lines = lineCount(value);

  return (
    <div className="code-block">
      <div className="code-block-toolbar">
        <select
          className="code-block-language"
          aria-label="Language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {CODE_LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
        <span className="code-block-meta">
          {lines} {lines === 1 ? "line" : "lines"} · not run, just kept
        </span>
        <button type="button" className="code-block-copy" onClick={copy} disabled={!value}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <div className="code-block-editor">
        <pre ref={gutterRef} className="code-block-gutter" aria-hidden="true">
          {Array.from({ length: lines }, (_, i) => i + 1).join("\n")}
        </pre>
        <textarea
          ref={textareaRef}
          className="code-block-input"
          value={value}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          wrap="off"
          aria-label={`Code (${CODE_LANGUAGES.find((l) => l.value === language)?.label ?? "Plain text"})`}
          aria-describedby={hintId}
          placeholder="// Paste or write code to keep. It's never run."
          onChange={(e) => {
            setTabMovesFocus(false);
            onChange(e.target.value);
          }}
          onKeyDown={onKeyDown}
          onBlur={() => setTabMovesFocus(false)}
          onScroll={(e) => {
            if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
          }}
        />
      </div>
      <p id={hintId} className="code-block-hint">
        {"{ [ ( close themselves · Tab / Shift+Tab indent · Esc then Tab to leave the box"}
      </p>
    </div>
  );
}
