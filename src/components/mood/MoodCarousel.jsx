import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";

const MoodCarousel = ({
  submoods,
  sliderValues,
  setSliderValues,
  moodStyle,
}) => {
  const handleSliderChange = (mood, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [mood]: value,
    }));
  };

  return (
    <div className={`m-auto ${moodStyle} rounded-lg p-4`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-md"
      >
        <CarouselContent className="ml-20">
          {submoods.map((mood, index) => (
            <CarouselItem
              key={index}
              className={`basis-[70%] pl-1 ${moodStyle} rounded-md font-bold`}
            >
              <div className="p-1">
                <Card className={`shadow-md ${moodStyle}`}>
                  <CardContent className="flex aspect-square flex-col items-center justify-center overflow-hidden p-6">
                    <span className="text-2xl font-semibold">{mood}</span>
                    <Slider
                      className="mt-[45%] w-48"
                      mood={mood}
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
