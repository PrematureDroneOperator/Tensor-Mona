"use client";
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Zap, Shield, Activity, MapPin, Terminal, Waves, Mountain } from 'lucide-react';

type DataItem = {
  id ?: number;
  x ?: string;
  y ?: string;
  z ?: string;
  risk ?: string;
};

const [data, setData] = useState<DataItem[]>([]);
const MainPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [consoleData, setConsoleData] = useState<DataItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsLoaded(true);
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate console data updates
    const consoleInterval = setInterval(() => {
      const riskZones = [
        { id: Math.random(), x: (Math.random() * 200 - 100).toFixed(2), y: (Math.random() * 200 - 100).toFixed(2), z: (Math.random() * 50).toFixed(2), risk: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MEDIUM' : 'LOW' },
      ];
      
      setConsoleData(prev => {
        const updated = [...prev, ...riskZones].slice(-8); // Keep last 8 entries
        return updated;
      });
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(consoleInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <header className={`relative z-10 border-b border-white/10 backdrop-blur-md bg-black/20 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Mountain className="h-8 w-8 text-emerald-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  MONA
                </h1>
                <p className="text-xs text-gray-400">Mine Operations Network Assistant</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Safety</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Monitoring</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Alerts</span>
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <div className="text-emerald-400 font-mono">{formatTime(currentTime)}</div>
                <div className="text-xs text-gray-400">System Active</div>
              </div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Status Bar */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm">Pre-Warning System: <span className="text-emerald-400">ACTIVE</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Waves className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Digital Twin: <span className="text-emerald-400">CONNECTED</span></span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">Risk Zones Detected: <span className="text-red-400 font-bold">{consoleData.filter(d => d.risk === 'HIGH').length}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Digital Twin Viewer */}
          <div className={`xl:col-span-2 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center space-x-2">
                    <Mountain className="h-5 w-5 text-emerald-400" />
                    <span>Mine Digital Twin</span>
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>Live View</span>
                  </div>
                </div>
              </div>
              
              {/* Three.js Container */}
              <div className="h-96 bg-gradient-to-br from-gray-900 to-black relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Placeholder for Three.js content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin mx-auto"></div>
                      <Mountain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-emerald-400" />
                    </div>
                    <p className="text-gray-400">Loading Mine Digital Twin...</p>
                    <p className="text-sm text-gray-500">Three.js module will be integrated here</p>
                  </div>
                </div>

                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-black/70 transition-colors">
                    <Zap className="h-4 w-4 text-emerald-400" />
                  </button>
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-black/70 transition-colors">
                    <Activity className="h-4 w-4 text-blue-400" />
                  </button>
                </div>

                {/* Coordinate Display */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Current View</div>
                  <div className="font-mono text-sm">
                    <div>X: {(Math.random() * 200 - 100).toFixed(2)}</div>
                    <div>Y: {(Math.random() * 200 - 100).toFixed(2)}</div>
                    <div>Z: {(Math.random() * 50).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 h-fit">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-blue-400" />
                  <span>Risk Zone Console</span>
                </h2>
              </div>
              
              <div className="p-4">
                <div className="bg-black/50 rounded-xl p-4 font-mono text-sm h-80 overflow-y-auto">
                  <div className="text-emerald-400 mb-2">[MONA SYSTEM INITIALIZED]</div>
                  <div className="text-gray-400 mb-4">Monitoring risk zones...</div>
                  
                  {consoleData.length === 0 ? (
                    <div className="text-gray-500">Awaiting data...</div>
                  ) : (
                    consoleData.map((data) => (
                      <div key={data.id} className="mb-2 animate-fadeIn">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3 text-yellow-400" />
                          <span className="text-gray-300">
                            [{formatTime(new Date())}]
                          </span>
                        </div>
                        <div className="ml-5 text-xs">
                          <span className="text-blue-400">COORDS:</span> 
                          <span className="text-white"> X:{data.x} Y:{data.y} Z:{data.z}</span>
                        </div>
                        <div className="ml-5 text-xs">
                          <span className="text-yellow-400">RISK:</span>
                          <span className={`ml-1 px-2 py-1 rounded text-xs font-bold ${
                            data.risk === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                            data.risk === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {data.risk}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="mt-4 flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Auto-updating coordinates from Three.js module</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 mt-16 border-t border-white/10 backdrop-blur-md bg-black/20 transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Mountain className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-bold">MONA</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Advanced mine operations network assistant providing real-time monitoring, 
                risk assessment, and predictive analytics for safer mining operations.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-emerald-400">
                  <Shield className="h-4 w-4" />
                  <span>Safety First</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-400">
                  <Activity className="h-4 w-4" />
                  <span>24/7 Monitoring</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">System Status</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Digital Twin: Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Sensors: Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Alert System: Standby</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Safety Protocols</a>
                <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Emergency Contacts</a>
                <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">System Logs</a>
                <a href="#" className="block text-gray-400 hover:text-emerald-400 transition-colors">Documentation</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-6 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2025 MONA - Mine Operations Network Assistant. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>System Uptime:</span>
              <span className="text-emerald-400 font-mono">99.98%</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MainPage;