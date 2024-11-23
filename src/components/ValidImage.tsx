// components/ValidImage.tsx
import React from "react";
import Image from "next/image"; // or your preferred image component
import fallbackSrc from "@/assets/fallback.jpg";

interface ValidImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  // Optional fallback image source
}

const ValidImage: React.FC<ValidImageProps> = ({
  src,
  alt,
  width,
  height,
  fill, // Default fallback image path
}) => {
  const imageSrc = src && src.trim() !== "" ? src : fallbackSrc;

  return (
    <Image
      src={imageSrc}
      alt={alt || "Image"}
      width={width}
      height={height}
      fill={fill}
    />
  );
};

export default ValidImage;
