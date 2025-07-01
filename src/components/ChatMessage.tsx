import React from "react";

function downloadHtmlFile(filename: string, htmlContent: string) {
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

interface Props {
  message: ChatMessage;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  // Your existing CustomTable and avatars here...

  // Example: generate full HTML from message.content (assuming message.content holds raw HTML or markdown converted to HTML)
  // You can adjust this based on your actual content structure

  // For example purpose, assume message.content is your generated HTML (string)
  const handleDownload = () => {
    // If message.content is markdown, you may need to convert it to HTML here
    // or directly use your kaizen HTML template + dynamic data instead
    downloadHtmlFile("kaizen-one-pager.html", message.content);
  };

  return message.role === "user" ? (
    <div className="flex items-end justify-end my-2">
      <div className="flex items-end gap-2">
        <div className="bg-green-500 text-white rounded-2xl px-4 py-2 max-w-xs md:max-w-md shadow-md">
          <p className="break-words">{message.content}</p>
        </div>
        <img
          src={userAvatarUrl}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  ) : (
    <div className="flex items-end justify-start my-2">
      <div className="flex items-end gap-2">
        <img
          src={botAvatarUrl}
          alt="Assistant"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="bg-white text-gray-800 rounded-2xl px-4 py-2 max-w-xs md:max-w-md shadow border border-gray-300">
          <ReactMarkdown
            children={message.content}
            remarkPlugins={[remarkGfm]}
            components={{
              table: CustomTable,
            }}
          />
          <button
            onClick={handleDownload}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Kaizen HTML
          </button>
        </div>
      </div>
    </div>
  );
};
