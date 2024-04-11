/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  // pathPrefix: "/sitev2",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `images`,
        // Path to the directory
        path: `${__dirname}/src/images/`,
      },
    },
    
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    `gatsby-plugin-sass`,
    
  ],
  // siteMetadata: {
  //   title: 'Micah Carroll',
  //   description: 'A designer utilizing a unique blend of creativity, technical skill, and an innovative approach that draws upon a wide range of disciplines, including graphic design, 3D tooling, product design, and more.',
  //   copyright: 'micah caroll 2023'
  // }
}
