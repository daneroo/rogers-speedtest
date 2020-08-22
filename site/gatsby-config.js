module.exports = {
  siteMetadata: {
    title: 'Rogers Speedtest',
    name: 'Rogers SpeedTest',
    siteUrl: 'https://rogers-speedtest.v.imetrical.com/',
    description: 'Rogers SpeedTest',
    social: [
      {
        name: 'github',
        url: 'https://github.com/daneroo'
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/daneroo'
      }
    ],
    sidebarConfig: {
      // forcedNavOrder: ['/gql', '/react', '/styling'],
      // ignoreIndex: true
    }
  },
  plugins: [{ resolve: 'gatsby-theme-document' }]
}
