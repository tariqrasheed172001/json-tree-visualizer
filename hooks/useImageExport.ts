"use client";

/**
 * useImageExport Hook
 *
 * Handles exporting the ReactFlow visualization as a PNG image.
 * Includes fallback mechanism if primary capture method fails.
 */

import { useCallback } from "react";
import { toPng } from "html-to-image";

interface UseImageExportReturn {
  exportImage: () => Promise<void>;
}

/**
 * Hook for exporting ReactFlow visualization as PNG image
 * @param reactFlowWrapperRef - Reference to the ReactFlow wrapper div element
 * @returns Object with exportImage function
 */
export function useImageExport(
  reactFlowWrapperRef: React.RefObject<HTMLDivElement | null>
): UseImageExportReturn {
  const downloadImage = useCallback((dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }, []);

  const captureViewport = useCallback(
    async (viewport: HTMLElement): Promise<string> => {
      await new Promise((resolve) => setTimeout(resolve, 200));

      return await toPng(viewport, {
        backgroundColor: "#ffffff",
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
        style: {
          background: "#ffffff",
        },
      });
    },
    []
  );

  const captureFallback = useCallback(
    async (element: HTMLElement): Promise<string> => {
      return await toPng(element, {
        backgroundColor: "#ffffff",
        quality: 1,
        pixelRatio: 2,
      });
    },
    []
  );

  const handleExportImage = useCallback(async () => {
    if (!reactFlowWrapperRef.current) return;

    const reactFlowElement = reactFlowWrapperRef.current.querySelector(
      ".react-flow"
    ) as HTMLElement;
    if (!reactFlowElement) return;

    const viewport = reactFlowElement.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;
    if (!viewport) return;

    try {
      const dataUrl = await captureViewport(viewport);
      downloadImage(dataUrl, "json-tree-visualization.png");
    } catch (error) {
      console.error("Failed to export image:", error);
      try {
        const fallbackUrl = await captureFallback(reactFlowElement);
        downloadImage(fallbackUrl, "json-tree-visualization.png");
      } catch (fallbackError) {
        console.error("Fallback capture also failed:", fallbackError);
      }
    }
  }, [captureViewport, captureFallback, downloadImage, reactFlowWrapperRef]);

  return {
    exportImage: handleExportImage,
  };
}
