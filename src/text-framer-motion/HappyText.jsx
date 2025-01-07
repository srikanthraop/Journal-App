import { motion } from "framer-motion";

const HappyText = ({ text, isHovered, dominantMoodColor }) => {
  return (
    <motion.div
      className={`font-quicksand overflow-hidden text-5xl ${
        isHovered ? "font-bold" : "font-thin"
      }`}
      style={{
        display: "block", // Ensure block-level behavior
        color: isHovered ? "transparent" : "black", // Default black, transparent on hover
        background: isHovered
          ? `linear-gradient(90deg, ${dominantMoodColor.linearGradient1}, ${dominantMoodColor.linearGradient2})` // Gradient on hover
          : "none", // No gradient by default
        backgroundClip: isHovered ? "text" : "none",
        WebkitBackgroundClip: isHovered ? "text" : "none",
        textShadow: isHovered
          ? dominantMoodColor.textShadow // Glow effect on hover
          : "none", // No shadow by default
        transformOrigin: "left", // Prevent layout shift during scaling
        whiteSpace: "normal", // Allow wrapping
        wordWrap: "break-word", // Break long words
      }}
      animate={{
        scale: isHovered ? 1.05 : 1, // Subtle scale
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  );
};

export default HappyText;
