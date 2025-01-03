import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MoodCarousel from "./MoodCarousel";
import { Button } from "@/components/ui/button";

function WorkaroundDrawerFooter({ submoods, onChangeSliderValues }) {
  const defaultSliderValues = {};
  for (const key of submoods) {
    defaultSliderValues[key] = 0;
  }

  function handleCancel() {
    onChangeSliderValues((prevValues) => ({
      ...prevValues,
      ...defaultSliderValues,
    }));
  }

  return (
    <DrawerFooter className="-m-2 flex items-center justify-center gap-2">
      <DrawerClose asChild>
        <Button className="w-72 py-1 text-sm">Save</Button>
      </DrawerClose>

      <DrawerClose asChild>
        <Button
          variant="outline"
          className="w-72 px-3 py-1 text-sm"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </DrawerClose>
    </DrawerFooter>
  );
}

const MoodDrawer = ({
  moodArchetype,
  submoods,
  sliderValues,
  onChangeSliderValues,
}) => {
  const moodStyles = {
    Happy: "text-yellow-700 dark:text-yellow-300",
    Sad: "text-blue-700 dark:text-blue-300",
    Angry: "text-red-700 dark:text-red-300",
    Afraid: "text-purple-700 dark:text-purple-300",
    Surprised: "text-pink-700 dark:text-pink-300",
    Disgusted: "text-amber-700 dark:text-amber-300",
    Calm: "text-gray-700 dark:text-gray-300",
    Excited: "text-orange-700 dark:text-orange-300",
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={`${moodArchetype}`}>{moodArchetype}</Button>
      </DrawerTrigger>
      <DrawerContent
        className={`h-[60%] rounded-t-lg p-4 transition-colors ${moodStyles[moodArchetype]}`}
      >
        <DrawerHeader className="flex flex-col items-center text-center">
          <DrawerTitle>Select a sub-mood</DrawerTitle>
          <DrawerDescription>
            Adjust the sliders below to select sub-moods for {moodArchetype}.
          </DrawerDescription>
        </DrawerHeader>

        <MoodCarousel
          submoods={submoods}
          sliderValues={sliderValues}
          setSliderValues={onChangeSliderValues}
          moodStyle={moodStyles[moodArchetype]}
        />

        <WorkaroundDrawerFooter
          submoods={submoods}
          onChangeSliderValues={onChangeSliderValues}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default MoodDrawer;
