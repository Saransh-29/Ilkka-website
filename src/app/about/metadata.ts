import { Metadata } from 'next';

export const aboutMetadata: Metadata = {
  title: 'About Us - Leading Medical Equipment Supplier',
  description:
    'Learn about ILKKA Healthcare, founded by passionate healthcare professionals. We provide quality medical equipment and supplies across Ethiopia and Somaliland with a focus on care and quality.',
  keywords: [
    'about Ilkka Healthcare',
    'medical equipment company Ethiopia',
    'healthcare supplier Somaliland',
    'medical company history',
    'healthcare professionals',
    'medical equipment team',
  ],
  openGraph: {
    title: 'About ILKKA Healthcare - Medical Equipment Specialists',
    description:
      'Founded by healthcare professionals, ILKKA Healthcare delivers quality medical equipment across Ethiopia and Somaliland.',
    url: 'https://ilkka-healthcare.com/about',
    images: [
      {
        url: '/team.png',
        width: 1200,
        height: 630,
        alt: 'ILKKA Healthcare Team',
      },
    ],
  },
  alternates: {
    canonical: 'https://ilkka-healthcare.com/about',
  },
};
