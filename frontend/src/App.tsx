import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/HomePage';
import { PositionsPage } from './pages/PositionsPage';
import { PositionDetailPage } from './pages/PositionDetailPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ReviewDetailPage } from './pages/ReviewDetailPage';
import { DictionaryPage } from './pages/DictionaryPage';
import { DictionaryTermPage } from './pages/DictionaryTermPage';
import { DzireDollsPage } from './pages/DzireDollsPage';
import { StoriesPage } from './pages/StoriesPage';
import { MagazinePage } from './pages/MagazinePage';
import { NewsletterPage } from './pages/NewsletterPage';
import { VipPage } from './pages/VipPage';
import { ContactPage } from './pages/ContactPage';
import { SearchPage } from './pages/SearchPage';

// Detail pages from our extended route set
import { DollProfilePage } from './app/routes/public/DollProfilePage';
import { StoryDetailPage } from './app/routes/public/StoryDetailPage';

// Admin pages
import { AdminLoginPage } from './app/routes/admin/AdminLoginPage';
import { AdminDashboard } from './app/routes/admin/AdminDashboard';
import { AdminSiteStats } from './app/routes/admin/AdminSiteStats';
import { AdminAnalytics } from './app/routes/admin/AdminAnalytics';
import { AdminSeoReports } from './app/routes/admin/AdminSeoReports';
import { AdminKeywords } from './app/routes/admin/AdminKeywords';
import { AdminNewsletter } from './app/routes/admin/AdminNewsletter';
import { AdminMembership } from './app/routes/admin/AdminMembership';
import { AdminGeoStats } from './app/routes/admin/AdminGeoStats';
import { AdminAgeStats } from './app/routes/admin/AdminAgeStats';
import { AdminSearchRankings } from './app/routes/admin/AdminSearchRankings';
import { AdminSchedule } from './app/routes/admin/AdminSchedule';
import { AdminPostContent } from './app/routes/admin/AdminPostContent';
import { AdminPostTemplates } from './app/routes/admin/AdminPostTemplates';
import { AdminMonetization } from './app/routes/admin/AdminMonetization';
import { AdminDolls } from './app/routes/admin/AdminDolls';
import { AdminSettings } from './app/routes/admin/AdminSettings';

// Wrappers to bridge react-router-dom useParams with slug-prop components
function DollProfileWrapper() {
  const { slug = '' } = useParams<{ slug: string }>();
  return <DollProfilePage slug={slug} />;
}

function StoryDetailWrapper() {
  const { slug = '' } = useParams<{ slug: string }>();
  return <StoryDetailPage slug={slug} />;
}

function PublicRoutes() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes wrapped in PublicLayout */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/positions" element={<PositionsPage />} />
          <Route path="/positions/:slug" element={<PositionDetailPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/dictionary/:slug" element={<DictionaryTermPage />} />
          <Route path="/dzire-dolls" element={<DzireDollsPage />} />
          <Route path="/dzire-dolls/:slug" element={<DollProfileWrapper />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:slug" element={<StoryDetailWrapper />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/vip" element={<VipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<div className="p-8 text-center py-20 text-zinc-400">404 — Page Not Found</div>} />
        </Route>

        {/* Admin routes — have their own AdminLayout, no PublicLayout wrapper */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/site-stats" element={<AdminSiteStats />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/seo" element={<AdminSeoReports />} />
        <Route path="/admin/keywords" element={<AdminKeywords />} />
        <Route path="/admin/newsletter" element={<AdminNewsletter />} />
        <Route path="/admin/membership" element={<AdminMembership />} />
        <Route path="/admin/geo" element={<AdminGeoStats />} />
        <Route path="/admin/age-stats" element={<AdminAgeStats />} />
        <Route path="/admin/search-rankings" element={<AdminSearchRankings />} />
        <Route path="/admin/schedule" element={<AdminSchedule />} />
        <Route path="/admin/post-content" element={<AdminPostContent />} />
        <Route path="/admin/post-templates" element={<AdminPostTemplates />} />
        <Route path="/admin/monetization" element={<AdminMonetization />} />
        <Route path="/admin/dolls" element={<AdminDolls />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
