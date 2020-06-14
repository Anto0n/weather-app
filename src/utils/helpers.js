import { BACKGROUND_COLORS } from "./constants";

export const getBackgroundColor = (temperature) => {

  if (temperature < 0) return BACKGROUND_COLORS.COLD;
  if (temperature >= 0 && temperature < 30 ) return BACKGROUND_COLORS.WARM;
  if (temperature >= 30 ) return BACKGROUND_COLORS.HOT;
};
