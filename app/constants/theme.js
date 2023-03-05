export const COLORS = {
  primary: "#603A23",
  secondary: "#975126",
  tertiary: "#A76C4B",
  bg: "#FFF0E8",
  white: "#FFF",
  gray: "#74858C",
  lightGray: "#F4F7F8",
  black: "#000",
  blackLight: "#505050",
  textLight: "#CACFD9",
  orange: "#F49301",
  danger: "#EF403B",
  lighter: "#F9FBFA",
  border: "#F0F0F8",
  green: "#00983D",
  fino: "#D8D8D9",
  textInputColor: "#F4F6F9",
  yellow: "#f49201",
};

export const SIZES = {
  base: 10,
  small: 12,
  graySmall: 11,
  font: 14,
  h4: 16,
  h3: 18,
  h2: 24,
  h1: 34,
};

export const FONTS = {
  bold: "EncodeSansBold",
  semiBold: "EncodeSansSemiBold",
  medium: "EncodeSansMedium",
  regular: "EncodeSansRegular",
  light: "EncodeSansLight",
  thin: "EncodeSansThin",
  extraBold: "EncodeSansExtraBold",
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
