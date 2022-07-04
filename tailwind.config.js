module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // For the best performance and to avoid false positives,
    // be as specific as possible with your content configuration.
  ],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        "cloud-theme-blue": "#0467C7",
        "fb-color": "#3b5998",
        "twitter-blue": "#1da1f2",
        "cloud-theme-bg": "#2f2f2f",
        "cloud-theme-gold": "#FB911B",
        "cloud-theme-dark": "#03002e",
        "cloud-theme-red": "#E2062C",
        "cloud-theme-grad": "#107BF1",
        "cloud-dash-blue-main": "#c6cffb",
        "cloud-dash-blue-main-former": "#19194b",
        "cloud-dash-blue-blur": "#a6a6f4",
        "cloud-dash-blue-card": "#150b6f",
        "cloud-dash-blue-an": "#7770c9",
        "cloud-dash-body": "#374151",
      },
      fontFamily: {
        nuno: ["Montserrat", "Nunito", "sans-serif"],
      },
      zIndex: {
        1010: "1010",
        1020: "1020",
        1030: "1030",
        70: "70",
        80: "80",
      },
      lineHeight: {
        "extra-loose": "2.5",
        mySpace: "3rem",
      },
      boxShadow: {
        darkShadow: "0 1px 2px 1px rgba(31, 33, 196, 0.97);",
        // 'darkShadow': '0 4px 6px -1px rgba(31, 33, 196, 0.97), 0 2px 4px -2px rgba(31, 33, 196, 0.97);',
      },
      height: {
        100: "32rem",
      },
      screens: {
        "base": "300px",
        "base-l": "340px",
        "xs": "400px",
        "xs-auth-log": "450px",
        "xs-l": "500px",
        "xs-auth": "525px",
        "md-xl": "1000px",
        "md-xls": "870px",
      },
      backgroundImage: {
        "conic":
          "conic-gradient(at center top, rgb(17, 24, 39), rgb(243, 244, 246), rgb(17, 24, 39))",
        "conic-cl":
          "conic-gradient(at center top, rgba(112, 184, 226, 0.5), rgb(243, 244, 246), rgba(55, 175, 244, 0.8))",
        "conic-cone":
          "conic-gradient(from 60deg at 30% 10%, rgba(112, 184, 226, 0.5) 0%, rgba(35, 110, 154, 0.8) 25%, rgba(55, 175, 244, 0.8) 30%)",
        "conic-cone2":
          "conic-gradient(from 36deg at 40% 60%, rgba(112, 184, 226, 0.5) 0%, rgba(35, 110, 154, 0.8) 25%, rgba(55, 175, 244, 0.8) 30%,rgba(223, 218, 71, 0.8) 60%, rgba(121, 170, 198, 0.8) 90%)",
      },
      fontSize: {
        "xxs": ".75rem",
        "xxs-xs": ".5rem",
        "xxs-l": ".85rem",
        "xxs-s": ".65rem",
      },
      borderRadius: {
        "fancy": "81% 100% 100% 99% / 99% 98% 99% 100%",
      },
    },
  },
};
 