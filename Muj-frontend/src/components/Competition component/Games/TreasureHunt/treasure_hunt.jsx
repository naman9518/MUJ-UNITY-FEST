import React from 'react';
import GameLayout from "../../../../utilis/Resuable/Gamelayout";;
import speedTypingImage from "../../../../assets/treasure-hunt.svg"


const TreasureHunt = () => {
  const howToPlay = [
    "Teams of 2-3 members only.",
        "Navigate through the 360-degree virtual campus tour to discover hidden challenges.",
        "Each challenge will contain a riddle or a question. To proceed, you must choose the correct option from the given choices.",
        "Once you select the correct answer, the next clue will be unlocked, and you can move forward to the next stage.",
        "Keep solving clues and challenges to progress through the campus and move closer to the treasure!",
        "The team that solves all the challenges and finds the final treasure first will be the winner."
  ];

  const rules = [
    "No external help is allowed. All the answers can be found within the clues or in the 360-degree virtual tour.",
    "The clues are scattered across different areas of the virtual campus tour, so make sure to explore every corner carefully.",
    "Misconduct, cheating, or interfering with other teams will result in immediate disqualification.",
    "The game will have a time limit. Be quick and strategic to finish before time runs out!",
    'For tech support, contact support@mujunityfest.in'
  ];

  return (
    <GameLayout
    title="Treasure Hunt"
    tagline="Crack clues. Race the clock. Find the treasure!"
    image={speedTypingImage}
     aboutText="Step into the ultimate adventure across the MUJ campus! The Treasure Hunt is not just a game – it’s a test of wit, teamwork, and quick thinking. Each clue brings you closer to victory... and further into the mystery. Compete with the best minds, solve hidden puzzles, and race against time. Do you have what it takes to find the final treasure?"
    howToPlay={howToPlay}
    rules={rules}
    />
  );
};

export default TreasureHunt;
