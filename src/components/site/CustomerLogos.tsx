import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
    <section id="customers" className="py-16 md:py-20 bg-surface scroll-mt-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink">
            Trusted by teams we've partnered with
          </h2>
        </div>

        <div className="mt-10">
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
              {customerLogos.map((logo) => (
                <CarouselItem
                  key={logo.name}
                  className="pl-3 basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="flex h-36 items-center justify-center rounded-[1.4rem] border border-border bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-20 w-full max-w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
