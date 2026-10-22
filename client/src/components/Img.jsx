import { useState } from "react";

// Agar image load na ho to sundar gradient dikhega
export default function Img({ src, alt, className = "" }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={`img-fallback ${className}`} aria-label={alt} />;
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setBad(true)} />;
}
