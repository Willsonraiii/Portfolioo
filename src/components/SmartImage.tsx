import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallback?: ReactNode;
  style?: CSSProperties;
  eager?: boolean;
  rounded?: string;
};

export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  fallback,
  style,
  eager,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const usable = Boolean(src) && !errored;

  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)} style={style}>
      {/* Loading / fallback surface */}
      {!loaded && (
        <div className="absolute inset-0 shimmer bg-gradient-to-br from-surface-2 to-surface" />
      )}

      {usable ? (
        <img
          src={src as string}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md",
            imgClassName
          )}
        />
      ) : (
        fallback ?? (
          <div className="absolute inset-0 grid animate-pulse-soft place-items-center bg-gradient-to-br from-surface-2 via-surface to-base">
            <span className="text-3xl opacity-25">☕</span>
          </div>
        )
      )}
    </div>
  );
}
