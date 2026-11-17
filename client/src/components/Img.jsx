import { useState } from "react";

// Agar image load na ho to sundar gradient dikhega
export default function Img({ src, alt, className = "", priority = false }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    const decorative = !(alt && alt.trim());
    return (
      <div
        className={`img-fallback ${className}`}
        aria-hidden={decorative}
        role={decorative ? "presentation" : undefined}
      >
        {!decorative ? alt : ""}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setBad(true)}
      decoding={priority ? "sync" : "async"}
    />
  );
}
