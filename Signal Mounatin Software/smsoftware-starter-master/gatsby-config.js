require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `SMSoftware Starter`,
    description: `A simple starter to get up and developing quickly with Gatsby.`,
    author: `Jalo Moster`,
    siteUrl: `https://starter.smsoftware.io`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SMSoftware Starter`,
        short_name: `Starter`,
        start_url: `/`,
        background_color: `#1E5583`,
        theme_color: `#1E5583`,
        display: `standalone`,
        icon: `src/images/smsoftware-favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
  ],
};
