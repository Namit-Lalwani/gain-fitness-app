import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Activity, Target, TrendingUp, Shield, Check } from 'lucide-react';

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4b1e63] via-[#2d1549] to-[#1a032a]">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-['SF_Pro_Rounded',sans-serif]">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">GAIN</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['SF_Pro_Rounded',sans-serif]">
            Powered by Four Intelligent Engines
          </h2>
          <p className="text-xl lg:text-2xl text-purple-200 mb-12 font-['SF_Pro_Rounded',sans-serif]">
            Advanced algorithms working together to optimize your fitness journey
          </p>
        </div>
      </section>

      {/* Four Engines */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Progressive Overload */}
          <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
                Progressive Overload
              </h3>
            </div>
            <p className="text-purple-200 mb-4 font-['SF_Pro_Rounded',sans-serif]">
              Smart weight progression based on your performance
            </p>
            <ul className="space-y-2 text-purple-300">
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm">Adaptive increments, stall detection, deload planning</span>
              </li>
            </ul>
          </div>

          {/* Recovery & Fatigue */}
          <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
                Recovery & Fatigue
              </h3>
            </div>
            <p className="text-purple-200 mb-4 font-['SF_Pro_Rounded',sans-serif]">
              Know when to push and when to rest
            </p>
            <ul className="space-y-2 text-purple-300">
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm">Weekly fatigue metrics, sleep/steps integration</span>
              </li>
            </ul>
          </div>

          {/* Workout Planning */}
          <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
                Workout Planning
              </h3>
            </div>
            <p className="text-purple-200 mb-4 font-['SF_Pro_Rounded',sans-serif]">
              AI-powered session suggestions
            </p>
            <ul className="space-y-2 text-purple-300">
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm">Recency-weighted planning, readiness scoring</span>
              </li>
            </ul>
          </div>

          {/* Body Profile */}
          <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
                Body Profile
              </h3>
            </div>
            <p className="text-purple-200 mb-4 font-['SF_Pro_Rounded',sans-serif]">
              Track weight, BMI, and body trends
            </p>
            <ul className="space-y-2 text-purple-300">
              <li className="flex items-start">
                <Check className="w-4 h-4 mr-2 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-sm">Visual charts, goal tracking, historical insights</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12 font-['SF_Pro_Rounded',sans-serif]">
            More Features
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-800/50 to-fuchsia-800/50 rounded-xl p-6 border border-purple-500/30">
                <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                  Daily Logging
                </h4>
                <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                  Smart Daily Logging methods
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-800/50 to-fuchsia-800/50 rounded-xl p-6 border border-purple-500/30">
                <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                  Exercise Selection
                </h4>
                <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                  200+ scientifically proven exercises
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-800/50 to-fuchsia-800/50 rounded-xl p-6 border border-purple-500/30">
                <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                  HealthKit Integration
                </h4>
                <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                  Real recovery data, real decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GAIN */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12 font-['SF_Pro_Rounded',sans-serif]">
            Why Choose GAIN?
          </h3>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                1. Built on logic, not motivation
              </h4>
              <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                GAIN uses an intelligent progressive overload system that adapts based on RPE, RIR, rep quality, and recent session history. It detects stalls before they turn into plateaus and recommends deloads when fatigue accumulates.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                2. Recovery treated as data
              </h4>
              <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                GAIN makes recovery central to decision-making. It calculates a weekly fatigue index using real training volume trends, then layers in sleep and daily activity data to assess readiness before each session.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                3. Intelligence that adapts
              </h4>
              <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                Session readiness scoring combines multiple data points before you lift, while workout intelligence analyzes performance with a strong recency bias. Your program evolves naturally.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                4. Precision where it matters
              </h4>
              <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                Every set can be logged with RPE or RIR, heart rate at completion, and side-specific tracking for unilateral work. This level of granularity turns workouts into usable data.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-white mb-3 font-['SF_Pro_Rounded',sans-serif]">
                5. Privacy and long-term trust
              </h4>
              <p className="text-purple-300 font-['SF_Pro_Rounded',sans-serif]">
                Everything works fully offline, with no forced cloud sync, no ads, and no social feeds. Your data stays on your device and can be exported at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6 font-['SF_Pro_Rounded',sans-serif]">
            Ready to Start Your Fitness Journey?
          </h3>
          <p className="text-xl text-purple-200 mb-8 font-['SF_Pro_Rounded',sans-serif]">
            Join thousands of athletes who trust GAIN to reach their fitness goals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/preorder')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 font-['SF_Pro_Rounded',sans-serif]"
            >
              Join the Waitlist
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-['SF_Pro_Rounded',sans-serif]"
            >
              Sign Up Early
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
