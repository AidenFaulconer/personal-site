/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

//get environment variables from .env files, so we can set production and development specific links
const ACTIVE_ENV =
	process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
require('dotenv').config({
	path: `.env.${ACTIVE_ENV}`,
});

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Aiden Faulconer`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://delog-w3layouts.netlify.com/`,
    home: {
      title: `AIDEN FAULCONER`,
      description: `null`,//deffered to array in mainpagecontent
    },
    /* injected configuration for the main pages content*/
    mainPageContent: require('./static/admin/contentConfig.js'),
    /* W3Layouts domain verification key for contact forms https://my.w3layouts.com/Forms/ */
    w3l_dom_key: `5e609f7a2d23fCF_Domain_verify`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/_data`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: "language-",
            inlineCodeMarker: null,
            aliases: {},
            showLineNumbers: false,
            noInlineHighlight: false,
          },
        },
        {
          resolve: 'gatsby-remark-emojis',
        }],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-30027142-1",
        head: true,
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
  ],
}
