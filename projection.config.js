// Projection Configuration File
// This is an alternative to embedding config in projects.yaml
// If both exist, this file takes precedence

module.exports = {
  // Site title displayed in the browser tab and header
  title: "Mike Delmonaco",

  // Site description for SEO and social sharing
  description: "My coding projects",

  // Base URL for your site
  // Use "./" for relative paths (recommended for most cases)
  // Use "https://username.github.io/" for absolute paths on GitHub Pages
  baseUrl: "https://quasarbright.github.io/",

  // Number of items to display per page (for future pagination feature)
  itemsPerPage: 20,

  // Optional: Array of URLs to interactive backgrounds
  // These will be displayed as iframes behind your content
  // Great for p5.js sketches, WebGL demos, or other visual effects
  dynamicBackgrounds: [
    "https://quasarbright.github.io/p5js/boids",
    "https://quasarbright.github.io/p5js/random-walk",
    "https://quasarbright.github.io/p5js/voronoi?background",
    "https://quasarbright.github.io/p5js/majority-automaton-gpu?background",
    "https://quasarbright.github.io/p5js/genetic-steering",
    "https://quasarbright.github.io/p5js/fullscreen-gpu-gol",
    "https://quasarbright.github.io/p5js/honeycomb-mst",
  ],
};
