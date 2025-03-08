import React from "react";
import { Field } from "./components/fieldset";
import { EnumSelect } from "./components/enum-select";
import { ContextOptions } from "./types/types";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

export default function App() {
  return (
    <FullScreenContainer>
      <Content />
    </FullScreenContainer>
  );
}

function FullScreenContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      {children}
    </div>
  );
}

function Content() {
  function handleClick() {
    console.log("Button clicked");
  }

  function handleSelect(value: ContextOptions): void {
    console.log(`Selected: ${value}`);
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
      <Field className="">
        <EnumSelect
          enumObject={ContextOptions}
          name="context"
          onChange={handleSelect}
        />
        <Field>
          <Input name="user_query" />
          <Button color="dark/zinc" onClick={handleClick}>
            <PaperAirplaneIcon />
          </Button>
        </Field>
      </Field>
    </div>
  );
}
