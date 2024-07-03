import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ opened, close }: { opened: boolean; close: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (opened) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [opened, close]);

  if (!opened) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-white text-red-700 p-8 rounded-lg"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
        ref={modalRef}
      >
        <h1>Modal</h1>
        <button onClick={close}>Close</button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </button>
      <Modal opened={isOpen} close={close} />
    </div>
  );
};

export { ModalPage };
