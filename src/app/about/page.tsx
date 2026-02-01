import About from './about';
import Footer from '@/components/footer';
import { aboutMetadata } from './metadata';
import { aboutJsonLd } from './schema';

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
