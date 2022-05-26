module.exports = {
  siteMetadata: {
    title: `Herosimo: Welcome to my site!`,
    description: `I am an Indonesian front-end developer and web designer. You can find both my personal and professional works on this website.`,
    author: `Herosimo Sribiko`,
    keywords: `personal website, portfolio, web developer, web designer`,
    image: `src/images/screenshot.jpg`,
    siteUrl: `https://herosimo.github.io`,
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "3564905989",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content/",
      },
      __key: "content",
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.svg",
      },
    },
  ],
};
