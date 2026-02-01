'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// Import your custom hook
import { useLockBodyScroll } from '@/app/hooks/useLockBodyScroll'; // Adjust the import path as necessary

interface Product {
  name: string;
  description: string;
  image: string;
  details: string;
  category: string;
  features: string[];
  specifications: Record<string, string | undefined>;
  price: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Use your new custom hook directly.
  // The scroll will be locked if `product` is not null.
  useLockBodyScroll(!!product);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (product) {
      document.addEventListener('keydown', handleEscape);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [product, handleEscape]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      tabIndex={-1}
    >
      <div
        ref={modalRef}
        className="animate-in zoom-in-95 bg-card relative flex h-[90vh] w-full max-w-5xl rounded-3xl shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-background/80 text-foreground hover:bg-background absolute top-6 right-6 z-20 rounded-full p-2 shadow-lg transition-all duration-200"
          aria-label="Close modal"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex h-full w-full flex-col overflow-hidden lg:flex-row">
          {/* Image Section */}
          <div className="bg-muted/30 relative flex min-h-[300px] items-center justify-center rounded-t-3xl p-6 lg:min-h-full lg:w-1/2 lg:rounded-t-none lg:rounded-l-3xl">
            <div className="relative h-full max-h-96 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="bg-primary text-primary-foreground absolute top-6 left-6 rounded-full px-4 py-1 text-sm font-medium">
              {product.category}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-y-auto p-8 lg:w-1/2">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h2
                  id="product-modal-title"
                  className="text-foreground text-4xl font-bold"
                >
                  {product.name}
                </h2>
                <p className="text-primary mt-2 text-2xl font-semibold">
                  {product.price}
                </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg
                      className="text-primary h-5 w-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-foreground text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-foreground mb-4 text-xl font-semibold">
                  Specifications
                </h3>
                <div className="bg-secondary/50 rounded-xl p-6">
                  <dl className="space-y-4">
                    {Object.entries(product.specifications)
                      .filter(([, value]) => value !== undefined)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="border-border/30 flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
                        >
                          <dt className="text-muted-foreground text-sm font-medium">
                            {key}
                          </dt>
                          <dd className="text-foreground text-sm">{value}</dd>
                        </div>
                      ))}
                  </dl>
                </div>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-foreground mb-4 text-xl font-semibold">
                  Product Details
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.details}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-card sticky bottom-0 mt-8 flex flex-col gap-4 pt-6 sm:flex-row">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-full px-6 py-3 font-medium shadow-md transition-all duration-300 hover:scale-105">
                Add to Cart
              </button>
              <button className="border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 rounded-full border px-6 py-3 font-medium transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
