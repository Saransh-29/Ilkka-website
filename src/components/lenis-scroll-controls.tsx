// 'use client';

// import React from 'react';
// import { useLenis } from '@/hooks/use-lenis';

// export function LenisScrollControls() {
//   const { scrollToTop, scrollToSection, scrollToBottom, lenis } = useLenis();

//   return (
//     <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-lg bg-white/10 p-3 backdrop-blur-md">
//       <button
//         onClick={scrollToTop}
//         className="rounded bg-primary px-3 py-1 text-xs text-white hover:bg-primary/80"
//         title="Scroll to top"
//       >
//         ↑ Top
//       </button>

//       <button
//         onClick={() => scrollToSection('about')}
//         className="rounded bg-primary px-3 py-1 text-xs text-white hover:bg-primary/80"
//         title="Scroll to About section"
//       >
//         About
//       </button>

//       <button
//         onClick={() => scrollToSection('products')}
//         className="rounded bg-primary px-3 py-1 text-xs text-white hover:bg-primary/80"
//         title="Scroll to Products section"
//       >
//         Products
//       </button>

//       <button
//         onClick={() => scrollToSection('contact')}
//         className="rounded bg-primary px-3 py-1 text-xs text-white hover:bg-primary/80"
//         title="Scroll to Contact section"
//       >
//         Contact
//       </button>

//       <button
//         onClick={scrollToBottom}
//         className="rounded bg-primary px-3 py-1 text-xs text-white hover:bg-primary/80"
//         title="Scroll to bottom"
//       >
//         ↓ Bottom
//       </button>

//       <div className="text-xs text-white/70">
//         Lenis: {lenis ? '✓' : '✗'}
//       </div>
//     </div>
//   );
// }

// export default LenisScrollControls;
