import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Mail, Phone, Download, Trash2 } from 'lucide-react';

interface PreorderData {
  name: string;
  email: string;
  phone: string;
  timestamp: string;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [signups, setSignups] = useState<PreorderData[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadSignups();
    }
  }, [isAuthenticated]);

  const loadSignups = () => {
    const allSignups: PreorderData[] = [];
    
    // Get all localStorage keys that might contain preorder data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('preorder')) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
              // If it's an array of signups
              parsed.forEach(signup => {
                allSignups.push({
                  name: signup.name || '',
                  email: signup.email || '',
                  phone: signup.phone || '',
                  timestamp: signup.timestamp || new Date().toISOString()
                });
              });
            } else {
              // If it's a single signup
              allSignups.push({
                name: parsed.name || '',
                email: parsed.email || '',
                phone: parsed.phone || '',
                timestamp: parsed.timestamp || new Date().toISOString()
              });
            }
          } catch (e) {
            console.error('Error parsing data:', e);
          }
        }
      }
    }
    
    // Remove duplicates based on email
    const uniqueSignups = allSignups.filter((signup, index, self) =>
      index === self.findIndex((s) => s.email === signup.email)
    );
    
    setSignups(uniqueSignups);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this signup?')) {
      const newSignups = signups.filter((_, i) => i !== index);
      setSignups(newSignups);
      // Update localStorage
      localStorage.setItem('gain_preorder', JSON.stringify(newSignups[newSignups.length - 1] || {}));
    }
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Timestamp'],
      ...signups.map(signup => [
        signup.name,
        signup.email,
        signup.phone,
        signup.timestamp
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gain_signups_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#4b1e63] via-[#2d1549] to-[#1a032a] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-purple-900/90 to-fuchsia-900/90 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center font-['SF_Pro_Rounded',sans-serif]">
              Admin Access
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-purple-800/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-purple-300 text-sm text-center mt-4">
              Default password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-purple-300 text-sm">Total Signups</p>
                  <p className="text-3xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">{signups.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-purple-300 text-sm">Today's Signups</p>
                  <p className="text-3xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
                    {signups.filter(s => s.timestamp.includes(new Date().toISOString().split('T')[0])).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center">
                <Phone className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-purple-300 text-sm">This Week</p>
                  <p className="text-3xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
                    {signups.length} {/* You can implement week calculation */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white font-['SF_Pro_Rounded',sans-serif]">
              All Signups ({signups.length})
            </h2>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>

          {/* Signups Table */}
          <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 rounded-xl border border-purple-500/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-800/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-purple-200 font-medium">Name</th>
                    <th className="px-6 py-4 text-left text-purple-200 font-medium">Email</th>
                    <th className="px-6 py-4 text-left text-purple-200 font-medium">Phone</th>
                    <th className="px-6 py-4 text-left text-purple-200 font-medium">Timestamp</th>
                    <th className="px-6 py-4 text-left text-purple-200 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-purple-300">
                        No signups yet
                      </td>
                    </tr>
                  ) : (
                    signups.map((signup, index) => (
                      <tr key={index} className="border-t border-purple-700/30 hover:bg-purple-800/20 transition-colors">
                        <td className="px-6 py-4 text-white">{signup.name}</td>
                        <td className="px-6 py-4 text-purple-300">{signup.email}</td>
                        <td className="px-6 py-4 text-purple-300">{signup.phone}</td>
                        <td className="px-6 py-4 text-purple-300">
                          {new Date(signup.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
