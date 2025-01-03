import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";

const MoodCarousel = ({ submoods, sliderValues, setSliderValues }) => {
  const handleSliderChange = (mood, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [mood]: value,
    }));
  };

  return (
    <div className="m-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-md"
      >
        <CarouselContent className="ml-20">
          {submoods.map((mood, index) => (
            <CarouselItem key={index} className="basis-[60%] pl-1">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square flex-col items-center justify-center overflow-hidden p-6">
                    <span className="text-2xl font-semibold">{mood}</span>
                    <Slider
                      className="mt-[55%] w-40"
                      defaultValue={[0]}
                      max={5}
                      step={1}
                      value={[sliderValues[mood] || 0]}
                      onValueChange={(value) =>
                        handleSliderChange(mood, value[0])
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MoodCarousel;
