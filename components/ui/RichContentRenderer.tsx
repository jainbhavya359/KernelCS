"use client";

import React, { useState, useId } from "react";
import {
  Check,
  Copy,
  Info,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  Quote,
  Terminal,
} from "lucide-react";

interface RichContentRendererProps {
  content: string;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline Text Parser & Renderer
// ─────────────────────────────────────────────────────────────────────────────

interface InlineToken {
  type: "text" | "bold" | "italic" | "bold_italic" | "code" | "math" | "link";
  content?: string;
  text?: string;
  href?: string;
}

function parseInlineTokens(text: string): InlineToken[] {
  if (!text) return [];

  // Match: inline code, bold-italic, bold, italic, inline math, links
  const regex =
    /(`[^`]+`)|(\*\*\*[^*]+\*\*\*)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\$[^$]+\$)|(\[[^\]]+\]\([^)]+\))/g;
  const tokens: InlineToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    const matchedStr = match[0];
    if (matchedStr.startsWith("`")) {
      tokens.push({ type: "code", content: matchedStr.slice(1, -1) });
    } else if (matchedStr.startsWith("***")) {
      tokens.push({ type: "bold_italic", content: matchedStr.slice(3, -3) });
    } else if (matchedStr.startsWith("**")) {
      tokens.push({ type: "bold", content: matchedStr.slice(2, -2) });
    } else if (matchedStr.startsWith("*")) {
      tokens.push({ type: "italic", content: matchedStr.slice(1, -1) });
    } else if (matchedStr.startsWith("$")) {
      tokens.push({ type: "math", content: matchedStr.slice(1, -1) });
    } else if (matchedStr.startsWith("[")) {
      const linkMatch = matchedStr.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        tokens.push({ type: "link", text: linkMatch[1], href: linkMatch[2] });
      } else {
        tokens.push({ type: "text", content: matchedStr });
      }
    }

    lastIndex = match.index + matchedStr.length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", content: text.substring(lastIndex) });
  }

  return tokens;
}

