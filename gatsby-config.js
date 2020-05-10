/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const ACTIVE_ENV = // get environment variables from .env files, so we can set production and development specific links
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${ACTIVE_ENV}`
});

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Aiden Faulconer`,
    description: `Aiden Faulconer, software, design, and 3d development.`,
    siteUrl: `https://aidenfaulconer.com`, // placeholder is https://delog-w3layouts.netlify.com/
    home: {
      title: `AIDEN FAULCONER`,
      description: `null` // deffered to array in mainpagecontent
    },
    /* injected configuration for the main pages content */
    contentConfig: require("./static/admin/contentConfig.js"),
    /* W3Layouts domain verification key for contact forms https://my.w3layouts.com/Forms/ */
    w3l_dom_key: `5e609f7a2d23fCF_Domain_verify`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/_data`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          },
          {
            resolve: "gatsby-remark-emojis"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-30027142-1",
        head: true
      }
    },
    {
      resolve: `gatsby-plugin-sharp`, // optimize image loading / compression realtime and buildtime
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
        pngCompressionLevel: 7, // default is 9
        jpedQuality: 5 // deafult is 9
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        // what pages to pre-cache via serviceworker
        precachePages: [`./`, `/blog`],
        // appendScript: require.resolve() // allow custom service worker, TODO: add a cookie consent button popup after 15 seconds
      }
    },
    `gatsby-plugin-netlify-headers` // make sure to put last in the array (enables http/2 in netlify cdn)
  ]
};
