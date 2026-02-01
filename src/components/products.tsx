'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { productsData } from '@/lib/data';
import ProductModal from './ProductModal';

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

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <section id="products" className="bg-background py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
            Our Products
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productsData.map((product: Product, index: number) => (
              <div
                key={index}
                onClick={() => handleCardClick(product)}
                className="cursor-pointer"
              >
                <Card className="h-full overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={index < 4} // Prioritize first 4 images
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-primary mb-2 text-xl font-bold">
                      {product.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
};

export default Products;
