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

function WorkaroundDrawerFooter() {
  return (
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
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
  return (
    <Drawer>
      <DrawerTrigger>{moodArchetype}</DrawerTrigger>
      <DrawerContent className="h-[60%]">
        <DrawerHeader>
          <DrawerTitle>Select a sub mood</DrawerTitle>
          {/* <DrawerDescription></DrawerDescription> */}
        </DrawerHeader>

        <MoodCarousel
          submoods={submoods}
          sliderValues={sliderValues}
          setSliderValues={onChangeSliderValues}
        />

        {WorkaroundDrawerFooter()}
      </DrawerContent>
    </Drawer>
  );
};

export default MoodDrawer;
