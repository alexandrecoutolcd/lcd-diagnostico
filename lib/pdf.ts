/**
 * Gera um PDF a partir de um elemento do DOM (o card de resultado do diagnóstico)
 * e dispara o download no navegador. As libs são carregadas via import dinâmico
 * para não pesar no bundle inicial do quiz.
 */
export async function downloadDiagnosisPdf(elementId: string, fileName: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento #${elementId} não encontrado para gerar o PDF.`);
  }

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  // Tamanho de página proporcional ao papel A4, na largura do conteúdo capturado.
  const pageWidthPx = canvas.width;
  const pageHeightPx = Math.floor(canvas.width * (297 / 210));

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [pageWidthPx, pageHeightPx],
  });

  let renderedHeight = 0;
  let isFirstPage = true;

  while (renderedHeight < canvas.height) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedHeight);

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = pageWidthPx;
    pageCanvas.height = pageHeightPx;
    const ctx = pageCanvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageWidthPx, pageHeightPx);
      ctx.drawImage(
        canvas,
        0,
        renderedHeight,
        canvas.width,
        sliceHeight,
        0,
        0,
        canvas.width,
        sliceHeight
      );
    }

    const sliceData = pageCanvas.toDataURL("image/png");

    if (!isFirstPage) {
      pdf.addPage([pageWidthPx, pageHeightPx]);
    }
    pdf.addImage(sliceData, "PNG", 0, 0, pageWidthPx, pageHeightPx);

    renderedHeight += sliceHeight;
    isFirstPage = false;
  }

  pdf.save(fileName);
}
