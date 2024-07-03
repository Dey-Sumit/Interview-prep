import { RefObject, useCallback, useEffect } from "react";

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  onClose: () => void,
  required: boolean
) => {
  const keyListener = useCallback(
    (event: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(event?.target as Node)) {
        onClose();
      }
    },
    [onClose, ref]
  );
  useEffect(() => {
    if (!required) {
      document.removeEventListener("mousedown", keyListener);
      return;
    }
    document.addEventListener("mousedown", keyListener);
    return () => {
      document.removeEventListener("mousedown", keyListener);
    };
  }, [required, onClose, keyListener]);
};
export default useOnClickOutside;
