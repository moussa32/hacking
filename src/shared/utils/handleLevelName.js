export const handleLevelToName = level => {
  if (level === 2) {
    return "منخفض";
  } else if (level === 3) {
    return "متوسط";
  } else if (level === 4) {
    return "عالي";
  } else if (level === 5) {
    return "ضروري";
  }
};

export const handleLevelToNumber = levelName => {
  if (levelName === "منخفض") {
    return 2;
  } else if (levelName === "متوسط") {
    return 3;
  } else if (levelName === "عالي") {
    return 4;
  } else if (levelName === "ضروري") {
    return 5;
  }
};
