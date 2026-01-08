import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/AuthModal';
import SignupPage from './SignupPage';
import PreorderPage from './PreorderPage';
import PreorderSuccessPage from './PreorderSuccessPage';
import FeaturesPage from './FeaturesPage';
import AdminPage from './AdminPage';

function HomePage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-[#4b1e63] via-[#2d1549] to-[#1a032a] min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-fuchsia-900/20 to-transparent animate-pulse opacity-50" style={{ animationDuration: '8s' }}></div>
        
        {/* GAIN Title with Enhanced Blur Effect */}
        <div className="relative mb-8 animate-fade-in">
          {/* Multiple blur layers for atmospheric effect */}
          <div className="absolute inset-0 blur-[60px] opacity-80">
            <h1 className="font-['SF_Pro_Rounded',sans-serif] font-black text-[120px] lg:text-[144px] text-[#b388ff] text-center leading-none">
              GAIN
            </h1>
          </div>
          <div className="absolute inset-0 blur-[40px] opacity-60">
            <h1 className="font-['SF_Pro_Rounded',sans-serif] font-black text-[120px] lg:text-[144px] text-[#ff40df] text-center leading-none">
              GAIN
            </h1>
          </div>
          <div className="absolute inset-0 blur-[20px] opacity-40">
            <h1 className="font-['SF_Pro_Rounded',sans-serif] font-black text-[120px] lg:text-[144px] text-[#9d4fff] text-center leading-none">
              GAIN
            </h1>
          </div>
          {/* Main title */}
          <h1 className="relative font-['SF_Pro_Rounded',sans-serif] font-black text-[120px] lg:text-[144px] text-white text-center leading-none">
            GAIN
          </h1>
        </div>

        {/* Tagline with Enhanced Animation */}
        <div className="relative mb-12 animate-slide-up">
          <div className="absolute inset-0 blur-lg opacity-50">
            <p className="font-['SF_Pro_Rounded',sans-serif] font-medium text-[24px] lg:text-[32px] text-[#ff40df] text-center">
              Your Personal Fitness Revolution
            </p>
          </div>
          <p className="relative font-['SF_Pro_Rounded',sans-serif] font-medium text-[24px] lg:text-[32px] text-white text-center">
            Your Personal Fitness Revolution
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-fade-in-up">
          <button 
            onClick={() => navigate('/signup')}
            className="group relative px-12 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff25d3] to-[#8a38f5]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff40df] to-[#9d4fff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative font-['SF_Pro_Rounded',sans-serif] font-medium text-[24px] text-white">
              Start Your Journey
            </span>
          </button>
          <button 
            onClick={() => navigate('/features')}
            className="group relative px-12 py-4 rounded-full overflow-hidden border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/10"
          >
            <span className="relative font-['SF_Pro_Rounded',sans-serif] font-medium text-[24px] text-white">
              Learn More
            </span>
          </button>
          <button 
            onClick={() => navigate('/preorder')}
            className="group relative px-12 py-4 rounded-full overflow-hidden border-2 border-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:bg-purple-500/20"
          >
            <span className="relative font-['SF_Pro_Rounded',sans-serif] font-medium text-[24px] text-purple-300">
              Join Preorder List
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section with Image */}
      <section className="relative py-24 bg-gradient-to-b from-[#0d0410] to-[#1a032a]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-6 animate-slide-in-left">
              <h2 className="text-5xl lg:text-6xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
                Coming Soon
              </h2>
              <p className="text-xl lg:text-2xl text-purple-200 font-['SF_Pro_Rounded',sans-serif]">
                The future of fitness tracking is almost here. Get ready to transform your workout experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/preorder')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full font-['SF_Pro_Rounded',sans-serif] font-medium hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300"
                >
                  Join Waitlist
                </button>
                <button 
                  onClick={() => navigate('/features')}
                  className="px-8 py-3 border-2 border-purple-400 text-purple-300 rounded-full font-['SF_Pro_Rounded',sans-serif] font-medium hover:bg-purple-500/20 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-2xl blur-xl"></div>
              <div className="relative w-full h-64 bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30 rounded-2xl shadow-2xl flex items-center justify-center">
                <span className="text-white/50 text-2xl font-['SF_Pro_Rounded',sans-serif]">App Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/preorder" element={<PreorderPage />} />
        <Route path="/preorder-success" element={<PreorderSuccessPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
