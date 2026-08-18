/** @type {import('next-sitemap').IConfig} */
const { isExcludedRoute } = require('./src/lib/sitemap/exclusions');

const MANUAL_ADDITIONAL_PATHS = [
  { loc: '/', priority: 1.0, changefreq: 'weekly' },
  { loc: '/skill-finder', priority: 0.9, changefreq: 'weekly' },
  { loc: '/start-here', priority: 0.9, changefreq: 'monthly' },
  { loc: '/tools', priority: 0.9, changefreq: 'weekly' },
  { loc: '/tools/scam-scanner', priority: 0.8, changefreq: 'monthly' },
  { loc: '/tools/prompt-forge', priority: 0.8, changefreq: 'monthly' },
  { loc: '/tools/bio-generator', priority: 0.8, changefreq: 'monthly' },
  { loc: '/earn', priority: 0.8, changefreq: 'monthly' },
  { loc: '/learn', priority: 0.8, changefreq: 'monthly' },
  { loc: '/blog', priority: 0.8, changefreq: 'weekly' },
  { loc: '/platforms', priority: 0.8, changefreq: 'monthly' },
  { loc: '/resources', priority: 0.7, changefreq: 'monthly' },
  { loc: '/guides/8-ways', priority: 0.7, changefreq: 'monthly' },
  { loc: '/guides/worksheet', priority: 0.7, changefreq: 'monthly' },
  { loc: '/guides/scam-checker', priority: 0.7, changefreq: 'monthly' },
  { loc: '/guides/claude-ai', priority: 0.7, changefreq: 'monthly' },
  { loc: '/faq', priority: 0.6, changefreq: 'monthly' },
  { loc: '/about', priority: 0.6, changefreq: 'monthly' },
  { loc: '/contact', priority: 0.6, changefreq: 'monthly' },
  { loc: '/share', priority: 0.5, changefreq: 'monthly' },
  { loc: '/disclaimer', priority: 0.3, changefreq: 'yearly' },
  { loc: '/terms', priority: 0.3, changefreq: 'yearly' },
  { loc: '/privacy', priority: 0.3, changefreq: 'yearly' },
];

module.exports = {
  siteUrl: 'https://www.cyberussell.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  // Drop operational/private/transitional/internal-utility routes (see
  // src/lib/sitemap/exclusions.js for the rules) from the auto-discovered
  // page set before they're written to the sitemap.
  transform: async (config, path) => {
    if (isExcludedRoute(path)) {
      return null;
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // Manually-added paths also go through the same exclusion rules, so a
  // future addition here can't accidentally reintroduce an excluded route.
  additionalPaths: async () => MANUAL_ADDITIONAL_PATHS.filter((entry) => !isExcludedRoute(entry.loc)),
};
