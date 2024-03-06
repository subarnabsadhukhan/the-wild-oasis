import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const clickRef = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (clickRef.current && !clickRef.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return () => document.removeEventListener("click", handleClick);
  }, [handler, listenCapturing]);

  return clickRef;
}

export default useOutsideClick;
