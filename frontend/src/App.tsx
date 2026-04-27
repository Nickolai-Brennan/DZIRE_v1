import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <PublicLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/positions" element={<PositionsPage />} />
          <Route path="/positions/:slug" element={<PositionDetailPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/dictionary/:slug" element={<DictionaryTermPage />} />
          <Route path="/dzire-dolls" element={<DzireDollsPage />} />
          <Route path="/dzire-dolls/:slug" element={<div className="p-8 text-center text-textMuted py-20">Doll Profile — Coming Soon</div>} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:slug" element={<div className="p-8 text-center text-textMuted py-20">Story Detail — Coming Soon</div>} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/vip" element={<VipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin/login" element={<div className="p-8 text-center text-textMuted py-20">Admin Login — Coming Soon</div>} />
          <Route path="*" element={<div className="p-8 text-center text-textMuted py-20">404 — Page Not Found</div>} />
        </Routes>
      </PublicLayout>
    </Router>
  );
}

export default App;
