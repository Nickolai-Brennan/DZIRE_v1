import { createRouter, createRoute, createRootRoute, Outlet, Navigate } from '@tanstack/react-router';
import { HomePage } from './routes/public/HomePage';
import { PositionsPage } from './routes/public/PositionsPage';
import { PositionDetailPage } from './routes/public/PositionDetailPage';
import { ReviewsPage } from './routes/public/ReviewsPage';
import { ReviewDetailPage } from './routes/public/ReviewDetailPage';
import { DictionaryPage } from './routes/public/DictionaryPage';
import { DictionaryDetailPage } from './routes/public/DictionaryDetailPage';
import { DollsPage } from './routes/public/DollsPage';
import { DollProfilePage } from './routes/public/DollProfilePage';
import { StoriesPage } from './routes/public/StoriesPage';
import { StoryDetailPage } from './routes/public/StoryDetailPage';
import { MagazinePage } from './routes/public/MagazinePage';
import { NewsletterPage } from './routes/public/NewsletterPage';
import { VipPage } from './routes/public/VipPage';
import { ContactPage } from './routes/public/ContactPage';
import { SearchPage } from './routes/public/SearchPage';
import { AdminLoginPage } from './routes/admin/AdminLoginPage';
import { AdminDashboard } from './routes/admin/AdminDashboard';
import { AdminSiteStats } from './routes/admin/AdminSiteStats';
import { AdminAnalytics } from './routes/admin/AdminAnalytics';
import { AdminSeoReports } from './routes/admin/AdminSeoReports';
import { AdminKeywords } from './routes/admin/AdminKeywords';
import { AdminNewsletter } from './routes/admin/AdminNewsletter';
import { AdminMembership } from './routes/admin/AdminMembership';
import { AdminGeoStats } from './routes/admin/AdminGeoStats';
import { AdminAgeStats } from './routes/admin/AdminAgeStats';
import { AdminSearchRankings } from './routes/admin/AdminSearchRankings';
import { AdminSchedule } from './routes/admin/AdminSchedule';
import { AdminPostContent } from './routes/admin/AdminPostContent';
import { AdminPostTemplates } from './routes/admin/AdminPostTemplates';
import { AdminMonetization } from './routes/admin/AdminMonetization';
import { AdminDolls } from './routes/admin/AdminDolls';
import { AdminSettings } from './routes/admin/AdminSettings';

const rootRoute = createRootRoute({ component: () => <Outlet /> });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const positionsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/positions', component: PositionsPage });
const positionDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/positions/$slug', component: () => { const { slug } = positionDetailRoute.useParams(); return <PositionDetailPage slug={slug}/>; } });
const reviewsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/reviews', component: ReviewsPage });
const reviewDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/reviews/$slug', component: () => { const { slug } = reviewDetailRoute.useParams(); return <ReviewDetailPage slug={slug}/>; } });
const dictionaryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dictionary', component: DictionaryPage });
const dictionaryDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dictionary/$slug', component: () => { const { slug } = dictionaryDetailRoute.useParams(); return <DictionaryDetailPage slug={slug}/>; } });
const dollsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dzire-dolls', component: DollsPage });
const dollProfileRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dzire-dolls/$slug', component: () => { const { slug } = dollProfileRoute.useParams(); return <DollProfilePage slug={slug}/>; } });
const storiesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/stories', component: StoriesPage });
const storyDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/stories/$slug', component: () => { const { slug } = storyDetailRoute.useParams(); return <StoryDetailPage slug={slug}/>; } });
const magazineRoute = createRoute({ getParentRoute: () => rootRoute, path: '/magazine', component: MagazinePage });
const newsletterRoute = createRoute({ getParentRoute: () => rootRoute, path: '/newsletter', component: NewsletterPage });
const vipRoute = createRoute({ getParentRoute: () => rootRoute, path: '/vip', component: VipPage });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage });
const searchRoute = createRoute({ getParentRoute: () => rootRoute, path: '/search', component: SearchPage });
const adminRootRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: () => <Navigate to="/admin/login" /> });
const adminLoginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/login', component: AdminLoginPage });
const adminDashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/dashboard', component: AdminDashboard });
const adminSiteStatsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/site-stats', component: AdminSiteStats });
const adminAnalyticsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/analytics', component: AdminAnalytics });
const adminSeoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/seo-reports', component: AdminSeoReports });
const adminKeywordsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/keyword-tags', component: AdminKeywords });
const adminNewsletterRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/newsletter-users', component: AdminNewsletter });
const adminMembershipRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/membership-stats', component: AdminMembership });
const adminGeoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/geographic-stats', component: AdminGeoStats });
const adminAgeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/age-range-stats', component: AdminAgeStats });
const adminSearchRankRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/search-rankings', component: AdminSearchRankings });
const adminScheduleRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/schedule', component: AdminSchedule });
const adminPostContentRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/post-content', component: AdminPostContent });
const adminPostTemplatesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/post-templates', component: AdminPostTemplates });
const adminMonetizationRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/monetization', component: AdminMonetization });
const adminDollsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/dzire-dolls', component: AdminDolls });
const adminSettingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin/settings', component: AdminSettings });

const routeTree = rootRoute.addChildren([
  indexRoute, positionsRoute, positionDetailRoute, reviewsRoute, reviewDetailRoute,
  dictionaryRoute, dictionaryDetailRoute, dollsRoute, dollProfileRoute,
  storiesRoute, storyDetailRoute, magazineRoute, newsletterRoute, vipRoute, contactRoute, searchRoute,
  adminRootRoute, adminLoginRoute, adminDashboardRoute, adminSiteStatsRoute, adminAnalyticsRoute,
  adminSeoRoute, adminKeywordsRoute, adminNewsletterRoute, adminMembershipRoute, adminGeoRoute,
  adminAgeRoute, adminSearchRankRoute, adminScheduleRoute, adminPostContentRoute, adminPostTemplatesRoute,
  adminMonetizationRoute, adminDollsRoute, adminSettingsRoute,
]);

export const router = createRouter({ routeTree, defaultPreload: 'intent' });
declare module '@tanstack/react-router' { interface Register { router: typeof router } }
