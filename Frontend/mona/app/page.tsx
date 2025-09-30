"use client";
import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Zap,
  Shield,
  Activity,
  MapPin,
  Terminal,
  Waves,
  Mountain,
} from "lucide-react";

type DataItem = {
  id?: number;
  x?: string;
  y?: string;
  z?: string;
  risk?: string;
};

const MainPage = () => {
  const [consoleData, setConsoleData] = useState<DataItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate console data updates
    const consoleInterval = setInterval(() => {
      const riskZones = [
        {
          id: Math.random(),
          x: (Math.random() * 200 - 100).toFixed(2),
          y: (Math.random() * 200 - 100).toFixed(2),
          z: (Math.random() * 50).toFixed(2),
          risk:
            Math.random() > 0.7
              ? "HIGH"
              : Math.random() > 0.4
              ? "MEDIUM"
              : "LOW",
        },
      ];

      setConsoleData((prev) => {
        const updated = [...prev, ...riskZones].slice(-8); // Keep last 8 entries
        return updated;
      });
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(consoleInterval);
    };
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-100 to-sky-300 font-sans text-slate-900 overflow-hidden">
      {/* Blur background lights */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-24 left-24 w-40 h-40 bg-cyan-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-sky-400 rounded-full blur-3xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-32 w-48 h-48 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header
        className={`relative z-20 backdrop-blur-md bg-white/40 border-b border-slate-300 transition-transform duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-3">
            <Mountain className="text-cyan-700 w-8 h-8" />
            <div>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-sky-600">
                MONA
              </h1>
              <p className="text-xs text-cyan-700/80">Mine Operations Network Assistant</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 text-cyan-800 font-medium">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-cyan-600 transition-colors duration-300"
            >
              <Shield className="w-4 h-4" />
              Safety
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-cyan-600 transition-colors duration-300"
            >
              <Activity className="w-4 h-4" />
              Monitoring
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-cyan-600 transition-colors duration-300"
            >
              <Zap className="w-4 h-4" />
              Alerts
            </a>
          </nav>

          <div className="text-right font-mono text-cyan-700">
            <div className="text-lg">{formatTime(currentTime)}</div>
            <div className="text-xs">System Active</div>
            <div className="w-3 h-3 rounded-full bg-cyan-700 mt-1 animate-pulse mx-auto"></div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
        {/* Digital Twin Viewer */}
        <section
          className={`xl:col-span-2 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg border border-cyan-200 transition-transform duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <header className="flex justify-between items-center px-6 py-4 border-b border-cyan-300 text-cyan-700 font-semibold">
            <h2 className="flex items-center space-x-2 text-lg">
              <Mountain className="w-5 h-5" />
              <span>Mine Digital Twin</span>
            </h2>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-cyan-700 rounded-full animate-pulse"></div>
              Live View
            </div>
          </header>

          <div className="relative h-96 bg-gradient-to-tr from-cyan-50 to-cyan-100">
            <iframe
              src="http://localhost:5173/"
              title="Mine Digital Twin"
              className="w-full h-full border-none drop-shadow-md"
            ></iframe>

            <div className="absolute bottom-4 left-4 bg-white bg-opacity-60 backdrop-blur-md rounded-lg p-3 font-mono text-xs text-cyan-700 shadow-md">
              <div>X: {(Math.random() * 200 - 100).toFixed(2)}</div>
              <div>Y: {(Math.random() * 200 - 100).toFixed(2)}</div>
              <div>Z: {(Math.random() * 50).toFixed(2)}</div>
            </div>
          </div>
        </section>

        {/* Console Output */}
        <section
          className={`bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg border border-cyan-200 p-6 font-mono text-cyan-900 text-sm overflow-y-auto max-h-[400px] transition-transform duration-700
           ${
             isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
           }`}
        >
          <header className="flex items-center mb-4 border-b border-cyan-300 pb-2 text-cyan-700 font-semibold">
            <Terminal className="w-5 h-5 mr-2" />
            Risk Zone Console
          </header>

          <div>
            <div className="text-cyan-700 font-semibold mb-2">[MONA SYSTEM INITIALIZED]</div>
            <div className="mb-4 text-cyan-900/70">Monitoring risk zones...</div>

            {consoleData.length === 0 ? (
              <div className="text-cyan-300">Awaiting data...</div>
            ) : (
              consoleData.map((data) => (
                <div key={data.id} className="mb-3 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-cyan-700">
                    <MapPin className="w-4 h-4" />
                    <span>[{formatTime(new Date())}]</span>
                  </div>
                  <div className="ml-6 text-xs">
                    <span className="text-cyan-900 font-semibold">COORDS:</span>{" "}
                    <span>
                      X:{data.x} Y:{data.y} Z:{data.z}
                    </span>
                  </div>
                  <div className="ml-6 text-xs">
                    <span className="text-yellow-700 font-semibold">RISK:</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded font-bold text-xs ${
                        data.risk === "HIGH"
                          ? "bg-red-100 text-red-700"
                          : data.risk === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {data.risk}
                    </span>
                  </div>
                </div>
              ))
            )}

            <div className="flex gap-2 mt-3 text-xs text-cyan-700 items-center">
              <div className="w-2 h-2 bg-cyan-700 rounded-full animate-pulse"></div>
              Auto-updating coordinates from Three.js module
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`relative mt-16 border-t border-cyan-200 backdrop-blur-md bg-white bg-opacity-40 transition-transform duration-700 pt-8 pb-12 px-6 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-6 h-6 text-cyan-700" />
            <h3 className="font-semibold text-xl text-cyan-800">MONA</h3>
          </div>
          <p className="text-cyan-900/70 max-w-md leading-relaxed">
            Advanced mine operations network assistant providing real-time monitoring, risk
            assessment, and predictive analytics for safer mining operations.
          </p>
          <div className="flex gap-8 mt-6">
            <div className="flex items-center gap-2 text-cyan-700">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Safety First</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-900">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">24/7 Monitoring</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-cyan-800 font-semibold mb-3 border-b border-cyan-300 pb-2">System Status</h4>
          <div className="flex flex-col gap-2 text-cyan-900/70 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-700 rounded-full"></div>
              Digital Twin: Online
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-700 rounded-full"></div>
              Sensors: Active
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              Alert System: Standby
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-cyan-800 font-semibold mb-3 border-b border-cyan-300 pb-2">Quick Links</h4>
          <nav className="flex flex-col gap-1.5 text-cyan-900 text-sm">
            {["Safety Protocols", "Emergency Contacts", "System Logs", "Documentation"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-cyan-700 transition-colors cursor-pointer"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MainPage;
