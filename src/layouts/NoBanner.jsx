import index, { query as indexQuery } from './index'

export default (props) => {
    return index({
        ...props,
        noBanner: true
    })
}

//export const query = indexQuery 

export const query = graphql`
  query NoBannerQuery {
    allMarkdownRemark(filter: {fields: {navEntry: {eq: "menu"}}}, sort: { fields: [frontmatter___position], order: ASC }) {
        edges {
          node {
            fields {
              path
            }
            frontmatter {
              title
              name
            }
          }
        }
    }
  }
`