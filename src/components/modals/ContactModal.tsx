import React from "react";
import {
  X,
  Mail,
  Phone,
  Instagram,
  MapPin,
  ShieldAlert,
  Copy,
  Check,
} from "lucide-react";
import { BUDDY_PROFILE } from "../../data/buddyData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[28px] w-full max-w-md shadow-2xl border border-white/20 p-6 relative text-white">
        {/* Close Button */}
        <button
          id="close-contact-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 border border-white/20 flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-2">
            <span>🐾</span>
            <span>Humanos do Doug</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white font-heading">
            Entre em Contato
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Edson & Denise • São Paulo, SP
          </p>
        </div>

        {/* Contact Methods List */}
        <div className="space-y-3">
          {/* Phone Option 1 */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between shadow-lg hover:border-emerald-400/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-white/50 font-semibold block">
                  Ligação ou Mensagem - Edson
                </span>
                <a
                  href={`tel:${BUDDY_PROFILE.humans.phone.replace(/[^0-9]/g, "")}`}
                  className="text-sm font-bold text-white hover:text-emerald-300 transition-colors"
                >
                  {BUDDY_PROFILE.humans.phone}
                </a>
              </div>
            </div>
            <a
              href={`tel:${BUDDY_PROFILE.humans.phone.replace(/[^0-9]/g, "")}`}
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-all"
            >
              Ligar
            </a>
          </div>

          {/* Phone Option 2 */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between shadow-lg hover:border-emerald-400/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-white/50 font-semibold block">
                  Ligação ou Mensagem - Denise
                </span>
                <a
                  href={`tel:${BUDDY_PROFILE.humans.phone1.replace(/[^0-9]/g, "")}`}
                  className="text-sm font-bold text-white hover:text-emerald-300 transition-colors"
                >
                  {BUDDY_PROFILE.humans.phone1}
                </a>
              </div>
            </div>
            <a
              href={`tel:${BUDDY_PROFILE.humans.phone1.replace(/[^0-9]/g, "")}`}
              className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-all"
            >
              Ligar
            </a>
          </div>

          {/* Email Option */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between shadow-lg hover:border-cyan-400/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-white/50 font-semibold block">
                  E-mail
                </span>
                <a
                  href={`mailto:${BUDDY_PROFILE.humans.email}`}
                  className="text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  {BUDDY_PROFILE.humans.email}
                </a>
              </div>
            </div>
            <button
              onClick={() =>
                copyToClipboard(BUDDY_PROFILE.humans.email, "email")
              }
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Copiar e-mail"
            >
              {copiedField === "email" ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Instagram Option */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between shadow-lg hover:border-rose-400/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 border border-rose-400/30 flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-white/50 font-semibold block">
                  Aventuras no Instagram
                </span>
                <span className="text-sm font-bold text-white">
                  {BUDDY_PROFILE.humans.instagram}
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                copyToClipboard(BUDDY_PROFILE.humans.instagram, "ig")
              }
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copiedField === "ig" ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Vet Phone Number */}
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-between shadow-lg hover:border-rose-400/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 border border-rose-400/30 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-rose-400 font-bold block">
                  Hospital Vets of All
                </span>
                <a
                  href={`tel:${BUDDY_PROFILE.humans.vetPhone.replace(/[^0-9]/g, "")}`}
                  className="text-sm font-bold text-white hover:text-emerald-300 transition-colors"
                >
                  {BUDDY_PROFILE.humans.vetPhone}
                </a>
              </div>
            </div>
            <a
              href={`tel:${BUDDY_PROFILE.humans.vetPhone.replace(/[^0-9]/g, "")}`}
              className="px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-all"
            >
              Ligar
            </a>
          </div>

          {/* Emergency Vet Info */}
          {/* <div className="mt-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-200">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-rose-300">Veterinário de Emergência:</strong>
                <span className="text-sm font-bold text-white">{BUDDY_PROFILE.humans.emergencyVet}</span>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};
