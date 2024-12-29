/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                "inter-tight": ["Inter Tight", "sans-serif"],
            },
            backgroundImage: {
                select: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik00ODAtMzYxcS04IDAtMTUtMi41dC0xMy04LjVMMjY4LTU1NnEtMTEtMTEtMTEtMjh0MTEtMjhxMTEtMTEgMjgtMTF0MjggMTFsMTU2IDE1NiAxNTYtMTU2cTExLTExIDI4LTExdDI4IDExcTExIDExIDExIDI4dC0xMSAyOEw1MDgtMzcycS02IDYtMTMgOC41dC0xNSAyLjVaIi8+PC9zdmc+")',
            },
        },
    },
    plugins: [],
};
