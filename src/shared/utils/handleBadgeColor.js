export const handleBadgeColor = (statue) => {
  if (statue === "ضروري") {
    return "danger";
  } else if (statue === "عالي") {
    return "success";
  } else if (statue === "متوسط") {
    return "warning";
  } else if (statue === "منخفض") {
    return "info";
  }
};
