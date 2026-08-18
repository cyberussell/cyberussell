import { describe, expect, it } from 'vitest';
import { isExcludedRoute } from '../exclusions';

describe('isExcludedRoute', () => {
  it('excludes mission-control and every descendant', () => {
    expect(isExcludedRoute('/mission-control')).toBe(true);
    expect(isExcludedRoute('/mission-control/blueprints')).toBe(true);
    expect(isExcludedRoute('/mission-control/client-intake/new')).toBe(true);
    expect(isExcludedRoute('/mission-control/service-catalog/new')).toBe(true);
    expect(isExcludedRoute('/mission-control/login')).toBe(true);
    expect(isExcludedRoute('/mission-control/settings')).toBe(true);
    expect(isExcludedRoute('/mission-control/subscribers')).toBe(true);
  });

  it('excludes the learner dashboard and design system', () => {
    expect(isExcludedRoute('/learn/dashboard')).toBe(true);
    expect(isExcludedRoute('/design-system')).toBe(true);
  });

  it('excludes assessment, complete, and congratulations routes across every track', () => {
    const suffixRoutes = [
      '/learn/ai-team/assessment',
      '/learn/ai-team/complete',
      '/learn/foundations/assessment',
      '/learn/foundations/complete',
      '/learn/foundations/congratulations',
      '/learn/missions/assessment',
      '/learn/missions/congratulations',
      '/learn/skills/assessment',
      '/learn/skills/congratulations',
      '/learn/think/assessment',
      '/learn/think/complete',
      '/learn/workflows/assessment',
      '/learn/workflows/complete',
    ];

    for (const route of suffixRoutes) {
      expect(isExcludedRoute(route)).toBe(true);
    }
  });

  it('excludes unambiguous internal utility routes wherever the segment appears', () => {
    expect(isExcludedRoute('/admin')).toBe(true);
    expect(isExcludedRoute('/admin/panel')).toBe(true);
    expect(isExcludedRoute('/api-docs/auth')).toBe(true);
    expect(isExcludedRoute('/foo/login')).toBe(true);
    expect(isExcludedRoute('/foo/signup')).toBe(true);
    expect(isExcludedRoute('/checkout')).toBe(true);
    expect(isExcludedRoute('/account')).toBe(true);
    expect(isExcludedRoute('/foo/preview')).toBe(true);
    expect(isExcludedRoute('/test')).toBe(true);
    expect(isExcludedRoute('/staging')).toBe(true);
  });

  it('does not false-positive on legitimate pages that merely contain an excluded word as a substring', () => {
    // Contains "dashboard" but is not the /learn/dashboard route.
    expect(isExcludedRoute('/learn/skills/excel-spreadsheets/building-dashboards-and-reports')).toBe(false);
    // Contains "testing" but no "/test" path segment.
    expect(isExcludedRoute('/learn/skills/website-creation/launching-testing-and-getting-feedback')).toBe(false);
    // Contains "stag" (inside "instagram") but no "/staging" path segment.
    expect(isExcludedRoute('/learn/skills/marketing/facebook-and-instagram-ads')).toBe(false);
  });

  it('preserves legitimate public pages: blog, career blueprints, tools, guides, services, case studies, legal pages', () => {
    const publicRoutes = [
      '/',
      '/blog',
      '/blog/hidden-cost-of-free-tools',
      '/careers',
      '/careers/seo',
      '/careers/virtual-assistant',
      '/tools',
      '/tools/scam-scanner',
      '/guides/8-ways',
      '/services',
      '/services/website-design-development',
      '/portfolio',
      '/portfolio/cyberussell',
      '/learn',
      '/learn/foundations',
      '/learn/foundations/what-ai-actually-is',
      '/terms',
      '/privacy',
      '/disclaimer',
    ];

    for (const route of publicRoutes) {
      expect(isExcludedRoute(route)).toBe(false);
    }
  });

  it('normalizes trailing slashes and missing leading slashes the same way', () => {
    expect(isExcludedRoute('/mission-control/')).toBe(true);
    expect(isExcludedRoute('mission-control')).toBe(true);
    expect(isExcludedRoute('/learn/foundations/what-ai-actually-is/')).toBe(false);
  });
});
