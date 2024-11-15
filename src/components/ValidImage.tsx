// components/ValidImage.tsx
import React from "react";
import Image from "next/image"; // or your preferred image component

interface ValidImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  fill?: boolean;
  // Optional fallback image source
}

const ValidImage: React.FC<ValidImageProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  fallbackSrc = "/images/fallback.png", // Default fallback image path
}) => {
  const imageSrc = src && src.trim() !== "" ? src : fallbackSrc;

  return (
    <Image
      src={imageSrc}
      alt={alt || "Image"}
      width={width}
      height={height}
      fill={fill}
      onError={(e) => {
        e.currentTarget.src = fallbackSrc;
      }}
    />
  );
};

export default ValidImage;
