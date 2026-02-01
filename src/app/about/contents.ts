import { AboutContent } from '@/types/content';

export const aboutContent: AboutContent = {
  heading: 'About ILKKA Healthcare',
  headingId: 'about-heading',
  image: {
    src: '/team.png',
    alt: 'ILKKA Healthcare professional team members working together',
    width: 500,
    height: 300,
    className: 'rounded-lg shadow-lg',
  },
  paragraphs: [
    {
      type: 'span',
      content: [
        { text: 'Founded by a team of passionate professionals, ' },
        { text: 'ILKKA', className: 'font-bold text-primary' },
        { text: ' is built on the twin pillars of ' },
        { text: '"Care & Quality."', className: 'font-semibold' },
        {
          text: ' Our mission is to elevate healthcare standards, making superior medical services accessible and affordable for everyone.',
        },
      ],
    },
    {
      type: 'span',
      content: [
        { text: 'At our core, we blend ' },
        {
          text: 'innovation, compassion, and expertise',
          className: 'font-semibold',
        },
        {
          text: ' to deliver exceptional healthcare solutions. We are committed to empowering individuals and communities to lead longer, healthier, and more fulfilling lives through continuous improvement and a relentless pursuit of excellence.',
        },
      ],
    },
  ],
};
