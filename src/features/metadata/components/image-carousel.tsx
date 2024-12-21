import * as React from "react";

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

const ImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel className="mx-auto flex w-64 items-center">
      <CarouselContent>
        {images.map((src) => (
          <CarouselItem key={src}>
            <div className="p-1">
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="flex items-center justify-center p-1">
                  <img
                    src={src}
                    alt="Hotel Image"
                    width={500}
                    height={500}
                    className="h-44 w-64 rounded-md object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 h-8 w-8" />
      <CarouselNext className="-right-4 h-8 w-8" />
    </Carousel>
  );
};

export { ImageCarousel };
