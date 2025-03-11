import { Avatar } from "../components/avatar";
import { Badge } from "../components/badge";

type MessageProps = {
  content: string;
  timestamp: Date;
  isUser?: boolean;
};

export function ChatMessage({
  content,
  timestamp,
  isUser = false,
}: MessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-3 max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar - with reduced size */}
        <div className="flex-shrink-0 h-8 w-8">
          {isUser ? (
            <Avatar initials="U" className="bg-blue-600 h-10 w-10 text-xs" />
          ) : (
            <Avatar initials="AI" className="bg-indigo-600 h-10 w-10 text-xs" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <div
            className={`rounded-lg px-4 py-2 ${
              isUser
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-zinc-800 dark:text-white border border-blue-200 dark:border-zinc-700"
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{content}</p>
          </div>

          {/* Timestamp */}
          <div
            className={`text-xs text-gray-500 mt-1 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to format time as HH:MM
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// System message for notifications, context changes, etc.
export function SystemMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-center my-4">
      <Badge color="blue" className="text-xs py-1">
        {content}
      </Badge>
    </div>
  );
}
