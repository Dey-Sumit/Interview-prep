"use client";
import Timer from "@/dev/machine-coding-and-system-design/react/1-timer";
import InteractiveSquare from "@/dev/machine-coding-and-system-design/react/2-interactive-square";
import { CounterWithContextWrapped } from "@/dev/machine-coding-and-system-design/react/3-react-brainstorm";
import UseEffectCleanUpFunction from "@/dev/machine-coding-and-system-design/react/3-react-brainstorm";
import { ModalPage } from "@/dev/machine-coding-and-system-design/react/4-modal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24 text-red-800 ">
      {/* <EventNotDelegatedTodoList /> */}
      {/* <EventDelegatedTodoList /> */}
      {/* <Timer /> */}
      {/* <InteractiveSquare /> */}
      {/* <UseEffectCleanUpFunction /> */}
      {/* <CounterWithContextWrapped /> */}
      <ModalPage />
    </main>
  );
}
