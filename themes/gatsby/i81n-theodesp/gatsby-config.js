module.exports = 
{
	siteMetadata: 
	{
		title: `Suru++ Folders`,
    titleTemplate: "Folder colour switcher",
    description: `Suru++ Folders is a bash script that allows changing the color of folders`,
		siteUrl: "https://gusbemacbe.pt",
    author: 
    {
      name: `Gustavo Costa`,
      url: `https://twitter.com/gusbemacbe`,
      email: `gusbemacbe@gmail.com`,
    },
    social: 
    {
      github: `https://github.com/gusbemacbe`,
      twitter: `https://twitter.com/gusbemacbe`,
    },
	},
	plugins: 
	[
		// 🇵🇹 Este plugin precisa estar no primeiro lugar
    // 🇬🇧 This plugin needs to be in the first place.
		`gatsby-plugin-react-helmet`,

		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: 
			{
				siteUrl: `https://gusbemacbe.pt`,
			}
		},

		`gatsby-plugin-catch-links`,

		{
			resolve: `gatsby-plugin-google-fonts`,
			options: 
			{
				fonts: [`Baloo Tamma 2`, `Playfair Display`, `Poppins`, `Roboto`, `Rubik`, `Teko`]
			}
		},

		{
			resolve: `gatsby-plugin-manifest`,
			options: 
			{
				name: `Suru++ Folders`,
				short_name: `Suru++ Folders`,
				start_url: '/suru-plus-folders',
				display: `minimal-ui`,
				icon: `src/assets/images/gatsby-icon.png`,
			}
		},

		`gatsby-plugin-mdx`,
		`gatsby-plugin-netlify`,

		{
      resolve: 'gatsby-plugin-robots-txt',
      options: 
      {
        host: 'https://www.gusbemacbe.pt',
        sitemap: 'https://www.gusbemacbe.pt/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
		},
		
		{
      resolve: `gatsby-plugin-sass`,
      options: 
      {
        cssLoaderOptions: 
        {
          camelCase: false,
        },
        includePaths: ["src/assets/sass/compile.scss"],
      },
		},

		`gatsby-plugin-sharp`,
		`gatsby-plugin-styled-components`,

		{
      resolve: `gatsby-transformer-remark`,
      options: 
      {
        plugins: 
        [
          {
            resolve: `gatsby-remark-images`,
            options: 
            {
              maxWidth: 1280,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: 
            {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
		},
		
		`gatsby-plugin-styled-jsx`,
		`gatsby-transformer-sharp`,
		`gatsby-transformer-json`,

    {
      resolve: `gatsby-source-filesystem`,
      options: 
      {
        path: `${__dirname}/locale`,
        name: `locale`,
      },
		},
		
    {
      resolve: '@wapps/gatsby-plugin-i18next',
			options: 
			{
        availableLngs: ['en', 'pt'],
        fallbackLng: 'pt',
        siteUrl: 'https://www.example.com/',
				i18nextOptions: 
				{
          debug: false,
        },
      },
		},
		
		`theme-ui`,
		
		// 🇵🇹 Estes plugins precisam estar no último lugar
		// 🇬🇧 These plugins need to be in the last place.
		`gatsby-plugin-no-javascript`,
    `gatsby-plugin-offline`
	]
};
