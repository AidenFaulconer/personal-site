// gzip production build

// in gatsby-node.js
// import fs from "fs"; // native
// import zlib from "zlib"; // native
// import glob from "glob";

const path = require(`path`);

// when gatsby creates routes inside app bundle
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {} // additional data can be passed via context
    });
  });
};

// webpack configuration
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          // {
          //   test: path.resolve(
          //     __dirname,
          //     `./src/components/threejs/three-component.js`
          //   ),
          //   use: loaders.null()
          // },
          // {
          //   test: path.resolve(
          //     __dirname,
          //     `./src/components/navigation-menu.js`
          //   ),
          //   use: loaders.null()
          // }
        ]
      }
    });
  }
}; // https://www.npmjs.com/package/glob

// when a build is done in gatsby (netflify already compresses build though)
// exports.postBuild(pages, callback) {
//   const publicPath = path.join(__dirname, "public");
//   const gzippable = glob.sync(`${publicPath}/**/?(*.html|*.js|*.css)`);
//   gzippable.forEach(file => {
//     const content = fs.readFileSync(file);
//     const zipped = zlib.gzipSync(content);
//     fs.writeFileSync(`${file}.gz`, zipped);
//   });
//   callback();
// }
