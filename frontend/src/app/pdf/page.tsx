"use client";

import { useState, useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import { useLatex } from "@/lib/LatexContext";
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button";

export default function Pdf() {
  const { latexContent } = useLatex();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const encodedSnipRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!latexContent) {
      setPdfUrl(null);
      setLoading(false);
      return;
    }

    const encoded = encodeURIComponent(latexContent);
    const url = `https://latexonline.cc/compile?text=${encoded}`;
    setPdfUrl(url);
    setLoading(true);
  }, [latexContent]);

  const openInOverleaf = () => {
    if (encodedSnipRef.current) {
      encodedSnipRef.current.value = latexContent || "";
      document.getElementById("overleaf_form")?.submit();
    }
  };

  return (
    <>
      {
        latexContent && (
          <div className="flex justify-between">
        <div className="w-full flex items-center p-4 text-sm text-slate-400">
          <p className="">Preview</p>
        </div>
        <div className=" transform  m-2 z-50">
          <Button
            onClick={openInOverleaf}
            type="button"
            className="  cursor-pointer transition"
            >
            Edit with Overleaf
          </Button>
        </div>
      </div>

        )
      }
      {latexContent ? (
        <div className=" relative min-h-screen  ">
          {loading && (
            // <div className="mb-2 text-center text-gray-500">
            //   Loading PDF preview...
            // </div>
            <div className="flex flex-col gap-4 p-8 items-center">

            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            </div>

          )}
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              title="LaTeX PDF Preview"
              className="border   rounded-lg"
              onLoad={() => setLoading(false)}
            />
          )}

          <form
            id="overleaf_form"
            action="https://www.overleaf.com/docs"
            method="post"
            target="_blank"
            className="hidden"
          >
            <textarea
              name="snip"
              ref={encodedSnipRef}
              defaultValue={latexContent}
            />
          </form>

          {/* Absolute button centered at bottom using Tailwind */}
          
        </div>
      ) : (
        <div className=" h-full">
          <div className="   h-full rounded-xl overflow-hidden ">
            <div className="flex flex-col justify-center items-center h-full opacity-30">
              <FileText className="h-10 w-10" />
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}
