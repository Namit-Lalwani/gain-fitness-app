import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Mail, Calendar, Users } from 'lucide-react';

export default function PreorderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4b1e63] via-[#2d1549] to-[#1a032a] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-purple-900/90 to-fuchsia-900/90 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-xl text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="w-10 h-10 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-white mb-4 font-['SF_Pro_Rounded',sans-serif]">
            You're In!
          </h1>
          <p className="text-purple-200 text-lg mb-8 font-['SF_Pro_Rounded',sans-serif]">
            Thank you for joining the GAIN preorder list. You'll be among the first to experience the future of fitness tracking.
          </p>

          {/* Benefits */}
          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center text-purple-300">
              <Check className="w-5 h-5 mr-3 text-green-400" />
              <span className="text-sm">Early access when we launch</span>
            </div>
            <div className="flex items-center text-purple-300">
              <Check className="w-5 h-5 mr-3 text-green-400" />
              <span className="text-sm">Exclusive launch updates</span>
            </div>
            <div className="flex items-center text-purple-300">
              <Check className="w-5 h-5 mr-3 text-green-400" />
              <span className="text-sm">Priority customer support</span>
            </div>
            <div className="flex items-center text-purple-300">
              <Check className="w-5 h-5 mr-3 text-green-400" />
              <span className="text-sm">Special preorder bonuses</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-purple-300 text-sm">Early Adopters</div>
            </div>
            <div className="text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Q2 2026</div>
              <div className="text-purple-300 text-sm">Expected Launch</div>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-purple-300 text-sm">Satisfaction</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 font-['SF_Pro_Rounded',sans-serif]"
            >
              Back to Home
            </button>
            
            <div className="text-purple-300 text-sm">
              Check your email for confirmation and next steps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
