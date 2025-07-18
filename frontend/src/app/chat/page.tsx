"use client";

import { useState, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp, Copy, Globe, LucideAArrowDown, Paperclip, Recycle, RefreshCcw } from 'lucide-react';
import { remark } from 'remark';
import html from 'remark-html';
import { useLatex } from "@/lib/LatexContext";
import { ToolsDropdown } from '@/components/tools-dropdown';

async function renderMarkdown(markdown: string) {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
}

export default function Chat() {
  interface Message {
    text: string;
    sender: "user" | "bot";
    htmlContent?: string; // Add htmlContent to store rendered HTML
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const handleSendMessage = () => {
  //   const messageText = textareaRef.current?.value;
  //   if (messageText && messageText.trim() !== "") {
  //     setMessages((prevMessages) => [...prevMessages, { text: messageText, sender: "user" }]);
      
  //     // send to ai chat provider
      
      
  //     // =============
      
  //     if (textareaRef.current) {
  //       textareaRef.current.value = "";
  //     }

  //     // Simulate a bot response after a short delay
  //     setTimeout(() => {
  //       setMessages((prevMessages) => [...prevMessages, { text: "This is a simple bot response.", sender: "bot" }]);
  //     }, 1000);
  //   }
  // };

  // const handleSendMessage = async () => {
  //   const messageText = textareaRef.current?.value;
  //   if (!messageText || messageText.trim() === "") return;

  //   // Add user's message
  //   setMessages((prevMessages) => [...prevMessages, { text: messageText, sender: "user" }]);
    
  //   if (textareaRef.current) {
  //     textareaRef.current.value = "";
  //   }

  //   try {
  //     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': 'Bearer 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', // Replace with your actual Groq API key
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         model: 'llama-3.3-70b-versatile',
  //         messages: [
  //           {
  //             role: 'user',
  //             content: messageText, // Send actual user message
  //           },
  //         ],
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const botReply = data.choices?.[0]?.message?.content ?? "No response from bot.";

  //     // Add bot's response
  //     setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: "bot" }]);
  //   } catch (error) {
  //     console.error('Error fetching Groq API:', error);
  //     setMessages((prevMessages) => [...prevMessages, { text: "Error contacting bot.", sender: "bot" }]);
  //   }
  // };
  
  const { setLatexContent } = useLatex();
  const handleSendMessage = async () => {
    const messageText = textareaRef.current?.value;
    if (!messageText || messageText.trim() === "") return;

    // Add user's message
    setMessages((prevMessages) => [...prevMessages, { text: messageText, sender: "user" }]);

    if (textareaRef.current) {
      textareaRef.current.value = "";
    }

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          attachment: null, // Or provide the attachment filename here if you have one
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.response ?? "No response from bot.";

      // if latex
      if (botReply.includes("```latex")) {
        const latex = botReply.split("```latex")[1].split("```")[0]; // extract LaTeX content
        setLatexContent(latex);
      }

      const botHtmlContent = await renderMarkdown(botReply); // Process markdown

      // Add bot's response
      setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: "bot", htmlContent: botHtmlContent }]);
    } catch (error) {
      console.error('Error fetching /chat API:', error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error contacting bot.", sender: "bot" }]);
    }
  };
    
  return (
    <>
    <div className='relative h-full flex flex-col'>

      <div className="overflow-y-auto  h-full mb-40  ">
        <div className="flex flex-col p-4  gap-6 w-full">
          {messages.map((message: Message, index: number) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={` flex flex-col gap-3 ${message.sender === "user" ? "   rounded-3xl max-w-2/3 px-5 py-3 bg-slate-100 dark:bg-card" : "w-full"} `}>
                {message.sender === "user" ? (
                  <p>{message.text}</p>
                ) : (
                  <div className="markdown-content" dangerouslySetInnerHTML={{ __html: message.htmlContent || "" }} />
                )}
                <div className={`${message.sender === "user" ? "   hidden" : "flex"}`}>
                  <div className='hover:bg-slate-100 dark:hover:bg-card rounded-lg cursor-pointer p-2 text-xs '>
                    <Copy className='h-4'/>
                  </div>
                  <div className='hover:bg-slate-100 dark:hover:bg-card rounded-lg cursor-pointer p-2 text-xs '>
                    <RefreshCcw className='h-4'/>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-card">
        <div className="flex justify-center items-center m-4 gap-4 ">
          <div className='flex flex-col gap-2 min-h-16  w-full p-4 rounded-2xl border'>
            
            <textarea
              ref={textareaRef}
              className="resize-none outline-0 w-full pb-4 overflow-auto max-h-[500px]"
              placeholder="Type your message here..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto'; // Reset height
                target.style.height = `${Math.min(target.scrollHeight, 100)}px`; // Resize with cap
              }}
            />

            {/* tools */}
            <div className='flex justify-between'>

              <div className='flex gap-4'>
                <ToolsDropdown/>
              </div>
              <div className=''>
                <Button
                  className="shadow rounded-full min-w-10 max-w-10 h-10 cursor-pointer "
                  onClick={handleSendMessage}
                  >
                  <ArrowUp />
                </Button>

              </div>
            </div>
          </div>

            
        </div>
      </div>
    </div>
    </>
  );
}