export function InlineText({ text }: { text: string }) {
  const tokens = parseInlineTokens(text);

  return (
    <>
      {tokens.map((t, idx) => {
        if (t.type === "code") {
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] sm:text-xs bg-zinc-900 border border-zinc-800 text-amber-300 font-medium"
            >
              {t.content}
            </code>
          );
        }
        if (t.type === "bold") {
          return (
            <strong
              key={idx}
              className="font-semibold text-zinc-100 font-sans"
            >
              {t.content}
            </strong>
          );
        }
        if (t.type === "italic") {
          return (
            <em key={idx} className="italic text-zinc-300">
              {t.content}
            </em>
          );
        }
        if (t.type === "bold_italic") {
          return (
            <strong
              key={idx}
              className="font-semibold italic text-amber-200"
            >
              {t.content}
            </strong>
          );
        }
        if (t.type === "math") {
          return (
            <span
              key={idx}
              className="font-mono text-[11px] sm:text-xs text-amber-300/90 bg-amber-950/20 px-1 py-0.5 rounded border border-amber-900/30 mx-0.5"
            >
              {t.content}
            </span>
          );
        }
        if (t.type === "link") {
          return (
            <a
              key={idx}
              href={t.href}
              className="text-amber-400 underline underline-offset-2 hover:text-amber-300 transition-colors"
              target={t.href?.startsWith("http") ? "_blank" : undefined}
              rel={t.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {t.text}
            </a>
          );
        }
        return <React.Fragment key={idx}>{t.content}</React.Fragment>;
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Code Block Viewer
// ─────────────────────────────────────────────────────────────────────────────

export function CodeBlockViewer({
  code,
  language = "text",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayLang = language.toUpperCase() || "CODE";

  return (
    <div className="my-4 rounded-lg border border-zinc-800 bg-[#06080D] overflow-hidden shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-950 border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-amber-400/80" />
          <span className="font-semibold text-zinc-300 uppercase tracking-wider text-[10px]">
            {displayLang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-zinc-500" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono text-amber-100/90 leading-relaxed bg-[#05070B] whitespace-pre selection:bg-amber-400/20">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Callout / Blockquote Card
// ─────────────────────────────────────────────────────────────────────────────

type CalloutVariant = "note" | "tip" | "warning" | "important" | "caution" | "quote";

interface CalloutConfig {
  icon: React.ReactNode;
  borderClass: string;
  bgClass: string;
  titleColor: string;
  defaultTitle: string;
}

const CALLOUT_STYLES: Record<CalloutVariant, CalloutConfig> = {
  note: {
    icon: <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />,
    borderClass: "border-sky-500/60",
    bgClass: "bg-sky-950/15",
    titleColor: "text-sky-300",
    defaultTitle: "Note",
  },
  tip: {
    icon: <Lightbulb className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    borderClass: "border-emerald-500/60",
    bgClass: "bg-emerald-950/15",
    titleColor: "text-emerald-300",
    defaultTitle: "Engineering Tip",
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />,
    borderClass: "border-red-500/60",
    bgClass: "bg-red-950/15",
    titleColor: "text-red-300",
    defaultTitle: "Warning / Misconception",
  },
  caution: {
    icon: <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />,
    borderClass: "border-rose-500/60",
    bgClass: "bg-rose-950/15",
    titleColor: "text-rose-300",
    defaultTitle: "Caution",
  },
  important: {
    icon: <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />,
    borderClass: "border-amber-400/70",
    bgClass: "bg-amber-950/20",
    titleColor: "text-amber-300",
    defaultTitle: "Core Architectural Invariant",
  },
  quote: {
    icon: <Quote className="w-4 h-4 text-zinc-500 flex-shrink-0" />,
    borderClass: "border-zinc-700",
    bgClass: "bg-zinc-900/30",
    titleColor: "text-zinc-400",
    defaultTitle: "",
  },
};

export function CalloutBlock({
  variant,
  title,
  content,
}: {
  variant: CalloutVariant;
  title?: string;
  content: string;
}) {
  const style = CALLOUT_STYLES[variant] || CALLOUT_STYLES.note;
  const displayTitle = title || style.defaultTitle;

  return (
    <div
      className={`my-4 p-4 rounded-r-lg border-l-2 ${style.borderClass} ${style.bgClass} space-y-2`}
    >
      <div className="flex items-center gap-2">
        {style.icon}
        {displayTitle && (
          <span
            className={`text-xs font-mono font-semibold uppercase tracking-wider ${style.titleColor}`}
          >
            {displayTitle}
          </span>
        )}
      </div>
      <div className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed pl-6 space-y-2">
        {content.split("\n\n").map((para, i) => (
          <p key={i} className="leading-relaxed">
            <InlineText text={para} />
          </p>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown Table Renderer
// ─────────────────────────────────────────────────────────────────────────────

export function MarkdownTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-zinc-800 bg-[#080B10]">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-zinc-900/80 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            {headers.map((h, i) => (
              <th key={i} className="p-3 font-medium">
                <InlineText text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-zinc-900/30 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-3 text-zinc-300 font-sans leading-relaxed">
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Block Parser & Main Component
// ─────────────────────────────────────────────────────────────────────────────

interface BlockToken {
  type:
    | "code"
    | "math"
    | "heading"
    | "table"
    | "callout"
    | "unordered_list"
    | "ordered_list"
    | "paragraph";
  level?: number;
  text?: string;
  lang?: string;
  code?: string;
  latex?: string;
  headers?: string[];
  rows?: string[][];
  variant?: CalloutVariant;
  title?: string;
  content?: string;
  items?: string[];
}

function parseMarkdownBlocks(rawText: string): BlockToken[] {
  if (!rawText) return [];
  const lines = rawText.split(/\r?\n/);
  const blocks: BlockToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 1. Fenced Code Block (```lang ... ```)
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace(/^```/, "").trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    // 2. Display Math ($$ ... $$)
    if (line.trim().startsWith("$$")) {
      const mathLines: string[] = [];
      if (line.trim() === "$$") {
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("$$")) {
          mathLines.push(lines[i]);
          i++;
        }
        i++;
      } else {
        mathLines.push(line.trim().replace(/^\$\$/, "").replace(/\$\$$/, ""));
        i++;
      }
      blocks.push({ type: "math", latex: mathLines.join("\n") });
      continue;
    }

    // 3. Headings (#, ##, ###, ####)
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      i++;
      continue;
    }

    // 4. Tables (| ... | followed by |---|)
    if (
      line.trim().startsWith("|") &&
      line.includes("|") &&
      i + 1 < lines.length &&
      lines[i + 1].includes("|---")
    ) {
      const headerLine = line;
      const headers = headerLine
        .split("|")
        .map((s) => s.trim())
        .filter((s, idx, arr) => idx !== 0 && idx !== arr.length - 1);
      const rows: string[][] = [];
      i += 2; // skip header and delimiter
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowCells = lines[i]
          .split("|")
          .map((s) => s.trim())
          .filter((s, idx, arr) => idx !== 0 && idx !== arr.length - 1);
        rows.push(rowCells);
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    // 5. Blockquotes and Callouts (> ...)
    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const rawQuote = quoteLines.join("\n").trim();
      let calloutVariant: CalloutVariant = "quote";
      let calloutTitle = "";
      let cleanContent = rawQuote;

      if (rawQuote.startsWith("[!NOTE]")) {
        calloutVariant = "note";
        cleanContent = rawQuote.replace(/^\[!NOTE\]\s*/i, "");
      } else if (
        rawQuote.startsWith("[!WARNING]") ||
        rawQuote.startsWith("[!CAUTION]")
      ) {
        calloutVariant = "warning";
        cleanContent = rawQuote.replace(/^\[!(WARNING|CAUTION)\]\s*/i, "");
      } else if (rawQuote.startsWith("[!TIP]")) {
        calloutVariant = "tip";
        cleanContent = rawQuote.replace(/^\[!TIP\]\s*/i, "");
      } else if (rawQuote.startsWith("[!IMPORTANT]")) {
        calloutVariant = "important";
        cleanContent = rawQuote.replace(/^\[!IMPORTANT\]\s*/i, "");
      } else if (rawQuote.startsWith("**") && rawQuote.includes(":**")) {
        const titleMatch = rawQuote.match(/^\*\*([^*]+):\*\*\s*([\s\S]*)$/);
        if (titleMatch) {
          calloutTitle = titleMatch[1];
          cleanContent = titleMatch[2];
          calloutVariant = "important";
        }
      }

      blocks.push({
        type: "callout",
        variant: calloutVariant,
        title: calloutTitle,
        content: cleanContent,
      });
      continue;
    }

    // 6. Unordered Lists (- or *)
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "unordered_list", items });
      continue;
    }

    // 7. Ordered Lists (1. or 2.)
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "ordered_list", items });
      continue;
    }

    // 8. Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // 9. Regular Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("$$") &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !(lines[i].trim().startsWith("|") && lines[i].includes("|"))
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

export const RichContentRenderer: React.FC<RichContentRendererProps> = ({
  content,
  className = "",
}) => {
  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  return (
    <div className={`space-y-4 text-zinc-300 font-sans ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            if (block.level === 1) {
              return (
                <h1
                  key={idx}
                  className="text-2xl sm:text-3xl font-serif text-white font-normal mt-8 mb-4 border-b border-zinc-800 pb-2 leading-tight"
                >
                  <InlineText text={block.text || ""} />
                </h1>
              );
            }
            if (block.level === 2) {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-serif text-white font-normal mt-7 mb-3.5 leading-snug flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block" />
                  <InlineText text={block.text || ""} />
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={idx}
                  className="text-lg sm:text-xl font-serif text-amber-200/95 font-normal mt-6 mb-2.5 leading-snug"
                >
                  <InlineText text={block.text || ""} />
                </h3>
              );
            }
            return (
              <h4
                key={idx}
                className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mt-5 mb-2"
              >
                <InlineText text={block.text || ""} />
              </h4>
            );
          }

          case "code":
            return (
              <CodeBlockViewer
                key={idx}
                code={block.code || ""}
                language={block.lang || "text"}
              />
            );

          case "math":
            return (
              <div
                key={idx}
                className="my-4 p-3.5 bg-[#070A0F] border border-zinc-800/80 rounded-lg text-center overflow-x-auto font-mono text-xs sm:text-sm text-amber-300 shadow-inner"
              >
                {block.latex}
              </div>
            );

          case "table":
            return (
              <MarkdownTable
                key={idx}
                headers={block.headers || []}
                rows={block.rows || []}
              />
            );

          case "callout":
            return (
              <CalloutBlock
                key={idx}
                variant={block.variant || "note"}
                title={block.title}
                content={block.content || ""}
              />
            );

          case "unordered_list":
            return (
              <ul key={idx} className="space-y-2 my-3 pl-1">
                {block.items?.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed"
                  >
                    <span className="text-amber-400/90 text-sm flex-shrink-0 mt-0.5 leading-none">
                      •
                    </span>
                    <span className="flex-1">
                      <InlineText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "ordered_list":
            return (
              <ol key={idx} className="space-y-2.5 my-3 pl-1">
                {block.items?.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed"
                  >
                    <span className="font-mono text-[10px] text-amber-400 font-bold bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40 flex-shrink-0 mt-0.5">
                      {String(itemIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 pt-0.5">
                      <InlineText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "paragraph":
          default:
            return (
              <p
                key={idx}
                className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed my-3"
              >
                <InlineText text={block.text || ""} />
              </p>
            );
        }
      })}
    </div>
  );
};
