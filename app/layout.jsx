// import "/public/assets/css/vendors/bootstrap.min.css";
// import "/public/assets/css/vendors/swiper-bundle.min.css";
// import "/public/assets/css/vendors/carouselTicker.css";
// import "/public/assets/css/vendors/magnific-popup.css";
// import "/public/assets/fonts/remixicon/remixicon.css";
// import "/public/assets/css/main.css";
import HeroUIProviderCu from "@/components/layout/HeroUIProviderCu";

import { Urbanist, Playfair_Display, DM_Mono } from "next/font/google";
const urbanist = Urbanist({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--urbanist",
  display: "swap",
});
const playfair_display = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--playpair",
  display: "swap",
});
const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--dmMono",
  display: "swap",
});

export const metadata = {
  title: "Mbit - Web Development Team",
  description: "Mbit - Web Development Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark" className='dark'>
      <head>
        <link rel="stylesheet" href="/assets/css/vendors/bootstrap.min.css" />
        <link
          rel="stylesheet"
          href="/assets/css/vendors/swiper-bundle.min.css"
        />
        <link rel="stylesheet" href="/assets/css/vendors/carouselTicker.css" />
        <link rel="stylesheet" href="/assets/css/vendors/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/fonts/remixicon/remixicon.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body
        className={`${urbanist.variable} ${playfair_display.variable} ${dmMono.variable}`}
      >
        <HeroUIProviderCu> {children}</HeroUIProviderCu>
      </body>
    </html>
  );
}
