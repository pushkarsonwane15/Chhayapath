/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Sun,
  Wind,
  Droplets,
  TreeDeciduous,
  ShieldAlert,
  Navigation,
  Compass,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  Info,
  Layers,
  Thermometer,
  Coffee,
  CheckCircle2,
  Code2,
  Copy,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const CHHAYAPATH_DATA = {
  "trip_id": "CP-DEL-2026-098",
  "status": "optimized",
  "timestamp": "2026-10-01T14:15:00Z",
  "user_context": {
    "vehicle": "Electric Two-Wheeler",
    "rider_urgency": "Balanced Safety & Speed",
    "ambient_temp_c": 41,
    "heat_index_c": 46,
    "ambient_aqi": 275
  },
  "route_comparison": {
    "standard_route": {
      "name": "NH-48 Direct Corridor",
      "distance_km": 28.5,
      "duration_minutes": 48,
      "shade_percentage": 14,
      "uv_exposure_index": 9.8,
      "aqi_exposure_average": 285,
      "thermal_stress_level": "Extreme",
      "overall_comfort_score": 38
    },
    "ai_optimized_route": {
      "name": "ChhayaPath Green Canopy & Ridge Bypass",
      "distance_km": 30.2,
      "duration_minutes": 53,
      "shade_percentage": 68,
      "uv_exposure_index": 4.2,
      "aqi_exposure_average": 195,
      "thermal_stress_level": "Moderate",
      "overall_comfort_score": 86,
      "time_penalty_minutes": 5
    }
  },
  "route_modifications": [
    {
      "step_number": 1,
      "action": "Divert from NH-48 flyover to Sardar Patel Marg",
      "reason": "Dense roadside neem and banyan tree cover lowers surface road temperature by 4.5°C"
    },
    {
      "step_number": 2,
      "action": "Bypass Dhaula Kuan idle traffic junction via Ridge road link",
      "reason": "Reduces direct inhalation of diesel exhaust and PM2.5 emissions by 32%"
    }
  ],
  "waypoints": [
    {"name": "Start: Connaught Place", "lat": 28.6315, "lng": 77.2167, "type": "origin"},
    {"name": "SP Marg Shaded Corridor", "lat": 28.5983, "lng": 77.1812, "type": "shaded_segment"},
    {"name": "Cool-Down Station: Transit Micro-Hub", "lat": 28.5521, "lng": 77.1264, "type": "hydration_hub"},
    {"name": "End: DLF Cyber City", "lat": 28.4950, "lng": 77.0895, "type": "destination"}
  ],
  "hydration_and_rest_stops": [
    {
      "id": "hub-01",
      "name": "Mahipalpur Public Cooling Kiosk",
      "distance_from_start_km": 14.2,
      "services": ["Cold Drinking Water", "Misting Fan", "EV Fast Charger (15min top-up)"],
      "recommended_stop_minutes": 8
    }
  ],
  "ui_action_cards": [
    {
      "card_id": "btn_accept_green",
      "button_label": "Accept ChhayaPath (+5 mins, +54% Shade)",
      "action_type": "START_NAVIGATION",
      "route_key": "ai_optimized_route"
    },
    {
      "card_id": "btn_fast_track",
      "button_label": "Stick to Fastest Route (High Heat Warning)",
      "action_type": "PROCEED_WITH_WARNING",
      "route_key": "standard_route"
    },
    {
      "card_id": "btn_locate_shelter",
      "button_label": "Navigate to Nearest Water Hub",
      "action_type": "REROUTE_TO_REST_STOP",
      "stop_id": "hub-01"
    }
  ],
  "safety_advisory": "High Solar Radiation Alert: Heat index is 46°C. Taking the ChhayaPath route reduces direct sun exposure by 31 minutes. Hydration at kilometer 14 is strongly advised."
};

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState<'ai_optimized_route' | 'standard_route'>('ai_optimized_route');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'json' | 'map'>('dashboard');
  const [navState, setNavState] = useState<{ active: boolean; message: string }>({ active: false, message: '' });
  const [copied, setCopied] = useState(false);

  const handleAction = (cardId: string) => {
    if (cardId === 'btn_accept_green') {
      setSelectedRoute('ai_optimized_route');
      setNavState({
        active: true,
        message: 'Active Bio-Adaptive Navigation: Diverting to Shaded Sardar Patel Marg corridor.'
      });
    } else if (cardId === 'btn_fast_track') {
      setSelectedRoute('standard_route');
      setNavState({
        active: true,
        message: 'Proceeding with Direct NH-48 route. Extreme thermal stress advisory in effect!'
      });
    } else if (cardId === 'btn_locate_shelter') {
      setNavState({
        active: true,
        message: 'Route waypoint queued: Rerouting to Mahipalpur Public Cooling Kiosk (KM 14.2).'
      });
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(CHHAYAPATH_DATA, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner / Navigation */}
      <header className="border-b border-emerald-900/40 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <TreeDeciduous className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">ChhayaPath</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  Bio-Adaptive v2.6
                </span>
              </div>
              <p className="text-xs text-slate-400">Microclimate-Aware Routing for Two-Wheelers & Couriers</p>
            </div>
          </div>

          {/* Environmental Telemetry Pill */}
          <div className="flex items-center gap-2 sm:gap-4 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>41°C (Heat Index 46°C)</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5 text-rose-400 font-medium">
              <Wind className="w-4 h-4" />
              <span>AQI 275 (Poor)</span>
            </div>
            <div className="h-4 w-px bg-slate-800 hidden md:block" />
            <div className="hidden md:flex items-center gap-1.5 text-cyan-400 font-medium">
              <Zap className="w-4 h-4" />
              <span>EV Courier Mode</span>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Route Overview
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'map'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Canopy Map
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'json'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Raw Schema
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {/* Safety Alert Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent border border-amber-500/30 p-4 lg:p-5">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-amber-300 text-sm tracking-wide uppercase">
                  Extreme Thermal & Solar Radiation Warning
                </h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 font-semibold">
                  LIVE ADVISORY
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {CHHAYAPATH_DATA.safety_advisory}
              </p>
            </div>
          </div>
        </div>

        {/* Live Nav Alert */}
        {navState.active && (
          <div className="rounded-xl bg-emerald-950/80 border border-emerald-500/40 p-4 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-sm font-semibold text-emerald-200">{navState.message}</p>
            </div>
            <button
              onClick={() => setNavState({ active: false, message: '' })}
              className="text-xs text-emerald-400 hover:text-emerald-200 underline font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dynamic Tabs */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Origin & Destination Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Origin</span>
                <div className="flex items-center gap-2 font-bold text-slate-100">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Connaught Place, New Delhi</span>
                </div>
                <span className="text-xs text-slate-500 mt-1 block font-mono">[28.6315° N, 77.2167° E]</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Destination</span>
                <div className="flex items-center gap-2 font-bold text-slate-100">
                  <Compass className="w-4 h-4 text-teal-400" />
                  <span>Cyber City, Gurugram</span>
                </div>
                <span className="text-xs text-slate-500 mt-1 block font-mono">[28.4950° N, 77.0895° E]</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Rider Context</span>
                <div className="flex items-center gap-2 font-bold text-slate-100">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>{CHHAYAPATH_DATA.user_context.vehicle}</span>
                </div>
                <span className="text-xs text-emerald-400 mt-1 block font-medium">Battery Thermal Guard: Active</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Trip Session</span>
                <div className="flex items-center gap-2 font-bold text-slate-100 font-mono">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{CHHAYAPATH_DATA.trip_id}</span>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Optimization Engine: 100% Ready</span>
              </div>
            </div>

            {/* Route Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ChhayaPath AI-Optimized Card */}
              <div
                onClick={() => setSelectedRoute('ai_optimized_route')}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border-2 ${
                  selectedRoute === 'ai_optimized_route'
                    ? 'bg-gradient-to-b from-slate-900 to-emerald-950/40 border-emerald-500 shadow-xl shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Bio-Adaptive Recommendation
                        </span>
                        <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                          +54% MORE SHADE
                        </span>
                      </div>
                      <h4 className="font-extrabold text-lg text-white mt-0.5">
                        {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.name}
                      </h4>
                    </div>
                  </div>
                  {selectedRoute === 'ai_optimized_route' && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium block">Distance / Time</span>
                    <span className="text-lg font-bold text-slate-100">
                      {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.distance_km} km
                    </span>
                    <span className="text-xs text-emerald-400 block font-semibold">
                      {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.duration_minutes} min (+5m)
                    </span>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium block">Canopy Shade</span>
                    <span className="text-lg font-extrabold text-emerald-400">
                      {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.shade_percentage}%
                    </span>
                    <span className="text-[11px] text-slate-400 block">Neem & Ridge Cover</span>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium block">Comfort Score</span>
                    <span className="text-lg font-extrabold text-emerald-300">
                      {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.overall_comfort_score}/100
                    </span>
                    <span className="text-[11px] text-emerald-400 block font-medium">Optimal Rider Health</span>
                  </div>
                </div>

                {/* Microclimate Stats */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                      Thermal Stress Level
                    </span>
                    <span className="font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.thermal_stress_level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      UV Exposure Index
                    </span>
                    <span className="font-semibold text-slate-200">
                      {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.uv_exposure_index} (Low-Moderate)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-teal-400" />
                      Avg Route AQI
                    </span>
                    <span className="font-semibold text-teal-300">
                      {CHHAYAPATH_DATA.route_comparison.ai_optimized_route.aqi_exposure_average} (32% cleaner)
                    </span>
                  </div>
                </div>
              </div>

              {/* Standard Baseline Route */}
              <div
                onClick={() => setSelectedRoute('standard_route')}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border-2 ${
                  selectedRoute === 'standard_route'
                    ? 'bg-gradient-to-b from-slate-900 to-rose-950/40 border-rose-500 shadow-xl shadow-rose-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                          Direct Baseline Route
                        </span>
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
                          EXTREME HEAT
                        </span>
                      </div>
                      <h4 className="font-extrabold text-lg text-white mt-0.5">
                        {CHHAYAPATH_DATA.route_comparison.standard_route.name}
                      </h4>
                    </div>
                  </div>
                  {selectedRoute === 'standard_route' && (
                    <CheckCircle2 className="w-6 h-6 text-rose-400 shrink-0" />
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium block">Distance / Time</span>
                    <span className="text-lg font-bold text-slate-100">
                      {CHHAYAPATH_DATA.route_comparison.standard_route.distance_km} km
                    </span>
                    <span className="text-xs text-slate-400 block font-semibold">
                      {CHHAYAPATH_DATA.route_comparison.standard_route.duration_minutes} min (Direct)
                    </span>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium block">Canopy Shade</span>
                    <span className="text-lg font-extrabold text-rose-400">
                      {CHHAYAPATH_DATA.route_comparison.standard_route.shade_percentage}%
                    </span>
                    <span className="text-[11px] text-rose-400/80 block">Unshielded Highway</span>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                    <span className="text-xs text-slate-400 font-medium block">Comfort Score</span>
                    <span className="text-lg font-extrabold text-rose-300">
                      {CHHAYAPATH_DATA.route_comparison.standard_route.overall_comfort_score}/100
                    </span>
                    <span className="text-[11px] text-rose-400 block font-medium">Dehydration Risk</span>
                  </div>
                </div>

                {/* Microclimate Stats */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                      Thermal Stress Level
                    </span>
                    <span className="font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {CHHAYAPATH_DATA.route_comparison.standard_route.thermal_stress_level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      UV Exposure Index
                    </span>
                    <span className="font-semibold text-rose-400">
                      {CHHAYAPATH_DATA.route_comparison.standard_route.uv_exposure_index} (Extreme Peak)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-rose-400" />
                      Avg Route AQI
                    </span>
                    <span className="font-semibold text-rose-400">
                      {CHHAYAPATH_DATA.route_comparison.standard_route.aqi_exposure_average} (Severe Bottleneck)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Route Modifications & Hydration Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Route Modifications */}
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-base text-white">ChhayaPath Optimization Steps</h3>
                  </div>
                  <span className="text-xs text-slate-400">Microclimate-Based Rerouting</span>
                </div>

                <div className="space-y-4">
                  {CHHAYAPATH_DATA.route_modifications.map((mod) => (
                    <div
                      key={mod.step_number}
                      className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-4"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 border border-emerald-500/40">
                        {mod.step_number}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-slate-100">{mod.action}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{mod.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hydration & Cooling Kiosks */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Droplets className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-base text-white">Hydration & Rest Micro-Hub</h3>
                  </div>

                  {CHHAYAPATH_DATA.hydration_and_rest_stops.map((hub) => (
                    <div key={hub.id} className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-cyan-200">{hub.name}</h4>
                          <span className="text-xs text-slate-400">Station marker @ KM {hub.distance_from_start_km}</span>
                        </div>
                        <span className="text-[11px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-medium border border-cyan-500/40">
                          {hub.recommended_stop_minutes} min stop
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-cyan-900/40">
                        <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold block">
                          Available Amenities
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {hub.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-slate-900 px-2 py-1 rounded-md text-slate-300 border border-slate-800 flex items-center gap-1"
                            >
                              <Coffee className="w-3 h-3 text-cyan-400" />
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 text-xs text-slate-400 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Scheduled hydration eliminates heat fatigue spikes by 64%.</span>
                </div>
              </div>
            </div>

            {/* Action Cards / Primary CTA Buttons */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Interactive Dispatch & Navigation Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CHHAYAPATH_DATA.ui_action_cards.map((card) => {
                  const isGreen = card.card_id === 'btn_accept_green';
                  const isWarning = card.card_id === 'btn_fast_track';
                  return (
                    <button
                      key={card.card_id}
                      onClick={() => handleAction(card.card_id)}
                      className={`p-4 rounded-xl text-left font-bold text-sm flex items-center justify-between gap-3 transition-all duration-200 border shadow-lg ${
                        isGreen
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 border-emerald-400/40 shadow-emerald-500/20'
                          : isWarning
                          ? 'bg-slate-900 hover:bg-rose-950/40 text-rose-300 border-rose-500/30 shadow-black'
                          : 'bg-slate-900 hover:bg-cyan-950/40 text-cyan-300 border-cyan-500/30 shadow-black'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isGreen && <Navigation className="w-4 h-4 shrink-0" />}
                        {isWarning && <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />}
                        {!isGreen && !isWarning && <Droplets className="w-4 h-4 shrink-0 text-cyan-400" />}
                        <span>{card.button_label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0 opacity-70" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Canopy Map Visualizer Tab */}
        {activeTab === 'map' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-white">Canopy Coverage & Microclimate Map</h3>
                <p className="text-xs text-slate-400">Delhi-Gurugram Corridor: Connaught Place to Cyber City</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> ChhayaPath Shaded
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> NH-48 Direct (Exposed)
                </span>
              </div>
            </div>

            {/* Interactive SVG Schematic Map */}
            <div className="relative w-full h-80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-6">
              <svg className="w-full h-full max-w-2xl" viewBox="0 0 600 240" fill="none">
                {/* Background Heat Grid Zones */}
                <rect x="20" y="20" width="560" height="200" rx="12" fill="#020617" stroke="#1e293b" />
                <path d="M 50,190 C 150,190 250,170 350,150 C 450,130 500,60 550,50" stroke="#f43f5e" strokeWidth="4" strokeDasharray="6 6" opacity="0.6" />
                <path d="M 50,190 C 120,110 200,80 320,80 C 440,80 480,70 550,50" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />

                {/* Shaded Canopy Area Glow */}
                <ellipse cx="230" cy="80" rx="90" ry="30" fill="#10b981" fillOpacity="0.15" />
                <text x="180" y="60" fill="#34d399" fontSize="11" fontWeight="bold">SP Marg Neem Canopy</text>

                {/* Waypoints */}
                <circle cx="50" cy="190" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x="35" y="215" fill="#f8fafc" fontSize="11" fontWeight="bold">Connaught Place</text>

                <circle cx="320" cy="80" r="7" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                <text x="260" y="105" fill="#67e8f9" fontSize="11" fontWeight="bold">Mahipalpur Cooling Hub</text>

                <circle cx="550" cy="50" r="7" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                <text x="470" y="40" fill="#f8fafc" fontSize="11" fontWeight="bold">Cyber City, Gurugram</text>

                {/* NH 48 Heat Trap Zone */}
                <ellipse cx="290" cy="165" rx="70" ry="22" fill="#ef4444" fillOpacity="0.15" />
                <text x="235" y="170" fill="#f87171" fontSize="10" fontWeight="bold">Dhaula Kuan Idle Gridlock (AQI 285)</text>
              </svg>

              <div className="absolute bottom-4 left-6 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300 flex items-center gap-2">
                <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tree canopy mitigates road surface temp by -4.5°C</span>
              </div>
            </div>

            {/* Waypoints List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CHHAYAPATH_DATA.waypoints.map((wp, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-xs text-white">{wp.name}</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    {wp.lat.toFixed(4)}° N, {wp.lng.toFixed(4)}° E
                  </p>
                  <span className="text-[10px] mt-2 inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase tracking-wider font-semibold">
                    {wp.type.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw JSON Tab */}
        {activeTab === 'json' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">ChhayaPath API Engine Response</h3>
                <p className="text-xs text-slate-400">Conforming strictly to JSON schema specification</p>
              </div>
              <button
                onClick={copyJson}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-semibold transition"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Raw JSON'}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="text-xs font-mono text-emerald-300/90 leading-relaxed whitespace-pre">
                {JSON.stringify(CHHAYAPATH_DATA, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500">
        ChhayaPath Bio-Adaptive Smart Mobility Engine &bull; Delhi-NCR Pilot Route &bull; Real-time microclimate shade & AQI optimization
      </footer>
    </div>
  );
}
