import {
  FunctionComponent,
  DetailedHTMLProps,
  TableHTMLAttributes,
} from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: ChatMessage;
}

const CustomTable: FunctionComponent<
  Omit<
    DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
    "ref"
  > &
    ReactMarkdownProps
> = ({ children, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table {...props} className="w-full text-left border-collapse table-auto">
        {children}
      </table>
    </div>
  );
};

// Avatar URLs
const userAvatarUrl =
  "https://cdn-icons-png.flaticon.com/512/219/219983.png"; // exemple icône utilisateur
const botAvatarUrl =
  "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"; // exemple robot

export const ChatMessage: React.FC<Props> = ({ message }) =>
  message.role === "user" ? (
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
        </div>
      </div>
    </div>
  );
