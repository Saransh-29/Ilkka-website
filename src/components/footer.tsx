import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-secondary text-foreground border-primary mt-20 border-t-4"
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3 md:text-left">
          {/* Column 1: Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Image src="/logo.png" alt="ILKKA Logo" width={150} height={60} />
            <p className="text-muted-foreground mt-2 text-sm">
              Healthcare Private Limited
            </p>
          </div>

          {/* Column 2: Addis Ababa */}
          <div>
            <h3 className="mb-3 text-base font-bold">Addis Ababa, Ethiopia</h3>
            <div className="bg-muted mx-auto mb-3 flex h-16 w-28 items-center justify-center rounded md:mx-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm">+25111 273 4554</p>
            <p className="text-muted-foreground text-sm">+251 91 366 7537</p>
            <a
              href="mailto:info@drogapharma.com"
              className="text-primary text-sm hover:underline"
            >
              info@drogapharma.com
            </a>
            <br />
            <a
              href="mailto:pharmadroga@gmail.com"
              className="text-primary text-sm hover:underline"
            >
              pharmadroga@gmail.com
            </a>
            <p className="text-muted-foreground mt-2 text-xs">
              Gulele Subcity, Woreda 09, House no new/Droga building
            </p>
          </div>

          {/* Column 3: Somaliland */}
          <div>
            <h3 className="mb-3 text-base font-bold">Somaliland</h3>
            <div className="bg-muted mx-auto mb-3 flex h-16 w-28 items-center justify-center rounded md:mx-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm">+252 634 958 444</p>
            <p className="text-muted-foreground text-sm">+252 637 611 171</p>
            <a
              href="mailto:info@drogapharma-som.com"
              className="text-primary text-sm hover:underline"
            >
              info@drogapharma-som.com
            </a>
            <br />
            <a
              href="mailto:pharmadroga@gmail.com"
              className="text-primary text-sm hover:underline"
            >
              pharmadroga@gmail.com
            </a>
            <p className="text-muted-foreground mt-2 text-xs">
              Cabaaye Bus Station, Downtown, Hargeysa, Somaliland
            </p>
          </div>
        </div>
      </div>
      <div className="bg-background border-border border-t py-3">
        <p className="text-muted-foreground text-center text-xs">
          © {new Date().getFullYear()} IlkkaHealthCare. All right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
