export const getPriceColor = (price) => {
  if (price > 0) {
    return "text-green-500";
  } else if (price < 0) {
    return "text-red-500";
  } else {
    return "text-gray-500";
  }
};
