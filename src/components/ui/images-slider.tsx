"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Import Variants
import React, { useEffect, useState, useCallback } from "react";

export const ImagesSlider = ({
  images,
  children,
  showOverlay = true, // Renamed from 'overlay' to clarify it's a boolean flag
  customOverlay, // New prop for a custom ReactNode overlay
  overlayClassName,
  className,
  autoplay = true,
  direction = "left",
}: {
  images: string[];
  children: React.ReactNode;
  showOverlay?: boolean; // Type is now explicitly boolean
  customOverlay?: React.ReactNode; // New prop for custom overlay content
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "left" | "right";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setLoading] = useState(false); // Consider if you need this state if you're preloading
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const loadImages = useCallback(() => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loaded) => {
        setLoadedImages(loaded as string[]);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load images", error));
  }, [images]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    loadImages();
  }, [loadImages]); // Now loadImages is properly defined as useCallback

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: NodeJS.Timeout | number | undefined; // More specific type for interval ID
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) { // Only clear if interval was actually set
        clearInterval(interval as number); // Cast to number for browser clearInterval
      }
    };
  }, [autoplay, handleNext, handlePrevious]); // Add handleNext and handlePrevious to dependencies

  const slideVariants: Variants = { // Explicitly type slideVariants as Variants
    initial: {
      scale: 0,
      opacity: 0,
      rotateY: 45, // Changed from rotateX to rotateY for horizontal perspective
    },
    visible: {
      scale: 1,
      rotateY: 0, // Changed from rotateX to rotateY
      opacity: 1,
      transition: {
        duration: 0.5,
        // Cast the ease array to the expected tuple type for Framer Motion
        ease: [0.645, 0.045, 0.355, 1.0] as [number, number, number, number],
      },
    },
    leftExit: {
      opacity: 1,
      x: "-150%", // Changed from y to x for horizontal movement
      transition: {
        duration: 1,
      },
    },
    rightExit: {
      opacity: 1,
      x: "150%", // Changed from y to x for horizontal movement
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Render children only if images are loaded */}
      {areImagesLoaded && children}

      {/* Render default overlay if showOverlay is true and images are loaded */}
      {areImagesLoaded && showOverlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {/* Render custom overlay if provided and images are loaded */}
      {areImagesLoaded && customOverlay && (
        <div className={cn("absolute inset-0 z-40", overlayClassName)}>
          {customOverlay}
        </div>
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "left" ? "leftExit" : "rightExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
};
