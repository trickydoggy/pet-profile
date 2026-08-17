import React, { useState } from 'react';
import {
  Heart,
  Cake,
  PawPrint,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  Smile,
  Cookie,
  Sun,
  Coffee,
  Bed,
  MapPin,
  CalendarHeart,
  Frown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUDDY_PROFILE, DAILY_ROUTINE, FAVORITE_THINGS, DISLIKE_THINGS } from '../../data/buddyData';

interface AboutScreenProps {
  onOpenPlaydateModal: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onOpenPlaydateModal }) => {
  const [treatsGiven, setTreatsGiven] = useState(42);
  const [bellyRubs, setBellyRubs] = useState(88);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const giveTreat = (e: React.MouseEvent) => {
    setTreatsGiven((prev) => prev + 1);
    setLastAction('Croc, croc! O Doug manda um "au-au" e um agradecimento! 🍪');

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x, y },
      colors: ['#22d3ee', '#38bdf8', '#a855f7', '#34d399', '#ffffff'],
    });

    setTimeout(() => setLastAction(null), 3000);
  };

  const giveBellyRub = (e: React.MouseEvent) => {
    setBellyRubs((prev) => prev + 1);
    setLastAction('Tump-tump-tump! A patinha acenando de pura alegria! 🐾');

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 55,
      origin: { x, y },
      colors: ['#f43f5e', '#fb7185', '#22d3ee', '#ffffff'],
    });

    setTimeout(() => setLastAction(null), 3000);
  };

  return (
    <div className="space-y-6 pb-24 animate-fadeIn">
      {/* Screen Title Banner with Frosted Glass Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-6 shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-10">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dldj8y8t4/image/upload/v1786834115/IMG_3289_rounded_rn1kdn.jpg"
              alt="Doug"
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-cyan-400/40 shadow-xl shadow-cyan-500/20"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-lg border border-white/30">
              🐾
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O cachorrinho mais bonito do mundo!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Conheça o Doug
            </h2>
            <p className="text-sm text-white/70 mt-1">
              Pug de 10 anos • Nascido em 14 de Setembro de 2015 • São Paulo, SP
            </p>
          </div>
        </div>

        {/* Interactive Treat & Belly Rub Action Bar */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="grid grid-cols-2 gap-3">
            <button
              id="give-treat-btn"
              onClick={giveTreat}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/10 border border-white/20 text-cyan-300 font-bold text-xs sm:text-sm hover:bg-white/15 active:scale-95 transition-all shadow-lg backdrop-blur-md"
            >
              <Cookie className="w-4 h-4 text-cyan-400" />
              <span>Dar Bifinho ({treatsGiven})</span>
            </button>
            <button
              id="give-belly-rub-btn"
              onClick={giveBellyRub}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-300 font-bold text-xs sm:text-sm hover:bg-rose-500/25 active:scale-95 transition-all shadow-lg backdrop-blur-md"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Carinho na Barriga ({bellyRubs})</span>
            </button>
          </div>

          {lastAction && (
            <div className="mt-3 p-2.5 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-center text-xs font-bold text-cyan-200 animate-bounce">
              {lastAction}
            </div>
          )}
        </div>
      </div>

      {/* Story & Biography */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-3 flex items-center gap-2">
          <PawPrint className="w-5 h-5 text-cyan-400" />
          <span>Minha História & Personalidade</span>
        </h3>
        <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-3">
          <p>
            Nós éramos em 3 irmãos e disseram que éramos todos iguais, mas eu tive a sorte de ser escolhido por essa família que me ama mais do que tudo no mundo! Desde a infância sempre fui muito feliz, e adorava passear pela vizinhança e cheirar todos os cantos para conhecer a região. Sou tranquilo com todos e estraguei poucos chinelos. Isto foi só quando os meus dentes estavam crescendo. Outro coisa de que me orgulho é que eu aprendi a fazer xixi no tapete higiênico sem precisar usar o pipi dog.
          </p>
          <p>
            Gosto de dormir no cantinho do sofá e agora que estou ficando mais velhinho parece que tenho mais sono. Também gosto de passear mesmo que por um curto período, na verdade eu não consigo andar por muito tempo. Por causa do meu focinho eu tenho pouco fôlego e não aguento muito esforço físico. Também não gosto de andar de carro. Fico muito ansioso e fico ofegante por um bom tempinho depois.
          </p>
          <p>
            Uma vez eu quase morri e fiquei internado no hospital por 2 dias, por causa de uma caminhada extensa em um dia muito quente. Desde então, só posso passear por curtos períodos e evito exercícios extenuantes, especialmente em climas quentes. 
            Eu também estou perdendo um pouca da visão e audição, por isso  gosto de ficar perto dos meus amigos humanos para que possam me auxiliar se necessário. Eles são muito carinhosos comigo e por isto sou muito feliz. Estou um pouco gordinho por isto tenho que comer ração especial para obesidade. Mesmo assim não dispenso uma bom bifinho de Maça e Cenoura.
          </p>
        </div>

        {/* Trait Pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {BUDDY_PROFILE.traits.map((trait, idx) => (
            <span
              key={idx}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border ${
                trait.type === 'sage'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
              }`}
            >
              {trait.label}
            </span>
          ))}
        </div>
      </div>

      {/* Personality & Skill Level Meters */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span>Atributos & Estatísticas Caninas</span>
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs sm:text-sm font-bold text-white mb-1.5">
              <span>Simpatia com Cães & Humanos</span>
              <span className="text-cyan-400">100% (Amigo Instantâneo)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_#22d3ee]" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs sm:text-sm font-bold text-white mb-1.5">
              <span>Energia & Vontade de Brincar</span>
              <span className="text-emerald-400">40% (Estou ficando velhinho....snif!)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_#34d399]" style={{ width: '40%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs sm:text-sm font-bold text-white mb-1.5">
              <span>Motivação por Petiscos & Radar de Cheiro</span>
              <span className="text-purple-400">100% (Detecta bifinho a 2km)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_#c084fc]" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs sm:text-sm font-bold text-white mb-1.5">
              <span>Natação & Pular Ondas</span>
              <span className="text-cyan-400">10% (Detesto Piscina)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_10px_#38bdf8]" style={{ width: '10%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Routine */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          <span>Um dia na vida do Doug</span>
        </h3>
        <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/15">
          {DAILY_ROUTINE.map((item, idx) => (
            <div key={idx} className="relative pl-9">
              <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-[0_0_8px_#22d3ee]" />
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {item.time}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                {item.activity}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 mt-1 leading-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Things */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <h3 className="text-lg sm:text-xl font-bold text-green-400 font-heading mb-4 flex items-center gap-2">
          <Smile className="w-5 h-5 text-green-400" />
          <span>Coisas que eu gosto</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FAVORITE_THINGS.map((fav, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">{fav.emoji}</span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {fav.name}
                </h4>
                <p className="text-xs text-white/70 mt-0.5">{fav.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dislikes */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <h3 className="text-lg sm:text-xl font-bold text-red-400 font-heading mb-4 flex items-center gap-2">
          <Frown className="w-5 h-5 text-red-400" />
          <span>Coisas que eu não gosto</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DISLIKE_THINGS.map((dislike, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">{dislike.emoji}</span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {dislike.name}
                </h4>
                <p className="text-xs text-white/70 mt-0.5">{dislike.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>    


      {/* Health & Care Information Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl border border-white/10">
        <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Informações de Saúde e Segurança</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50 block text-[11px]">Peso</span>
            <span className="font-bold text-white">{BUDDY_PROFILE.weight}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50 block text-[11px]">Vacinação</span>
            <span className="font-bold text-emerald-400">✓ 100% Em Dia</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50 block text-[11px]">Microchip</span>
            <span className="font-bold text-red-400">✓ Não tenho registro</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/50 block text-[11px]">Veterinário</span>
            <span className="font-bold text-white">Hospital Vets of All (11 99310-1401)</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Book Playdate */}
      {/* <div className="p-6 rounded-[24px] bg-gradient-to-r from-cyan-600/80 via-blue-600/80 to-purple-600/80 backdrop-blur-xl text-white text-center shadow-2xl border border-white/20">
        <h3 className="text-xl font-bold font-heading mb-1 text-white">
          Acha que nossos cães seriam grandes amigos?
        </h3>
        <p className="text-sm text-white/90 mb-4 max-w-sm mx-auto">
          Vamos nos encontrar no Parque Bernal Heights ou tomar um copinho de chantilly juntos!
        </p>
        <button
          id="about-cta-playdate-btn"
          onClick={onOpenPlaydateModal}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-extrabold text-sm hover:bg-white/90 active:scale-95 transition-all shadow-lg"
        >
          <CalendarHeart className="w-4 h-4 text-cyan-600" />
          <span>Solicitar Encontro Canino</span>
        </button>
      </div> */}
    </div>
  );
};
