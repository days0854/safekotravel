import React, { useState } from 'react';
import { Sparkles, Map, Clock, DollarSign, Send, Loader2, Calendar } from 'lucide-react';
import { generateTravelPlan } from '../services/geminiService';
import { AIPlanResponse, TravelStyle } from '../types';

export const AIPlannerPage: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('3 Days');
  const [style, setStyle] = useState<TravelStyle>(TravelStyle.RELAXED);
  const [budget, setBudget] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AIPlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!destination) return;
    
    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const result = await generateTravelPlan({
        destination,
        duration,
        style,
        budget
      });
      setPlan(result);
    } catch (err) {
      setError("Failed to generate itinerary. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Safeko AI Trip Planner</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Tell us where you want to go, and our AI will craft the perfect sustainable and safe itinerary for you in seconds.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center">
                <Map className="w-4 h-4 mr-2 text-primary" /> Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Seoul, Jeju, Tokyo"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" /> Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option>1 Day</option>
                <option>2 Days</option>
                <option>3 Days</option>
                <option>5 Days</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
              </select>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-primary" /> Travel Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as TravelStyle)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                {Object.values(TravelStyle).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-primary" /> Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option>Budget</option>
                <option>Medium</option>
                <option>Luxury</option>
              </select>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !destination}
              className={`flex items-center px-8 py-3 rounded-lg font-bold text-white transition-all shadow-lg ${
                loading || !destination 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-primary hover:bg-rose-600 hover:shadow-xl'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Plan...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Generate Itinerary
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 border border-red-100 text-center">
            {error}
          </div>
        )}

        {/* Results */}
        {plan && (
          <div className="space-y-8 animate-fade-in">
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Trip Overview</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">{plan.summary}</p>
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <DollarSign className="w-4 h-4 mr-1" /> Est. Cost: {plan.estimatedCost}
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="space-y-6">
              {plan.itinerary.map((day) => (
                <div key={day.day} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center mr-4 shadow-sm">
                        Day {day.day}
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">{day.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-2">
                      {day.activities.map((act, idx) => (
                        <div key={idx} className="relative pl-8">
                          {/* Timeline Dot */}
                          <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-accent"></div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-start">
                            <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-slate-500 mb-2 sm:mb-0 sm:mr-4 min-w-[80px] text-center">
                              {act.time}
                            </span>
                            <div>
                              <h4 className="font-bold text-slate-800 text-md mb-1">{act.activity}</h4>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {act.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center pt-8">
              <button className="bg-slate-800 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-900 transition-colors shadow-lg">
                Save This Itinerary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
