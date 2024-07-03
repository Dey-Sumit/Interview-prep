import { cn } from "@/utils";
import React, { useMemo, useRef, useState } from "react";
const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

type Container = {
  isVisible: boolean;
  isSelected: boolean;
  id: `${string}-${string}`;
};

const InteractiveSquare = () => {
  const [container, setContainer] = useState<Container[][]>(() => {
    return BOX_DATA.map((row, rowIndex) =>
      row.map((box, boxIndex) => ({
        isVisible: !!box,
        isSelected: false,
        id: `${rowIndex}-${boxIndex}`,
      }))
    );
  });

  const totalVisibleBox = useMemo(() => {
    return BOX_DATA.flat().reduce((total, current) => {
      return total + current;
    }, 0);
  }, []);

  const stackOfSelection = useRef<string[]>([]);

  // const undoBoxSelection = () => {
  //   while (stackOfSelection.current.length !== 0) {
  //     console.log("under while");
  //     setTimeout(() => {
  //       const poppedBox = stackOfSelection.current.pop();
  //       console.log({ poppedBox });
  //       if (!poppedBox) return;
  //       const [col, row] = poppedBox?.split("-");
  //       const tempContainer = [...container];
  //       tempContainer[Number(col)][Number(row)].isSelected = true;
  //       setContainer(tempContainer);
  //     }, 1000);
  //   }
  // };

  const undoBoxSelection = () => {
    const intervalId = setInterval(() => {
      if (stackOfSelection.current.length === 0) {
        clearInterval(intervalId);
        return;
      }

      const poppedBox = stackOfSelection.current.pop();
      if (!poppedBox) return;

      const [col, row] = poppedBox.split("-").map(Number);
      const tempContainer = [...container];
      tempContainer[col][row].isSelected = false;
      setContainer(tempContainer);
    }, 1000);
  };
  const handleSelectBox = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    if (!target.dataset) return;

    const dataset = target.dataset;

    const { boxId, boxVisibility } = dataset;
    if (boxVisibility === "false" || !boxId) return;

    const [col, row] = boxId?.split("-");

    setContainer((prevContainer) => {
      const newContainer = [...prevContainer];
      newContainer[Number(col)][Number(row)].isSelected = true;
      return newContainer;
    });

    stackOfSelection.current?.push(boxId);

    if (stackOfSelection.current.length === totalVisibleBox) {
      console.log("all selected");
      undoBoxSelection();
    }
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="  max-w-max grid gap-y-3">
        {container.map((row, rowIndex) => {
          /* ----------------------------------- row ---------------------------------- */
          return (
            <div
              key={rowIndex.toString()}
              className="grid grid-cols-3 gap-3 "
              onClick={handleSelectBox}
            >
              {row.map(({ id: boxId, isSelected, isVisible }, boxIndex) => {
                return (
                  <button
                    key={`${rowIndex}-${boxIndex}`}
                    className={cn(
                      "border rounded-lg w-28 aspect-square grid place-items-center",
                      isSelected ? "bg-green-800" : "bg-transparent",
                      isVisible ? "block" : "hidden pointer-events-none"
                    )}
                    data-box-id={boxId}
                    data-box-visibility={isVisible}
                  >
                    {boxId}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={undoBoxSelection} className="border-2 p-6">
        Undo
      </button>
    </main>
  );
};

export default InteractiveSquare;
