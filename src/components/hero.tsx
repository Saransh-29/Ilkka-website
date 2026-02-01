'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { ImagesSlider } from '@/components/ui/images-slider';
import { useRouter } from 'next/navigation';

export function Hero() {
  const images = [
    '/heroImages/1.png',
    '/heroImages/2.png',
    '/heroImages/3.png',
  ];
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section id="hero" aria-label="Hero section - Welcome to Ilkka Healthcare">
      <ImagesSlider className="h-[100vh]" images={images}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-50 flex h-full flex-col items-center justify-center px-4"
        >
          <motion.header variants={itemVariants} className="mb-8 text-center">
            <motion.h1
              className="mb-4 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-center text-4xl leading-tight font-bold text-transparent md:text-7xl lg:text-8xl"
              variants={itemVariants}
            >
              Wellbeing at Every Step
            </motion.h1>
            <motion.h2
              className="text-primary text-center text-3xl font-extrabold drop-shadow-2xl md:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              WE CARE
            </motion.h2>
          </motion.header>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-3xl text-center text-lg leading-relaxed text-white/90 drop-shadow-lg md:text-xl lg:text-2xl"
            role="banner"
          >
            Your trusted partner in healthcare, providing quality medical
            supplies and equipment across Ethiopia and Somaliland
          </motion.p>

          <motion.nav
            whileHover="hover"
            whileTap="tap"
            className="flex max-w-[60vw] flex-col gap-4 sm:flex-row"
            aria-label="Main navigation buttons"
          >
            <motion.button
              onClick={() => router.push('/#about')}
              className="bg-primary text-primary-foreground hover:shadow-primary/25 rounded-full px-8 py-4 font-semibold shadow-2xl transition-transform duration-300 ease-in-out hover:scale-110 lg:text-lg"
              aria-label="Learn more about Ilkka Healthcare"
            >
              Learn More
            </motion.button>
            <motion.button
              onClick={() => router.push('/#products')}
              className="rounded-full border-2 border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-white/10 lg:text-lg"
              aria-label="View our medical products and equipment"
            >
              View Our Products
            </motion.button>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
            role="complementary"
            aria-label="Scroll indicator"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center text-white/70"
            >
              <span className="mb-2 text-sm">Scroll to explore</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </ImagesSlider>
    </section>
  );
}
