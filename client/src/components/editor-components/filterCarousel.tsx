"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { PF_PROJECT } from "@/templates/professional/types/project"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { CldImage } from "next-cloudinary"

interface PFWorkCarouselProps {
  Projects: PF_PROJECT[]
}

export function PFTestWorkCarousel({ Projects }: PFWorkCarouselProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  const categories = Array.from(new Set(Projects.map(project => project.category)))

  const filteredProjects = selectedCategory
    ? Projects.filter(project => project.category === selectedCategory)
    : Projects

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Carousel */}
      <Carousel
        className="px-4 w-full"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent>
          {filteredProjects.map((project, idx) => (
            <CarouselItem key={idx}>
              <div className="flex flex-col lg:flex-row-reverse gap-4 lg:justify-around lg:items-center mt-10">
                <CldImage
                  src={project.imgUrl}
                  alt="project-img"
                  className="md:max-h-[500px] md:max-w-[500px] object-cover rounded-md"
                  width={500}
                  height={500}
                />
                <div className="space-y-4">
                  <div>
                    <h1 className="text-xl font-semibold">{project.heading}</h1>
                    <h2 className="font-extralight">{project.subtitle}</h2>
                  </div>
                  <p>{project.description}</p>
                  <Link href={project.btnLink}>
                    <Button>{project.btnText}</Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 dark" />
        <CarouselNext className="-right-4 dark" />
      </Carousel>
    </div>
  )
}
