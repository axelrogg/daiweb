import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./components/**/*.{ts,tsx,js,jsx,md,mdx}",
        "./app/**/*.{ts,tsx,js,jsx,md,mdx}",
        "./src/**/*.{ts,tsx,js,jsx,md,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                accent: "#a636bf",
                primary: "#00ace0",
                secondary: "#81d5ee",
                text: "#060809",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                propel: {
                    "0%": { transform: "translateX(0)" },
                    "20%": { transform: "translateX(10%)" },
                    "40%": { transform: "translateX(-10%)" },
                    "60%": { transform: "translateX(10%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "bounce-y": "animate-bounce",
                propel: "propel 4s infinite ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
