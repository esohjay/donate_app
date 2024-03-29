/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1100px",
      xl: "1440px",
    },
    extend: {
      colors: {
        mainColor: "#DD2684",
        altColor: "#A3003F",
        altColor2: "#ffc300",
        mainColor2: "#004b23",
        lightPurple: "#F6EDF5",
        blackClr: "#131516",
        lightColor: "#6E6E6E",
        lightColor2: "#F9F9F9",
        bodyBg: "#FAFAFA",
        lightBlack: "#17191C",
        grayBg: "#C4C4C4",
        grayColor2: "#D7D7D7",
        sliderBg: "#EDEDED",
      },
      backgroundImage: {
        regBg: "url('/images/regbg.svg')",
        loginBg: "url('/images/login-bg2.svg')",
        heroBg: "url('assets/hands.jpg')",
        profileBg: "url('/images/profileBgd.svg')",
      },
    },
  },
  plugins: [],
};
