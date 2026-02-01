export const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About ILKKA Healthcare',
  description:
    'Learn about ILKKA Healthcare, a leading medical equipment supplier in Ethiopia and Somaliland',
  url: 'https://ilkka-healthcare.com/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'ILKKA Healthcare',
    foundingDate: '2020', // Update with actual founding date
    description:
      'Leading medical equipment supplier in Ethiopia and Somaliland',
    url: 'https://ilkka-healthcare.com',
    logo: 'https://ilkka-healthcare.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Ethiopia',
      addressRegion: 'Addis Ababa',
    },
    founder: {
      '@type': 'Person',
      name: 'ILKKA Healthcare Founders', // Update with actual founder names
    },
    numberOfEmployees: '50+', // Update with actual number
    slogan: 'Care & Quality in Healthcare',
  },
};
