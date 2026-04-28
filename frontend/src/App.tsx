import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { HomePage } from "./pages/HomePage";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { CategoryPage } from "./pages/CategoryPage";
import { SponsorPage } from "./pages/SponsorPage";
import { AffiliatePage } from "./pages/AffiliatePage";
import { VIPSubscribePage } from "./pages/VIPSubscribePage";
import { ContentManager } from "./admin/ContentManager";
import { PostEditor } from "./admin/PostEditor";
import { SEOReports } from "./admin/SEOReports";
import { KeywordTagReports } from "./admin/KeywordTagReports";
import { MarketingDashboard } from "./admin/MarketingDashboard";
import { AdvertisingDashboard } from "./admin/AdvertisingDashboard";
import { TrafficAnalytics } from "./admin/TrafficAnalytics";
import { SocialMediaStats } from "./admin/SocialMediaStats";
import { AffiliateManager } from "./admin/AffiliateManager";
import { SponsorManager } from "./admin/SponsorManager";
import { NewsletterManager } from "./admin/NewsletterManager";
import { VIPSubscriptionManager } from "./admin/VIPSubscriptionManager";
import { ContentCalendarPage } from "./admin/ContentCalendarPage";
import { SocialSchedulerPage } from "./admin/SocialSchedulerPage";
import { CampaignsPage } from "./admin/CampaignsPage";
import { PublishingQueuePage } from "./admin/PublishingQueuePage";
import { SocialIntegrationsPage } from "./admin/SocialIntegrationsPage";
import { SocialMetricsPage } from "./admin/SocialMetricsPage";
import { SocialSizeChartPage } from "./admin/SocialSizeChartPage";
import { PositionsPage } from "./pages/PositionsPage";
import { PositionDetailPage } from "./pages/PositionDetailPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ReviewDetailPage } from "./pages/ReviewDetailPage";
import { DictionaryPage } from "./pages/DictionaryPage";
import { DictionaryTermPage } from "./pages/DictionaryTermPage";
import { DzireDollsPage } from "./pages/DzireDollsPage";
import { DollProfilePage } from "./pages/DollProfilePage";
import { StoriesPage } from "./pages/StoriesPage";
import { StoryDetailPage } from "./pages/StoryDetailPage";
import { MagazinePage } from "./pages/MagazinePage";
import { NewsletterPage } from "./pages/NewsletterPage";
import { VipPage } from "./pages/VipPage";
import { ContactPage } from "./pages/ContactPage";
import { SearchPage } from "./pages/SearchPage";
import { ExplorePage } from "./pages/ExplorePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { QuizPage } from "./pages/QuizPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PlaylistsPage } from "./pages/PlaylistsPage";
import { PlaylistDetailPage } from "./pages/PlaylistDetailPage";
import { TagResultsPage } from "./pages/TagResultsPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { PlaylistProvider } from "./context/PlaylistContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ChatbotWidget } from "./components/chatbot/ChatbotWidget";
// Step 7 auth pages
import { ForgotPasswordPage } from "./auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./auth/ResetPasswordPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
// Step 8 payment pages
import { SubscriptionPage } from "./payments/SubscriptionPage";
import { BillingPage } from "./payments/BillingPage";
import { CheckoutPage } from "./payments/CheckoutPage";

function App() {
  return (
    <AuthProvider>
      <PlaylistProvider>
        <FavoritesProvider>
          <Router>
            <Routes>
              {/* Admin routes — rendered outside PublicLayout (no header/footer/adminbutton) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/content" element={<ContentManager />} />
              <Route path="/admin/editor" element={<PostEditor />} />
              <Route path="/admin/seo" element={<SEOReports />} />
              <Route path="/admin/keywords" element={<KeywordTagReports />} />
              <Route path="/admin/analytics" element={<TrafficAnalytics />} />
              <Route path="/admin/marketing" element={<MarketingDashboard />} />
              <Route
                path="/admin/advertising"
                element={<AdvertisingDashboard />}
              />
              <Route path="/admin/social" element={<SocialMediaStats />} />
              <Route path="/admin/affiliates" element={<AffiliateManager />} />
              <Route path="/admin/sponsors" element={<SponsorManager />} />
              <Route path="/admin/newsletter" element={<NewsletterManager />} />
              <Route path="/admin/vip" element={<VIPSubscriptionManager />} />
              <Route
                path="/admin/content-calendar"
                element={<ContentCalendarPage />}
              />
              <Route
                path="/admin/social-scheduler"
                element={<SocialSchedulerPage />}
              />
              <Route path="/admin/campaigns" element={<CampaignsPage />} />
              <Route
                path="/admin/publishing-queue"
                element={<PublishingQueuePage />}
              />
              <Route
                path="/admin/social-integrations"
                element={<SocialIntegrationsPage />}
              />
              <Route
                path="/admin/social-metrics"
                element={<SocialMetricsPage />}
              />
              <Route
                path="/admin/social-size-chart"
                element={<SocialSizeChartPage />}
              />

              {/* Public routes */}
              <Route
                path="*"
                element={
                  <PublicLayout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/blog" element={<BlogIndexPage />} />
                      <Route path="/blog/:slug" element={<BlogPostPage />} />
                      <Route
                        path="/category/:slug"
                        element={<CategoryPage />}
                      />
                      <Route path="/sponsors" element={<SponsorPage />} />
                      <Route path="/affiliates" element={<AffiliatePage />} />
                      <Route
                        path="/vip-subscribe"
                        element={<VIPSubscribePage />}
                      />
                      <Route path="/positions" element={<PositionsPage />} />
                      <Route
                        path="/positions/:slug"
                        element={<PositionDetailPage />}
                      />
                      <Route path="/reviews" element={<ReviewsPage />} />
                      <Route
                        path="/reviews/:slug"
                        element={<ReviewDetailPage />}
                      />
                      <Route path="/dictionary" element={<DictionaryPage />} />
                      <Route
                        path="/dictionary/:slug"
                        element={<DictionaryTermPage />}
                      />
                      <Route path="/dzire-dolls" element={<DzireDollsPage />} />
                      <Route
                        path="/dzire-dolls/:slug"
                        element={<DollProfilePage />}
                      />
                      <Route path="/stories" element={<StoriesPage />} />
                      <Route
                        path="/stories/:slug"
                        element={<StoryDetailPage />}
                      />
                      <Route path="/magazine" element={<MagazinePage />} />
                      <Route path="/newsletter" element={<NewsletterPage />} />
                      <Route path="/vip" element={<VipPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/explore" element={<ExplorePage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                      />
                      <Route
                        path="/reset-password"
                        element={<ResetPasswordPage />}
                      />
                      <Route path="/onboarding" element={<OnboardingPage />} />
                      <Route path="/quiz" element={<QuizPage />} />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <ProfilePage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/playlists" element={<PlaylistsPage />} />
                      <Route
                        path="/playlists/:id"
                        element={<PlaylistDetailPage />}
                      />
                      <Route path="/tags/:tag" element={<TagResultsPage />} />
                      {/* Step 8 payment routes */}
                      <Route path="/subscribe" element={<SubscriptionPage />} />
                      <Route
                        path="/billing"
                        element={
                          <ProtectedRoute>
                            <BillingPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route
                        path="*"
                        element={
                          <div className="p-8 text-center text-textMuted py-20">
                            404 — Page Not Found
                          </div>
                        }
                      />
                    </Routes>
                    <ChatbotWidget />
                  </PublicLayout>
                }
              />
            </Routes>
          </Router>
        </FavoritesProvider>
      </PlaylistProvider>
    </AuthProvider>
  );
}

export default App;
