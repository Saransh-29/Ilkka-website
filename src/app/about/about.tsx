'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { aboutContent } from './contents';
import { TextContent } from '@/types/content';
import SplitText from '@/components/ui/SplitText';

const renderTextContent = (paragraph: TextContent) => {
  if (paragraph.type === 'text') {
    return paragraph.content as string;
  }

  if (paragraph.type === 'span' && Array.isArray(paragraph.content)) {
    return paragraph.content.map((span, index) => (
      <span key={index} className={span.className}>
        {span.text}
      </span>
    ));
  }

  return null;
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
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
        duration: 1.5,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <section id="about" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          <h2
            id={aboutContent.headingId}
            // className="text-foreground mb-12 text-3xl font-bold md:text-4xl"
          >
            <SplitText
              text={aboutContent.heading}
              className="text-foreground mb-12 text-5xl font-extrabold md:text-5xl"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              // onLetterAnimationComplete={handleAnimationComplete}
              // showCallback
            />
          </h2>
          <motion.div
            className="flex flex-col items-center justify-center gap-12 md:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center justify-center md:w-1/2"
              variants={itemVariants}
            >
              <Image
                src={aboutContent.image.src}
                alt={aboutContent.image.alt}
                width={aboutContent.image.width}
                height={aboutContent.image.height}
                className={aboutContent.image.className}
              />
            </motion.div>
            <motion.div
              className="text-left md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={textContainerVariants}
              transition={{ duration: 0.8 }}
            >
              {aboutContent.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={paragraphVariants}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`text-muted-foreground text-lg leading-relaxed ${index === 0 ? 'mb-6' : ''}`}
                >
                  {renderTextContent(paragraph)}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
