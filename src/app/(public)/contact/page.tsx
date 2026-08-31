"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from "lucide-react";
import { siteConfig, buildWhatsAppLink } from "@/config/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-slate-50 min-h-screen">
      {/* Premium Animated Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0a203d] via-[#0F2D52] to-[#163a69] py-14 sm:py-18 text-white text-center px-4 shadow-lg">
        {/* Animated Background Sky Glow & Grid Patterns */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.4) 1px, transparent 1px),
                                linear-gradient(45deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />
          {/* Animated Ambient Glowing Orbs */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 left-1/3 h-[280px] w-[500px] rounded-full bg-[#4bc4f9]/35 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/4 right-12 h-[320px] w-[420px] rounded-full bg-cyan-400/30 blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-3 py-2 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest border border-cyan-400/30"
          >
            ALP SOLAR · CONTACT US
          </motion.span>
          <div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-cyan-300 hover:drop-shadow-[0_8px_25px_rgba(75,196,249,0.5)] cursor-pointer select-none"
            >
              Talk To Our Solar Expert
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-300 font-semibold max-w-lg mx-auto leading-relaxed"
          >
            Have questions about solar installation or need a free site survey? Our team is here to assist you.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact Details Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#133863] via-[#0F2D52] to-[#1a477d] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-cyan-500/20 flex flex-col justify-between">
          {/* Subtle Ambient Card Glow */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-cyan-400/15 blur-2xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white tracking-tight">Multan Head Office</h2>
            <p className="text-xs font-semibold text-slate-200 mt-1">Serving all districts across South Punjab</p>

            <div className="mt-8 space-y-6">
              {/* Address Item */}
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-100 tracking-wider">Office Address</h4>
                  <p className="text-sm font-bold text-white mt-0.5">{siteConfig.address}</p>
                </div>
              </div>

              {/* Phone Item */}
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-100 tracking-wider">Phone Number</h4>
                  <Link href={`tel:${siteConfig.phone}`} className="text-base font-black text-white mt-0.5 block">
                    {siteConfig.phone}
                  </Link>
                </div>
              </div>

              {/* Email Item */}
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-100 tracking-wider">Email Inquiry</h4>
                  <Link href={`mailto:${siteConfig.email}`} className="text-sm font-bold text-white hover:text-cyan-300 mt-0.5 block transition-colors">
                    {siteConfig.email}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-slate-600/80">
            <Link
              href={buildWhatsAppLink("Hi ALP Solar, I would like to get in touch with your team.")}
              target="_blank"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-xl hover:bg-emerald-700 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Direct WhatsApp Chat</span>
            </Link>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-14 w-14 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
              <p className="text-slate-600 text-sm mt-1 max-w-sm mx-auto">
                Thank you for contacting ALP Solar South Punjab. Our representative will respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-semibold text-[#0F2D52] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold text-[#0F2D52]">Send Us a Message</h2>
              <p className="text-xs text-slate-500">Fill out the form below and we will get back to you within 1 hour.</p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Requirements *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your home/business system requirements..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold focus:border-[#0F2D52] focus:ring-2 focus:ring-[#0F2D52]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#0F2D52] py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-xl hover:bg-[#0a203d] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
