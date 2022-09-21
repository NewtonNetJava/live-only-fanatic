import { useEffect } from "react";

function useLockBodyScroll(shouldPreventScroll) {
  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (shouldPreventScroll) {
      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";
    }

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = originalStyle;
    };
  }, [shouldPreventScroll]); // Empty array ensures effect is only run on mount and unmount
}

export default useLockBodyScroll;
