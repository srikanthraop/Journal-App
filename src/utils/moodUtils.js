/*************************************
 * 1) Main Mood <-> Submood Mapping *
 *************************************/

// Each key is a "Main Mood", and the array lists the submoods for it.
export const submoodMap = {
  Happy: ["Joyful", "Content", "Proud", "Optimistic", "Playful"],
  Sad: ["Lonely", "Heartbroken", "Hopeless", "Disappointed", "Grieving"],
  Angry: ["Frustrated", "Resentful", "Enraged", "Irritated", "Offended"],
  Afraid: ["Anxious", "Terrified", "Insecure", "Worried", "Vulnerable"],
  Surprised: ["Amazed", "Confused", "Startled", "Overwhelmed", "Astonished"],
  Disgusted: ["Repulsed", "Revolted", "Horrified", "Sickened", "Ashamed"],
  Calm: ["Relaxed", "Peaceful", "Tranquil", "Safe", "Stable"],
  Excited: ["Eager", "Enthusiastic", "Aroused", "Energetic", "Inspired"],
};

// For quick lookups from submood -> main mood
// (convert to lowercase for safer matching)
const submoodToMainMood = {};
Object.entries(submoodMap).forEach(([mainMood, submoods]) => {
  submoods.forEach((sub) => {
    submoodToMainMood[sub.toLowerCase()] = mainMood;
  });
});

/***************************************
 * 2) (Optional) Main Mood -> CSS Map  *
 ***************************************/
export const moodColors = {
  Happy: {
    boxShadow: "rgba(255, 223, 0, 0.5)",
    linearGradient1: "#FFD700",
    linearGradient2: "#FFA500",
    textShadow: "rgba(255, 223, 0, 0.6)",
    backgroundColor: "#fff8cc",
  },
  Sad: {
    boxShadow: "rgba(173, 216, 230, 0.5)",
    linearGradient1: "#87CEFA",
    linearGradient2: "#4682B4",
    textShadow: "rgba(173, 216, 230, 0.6)",
    backgroundColor: "#e0f2ff",
  },
  Angry: {
    boxShadow: "rgba(255, 99, 71, 0.5)",
    linearGradient1: "#FF6347",
    linearGradient2: "#DC143C",
    textShadow: "rgba(255, 99, 71, 0.6)",
    backgroundColor: "#ffe5e5",
  },
  Afraid: {
    boxShadow: "rgba(147, 112, 219, 0.5)",
    linearGradient1: "#9370DB",
    linearGradient2: "#6A5ACD",
    textShadow: "rgba(147, 112, 219, 0.6)",
    backgroundColor: "#f3e8ff",
  },
  Surprised: {
    boxShadow: "rgba(255, 182, 193, 0.5)",
    linearGradient1: "#FFB6C1",
    linearGradient2: "#FF69B4",
    textShadow: "rgba(255, 182, 193, 0.6)",
    backgroundColor: "#ffe0f0",
  },
  Disgusted: {
    boxShadow: "rgba(255, 191, 0, 0.5)",
    linearGradient1: "#FFC107",
    linearGradient2: "#FF8C00",
    textShadow: "rgba(255, 191, 0, 0.6)",
    backgroundColor: "#fff4d6",
  },
  Calm: {
    boxShadow: "rgba(211, 211, 211, 0.5)",
    linearGradient1: "#D3D3D3",
    linearGradient2: "#A9A9A9",
    textShadow: "rgba(211, 211, 211, 0.6)",
    backgroundColor: "#f5f5f5",
  },
  Excited: {
    boxShadow: "rgba(255, 165, 0, 0.5)",
    linearGradient1: "#FFA500",
    linearGradient2: "#FF4500",
    textShadow: "rgba(255, 165, 0, 0.6)",
    backgroundColor: "#ffeccc",
  },
};

/**********************************************
 * 3) Core Algorithm: getDominantMood(obj)    *
 **********************************************/
export function getDominantMood(submoodSliders = {}) {
  const filtered = Object.entries(submoodSliders).filter(
    ([_, value]) => value > 0,
  );
  if (filtered.length === 0) return null;

  let maxValue = 0;
  for (const [_, value] of filtered) {
    if (value > maxValue) maxValue = value;
  }

  const candidates = filtered.filter(([_, value]) => value === maxValue);
  if (candidates.length === 1) {
    const [submoodName] = candidates[0];
    return submoodToMainMood[submoodName.toLowerCase()] || null;
  }

  let bestMood = null;
  let bestMoodSubmoodCount = -1;

  for (const [submoodName] of candidates) {
    const mainMood = submoodToMainMood[submoodName.toLowerCase()];
    if (!mainMood) continue;

    const submoodCount = submoodMap[mainMood]?.length || 0;

    if (submoodCount > bestMoodSubmoodCount) {
      bestMood = mainMood;
      bestMoodSubmoodCount = submoodCount;
    }
  }

  return bestMood;
}

/************************************************
 * 4) (Optional) Helper to get color by mood    *
 ************************************************/
export function getColorForMood(mood) {
  if (!mood) return null;
  return moodColors[mood] || null;
}
