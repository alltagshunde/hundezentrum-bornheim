
const {NODE_ENV, URL: NETLIFY_SITE_URL = 'https://www.hundezentrum-bornheim.de', DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL, CONTEXT: NETLIFY_ENV = NODE_ENV} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
    siteMetadata: {
        siteUrl
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-netlify`,
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: isNetlifyProduction
                ? {
                    policy: [{
                        userAgent: '*'
                    }]
                }
                : {
                    policy: [{
                        userAgent: '*',
                        disallow: ['/']
                    }],
                    sitemap: null,
                    host: null
                }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-82648847-2",
                // Puts tracking script in the head instead of the body
                head: true,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: [],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Source Sans Pro\:300,400,400i,700`
                ]
            }
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/theme/typography.js`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 1600,
                            // Remove the default behavior of adding a link to each
                            // image.
                            linkImagesToOriginal: false,
                        },
                    },

                ]
            },
        },
        `gatsby-plugin-glamor`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-catch-links`
    ],
}
