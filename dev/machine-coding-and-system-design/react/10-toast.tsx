"use client";
import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import eventEmitter from "../6-event-emitter-using-map";
import { cn } from "@/utils";

export const ToastPage = () => {
  const addToast = (type: string, text: string, duration: number) => {
    eventEmitter.pub("toast", { text, options: { type, duration } });
  };

  return (
    <div className="p-10">
      <div className="flex gap-4 flex-wrap">
        <button
          className="p-2 bg-orange-600 border-2 border-orange-500"
          onClick={() => addToast("warning", "Hey ", 3000)}
        >
          Warning Toast ⚠️
        </button>
        <button
          className="p-2 bg-blue-600 border-2 border-blue-500"
          onClick={() => addToast("info", "Information", 3000)}
        >
          Info Toast ℹ️
        </button>
        <button
          className="p-2 bg-green-600 border-2 border-green-500"
          onClick={() => addToast("success", "Success!", 3000)}
        >
          Success Toast 🚀
        </button>
        <button
          className="p-2 bg-indigo-600 border-2 border-indigo-500"
          onClick={() => addToast("default", "Default Toast", 3000)}
        >
          Default Toast 🫶
        </button>
      </div>
      <Toaster />
    </div>
  );
};
type ToastMessage = {
  id: string;
  text: string;
  options: {
    type: string;
    duration: number;
  };
};

const Toaster = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [toastRoot, setToastRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setToastRoot(document.getElementById("toast-root"));
  }, []);

  const addNewToast = useCallback(
    (data: { text: string; options: { type: string; duration: number } }) => {
      const newToast: ToastMessage = {
        id: String(Date.now()),
        text: data.text,
        options: data.options,
      };
      setToasts((existingToasts) => [...existingToasts, newToast]);
    },
    []
  );

  useEffect(() => {
    return eventEmitter.sub("toast", addNewToast);
  }, [addNewToast]);

  const onToastRemove = useCallback((toastId: string) => {
    setToasts((existingToasts) => existingToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const toastElements = (
    <div className="flex flex-col gap-2 fixed top-0 right-0 m-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          onRemove={onToastRemove}
          text={toast.text}
          options={toast.options}
          id={toast.id}
        />
      ))}
    </div>
  );

  if (!toastRoot) return null; // Ensure toastRoot is loaded before rendering

  return ReactDOM.createPortal(toastElements, toastRoot!);
};

const TOAST_TYPE_TO_STYLE_MAP = {
  warning: "bg-orange-600 border-2 border-orange-500",
  info: "bg-blue-600 border-2 border-blue-500",
  success: "bg-green-600 border-2 border-green-500",
  default: "bg-gray-600 border-2 border-gray-500",
};

const Toast = ({
  text,
  options,
  onRemove,
  id,
}: {
  id: string;
  text: string;
  options: {
    type: string;
    duration: number;
  };
  onRemove: (toastId: string) => void;
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemove(id);
      console.log("on remove called ", id);
    }, options.duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, options.duration, onRemove]);

  const styleClass = TOAST_TYPE_TO_STYLE_MAP[options.type] || TOAST_TYPE_TO_STYLE_MAP["default"];

  return <div className={cn("p-4 rounded-sm min-w-72 ", styleClass)}>{text}</div>;
};
