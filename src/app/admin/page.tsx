"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Tabs
  const [currentTab, setCurrentTab] = useState<"dashboard" | "support" | "logins" | "subscribers">("dashboard");

  // Dashboard Data State
  const [dbData, setDbData] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  const [freeTierCap, setFreeTierCap] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
    setIsLoading(false);

    let interval: NodeJS.Timeout;
    if (authStatus === "true") {
      interval = setInterval(() => {
        fetchData();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [dbRes, healthRes] = await Promise.all([
        fetch("/api/admin/db"),
        fetch("/api/admin/health"),
      ]);
      setDbData(await dbRes.json());
      setHealth(await healthRes.json());
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const resetData = async () => {
    if (!confirm("Are you sure you want to reset all traffic and data?")) return;
    await fetch("/api/admin/reset", { method: "POST" });
    fetchData();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (email === "admin@toolivos.com" && password === "admin123") {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoginError("Invalid admin email or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  if (isLoading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span translate="no" className="material-symbols-outlined text-primary text-[32px] notranslate">shield_person</span>
              <span className="font-display-sm text-2xl font-bold">TooliVos</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin Workspace Login</h1>
            <p className="text-sm text-gray-500 mt-2">Enter your admin credentials to continue</p>
            <p className="text-xs bg-blue-50 text-blue-600 mt-4 p-2 rounded">Demo: admin@toolivos.com / admin123</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-container text-white font-bold py-3 rounded-xl transition-colors mt-4"
            >
              Access Dashboard
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-primary transition-colors">
              &larr; Return to main site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeUsers = dbData?.stats?.activeUsers || 0;
  const todaysChecks = dbData?.stats?.todaysChecks || 0;
  const notifications = dbData?.notifications || [];
  const supportTickets = dbData?.supportTickets || [];
  const userLogins = dbData?.userLogins || [];
  const unreadNotifs = notifications.filter((n: any) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex font-sans text-sm text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <span translate="no" className="material-symbols-outlined text-primary text-[20px] notranslate">analytics</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 leading-tight">TooliVos</div>
              <div className="text-[10px] font-bold text-gray-500 tracking-wider">ADMIN WORKSPACE</div>
            </div>
          </div>
          
          <div className="text-xs font-bold text-gray-400 mb-4 tracking-wider">PLATFORM NAVIGATION</div>
          <nav className="space-y-1">
            <button 
              onClick={() => setCurrentTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${currentTab === 'dashboard' ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span translate="no" className="material-symbols-outlined text-[20px] notranslate">dashboard</span>
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentTab("support")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${currentTab === 'support' ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span translate="no" className="material-symbols-outlined text-[20px] notranslate">support_agent</span>
              Support Tickets
              {supportTickets.length > 0 && <span className="ml-auto bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-[10px]">{supportTickets.length}</span>}
            </button>
            <button 
              onClick={() => setCurrentTab("logins")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${currentTab === 'logins' ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span translate="no" className="material-symbols-outlined text-[20px] notranslate">login</span>
              User Logins
            </button>
            
            <button 
              onClick={() => setCurrentTab("subscribers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${currentTab === 'subscribers' ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span translate="no" className="material-symbols-outlined text-[20px] notranslate">mail</span>
              Subscribers
              {dbData?.subscriptions?.length > 0 && <span className="ml-auto bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-[10px]">{dbData.subscriptions.length}</span>}
            </button>
            <button 
              onClick={resetData}

              className="w-full flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl font-semibold transition-colors mt-4"
            >
              <span translate="no" className="material-symbols-outlined text-[20px] notranslate">restart_alt</span>
              Reset All Data
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-600 font-semibold">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              System Normal
            </div>
            <span className="text-gray-400 font-medium">v2.4.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <span translate="no" className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] notranslate">search</span>
              <input 
                type="text" 
                placeholder="Search tools, accounts, or logs..." 
                className="w-full bg-[#F0F2F5] text-sm rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-gray-800 transition-colors relative">
              <span translate="no" className="material-symbols-outlined text-[22px] notranslate">notifications</span>
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <span translate="no" className="material-symbols-outlined text-[22px] notranslate">help</span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
              <div className="text-right hidden sm:block">
                <div className="font-bold text-gray-900 leading-tight">Ops Admin</div>
                <div className="text-xs text-gray-500">admin@toolivos.com</div>
              </div>
              <button onClick={handleLogout} className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity" title="Logout">
                <span translate="no" className="material-symbols-outlined text-[18px] notranslate">person</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          
          {currentTab === "dashboard" && (
            <>
              {/* Page Title & Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-extrabold text-gray-900">Admin Overview</h1>
                    <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-teal-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                      ALL SYSTEMS NORMAL
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">Daily telemetry, workload distribution, and instant tool operational controls.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                  <button className="px-4 py-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-md transition-colors">Today</button>
                  <button className="px-4 py-1.5 text-sm font-bold text-primary bg-primary/5 rounded-md transition-colors">Last 7 Days</button>
                  <button className="px-4 py-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-md transition-colors">Last 30 Days</button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center">
                    <span translate="no" className="material-symbols-outlined text-[18px] notranslate">tune</span>
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden">
                  <div className="flex justify-between items-start z-10">
                    <div className="text-[11px] font-bold text-gray-500 tracking-wider">ACTIVE USERS</div>
                    <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">how_to_reg</span>
                    </div>
                  </div>
                  <div className="z-10">
                    <div className="text-3xl font-extrabold text-gray-900 mb-1">
                      {activeUsers.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-600 font-bold flex items-center">
                        <span translate="no" className="material-symbols-outlined text-[14px] notranslate">trending_up</span>
                        Real-time
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden">
                  <div className="flex justify-between items-start z-10">
                    <div className="text-[11px] font-bold text-gray-500 tracking-wider">TODAY'S CHECKS</div>
                    <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">plagiarism</span>
                    </div>
                  </div>
                  <div className="z-10 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-extrabold text-gray-900 mb-1">
                        {todaysChecks.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">Plagiarism & AI</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden">
                  <div className="flex justify-between items-start z-10">
                    <div className="text-[11px] font-bold text-gray-500 tracking-wider">TOP PERFORMING TOOL</div>
                    <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center">
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">auto_awesome</span>
                    </div>
                  </div>
                  <div className="z-10">
                    <div className="text-xl font-extrabold text-gray-900 mb-2 truncate">
                      Plagiarism Tool
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-900 font-bold">42% of total traffic</span>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden">
                  <div className="flex justify-between items-start z-10">
                    <div className="text-[11px] font-bold text-gray-500 tracking-wider">SERVER HEALTH & SPEED</div>
                    <div className="w-8 h-8 rounded bg-teal-50 text-teal-600 flex items-center justify-center">
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">speed</span>
                    </div>
                  </div>
                  <div className="z-10 flex items-end justify-between">
                    <div className="text-3xl font-extrabold text-gray-900">
                      99.9%
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-1">Global Latency</div>
                      <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-bold text-[10px]">
                        82ms avg
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                      <span translate="no" className="material-symbols-outlined text-[18px] notranslate">memory</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">Core Engines & Service Health</h2>
                      <p className="text-xs text-gray-500">Real-time status of top-tier processors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                    Auto-refresh in 5s
                    <span translate="no" className="material-symbols-outlined text-[16px] animate-spin-slow notranslate">sync</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                        <th className="px-6 py-4 border-b border-gray-100">Tool Name</th>
                        <th className="px-6 py-4 border-b border-gray-100">Operational State</th>
                        <th className="px-6 py-4 border-b border-gray-100">Daily Load</th>
                        <th className="px-6 py-4 border-b border-gray-100">Response Speed</th>
                        <th className="px-6 py-4 border-b border-gray-100 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {health ? health.engines.map((engine: any) => (
                        <tr key={engine.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded ${engine.iconBg} ${engine.iconColor} flex items-center justify-center shrink-0`}>
                                <span translate="no" className="material-symbols-outlined text-[16px] notranslate">{engine.icon}</span>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">{engine.name}</div>
                                <div className="text-xs text-gray-500">{engine.desc}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {engine.state === "Healthy" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                                Healthy
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                {engine.state}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                            {engine.load.toLocaleString()} req
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${parseFloat(engine.speed) > 1.0 ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                              {engine.speed}s avg
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm font-bold text-primary hover:text-primary-container transition-colors">View Logs</button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading engine health...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Live Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">Live Activity Feed</h2>
                      <p className="text-xs text-gray-500">Real-time submissions and administrative events</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                      Streaming
                    </span>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="space-y-4">
                      {notifications.length > 0 ? notifications.slice(0, 5).map((notif: any) => (
                        <div key={notif.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100/50 hover:border-gray-200 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${notif.type === 'support' ? 'bg-orange-500' : 'bg-blue-500'} text-white flex items-center justify-center font-bold text-[10px] shrink-0`}>
                              {notif.type.toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-sm">{notif.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{notif.message}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[10px] font-bold text-gray-400 mb-1">{new Date(notif.timestamp).toLocaleTimeString()}</div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-100">
                              Logged
                            </span>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center text-gray-400 py-8">Waiting for live events...</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">Quick Admin Actions</h2>
                    <p className="text-xs text-gray-500">Immediate switches and maintenance triggers</p>
                  </div>
                  <div className="p-6 space-y-4">
                    
                    {/* Toggle */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 text-sm">Free Tier Word Cap</div>
                        <div className="text-xs text-gray-500 mt-0.5">Limit unauthenticated visitors to 1,000 words</div>
                      </div>
                      <button 
                        onClick={() => setFreeTierCap(!freeTierCap)}
                        className={`w-12 h-6 rounded-full relative transition-colors ${freeTierCap ? 'bg-primary' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${freeTierCap ? 'left-[26px]' : 'left-0.5'}`}></div>
                      </button>
                    </div>

                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-4 rounded-xl flex items-center justify-between transition-colors border border-blue-100 group">
                      <div className="flex items-center gap-3 font-bold text-sm">
                        <span translate="no" className="material-symbols-outlined text-[18px] notranslate">autorenew</span>
                        Purge Global Edge Cache
                      </div>
                      <span className="text-[10px] text-blue-400 font-bold group-hover:text-blue-500">Redis + CDN</span>
                    </button>

                    <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-4 rounded-xl flex items-center justify-between transition-colors border border-purple-100 group">
                      <div className="flex items-center gap-3 font-bold text-sm">
                        <span translate="no" className="material-symbols-outlined text-[18px] notranslate">campaign</span>
                        Broadcast Banner Notice
                      </div>
                      <span className="text-[10px] text-purple-400 font-bold group-hover:text-purple-500">Draft</span>
                    </button>

                  </div>
                </div>

              </div>
            </>
          )}

          {currentTab === "support" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Support Tickets</h2>
                <p className="text-gray-500 text-sm">User inquiries and contact form submissions.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {supportTickets.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                        <th className="px-6 py-4 border-b border-gray-100">Name & Email</th>
                        <th className="px-6 py-4 border-b border-gray-100">Subject & Message</th>
                        <th className="px-6 py-4 border-b border-gray-100">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {supportTickets.map((t: any) => (
                        <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-gray-900">{t.name}</div>
                            <div className="text-xs text-gray-500">{t.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-gray-900 text-sm">{t.subject}</div>
                            <div className="text-xs text-gray-600 line-clamp-2 max-w-lg">{t.message}</div>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {new Date(t.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12 text-center text-gray-500">No support tickets yet.</div>
                )}
              </div>
            </div>
          )}

          {currentTab === "logins" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">User Logins</h2>
                <p className="text-gray-500 text-sm">Real-time log of user authentications.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {userLogins.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                        <th className="px-6 py-4 border-b border-gray-100">Email Address</th>
                        <th className="px-6 py-4 border-b border-gray-100">Method</th>
                        <th className="px-6 py-4 border-b border-gray-100">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {userLogins.map((t: any) => (
                        <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900">{t.email}</td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-100">
                              {t.method}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500">
                            {new Date(t.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12 text-center text-gray-500">No logins recorded yet.</div>
                )}
              </div>
            </div>
          )}

        
          {currentTab === "subscribers" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Newsletter Subscribers</h2>
                <p className="text-gray-500 text-sm">Emails subscribed from the website footer.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {dbData?.subscriptions?.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                        <th className="px-6 py-4 border-b border-gray-100">Email Address</th>
                        <th className="px-6 py-4 border-b border-gray-100">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {dbData.subscriptions.map((s: any) => (
                        <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900">{s.email}</td>
                          <td className="px-6 py-4 text-xs text-gray-500">
                            {new Date(s.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12 text-center text-gray-500">No subscribers yet.</div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
