import MoodDrawer from "./MoodDrawer";

const MoodCards = ({ sliderValues, onChangeSliderValues }) => {
  const Happy = ["Joyful", "Content", "Proud", "Optimistic", "Playful"];
  const Sad = ["Lonely", "Heartbroken", "Hopeless", "Disappointed", "Grieving"];
  const Angry = ["Frustrated", "Resentful", "Enraged", "Irritated", "Offended"];
  const Afraid = ["Anxious", "Terrified", "Insecure", "Worried", "Vulnerable"];
  const Surprised = [
    "Amazed",
    "Confused",
    "Startled",
    "Overwhelmed",
    "Astonished",
  ];
  const Disgusted = [
    "Repulsed",
    "Revolted",
    "Horrified",
    "Sickened",
    "Ashamed",
  ];
  const Calm = ["Relaxed", "Peaceful", "Tranquil", "Safe", "Stable"];
  const Excited = ["Eager", "Enthusiastic", "Aroused", "Energetic", "Inspired"];

  return (
    <div className="flex w-full flex-row justify-center gap-x-3">
      <MoodDrawer
        moodArchetype={"Happy"}
        submoods={Happy}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />
      <MoodDrawer
        moodArchetype={"Sad"}
        submoods={Sad}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />
      <MoodDrawer
        moodArchetype={"Angry"}
        submoods={Angry}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />

      <MoodDrawer
        moodArchetype={"Afraid"}
        submoods={Afraid}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />

      <MoodDrawer
        moodArchetype={"Surprised"}
        submoods={Surprised}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />

      <MoodDrawer
        moodArchetype={"Disgusted"}
        submoods={Disgusted}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />

      <MoodDrawer
        moodArchetype={"Calm"}
        submoods={Calm}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />

      <MoodDrawer
        moodArchetype={"Excited"}
        submoods={Excited}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />
    </div>
  );
};

export default MoodCards;
