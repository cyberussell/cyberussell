/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.cyberussell.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/platforms', priority: 0.8, changefreq: 'monthly' },
    { loc: '/about', priority: 0.7, changefreq: 'monthly' },
    { loc: '/privacy', priority: 0.3, changefreq: 'yearly' },
    { loc: '/contact', priority: 0.6, changefreq: 'monthly' },
  ],
};
