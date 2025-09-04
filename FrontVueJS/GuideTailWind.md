# Install Tailwind using npm (nope package manager)
+ `npm init -y`
+ `npm install tailwindcss postcss autoprefixer`
(`npx tailwindcss init` ===> create the empty file `tailwind.config.js`)
+ create the new file `tailwind.config.js` with content same the webpage `tailwindcss.com/docs/installation`
         ` module.exports = {
          content: [
            "./src/pages/**/*.{js,ts,jsx,tsx}",
            "./src/components/**/*.{js,ts,jsx,tsx}",
            "./public/**/*.html", // Add this line
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        };`
+ create new folder `src` & `public`
+ in `src` create the file `styles.css` (content same with teh webpage guide to installation)
+ in the package.json change the scripts to:
  `  "scripts": {
    "build-css": "tailwindcss -i src/styles.css -o public/styles.css"
  },`
  `npm install -D tailwindcss postcss autoprefixer`

+ `npm run build-css`
+ install `npm install live-server -g`
+ run `live-server public`

P/S: make Generate styles.css automatically by define:
+ the package.json:
  "scripts": {
    "build-css": "tailwindcss -i ./src/styles.css -o ./public/styles.css",
    "watch-css": "tailwindcss -i ./src/styles.css -o ./public/styles.css --watch",
    "watch-html": "onchange './public/*.{html,js,jsx,ts,tsx}' -- npm run build-css"
  },
+ `npm install --save-dev onchange`
+ 