import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(to / 60));
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { cur = to; clearInterval(id); }
      setV(cur);
    }, 25);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString("en-IN")}{suffix}</span>;
}
