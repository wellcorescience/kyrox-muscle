'use client';

import { useState } from 'react';
import { 
  Settings, 
  MessageCircle, 
  Truck, 
  DollarSign, 
  Mail, 
  Image as ImageIcon, 
  Search, 
  User, 
  Lock,
  Check,
  Save,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: 'store', label: 'WhatsApp & Support', icon: MessageCircle },
  { id: 'shipping', label: 'COD & Shipping', icon: Truck },
  { id: 'seo', label: 'Banners & SEO', icon: Globe },
  { id: 'profile', label: 'Admin Profile', icon: User },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('store');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // States for store settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Kyrox Muscle',
    whatsappNumber: '+91 7015553297',
    supportEmail: 'support@kyroxmuscle.com',
    responseHours: '24/7 Support Active'
  });

  // States for shipping/COD settings
  const [shippingSettings, setShippingSettings] = useState({
    codEnabled: true,
    minCodValue: '₹999',
    codCharge: '₹0 (Free COD)',
    deliveryPartners: 'BlueDart, Delhivery, XpressBees',
    standardDays: '3-5 Business Days'
  });

  // States for SEO/Banner settings
  const [seoSettings, setSeoSettings] = useState({
    bannerText: 'LIMITED BATCH PRODUCTION IN PROGRESS - SECURE YOUR BATCH NOW!',
    bannerLink: '/shop',
    metaTitle: 'Kyrox Muscle | Premium Supplement Store',
    metaDesc: 'Authentic supplement store featuring Premium Muscle Mass Gainer, Anabolic Gainer, and Nitra Whey Protein formulas.',
  });

  // States for Admin settings
  const [adminSettings, setAdminSettings] = useState({
    name: 'Admin User',
    email: 'admin@kyrox.com',
    role: 'SuperAdmin'
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">System Settings</h1>
          <p className="text-zinc-400">Configure global shop behaviors, contact settings, shipping parameters, and SEO defaults.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 border border-electric-400 bg-electric-500 hover:bg-white text-black font-bold uppercase tracking-wider text-xs py-3.5 px-6 transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
              />
              <span>Saving configs...</span>
            </>
          ) : saveSuccess ? (
            <>
              <Check size={15} className="text-emerald-700" />
              <span>Configurations Saved!</span>
            </>
          ) : (
            <>
              <Save size={15} />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                isActive
                  ? 'border-electric-400 text-electric-300'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="border border-white/10 bg-zinc-950/60 p-8 rounded-xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'store' && (
            <motion.div
              key="store"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-6">WhatsApp & Support Settings</h3>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                    <MessageCircle size={12} className="text-emerald-400" /> WhatsApp Hotline Number
                  </label>
                  <input
                    type="text"
                    value={storeSettings.whatsappNumber}
                    onChange={(e) => setStoreSettings({ ...storeSettings, whatsappNumber: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm font-mono text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                    <Mail size={12} /> Support Email Address
                  </label>
                  <input
                    type="email"
                    value={storeSettings.supportEmail}
                    onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Support Operational Status
                  </label>
                  <input
                    type="text"
                    value={storeSettings.responseHours}
                    onChange={(e) => setStoreSettings({ ...storeSettings, responseHours: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shipping' && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-6">Cash on Delivery & Shipping Configurations</h3>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-white/10 bg-white/[0.02]">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white">Enable Cash on Delivery (COD)</p>
                      <p className="text-[10px] text-zinc-500 uppercase mt-0.5">Allow users to place unpaid orders via storefront</p>
                    </div>
                    <button
                      onClick={() => setShippingSettings({ ...shippingSettings, codEnabled: !shippingSettings.codEnabled })}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                        shippingSettings.codEnabled ? 'bg-electric-500' : 'bg-zinc-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-black transition-transform duration-200 ${
                          shippingSettings.codEnabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Minimum COD Order Limit
                  </label>
                  <input
                    type="text"
                    value={shippingSettings.minCodValue}
                    onChange={(e) => setShippingSettings({ ...shippingSettings, minCodValue: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                    <DollarSign size={12} /> Cash on Delivery Fee
                  </label>
                  <input
                    type="text"
                    value={shippingSettings.codCharge}
                    onChange={(e) => setShippingSettings({ ...shippingSettings, codCharge: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Logistics / Delivery Partners
                  </label>
                  <input
                    type="text"
                    value={shippingSettings.deliveryPartners}
                    onChange={(e) => setShippingSettings({ ...shippingSettings, deliveryPartners: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Standard Delivery ETA
                  </label>
                  <input
                    type="text"
                    value={shippingSettings.standardDays}
                    onChange={(e) => setShippingSettings({ ...shippingSettings, standardDays: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'seo' && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-6">Store Banners & Search Engine Indexing (SEO)</h3>
              
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                    <ImageIcon size={12} /> Active Homepage Urgency Banner Content
                  </label>
                  <input
                    type="text"
                    value={seoSettings.bannerText}
                    onChange={(e) => setSeoSettings({ ...seoSettings, bannerText: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Promotional Banner Target Link
                  </label>
                  <input
                    type="text"
                    value={seoSettings.bannerLink}
                    onChange={(e) => setSeoSettings({ ...seoSettings, bannerLink: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Default Search Engine Title Template
                  </label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    SEO Meta Description Index
                  </label>
                  <textarea
                    rows={4}
                    value={seoSettings.metaDesc}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDesc: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-6">Admin Profile Credentials</h3>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Admin Full Name
                  </label>
                  <input
                    type="text"
                    value={adminSettings.name}
                    onChange={(e) => setAdminSettings({ ...adminSettings, name: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 py-3.5 px-4 text-sm text-white focus:outline-none focus:border-electric-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    value={adminSettings.email}
                    disabled
                    className="w-full bg-zinc-900/30 border border-white/5 py-3.5 px-4 text-sm text-zinc-500 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    Assigned Admin Role
                  </label>
                  <input
                    type="text"
                    value={adminSettings.role}
                    disabled
                    className="w-full bg-zinc-900/30 border border-white/5 py-3.5 px-4 text-sm text-zinc-500 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                    <Lock size={12} /> Password reset link
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your admin email address!')}
                    className="w-full py-3.5 border border-white/10 bg-white/[0.02] hover:bg-white/5 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                  >
                    Generate Password Reset
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
