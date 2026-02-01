import React from 'react';
import Image from 'next/image';
import { aboutContent } from './contents';
import { TextContent } from '@/types/content';

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
  return (
    <section id="about" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          <h2
            id={aboutContent.headingId}
            className="text-foreground mb-12 text-3xl font-bold md:text-4xl"
          >
            {aboutContent.heading}
          </h2>
          <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
            <div className="md:w-1/2">
              <Image
                src={aboutContent.image.src}
                alt={aboutContent.image.alt}
                width={aboutContent.image.width}
                height={aboutContent.image.height}
                className={aboutContent.image.className}
              />
            </div>
            <div className="text-left md:w-1/2">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-muted-foreground text-lg leading-relaxed ${index === 0 ? 'mb-6' : ''}`}
                >
                  {renderTextContent(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
