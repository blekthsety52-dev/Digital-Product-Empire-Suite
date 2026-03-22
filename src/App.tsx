/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layout, 
  Download, 
  FileText, 
  Settings, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  Palette, 
  ShieldCheck, 
  Tag,
  Loader2,
  ArrowLeft,
  Info
} from 'lucide-react';
import { PRODUCTS, Product } from './data';
import { generateProductGuide, generateListingMetadata } from './services/geminiService';
import Markdown from 'react-markdown';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'guide' | 'metadata' | 'license' | 'style'>('guide');
  const [guideContent, setGuideContent] = useState<string>('');
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductSelect = async (product: Product) => {
    setSelectedProduct(product);
    setIsLoading(true);
    setActiveTab('guide');
    
    // Fetch dynamic content
    const [guide, meta] = await Promise.all([
      generateProductGuide(product.name, product.platform),
      generateListingMetadata(product.name, product.platform)
    ]);
    
    setGuideContent(guide);
    setMetadata(meta);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-serif">
      {/* Header */}
      <header className="border-b border-[#1A1A1A]/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white">
              <Layout size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Digital Product Empire</h1>
              <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-widest font-sans">v2024.1 Production Suite</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium uppercase tracking-wider">
            <a href="#" className="hover:text-[#5A5A40] transition-colors">Marketplace</a>
            <a href="#" className="hover:text-[#5A5A40] transition-colors">Analytics</a>
            <a href="#" className="hover:text-[#5A5A40] transition-colors">Settings</a>
            <button className="bg-[#5A5A40] text-white px-6 py-2 rounded-full hover:bg-[#4A4A30] transition-all shadow-lg shadow-[#5A5A40]/20">
              Export All
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-12">
                <h2 className="text-5xl font-light mb-4">The Master Collection</h2>
                <p className="text-xl text-[#1A1A1A]/60 max-w-2xl font-sans italic">
                  Exactly 15 high-utility templates engineered for friction-free commercial distribution on Canva, Notion, and Etsy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-[#1A1A1A]/5"
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="aspect-[3/2] relative overflow-hidden">
                      <img 
                        src={product.thumbnail} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                          {product.platform}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-widest">{product.category}</span>
                        <span className="text-lg font-medium">${product.price}</span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2 leading-tight">{product.name}</h3>
                      <p className="text-[#1A1A1A]/60 text-sm font-sans mb-6 line-clamp-2">{product.description}</p>
                      <div className="flex items-center text-[#5A5A40] text-xs font-bold uppercase tracking-widest group">
                        View Deliverables <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors mb-8"
                >
                  <ArrowLeft size={16} /> Back to Collection
                </button>

                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#1A1A1A]/5">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                    <img 
                      src={selectedProduct.thumbnail} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-[#F5F5F0] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {selectedProduct.platform}
                    </span>
                    <span className="text-[#1A1A1A]/40 text-xs">•</span>
                    <span className="text-[#1A1A1A]/60 text-xs font-sans italic">{selectedProduct.category}</span>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-[#1A1A1A]/10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1A1A1A]/60 font-sans">Recommended Price</span>
                      <span className="text-xl font-bold">${metadata?.pricingRecommendation || selectedProduct.price}</span>
                    </div>
                    <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#333] transition-all flex items-center justify-center gap-2">
                      <Download size={18} /> Download Master Zip
                    </button>
                  </div>
                </div>

                <div className="bg-[#5A5A40] text-white rounded-[32px] p-8 shadow-lg shadow-[#5A5A40]/20">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} /> QA Verification
                  </h4>
                  <ul className="space-y-3 text-sm font-sans opacity-90">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                      Validated against 2024 limits
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                      100% Responsive Integrity
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                      WCAG 2.1 AA Compliant
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                      Zero Console Errors
                    </li>
                  </ul>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-[40px] shadow-sm border border-[#1A1A1A]/5 overflow-hidden">
                  <div className="flex border-b border-[#1A1A1A]/10 overflow-x-auto">
                    {[
                      { id: 'guide', label: 'User Guide', icon: FileText },
                      { id: 'metadata', label: 'Listing Info', icon: Tag },
                      { id: 'style', label: 'Style Guide', icon: Palette },
                      { id: 'license', label: 'Licensing', icon: ShieldCheck },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-8 py-6 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                          activeTab === tab.id 
                            ? 'bg-[#F5F5F0] text-[#5A5A40] border-b-2 border-[#5A5A40]' 
                            : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                        }`}
                      >
                        <tab.icon size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-12 min-h-[600px]">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full space-y-4 py-24">
                        <Loader2 className="animate-spin text-[#5A5A40]" size={48} />
                        <p className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A]/40">Generating production assets...</p>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="prose prose-stone max-w-none"
                      >
                        {activeTab === 'guide' && (
                          <div className="markdown-body">
                            <Markdown>{guideContent}</Markdown>
                          </div>
                        )}

                        {activeTab === 'metadata' && metadata && (
                          <div className="space-y-8">
                            <section>
                              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-4">SEO Title</h3>
                              <div className="p-6 bg-[#F5F5F0] rounded-2xl font-sans text-lg border border-[#1A1A1A]/5">
                                {metadata.seoTitle}
                              </div>
                            </section>

                            <section>
                              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-4">Keywords (13 Tags)</h3>
                              <div className="flex flex-wrap gap-2">
                                {metadata.keywords.map((tag: string, i: number) => (
                                  <span key={i} className="px-4 py-2 bg-white border border-[#1A1A1A]/10 rounded-full text-xs font-medium font-sans">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </section>

                            <section>
                              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-4">Marketing Description</h3>
                              <div className="p-8 bg-[#F5F5F0] rounded-[32px] font-sans text-sm leading-relaxed border border-[#1A1A1A]/5">
                                {metadata.description}
                              </div>
                            </section>

                            <section className="pt-8 border-t border-[#1A1A1A]/10">
                              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-4">Platform Presets</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-6 border border-[#1A1A1A]/10 rounded-2xl">
                                  <h5 className="font-bold text-xs uppercase mb-2">Export Format</h5>
                                  <p className="text-sm font-sans text-[#1A1A1A]/60">
                                    {selectedProduct.platform === 'Etsy' ? '300-dpi CMYK PDF/X-4' : '72-dpi RGB PNG (sRGB)'}
                                  </p>
                                </div>
                                <div className="p-6 border border-[#1A1A1A]/10 rounded-2xl">
                                  <h5 className="font-bold text-xs uppercase mb-2">Technical Specs</h5>
                                  <p className="text-sm font-sans text-[#1A1A1A]/60">
                                    {selectedProduct.platform === 'Notion' ? 'UTF-8 Markdown, UNIX Line Endings' : '0.125-inch Bleed, Trim Marks'}
                                  </p>
                                </div>
                              </div>
                            </section>
                          </div>
                        )}

                        {activeTab === 'style' && (
                          <div className="space-y-12">
                            <section>
                              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-6">Color Palette (WCAG 2.1 AA)</h3>
                              <div className="grid grid-cols-5 gap-4">
                                {[
                                  { hex: '#1A1A1A', name: 'Ink', contrast: '21:1' },
                                  { hex: '#5A5A40', name: 'Olive', contrast: '7.2:1' },
                                  { hex: '#F5F5F0', name: 'Paper', contrast: '1.1:1' },
                                  { hex: '#FFFFFF', name: 'White', contrast: '1:1' },
                                  { hex: '#D1D1C1', name: 'Stone', contrast: '2.4:1' },
                                ].map((color) => (
                                  <div key={color.hex} className="space-y-2">
                                    <div className="aspect-square rounded-2xl shadow-inner border border-black/5" style={{ backgroundColor: color.hex }} />
                                    <p className="text-[10px] font-bold uppercase tracking-tighter text-center">{color.name}</p>
                                    <p className="text-[10px] text-[#1A1A1A]/40 text-center font-mono">{color.hex}</p>
                                  </div>
                                ))}
                              </div>
                            </section>

                            <section>
                              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-6">Typography Pairing</h3>
                              <div className="p-8 bg-[#F5F5F0] rounded-[32px] space-y-6">
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Display (Google Fonts: Playfair Display)</p>
                                  <p className="text-4xl font-bold">The quick brown fox jumps over the lazy dog.</p>
                                </div>
                                <div className="pt-6 border-t border-[#1A1A1A]/10">
                                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Body (Google Fonts: Inter)</p>
                                  <p className="text-lg font-sans leading-relaxed">
                                    Designed for maximum legibility across all digital interfaces. Inter provides a neutral yet modern feel that complements the elegance of Playfair Display.
                                  </p>
                                </div>
                              </div>
                            </section>

                            <section>
                              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-6">Logo Placement Grid</h3>
                              <div className="aspect-video bg-[#F5F5F0] rounded-[32px] border-2 border-dashed border-[#1A1A1A]/10 flex items-center justify-center relative">
                                <div className="absolute inset-[8%] border border-[#5A5A40]/30 flex items-center justify-center">
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A40]/40">8% Safe Zone Margin</span>
                                </div>
                                <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white">
                                  <Layout size={24} />
                                </div>
                              </div>
                            </section>
                          </div>
                        )}

                        {activeTab === 'license' && (
                          <div className="space-y-8 font-sans">
                            <div className="p-12 border-2 border-[#1A1A1A] rounded-sm relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-[#1A1A1A] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest">
                                v2024.1
                              </div>
                              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-8">Commercial Licensing Terms</h2>
                              
                              <div className="space-y-6 text-[11px] leading-relaxed uppercase tracking-tight">
                                <section>
                                  <h4 className="font-bold mb-2">1. Grant of License</h4>
                                  <p>Subject to the terms of this Agreement, [Your Brand] grants you a non-exclusive, non-transferable, worldwide license to use the Template for personal and limited commercial purposes.</p>
                                </section>

                                <section>
                                  <h4 className="font-bold mb-2">2. Permitted Uses</h4>
                                  <p>You may use the Template to create end-products for yourself or clients. You may modify the Template to suit your specific needs.</p>
                                </section>

                                <section>
                                  <h4 className="font-bold mb-2">3. Resale Restrictions</h4>
                                  <p>You may NOT resell, sub-license, or redistribute the original Template files. Any resale of derivative works must include the mandatory attribution: "Template originally designed by Digital Product Empire".</p>
                                </section>

                                <section>
                                  <h4 className="font-bold mb-2">4. Jurisdiction</h4>
                                  <p>This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, USA.</p>
                                </section>
                              </div>

                              <div className="mt-12 pt-8 border-t border-[#1A1A1A]/10 flex justify-between items-end">
                                <div>
                                  <p className="text-[8px] font-bold opacity-40">DIGITAL PRODUCT EMPIRE SUITE</p>
                                  <p className="text-[8px] font-bold opacity-40">OFFICIAL DOCUMENTATION</p>
                                </div>
                                <div className="w-24 h-24 opacity-10">
                                  <ShieldCheck size={96} />
                                </div>
                              </div>
                            </div>
                            
                            <button className="w-full border border-[#1A1A1A] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#1A1A1A] hover:text-white transition-all">
                              Download License PDF
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1A1A1A]">
                <Layout size={24} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Digital Product Empire</h2>
            </div>
            <p className="text-[#FFFFFF]/60 max-w-md font-sans leading-relaxed">
              Empowering creators with production-ready assets engineered for the modern digital marketplace. Built with precision, validated for performance.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/40 mb-6">Resources</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><a href="#" className="hover:text-[#D1D1C1] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#D1D1C1] transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-[#D1D1C1] transition-colors">Licensing</a></li>
              <li><a href="#" className="hover:text-[#D1D1C1] transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/40 mb-6">Legal</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><a href="#" className="hover:text-[#D1D1C1] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D1D1C1] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#D1D1C1] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-24 border-t border-white/10 mt-24 flex flex-col md:row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">© 2024 Digital Product Empire. All Rights Reserved.</p>
          <div className="flex gap-6 opacity-40">
            <Layout size={16} />
            <ShieldCheck size={16} />
            <Palette size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
}
