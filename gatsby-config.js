module.exports = {
    siteMetadata: {
        title: `Pandas Eating Lots`,
        routes: [
            {
                path: '/',
                label: 'Home'
            },
            {
                path: '#news',
                label: 'Aktuelles'
            },
            {
                path: '#about',
                label: 'Über uns'
            },
            {
                path: '/kurse/',
                label: 'Angebot'
            },
            {
                path: '/team/',
                label: 'Team'
            },
            {
                path: '/kontakt/',
                label: 'Kontakt'
            },
            {
                path: '#partner',
                label: 'Partner'
            },
        ]
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
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
