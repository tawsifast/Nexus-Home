import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#07070a] text-slate-400 border-t border-white/5 overflow-hidden">
      {/* Ambient Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-25 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                N
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                NEXUS<span className="text-cyan-400">HOME</span>
              </span>
            </div>
            <p className="text-sm font-light leading-relaxed">
              Next generation property rental platform. Smart, secure, and
              boundaryless living experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white border-l-2 border-cyan-400 pl-2">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  All Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white border-l-2 border-purple-500 pl-2">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Social Connect (With New X Logo) */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white border-l-2 border-pink-500 pl-2">
              Connect With Us
            </h4>
            <div className="flex gap-3">
              {/* X Logo integration as per requirement */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/8 flex items-center justify-center text-white hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300"
              >
                <RiTwitterXFill size={18} />
              </a>
              <a
                href="https://www.facebook.com/mdtawsifulislam.islam"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/8 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] transition-all duration-300"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://www.instagram.com/_t_a_w_s_i_f__"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/8 flex items-center justify-center hover:bg-pink-600 hover:text-white hover:shadow-[0_0_15px_rgba(219,39,119,0.6)] transition-all duration-300"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/tawsif-islam"
                className="w-10 h-10 rounded-xl bg-white/3 border border-white/8 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:shadow-[0_0_15px_rgba(14,165,233,0.6)] transition-all duration-300"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-white/[0.05] my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light">
          <p>&copy; 2026 NexusHome Inc. All rights reserved.</p>
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 font-medium">
            Designed for the Future
          </p>
        </div>
      </div>
    </footer>
  );
}
