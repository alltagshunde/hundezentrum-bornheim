const path = require(`path`)
const fs = require('fs-extra');
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require('lodash');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators

    if (node.internal.type === `File`) {
        if (node.relativePath.indexOf('content') === 0) {
            const itemType = path.basename(path.dirname(node.relativePath))
            const basePath = itemType === 'pages' ? 'content/pages' : 'content'
            let slug = createFilePath({
                node,
                getNode,
                basePath: basePath
            })
            slug = slug.replace('/courses/', '/gruppen/')
            slug = slug.replace('/news/', '/aktuelles/')

            createNodeField({
                node,
                name: `itemType`,
                value: itemType,
            })
            createNodeField({
                node,
                name: `slug`,
                value: slug === '/home/' ? '/' : slug,
            })
            //console.log('FILE', itemType, slug);
        } else if (node.relativePath.indexOf('assets') === 0) {
            //console.log('ASS', node.relativePath);
        }
    } else if (node.internal.type === `MarkdownRemark`) {
        const fileNode = getNode(node.parent)
        if (fileNode.fields && fileNode.fields.itemType) {
            const slug = node.frontmatter.path && node.frontmatter.path.length ? node.frontmatter.path : fileNode.fields.slug;

            Object.keys(node.frontmatter).forEach(key => {
                if (key.indexOf('image') === 0) {
                    //console.log('MD', node.frontmatter[key]);
                    if (node.frontmatter[key].indexOf('/static/img') === 0) {
                        node.frontmatter[key] = node.frontmatter[key].replace('/static/img', '../../../src/assets/img');
                        //console.log('MD', node.frontmatter[key]);
                    }
                } else if (key === 'sections') {
                    node.frontmatter.sections.forEach(section => {
                        Object.keys(section).forEach(skey => {
                            if (skey.indexOf('image') === 0) {
                                //console.log('MD', section[skey]);
                                if (section[skey].indexOf('/static/img') === 0) {
                                    section[skey] = section[skey].replace('/static/img', '../../../src/assets/img');
                                    //console.log('MD', section[skey]);
                                }
                            }
                        });
                    });
                }
            });

            createNodeField({
                node,
                name: `itemType`,
                value: fileNode.fields.itemType,
            })
            createNodeField({
                node,
                name: `navEntry`,
                value: fileNode.fields.itemType === 'pages' && node.frontmatter.menu !== false ? 'menu' : 'footer',
            })
            createNodeField({
                node,
                name: `path`,
                value: slug,
            })
            //console.log('MD', fileNode.fields.itemType, slug, node.frontmatter)
        }
    }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
        graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                name
              }
              fields {
                itemType
                path
              }
            }
          }
        }
      }
    `).then(result => {
            result.data.allMarkdownRemark.edges.map(({ node }) => {
                if (node.fields.itemType === 'pages') {
                    // loads e.g. Services.jsx or News.jsx
                    let component = path.resolve(`./src/templates/${_.startCase(node.frontmatter.name)}.jsx`)
                    if (!fs.existsSync(component)) {
                        component = path.resolve(`./src/templates/Page.jsx`)
                    }

                    createPage({
                        path: node.fields.path,
                        component: component,
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            //path: node.fields.path,
                        },
                        layout: node.fields.path === '/' ? 'index' : 'NoBanner'
                    })

                    //console.log('PAGE', node, component)
                } else if (node.fields.itemType === 'courses') {
                    const slug = node.fields.path //.replace('courses', 'services')
                    createPage({
                        path: node.fields.path,
                        component: path.resolve(`./src/templates/Gruppe.jsx`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            //path: node.fields.path,
                        },
                        layout: 'NoBanner'
                    })

                    //console.log('COURSE', node, slug)
                } else if (node.fields.itemType === 'news') {
                    const slug = node.fields.path //.replace('courses', 'services')
                    createPage({
                        path: node.fields.path,
                        component: path.resolve(`./src/templates/Veranstaltung.jsx`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            //path: node.fields.path,
                        },
                        layout: 'NoBanner'
                    })

                    //console.log('COURSE', node, slug)
                }
            })
            resolve()
        })
    })
}

exports.onPostBuild = (args, pluginOptions) => {
    const src = 'src/assets/img';
    const dst = 'public/static/img'

    return fs.copy(src, dst)
        .catch((err) => {
            console.error(src, dst, err);
        });
};
