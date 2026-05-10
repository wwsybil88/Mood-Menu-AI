import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Utensils, 
  Sparkles, 
  User, 
  Heart, 
  FlaskConical, 
  Wind, 
  ArrowRight, 
  Droplets, 
  Leaf, 
  Languages,
  Clock,
  ChevronRight,
  Quote,
  Star
} from 'lucide-react';
import { analyzeMood } from './lib/gemini';
import { MoodAnalysis, Language, UserHistoryItem, GalleryItem, LiteraryQuote } from './types';
import { literaryQuotes, healingGalleries } from './lib/constants';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [history, setHistory] = useState<UserHistoryItem[]>([]);
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState('mood');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [quoteCategory, setQuoteCategory] = useState<LiteraryQuote['category']>('zh');

  const filteredQuotes = literaryQuotes.filter(q => q.category === quoteCategory);
  const randomQuote = filteredQuotes[Math.floor(Date.now() / (1000 * 60)) % filteredQuotes.length];

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('mood-menu-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('mood-menu-history', JSON.stringify(history));
  }, [history]);

  const handleHeal = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeMood(input, lang);
      setAnalysis(result);
      
      // Save to history
      const newItem: UserHistoryItem = {
        timestamp: Date.now(),
        mood: input,
        emotions: result.emotions,
        dish: result.dish
      };
      setHistory(prev => [newItem, ...prev].slice(0, 20)); // Keep last 20
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen relative pb-32">
      {/* Background Fluid Layer */}
      <div className="fixed inset-0 fluid-gradient -z-10 opacity-70"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/20 shadow-sm">
        <div className="flex justify-between items-center w-full px-5 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Heart className="text-primary w-6 h-6" />
            <h1 className="font-display text-2xl font-light tracking-widest text-primary">Mood Menu</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary transition-all active:scale-95 cursor-pointer shadow-sm"
              title="Toggle Language"
            >
              <Languages size={20} />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-sm">
              <img 
                alt="Profile" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="relative pt-24 px-5 max-w-md mx-auto flex flex-col gap-8 min-h-[85vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'mood' && (
            <motion.div 
              key="mood"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-8"
            >
              {/* Virtual Chef Intro */}
              <section className="flex flex-col items-center gap-4 pt-4">
                <div className="flex items-center gap-6 w-full">
                  <div className="relative flex-shrink-0">
                    <div className="chef-orb w-14 h-14 rounded-full"></div>
                    <div className="absolute inset-0 chef-orb opacity-50 blur-xl"></div>
                  </div>
                  <div className="glass-panel py-3 px-5 rounded-2xl rounded-tl-none relative border-white/40 shadow-sm">
                    <p className="text-sm font-medium italic text-primary leading-tight">
                      {lang === 'en' ? '"You look like you\'ve been fighting dragons all day. Let\'s fix that."' : '"你看起来战斗了一整天。让我们来慰藉你的灵魂吧。"'}
                    </p>
                    <div className="absolute -left-2 top-0 w-0 h-0 border-t-[12px] border-t-white/30 border-r-[12px] border-r-transparent"></div>
                  </div>
                </div>
              </section>

              {/* Input Section */}
              <section className="flex flex-col gap-6">
                <div className="text-center space-y-3">
                  <h2 className="font-display text-4xl text-primary font-light">
                    {lang === 'en' ? 'How do you feel?' : '你现在感觉如何？'}
                  </h2>
                  <p className="text-on-surface-variant/80 text-sm">
                    {lang === 'en' ? 'Our AI crafts a meal to balance your soul.' : 'AI 为您的灵魂定制专属治愈方案'}
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="glass-panel rounded-3xl p-1 shadow-sm overflow-hidden">
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-lg p-6 min-h-[140px] placeholder:text-on-surface-variant/40 resize-none text-primary"
                      placeholder={lang === 'en' ? "Pour out your mood here..." : "在这里倾诉你的心声..."}
                    />
                  </div>
                  <button 
                    onClick={handleHeal}
                    disabled={loading || !input.trim()}
                    className="w-full py-5 bg-primary text-on-primary rounded-full font-display text-xl tracking-wide flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                    ) : (
                      <>
                        {lang === 'en' ? 'Heal with Food' : '用美食治愈'}
                        <Sparkles size={20} />
                      </>
                    )}
                  </button>
                </div>
              </section>

              {/* Analysis Results */}
              {analysis && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Alchemy Chart */}
                  <section className="flex flex-col gap-4">
                    <div className="flex justify-between items-end px-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
                        {lang === 'en' ? 'The Alchemy' : '情绪炼金术'}
                      </span>
                      <FlaskConical size={18} className="text-primary" />
                    </div>
                    <div className="glass-panel rounded-[2rem] p-6 shadow-sm border-primary/10 alchemy-chart relative overflow-hidden">
                      <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-on-surface-variant/70 uppercase">
                          <span>Phase: Analysis</span>
                          <span>Transmutation Active</span>
                        </div>
                        <div className="space-y-4">
                          {analysis.emotions.map((emo, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-primary/80 font-medium italic">{emo.name}</span>
                                <span className="font-mono text-primary font-semibold">{emo.percentage}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${emo.percentage}%` }}
                                  transition={{ duration: 1.5, ease: "circOut" }}
                                  className="h-full rounded-full shadow-[0_0_8px_rgba(87,92,129,0.2)]"
                                  style={{ backgroundColor: emo.color || '#575c81' }}
                                ></motion.div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Dish Preview */}
                  <section className="flex flex-col gap-4">
                    <div className="glass-panel rounded-[2.5rem] overflow-hidden shadow-sm group">
                      <div className="relative h-72">
                        <img 
                          alt={analysis.dish.name} 
                          className="w-full h-full object-cover" 
                          src={analysis.dish.imageUrl} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                          {analysis.dish.tags.map((tag, idx) => (
                            <span key={idx} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase text-white border border-white/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-8 space-y-4">
                        <h3 className="font-display text-3xl text-on-surface font-light">{analysis.dish.name}</h3>
                        <p className="text-on-surface-variant italic text-sm leading-relaxed">
                          "{analysis.dish.reason}"
                        </p>
                        <div className="pt-6 border-t border-on-surface/5 flex justify-between items-center">
                          <div className="flex gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Leaf size={14} className="text-primary" /></span>
                            <span className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center"><Heart size={14} className="text-secondary" /></span>
                          </div>
                          <button 
                            onClick={() => {
                              setActiveTab('kitchen');
                              window.scrollTo(0, 0);
                            }}
                            className="text-primary text-[10px] font-bold flex items-center gap-2 hover:gap-3 transition-all tracking-[0.2em] uppercase"
                          >
                            {lang === 'en' ? 'Reveal Recipe' : '揭晓食谱'} <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'kitchen' && (
            <motion.div 
              key="kitchen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 py-4">
                <Utensils size={32} className="mx-auto text-primary opacity-50" />
                <h2 className="font-display text-3xl text-primary">{lang === 'en' ? 'The Kitchen' : '愈心厨房'}</h2>
                <p className="text-on-surface-variant/80 text-sm">{lang === 'en' ? 'Crafting healing thru flavor.' : '每一味，皆是治愈'}</p>
              </div>

              {analysis || history.length > 0 ? (
                <div className="space-y-6">
                  {/* Active Dish Detail */}
                  <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
                    <img 
                      src={analysis?.dish.imageUrl || history[0]?.dish.imageUrl} 
                      className="w-full h-48 object-cover opacity-80"
                      alt="Current Dish"
                    />
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-display text-2xl text-primary">
                          {analysis?.dish.name || history[0]?.dish.name}
                        </h3>
                        <div className="flex gap-2">
                          {(analysis?.dish.tags || history[0]?.dish.tags).map((t, idx) => (
                            <span key={idx} className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 font-bold border-b border-primary/20">{t}</span>
                          ))}
                        </div>
                      </div>

                      {/* Ingredients */}
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-primary/70 flex items-center gap-2">
                          <Droplets size={14} /> {lang === 'en' ? 'Ingredients' : '食材'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {(analysis?.dish.ingredients || history[0]?.dish.ingredients || []).map((ing, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-on-surface-variant">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary/30"></div>
                              {ing}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="space-y-4 pt-4 border-t border-on-surface/5">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-primary/70 flex items-center gap-2">
                          <Wind size={14} /> {lang === 'en' ? 'Process' : '步骤'}
                        </h4>
                        <div className="space-y-4">
                          {(analysis?.dish.instructions || history[0]?.dish.instructions || []).map((step, idx) => (
                            <div key={idx} className="flex gap-4">
                              <span className="font-display text-2xl text-primary/20 shrink-0">0{idx + 1}</span>
                              <p className="text-sm text-on-surface-variant leading-relaxed py-1">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
                  <p className="text-on-surface-variant italic">{lang === 'en' ? 'Your kitchen is quiet. Start by analyzing your mood.' : '厨房还空着。先去倾诉你的心情吧。'}</p>
                  <button 
                    onClick={() => setActiveTab('mood')}
                    className="text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-primary/20 pb-1"
                  >
                    {lang === 'en' ? 'Go to Mood' : '前往心境系统'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'healing' && (
            <motion.div 
              key="healing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 pb-10"
            >
              <div className="text-center space-y-2 py-4">
                <Sparkles size={32} className="mx-auto text-primary opacity-50" />
                <h2 className="font-display text-3xl text-primary">{lang === 'en' ? 'Resonance' : '光影治愈'}</h2>
                <p className="text-on-surface-variant/80 text-sm">{lang === 'en' ? 'Quotes and visions to soothe the mind.' : '在光影与文字间，觅得安宁'}</p>
              </div>

              {/* Quote Category Selector */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'zh', label: { en: 'Chinese', zh: '中国文学' } },
                  { id: 'en', label: { en: 'Western', zh: '英美文学' } },
                  { id: 'jk', label: { en: 'Asian', zh: '日韩文学' } },
                  { id: 'eu', label: { en: 'European', zh: '欧洲文学' } },
                  { id: 'la', label: { en: 'LatAm', zh: '拉美文学' } }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setQuoteCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                      quoteCategory === cat.id 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white/40 text-primary/60 hover:bg-white/60'
                    }`}
                  >
                    {cat.label[lang] || cat.label.en}
                  </button>
                ))}
              </div>

              {/* Literary Quote */}
              <motion.div 
                key={quoteCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 rounded-3xl relative overflow-hidden group min-h-[160px] flex flex-col justify-center"
              >
                <Quote size={40} className="absolute -top-4 -left-4 text-primary opacity-5" />
                <div className="space-y-4 relative z-10 text-center">
                  <p className="font-display text-lg text-primary italic leading-relaxed">
                    {randomQuote?.text}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
                    — {randomQuote?.source}
                  </p>
                </div>
              </motion.div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4">
                {healingGalleries.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    layoutId={`gallery-${item.id}`}
                    onClick={() => setSelectedGalleryItem(item)}
                    whileHover={{ scale: 0.98 }}
                    className="aspect-square rounded-2xl overflow-hidden glass-panel border-white/50 relative group cursor-pointer"
                  >
                    <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Sparkles className="text-white w-6 h-6" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Gallery Item Detail Modal */}
              <AnimatePresence>
                {selectedGalleryItem && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedGalleryItem(null)}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div 
                      layoutId={`gallery-${selectedGalleryItem.id}`}
                      className="glass-panel w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
                    >
                      <img src={selectedGalleryItem.imageUrl} className="w-full h-48 object-cover" alt={selectedGalleryItem.name} />
                      <div className="p-8 space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-display text-2xl text-primary">{selectedGalleryItem.name}</h3>
                          <p className="text-sm text-on-surface-variant leading-relaxed italic">"{selectedGalleryItem.introduction}"</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-on-surface/5">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-primary/50 tracking-wider">Taste / 口感</span>
                            <p className="text-xs text-on-surface-variant">{selectedGalleryItem.taste}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-secondary/50 tracking-wider">Soul / 心情</span>
                            <p className="text-xs text-secondary">{selectedGalleryItem.moodEffect}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase text-primary/50 tracking-wider">Healing Ritual / 做法</span>
                          <ul className="space-y-1">
                            {selectedGalleryItem.recipe.map((step, i) => (
                              <li key={i} className="text-[11px] text-on-surface-variant flex gap-2">
                                <span className="text-primary">•</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button 
                          onClick={() => setSelectedGalleryItem(null)}
                          className="w-full py-3 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                        >
                          {lang === 'en' ? 'Divine Closure' : '于心感念'}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Interaction Tip */}
              <div className="glass-panel p-6 rounded-3xl bg-secondary/5 border-secondary/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <Leaf size={20} className="text-secondary" />
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  {lang === 'en' ? 'Tip: Breathe in the scent of your meal for 5 deep breaths before your first bite to center yourself.' : '治愈仪式：在动筷前，连续深呼吸五次，感受食物的香气，让内心归于宁静。'}
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-24 h-24 rounded-full border-4 border-white glass-panel p-1 relative shadow-xl">
                   <img 
                    alt="ProfileLarge" 
                    className="w-full h-full rounded-full object-cover" 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" 
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full shadow-lg">
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="font-display text-2xl text-primary">Sybil Wang</h2>
                   <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">Soul Gourmet • Level 12</p>
                </div>
              </div>

              {/* Stats Bento */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-3xl space-y-1">
                  <p className="text-[10px] uppercase font-bold text-primary/50 tracking-wider">Entries</p>
                  <p className="text-3xl font-display text-primary">{history.length}</p>
                </div>
                <div className="glass-panel p-5 rounded-3xl space-y-1">
                  <p className="text-[10px] uppercase font-bold text-secondary/50 tracking-wider">Top Mood</p>
                  <p className="text-xl font-display text-secondary truncate">{history[0]?.emotions[0]?.name || 'N/A'}</p>
                </div>
              </div>

              {/* Gourmet Archive */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/70 px-2">{lang === 'en' ? 'Gourmet Archive' : '美食心境档案'}</h3>
                <div className="space-y-3">
                  {history.length > 0 ? (
                    history.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-4 rounded-2xl flex items-center gap-4 group hover:bg-white/60 transition-colors cursor-pointer"
                      >
                         <img src={item.dish.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt="History Item" />
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-bold text-primary truncate">{item.dish.name}</h4>
                              <span className="text-[8px] text-on-surface-variant/40 font-mono"><Clock size={8} className="inline mr-1" /> {new Date(item.timestamp).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[10px] text-on-surface-variant/60 truncate italic">"{item.mood}"</p>
                         </div>
                         <ChevronRight size={14} className="text-primary/20 group-hover:text-primary transition-colors" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-8 text-center glass-panel rounded-2xl">
                      <p className="text-xs text-on-surface-variant italic opacity-50">Empty Archive</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-md rounded-full z-50 bg-white/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(87,92,129,0.15)] overflow-hidden">
        <div className="flex justify-around items-center p-2">
          <NavItem 
            icon={<Brain size={20} />} 
            label={lang === 'en' ? 'Mood' : '心境'} 
            active={activeTab === 'mood'} 
            onClick={() => setActiveTab('mood')}
          />
          <NavItem 
            icon={<Utensils size={20} />} 
            label={lang === 'en' ? 'Kitchen' : '厨房'} 
            active={activeTab === 'kitchen'} 
            onClick={() => setActiveTab('kitchen')}
          />
          <NavItem 
            icon={<Sparkles size={20} />} 
            label={lang === 'en' ? 'Healing' : '治愈'} 
            active={activeTab === 'healing'} 
            onClick={() => setActiveTab('healing')}
          />
          <NavItem 
            icon={<User size={20} />} 
            label={lang === 'en' ? 'Profile' : '我的'} 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-4 py-2.5 transition-all duration-500 rounded-full cursor-pointer group ${
        active 
          ? 'bg-primary/10 text-primary scale-105 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]' 
          : 'text-on-surface-variant/40 hover:bg-white/40'
      }`}
    >
      <div className={`mb-1 transition-transform duration-500 ${active ? 'scale-110 drop-shadow-[0_4px_8px_rgba(87,92,129,0.2)]' : 'group-hover:scale-110'}`}>{icon}</div>
      <span className={`text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${active ? 'opacity-100' : 'opacity-60 scale-90'}`}>{label}</span>
    </button>
  );
}
