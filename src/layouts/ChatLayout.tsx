import { type ReactNode } from "react";
import { EnumSelect } from "../components/enum-select";
import { ContextOptions } from "../types/types";
import { Button } from "../components/button";
import { Input } from "../components/input";
// Using existing paper airplane icon
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

type ChatLayoutProps = {
  contextOptions: typeof ContextOptions;
  onContextChange: (value: ContextOptions) => void;
  selectedContext: ContextOptions;
  onSendMessage: (message: string) => void;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode; // This will be the chat history content
};

export function ChatLayout({
  contextOptions,
  onContextChange,
  selectedContext,
  onSendMessage,
  inputValue,
  onInputChange,
  children,
}: ChatLayoutProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-950">
      {/* Header - Context Selector */}
      <header className="flex items-center justify-center p-4 border-b border-blue-200 dark:border-blue-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">
        <div className="w-3/4 mx-auto flex justify-center">
          <div className="w-64">
            <EnumSelect
              enumObject={contextOptions}
              name="context"
              value={selectedContext}
              onChange={onContextChange}
              className="w-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content - Chat History */}
      <main className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 dark:scrollbar-thumb-blue-700 dark:scrollbar-track-blue-950">
        <div className="w-1/2 mx-auto space-y-4">{children}</div>
      </main>

      {/* Footer - Input Area */}
      <footer className="p-4 border-t border-blue-200 dark:border-blue-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="w-3/4 mx-auto flex gap-2">
          <Input
            name="user_query"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" color="blue" disabled={!inputValue.trim()}>
            <PaperAirplaneIcon className="h-5 w-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
