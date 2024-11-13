import { useState, useRef, useEffect } from "react";
import { annotate } from "rough-notation";
import { RoughAnnotation, RoughAnnotationType } from "rough-notation/lib/model";
import { Converter } from "showdown";

const converter = new Converter();

const useWhiteboard = (mockServer: any) => {
  const [content, setContent] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [annotations, setAnnotations] = useState<RoughAnnotation[]>([]);
  const [typingSpeed, setTypingSpeed] = useState<number>(12);
  const [annotationHistory, setAnnotationHistory] = useState<Set<string>>(
    new Set()
  );
  const [currentAppendIndex, setCurrentAppendIndex] = useState<number>(0);
  const [currentAnnotationIndex, setCurrentAnnotationIndex] =
    useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const endOfContainerRef = useRef<HTMLDivElement | null>(null);

  const animateText = async (text: string, isAppend: boolean = false) => {
    setIsAnimating(true);
    let currentText = isAppend ? content : "";
    const chars = text.split("");

    for (const char of chars) {
      currentText += char;
      setContent(currentText);
      await new Promise((resolve) => setTimeout(resolve, typingSpeed));
    }

    setIsAnimating(false);
  };

  const hideAndResetAnnotations = () => {
    annotations.forEach((annotation) => {
      if (annotation.isShowing()) {
        annotation.hide();
      }
    });
    setAnnotations([]);
    setCurrentAnnotationIndex(0);
  };

  const handleWrite = async () => {
    hideAndResetAnnotations();
    setAnnotationHistory(new Set());
    setCurrentAnnotationIndex(0);
    setCurrentAppendIndex(0);
    await animateText(mockServer.write.text);
  };

  const animateAppendText = async (text: string) => {
    if (contentRef.current) {
      const chars = text.split("");
      let currentText = "";
      const appendContainer = document.createElement("div");
      contentRef.current.appendChild(appendContainer);

      for (const char of chars) {
        currentText += char;
        appendContainer.innerHTML = converter.makeHtml(currentText);
        endOfContainerRef.current?.scrollIntoView({ behavior: "smooth" });
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      }
    }
  };

  const handleAppend = async () => {
    if (!isAnimating) {
      setIsAnimating(true); // Set animating state to true
      const appendCommand =
        mockServer.append[currentAppendIndex % mockServer.append.length];

      // Animate the appending of text
      await animateAppendText(appendCommand.text); // Call the new animation function
      setCurrentAppendIndex((prev) => prev + 1);
      setIsAnimating(false); // Reset animating state after appending
    }
  };

  const createAnnotation = (
    element: HTMLElement,
    type: string,
    color: string
  ) => {
    const annotation = annotate(element, {
      type: (type as RoughAnnotationType) || "highlight",
      color: color || "#d5c9176b",
      animationDuration: 1000,
      padding: 5,
    });

    setAnnotations((prev) => [...prev, annotation]);
    return annotation;
  };

  const handleAnnotate = () => {
    if (isAnimating || currentAnnotationIndex >= mockServer.annotations.length)
      return;

    const currentCommand = mockServer.annotations[currentAnnotationIndex];
    if (currentCommand && "pattern" in currentCommand) {
      const { pattern, type, color, index } = currentCommand;
      const annotationKey = `${pattern}-${type}-${color}`;

      if (annotationHistory.has(annotationKey)) {
        setCurrentAnnotationIndex((prev) => prev + 1);
        return;
      }

      if (contentRef.current) {
        const textNodes: Text[] = [];
        const walk = document.createTreeWalker(
          contentRef.current,
          NodeFilter.SHOW_TEXT,
          null
        );
        while (walk.nextNode()) {
          textNodes.push(walk.currentNode as Text);
        }

        const matches: { node: Text; index: number; length: number }[] = [];
        textNodes.forEach((node) => {
          const text = node.textContent || "";
          const regex = new RegExp(pattern, "g");
          let match;

          while ((match = regex.exec(text)) !== null) {
            matches.push({ node, index: match.index, length: match[0].length });
          }
        });

        if (index !== undefined && index < matches.length) {
          const match = matches[index];
          if (match) {
            const { node, index: matchIndex, length } = match;
            if (matchIndex >= 0 && matchIndex + length <= node.length) {
              const range = document.createRange();
              range.setStart(node, matchIndex);
              range.setEnd(node, matchIndex + length);

              let parentSpan = node.parentElement;
              if (parentSpan && parentSpan.hasAttribute("data-annotation")) {
                return;
              }

              const span = document.createElement("span");
              span.setAttribute("data-annotation", annotationKey);
              range.surroundContents(span);

              const annotation = createAnnotation(span, type, color);
              annotation.show();
            }
          }
        } else {
          matches.forEach((match, idx) => {
            const { node, index: matchIndex, length } = match;
            if (matchIndex >= 0 && matchIndex + length <= node.length) {
              const range = document.createRange();
              range.setStart(node, matchIndex);
              range.setEnd(node, matchIndex + length);

              let parentSpan = node.parentElement;
              if (parentSpan && parentSpan.hasAttribute("data-annotation")) {
                return;
              }

              const span = document.createElement("span");
              span.setAttribute("data-annotation", annotationKey);
              range.surroundContents(span);

              const annotation = createAnnotation(span, type, color);
              setTimeout(() => {
                annotation.show();
              }, 100 * idx);
            }
          });
        }

        setAnnotationHistory((prev) => new Set(prev).add(annotationKey));
        setCurrentAnnotationIndex((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = converter.makeHtml(content);
    }

    if (endOfContainerRef.current) {
      endOfContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content]);

  return {
    content,
    isAnimating,
    annotations,
    handleWrite,
    handleAppend,
    handleAnnotate,
    contentRef,
    endOfContainerRef,
    currentAnnotationIndex,
    setTypingSpeed,
    typingSpeed,
  };
};

export default useWhiteboard;
