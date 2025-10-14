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
  
  // Configuración opcional de DaisyUI
  daisyui: {
    themes: ["light", "dark", "cupcake", "forest", "luxury"], // temas que quieres usar
    darkTheme: "dark", // tema por defecto para modo oscuro
    base: true, // aplica estilos base
    styled: true, // aplica estilos a los componentes
    utils: true, // agrega utilidades de Tailwind
    prefix: "", // prefijo para clases de DaisyUI
    logs: true, // muestra info en consola
    themeRoot: ":root", // elemento raíz para el tema
  },
}