import MoodDrawer from "./MoodDrawer";

const MoodCards = ({ sliderValues, onChangeSliderValues }) => {
  const positiveSubMoods = [
    "positive1",
    "positive2",
    "positive3",
    "positive4",
    "positive5",
  ];
  const neutralSubMoods = [
    "neutral1",
    "neutral2",
    "neutral3",
    "neutral4",
    "neutral5",
  ];
  const negativeSubMoods = [
    "negative1",
    "negative2",
    "negative3",
    "negative4",
    "negative5",
  ];

  return (
    <div>
      <MoodDrawer
        moodArchetype={"Positive"}
        submoods={positiveSubMoods}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />
      <MoodDrawer
        moodArchetype={"Neutral"}
        submoods={neutralSubMoods}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />
      <MoodDrawer
        moodArchetype={"Negative"}
        submoods={negativeSubMoods}
        sliderValues={sliderValues}
        onChangeSliderValues={onChangeSliderValues}
      />
    </div>
  );
};

export default MoodCards;
