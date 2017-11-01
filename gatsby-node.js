const path = require(`path`)
const fs = require(`fs`)
const {createFilePath} = require(`gatsby-source-filesystem`)
const _ = require('lodash');

exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
    const {createNodeField} = boundActionCreators

    if (node.internal.type === `File`) {
        if (node.relativePath.indexOf('content') === 0) {
            const itemType = path.basename(path.dirname(node.relativePath))
            const basePath = itemType === 'pages' ? 'content/pages' : 'content'
            let slug = createFilePath({
                node,
                getNode,
                basePath: basePath
            })
            slug = slug.replace('/courses/', '/services/')

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
        }
    } else if (node.internal.type === `MarkdownRemark`) {
        const fileNode = getNode(node.parent)
        if (fileNode.fields && fileNode.fields.itemType) {
            const slug = node.frontmatter.path && node.frontmatter.path.length ? node.frontmatter.path : fileNode.fields.slug;

            createNodeField({
                node,
                name: `itemType`,
                value: fileNode.fields.itemType,
            })
            createNodeField({
                node,
                name: `path`,
                value: slug,
            })
            console.log(fileNode.fields.itemType, slug)
        }
    }
}

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators
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
            result.data.allMarkdownRemark.edges.map(({node}) => {
                if (node.fields.itemType === 'pages') {
                    let component = path.resolve(`./src/templates/${_.startCase(node.frontmatter.name)}.jsx`)
                    if (!fs.existsSync(component)) {
                        component = path.resolve(`./src/templates/Page.jsx`)
                    }

                    createPage({
                        path: node.fields.path,
                        component: component,
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            path: node.fields.path,
                        },
                        layout: node.fields.path === '/' ? 'index' : 'NoBanner'
                    })

                    console.log(node, component)
                } else if (node.fields.itemType === 'courses') {
                    const slug = node.fields.path.replace('courses', 'services')
                    createPage({
                        path: node.fields.path,
                        component: path.resolve(`./src/templates/ServiceItem.jsx`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            path: node.fields.path,
                        },
                        layout: 'NoBanner'
                    })

                    console.log(node, slug)
                }
            })
            resolve()
        })
    })
}