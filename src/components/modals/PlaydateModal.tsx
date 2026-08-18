import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  PawPrint,
  Heart,
  Sparkles,
  CheckCircle2,
  Download,
  Send,
  MessageCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { NEIGHBORHOOD_SPOTS, BUDDY_PROFILE } from "../../data/buddyData";
import { NeighborhoodSpot } from "../../types";

interface PlaydateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpot?: NeighborhoodSpot | null;
}

const ENERGY_LABELS: Record<string, string> = {
  chill: "Cheirador Calmo 🌿",
  medium: "Trote Moderado 🐾",
  high: "Muita Bolinha 🎾",
  zoomies: "Modo Fênix/Corrida ⚡",
};

export const PlaydateModal: React.FC<PlaydateModalProps> = ({
  isOpen,
  onClose,
  initialSpot,
}) => {
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [energyLevel, setEnergyLevel] = useState<
    "chill" | "medium" | "high" | "zoomies"
  >("high");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [selectedSpotId, setSelectedSpotId] = useState(
    initialSpot ? initialSpot.id : NEIGHBORHOOD_SPOTS[0].id,
  );
  const [preferredDate, setPreferredDate] = useState("2026-08-16");
  const [preferredTime, setPreferredTime] = useState(
    "10:00 (Manhã no Morro)",
  );
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const selectedSpot =
    NEIGHBORHOOD_SPOTS.find((s) => s.id === selectedSpotId) ||
    NEIGHBORHOOD_SPOTS[0];

  const formatWhatsAppNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 8 || digits.length === 9) {
      return `5511${digits}`;
    }
    if (digits.length === 10 || digits.length === 11) {
      return `55${digits}`;
    }
    return digits.startsWith("55") ? digits : `55${digits}`;
  };

  const buildWhatsAppUrl = () => {
    const energyText = ENERGY_LABELS[energyLevel] || energyLevel;
    const message = [
      `*🐾 Convite de Encontro com o Doug!*`,
      ``,
      `🐶 *Cão Convidado:* ${dogName || "Amigo canino"}${dogBreed ? ` (${dogBreed})` : ""}`,
      `⚡ *Energia/Estilo:* ${energyText}`,
      `📍 *Local:* ${selectedSpot.name} (${selectedSpot.address})`,
      `📅 *Data:* ${preferredDate}`,
      `⏰ *Horário:* ${preferredTime}`,
      `👤 *Tutor(a):* ${ownerName}`,
      `📞 *Telefone:* ${ownerPhone}`,
      notes ? `📝 *Observações:* ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const targetNumber = formatWhatsAppNumber(BUDDY_PROFILE.humans.phone);
    return `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#22d3ee", "#38bdf8", "#a855f7", "#34d399", "#ffffff"],
    });

    const whatsappUrl = buildWhatsAppUrl();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadIcs = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Doug's World//Playdate Scheduler//EN",
      "BEGIN:VEVENT",
      `SUMMARY:Doggy Playdate with Doug & ${dogName || "Dog Friend"}! 🐾`,
      `DESCRIPTION:Doggy Playdate at ${selectedSpot.name}. Contact: ${BUDDY_PROFILE.humans.phone}`,
      `LOCATION:${selectedSpot.name}, ${selectedSpot.address}`,
      "DTSTART:20260816T170000Z",
      "DTEND:20260816T180000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "buddy-playdate.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[28px] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 p-6 relative text-white">
        {/* Close Button */}
        <button
          id="close-playdate-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 border border-white/20 flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-2">
                <PawPrint className="w-3.5 h-3.5" />
                <span>Solicitação de Encontro</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Marcar Encontro com o Doug
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                O Doug ama conhecer novos amigos peludos! Preencha este
                formulário rápido e seus humanos (Edson & Denise) confirmarão em
                algumas horas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Doggy Information */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <span>🐕</span> Informações do seu Cão
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Nome do Cão *
                    </label>
                    <input
                      id="input-dog-name"
                      type="text"
                      required
                      placeholder="ex: Rex, Mel, Pipoca"
                      value={dogName}
                      onChange={(e) => setDogName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Raça ou Mistura
                    </label>
                    <input
                      id="input-dog-breed"
                      type="text"
                      placeholder="ex: Labrador, Vira-lata, Beagle"
                      value={dogBreed}
                      onChange={(e) => setDogBreed(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                {/* Energy Match */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Estilo de Brincadeira & Nível de Energia
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: "chill", label: "Cheirador Calmo 🌿" },
                      { id: "medium", label: "Trote Moderado 🐾" },
                      { id: "high", label: "Muita Bolinha 🎾" },
                      { id: "zoomies", label: "Modo Fênix/Corrida ⚡" },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setEnergyLevel(lvl.id as any)}
                        className={`p-2 rounded-xl text-center font-bold border transition-all ${
                          energyLevel === lvl.id
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/50 shadow-md"
                            : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location & Time */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Local do Encontro
                </h4>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Selecione o Local Favorito
                  </label>
                  <select
                    id="select-play-spot"
                    value={selectedSpotId}
                    onChange={(e) => setSelectedSpotId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-slate-800 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {NEIGHBORHOOD_SPOTS.map((s) => (
                      <option
                        key={s.id}
                        value={s.id}
                        className="bg-slate-800 text-white"
                      >
                        {s.name} ({s.category} • {s.distance})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Data Preferida
                    </label>
                    <input
                      id="input-play-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Horário Preferido
                    </label>
                    <select
                      id="select-play-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option className="bg-slate-800 text-white">
                        08:00 (Passeio do Amanhecer)
                      </option>
                      <option className="bg-slate-800 text-white">
                        10:00 (Manhã no Morro)
                      </option>
                      <option className="bg-slate-800 text-white">
                        16:00 (Corrida da Tarde no Parque)
                      </option>
                      <option className="bg-slate-800 text-white">
                        17:30 (Pôr do Sol / Hora Dourada)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Human Contact Info */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <span>👤</span> Contato do Humano
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Seu Nome *
                    </label>
                    <input
                      id="input-owner-name"
                      type="text"
                      required
                      placeholder="ex: Alex Rivera"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Telefone *
                    </label>
                    <input
                      id="input-owner-phone"
                      type="tel"
                      required
                      placeholder="(415) 555-0199"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Observações ou brinquedos favoritos
                  </label>
                  <textarea
                    id="input-play-notes"
                    rows={2}
                    placeholder="ex: A Mel ama bolinhas de tênis e é super dócil com cães menores."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-playdate-btn"
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-500/25 border border-emerald-300/30 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Convite pelo WhatsApp 🐾</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Convite Pronto para Enviar! 🎉
              </h3>
              <p className="text-sm text-white/70 mt-2 max-w-sm mx-auto leading-relaxed">
                O WhatsApp com os dados do cão{" "}
                <strong>{dogName || "seu pet"}</strong> para o local{" "}
                <strong>{selectedSpot.name}</strong> foi gerado. Caso o aplicativo não tenha aberto automaticamente, clique no botão abaixo!
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left text-xs text-white/80 space-y-1.5">
              <p>
                <strong>📍 Local:</strong> {selectedSpot.name} (
                {selectedSpot.address})
              </p>
              <p>
                <strong>📅 Data & Horário:</strong> {preferredDate} • {preferredTime}
              </p>
              <p>
                <strong>👤 Tutor(a):</strong> {ownerName || "Não informado"}
              </p>
              <p>
                <strong>📞 Contato:</strong> {ownerPhone || "Salvo"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                id="open-whatsapp-btn"
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir WhatsApp</span>
              </a>
              <button
                id="download-calendar-btn"
                onClick={handleDownloadIcs}
                className="py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Agenda (.ics)</span>
              </button>
              <button
                id="done-playdate-btn"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
              >
                Concluído
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
