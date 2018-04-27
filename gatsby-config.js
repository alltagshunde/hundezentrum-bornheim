module.exports = {
    siteMetadata: {
        siteUrl: `https://www.hundezentrum-bornheim.de`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
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
        `gatsby-transformer-sharp`
    ],
}
