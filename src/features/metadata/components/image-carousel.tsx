import Image from "next/image"
import * as React from "react"

import { Card, CardContent } from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"

const ImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel className="w-64 flex items-center mx-auto">
      <CarouselContent>
        {images.map((src) => (
          <CarouselItem key={src}>
            <div className="p-1">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="flex items-center justify-center p-1">
                  <Image
                    src={src}
                    alt="Hotel Image"
                    width={500}
                    height={500}
                    className="rounded-md h-44 w-64 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-8 w-8 -left-4" />
      <CarouselNext className="h-8 w-8 -right-4" />
    </Carousel>
  )
}

export { ImageCarousel }

