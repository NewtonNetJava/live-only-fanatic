import { useEffect, useRef } from "react";

export default function useDidMountEffect(func, deps) {
  const didMount = useRef(true);
  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;

      return;
    }

    func();
  }, deps);
}
