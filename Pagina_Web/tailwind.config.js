/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    "./src/**/*.{html,js}",
    "./*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  
 
  daisyui: {
    themes: ["light", "dark", "cupcake", "forest", "luxury"], // temas que quieres usar
    darkTheme: "dark", 
    base: true, 
    styled: true, 
    utils: true, 
    prefix: "", 
    logs: true, 
    themeRoot: ":root", 
  },
}