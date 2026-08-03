import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ScrollReveal } from "./ScrollReveal";

const customerLogos = [
  {
    name: "Ordinet Solutions Pvt. Ltd.",
    src: "/customer-logos/image1.png",
  },
  {
    name: "PANGEA HR Services Pvt. Ltd.",
    src: "/customer-logos/image2.png",
  },
  {
    name: "Ulka Projects",
    src: "/customer-logos/image3.png",
  },
  {
    name: "Globular Tech Services Pvt. Ltd.",
    src: "/customer-logos/image4.png",
  },
  {
    name: "Financial Services",
    src: "/customer-logos/image5.jpeg",
  },
  {
    name: "BSJ Jewellers",
    src: "/customer-logos/image6.png",
  },
  {
    name: "Anushka",
    src: "/customer-logos/image7.jpeg",
  },
  {
    name: "Rajneer Exim Production",
    src: "/customer-logos/image8.png",
  },
  {
    name: "Enterprise",
    src: "/customer-logos/image9.png",
  },
  {
    name: "Global Envirotech",
    src: "/customer-logos/image10.png",
  },
  {
    name: "Gasoline Fuel Systems India",
    src: "/customer-logos/image11.png",
  },
];

export default function CustomerLogos() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 1400,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      playOnInit: true,
    }),
  );

  return (
    <section id="customers" className="section-compact bg-surface scroll-mt-24">
      <div className="site-container">
        <ScrollReveal variant="fade-up" className="section-heading">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            Trusted by teams we've partnered with
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={120} className="mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
            }}
            plugins={[autoplay.current]}
            className="relative"
            aria-label="Customer logos carousel"
          >
            <CarouselContent className="-ml-3 py-2">
              {customerLogos.map((logo, index) => (
                <CarouselItem
                  key={logo.name}
                  className="basis-[78%] pl-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <ScrollReveal variant="scale" delay={index * 60}>
                    <div className="flex h-36 items-center justify-center rounded-[1.4rem] border border-border bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        decoding="async"
                        className="max-h-20 w-full max-w-full object-contain"
                      />
                    </div>
                  </ScrollReveal>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
