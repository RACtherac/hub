const PRINT_MODE_CLASS = "rpg-print-mode";
const PAGE_MARGIN_MM = 10;
const CONTENT_WIDTH_MM = 210 - PAGE_MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = 297 - PAGE_MARGIN_MM * 2;
const BREAK_SELECTORS = [
  ".rpg-meta-grid",
  ".rpg-core-grid",
  ".rpg-two-col",
  ".rpg-core-box",
  ".rpg-skill-row",
  ".rpg-attack-row",
  ".rpg-weapon-row",
  ".rpg-dw-weapon-row",
  ".rpg-row-table",
  ".rpg-custom-item",
].join(",");

/** Switches the page to paper styling and grows textareas to fit their text. Returns a function that undoes it. */
export function enterPrintMode(): () => void {
  const root = document.documentElement;
  root.classList.add(PRINT_MODE_CLASS);
  const restoreTextareas = Array.from(document.querySelectorAll<HTMLTextAreaElement>(".rpg-page textarea")).map((textarea) => {
    const previous = textarea.style.height;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
    return () => {
      textarea.style.height = previous;
    };
  });
  return () => {
    restoreTextareas.forEach((restore) => restore());
    root.classList.remove(PRINT_MODE_CLASS);
  };
}

/** Y positions (CSS px from the top of `element`) where a page can be cut without slicing through a box. */
function collectBreakPoints(element: HTMLElement): number[] {
  const top = element.getBoundingClientRect().top;
  const points = new Set<number>();
  element.querySelectorAll<HTMLElement>(BREAK_SELECTORS).forEach((child) => {
    const rect = child.getBoundingClientRect();
    if (rect.height === 0) return;
    points.add(Math.round(rect.top - top) - 1);
    points.add(Math.round(rect.bottom - top) + 1);
  });
  return Array.from(points).sort((a, b) => a - b);
}

/** Renders `element` with paper styling and downloads it as an A4 PDF. */
export async function exportSheetPdf(element: HTMLElement, fileName: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);
  const exitPrintMode = enterPrintMode();
  try {
    await document.fonts?.ready;
    const width = element.getBoundingClientRect().width;
    const height = element.scrollHeight;
    const breakPoints = collectBreakPoints(element);
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      // html2canvas ignores text-align inside form controls, so tile values are swapped for plain text in the capture copy.
      onclone: (doc) => {
        doc.querySelectorAll<HTMLInputElement | HTMLSelectElement>(".rpg-score-box input:not([type=checkbox]), .rpg-score-box select").forEach((control) => {
          const value = doc.createElement("span");
          const isSelect = control.tagName === "SELECT";
          value.className = isSelect ? "rpg-print-value rpg-print-value--small" : "rpg-print-value";
          value.textContent = isSelect ? (control as HTMLSelectElement).selectedOptions[0]?.text ?? "" : control.value;
          control.replaceWith(value);
        });
      },
    });
    const scale = canvas.width / width;
    const pxPerMm = width / CONTENT_WIDTH_MM;
    const pageHeight = CONTENT_HEIGHT_MM * pxPerMm;

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    let pageTop = 0;
    let firstPage = true;
    while (pageTop < height - 1) {
      let pageBottom = Math.min(pageTop + pageHeight, height);
      if (pageBottom < height) {
        const cut = breakPoints.filter((point) => point > pageTop + pageHeight * 0.3 && point <= pageBottom).pop();
        if (cut) pageBottom = cut;
      }

      const slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = Math.max(1, Math.round((pageBottom - pageTop) * scale));
      const context = slice.getContext("2d");
      if (!context) throw new Error("Canvas is not available");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, slice.width, slice.height);
      context.drawImage(canvas, 0, Math.round(pageTop * scale), canvas.width, slice.height, 0, 0, slice.width, slice.height);

      if (!firstPage) pdf.addPage();
      firstPage = false;
      pdf.addImage(slice.toDataURL("image/jpeg", 0.92), "JPEG", PAGE_MARGIN_MM, PAGE_MARGIN_MM, CONTENT_WIDTH_MM, (pageBottom - pageTop) / pxPerMm);
      pageTop = pageBottom;
    }

    pdf.save(fileName);
  } finally {
    exitPrintMode();
  }
}
