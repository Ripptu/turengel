import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Check, 
  X, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Lock, 
  Users, 
  Activity, 
  ChevronDown,
  Info,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Custom interlocking halo SVG logo icon as requested, styled to serve as the signature angel/halo brand mark
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 256 256" 
      fill="currentColor"
    >
      <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
    </svg>
  );
}

// Security Partner Brands (Marquee)
const partnerBrands = [
  { src: 'https://s1.directupload.eu/images/260617/y3zo6qea.png', alt: 'DOM Sicherheitstechnik' },
  { src: 'https://s1.directupload.eu/images/260617/t8bwqryt.png', alt: 'Abus' },
  { src: 'https://s1.directupload.eu/images/260617/slbm8s2a.jpg', alt: 'BKS' },
  { src: 'https://s1.directupload.eu/images/260617/nuzdfwum.png', alt: 'EVVA' },
  { src: 'https://s1.directupload.eu/images/260617/znafn5gm.png', alt: 'IKON ASSA ABLOY' }
];

// Cities (Backers Marquee)
const citiesList = [
  'Essen', 'Bottrop', 'Gelsenkirchen', 'Duisburg', 'Mülheim an der Ruhr',
  'Gladbeck', 'Bochum', 'Moers', 'Marl', 'Oberhausen', 'Kamp-Lintfort',
  'Witten', 'Herne', 'Herten', 'Dorsten', 'Dortmund'
];

// Interactive Use Cases (Practice modes)
interface LiveMode {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  imageUrl: string;
}

const practiceModes: LiveMode[] = [
  {
    id: 'notdienst',
    tabLabel: '24h Notdienst',
    title: 'Türöffnung & Notdienst',
    description: 'Schnelle Hilfe bei zugefallenen oder verschlossenen Wohnungs- und Haustüren. Innerhalb von 15-30 Minuten vor Ort im gesamten Ruhrgebiet.',
    imageUrl: 'https://türengel.de/images/2026/03/24/tuerengel-schluesseldienst-oeffnen.png'
  },
  {
    id: 'auto',
    tabLabel: 'Autoöffnung',
    title: 'Fahrzeuge & PKW aller Marken',
    description: 'Zerstörungsfreie Öffnung von PKW-Türen, Kofferräumen und Dachboxen. Unsere modernen Werkzeuge garantieren schadensfreien Zugang.',
    imageUrl: 'https://schluesselflix.de/images/service/autooeffnung.jpg'
  },
  {
    id: 'sicherheit',
    tabLabel: 'Schlosswechsel',
    title: 'Schloss- & Zylindertausch',
    description: 'Fachmännische Montage nach Einbruchversuchen, bei defekten Schlössern oder Schlüsselverlust. Optimieren Sie Ihre Einbruchsicherheit.',
    imageUrl: 'https://www.frankenthal-schluesseldienst.de/assets/images/schlosswechsel-zylinder-an-tuer.png'
  }
];

// FAQ list
interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Wie schnell ist der Schlüsseldienst vor Ort?",
    answer: "In der Regel sind unsere erfahrenen Techniker innerhalb von 15 bis 30 Minuten bei Ihnen, je nach Ihrem genauen Standort und der aktuellen Verkehrslage im Ruhrgebiet."
  },
  {
    question: "Was kostet eine Türöffnung bei Türengel?",
    answer: "Wir arbeiten mit transparenten Festpreisen ab 69 € (inkl. MwSt.) für eine zugefallene Tür an Werktagen tagsüber (08:00 - 18:00 Uhr). Nachts sowie am Wochenende gilt unser fester Tarif von 99 € (inkl. MwSt.)."
  },
  {
    question: "Kann jede Tür ohne Schäden geöffnet werden?",
    answer: "Ja, zugefallene Türen (die nicht abgeschlossen sind) können in ca. 99% der Fälle absolut beschädigungsfrei und ohne Schäden an Schloss oder Zarge geöffnet werden. Bei verschlossenen Türen müssen wir den Zylinder meist aufbohren, ersetzen diesen jedoch direkt fachmännisch vor Ort."
  },
  {
    question: "Muss das Schloss nach einer Öffnung ausgetauscht werden?",
    answer: "Nicht zwingend. Wenn die Tür nur zugefallen war, bleibt alles unbeschädigt. Ein Schlosswechsel ist nur ratsam bei Defekt, Schlüsselverlust, Einbruchsspuren oder wenn Sie ein Upgrade der Sicherheitsklasse wünschen."
  },
  {
    question: "Öffnen Sie auch Autos, Briefkästen oder Tresore?",
    answer: "Absolut. Unser Team ist mit Spezialwerkzeug für materialschonende Autoöffnungen, Postkasten-Schlosswechsel, Tresor-Notöffnungen sowie Garagentür-Öffnungen ausgestattet."
  },
  {
    question: "Gibt es überraschende oder versteckte Kosten?",
    answer: "Nein. Bei Türengel gibt es keine versteckten Kosten. Die Festpreise für die reine Arbeitsleistung stehen fest. Kosten für An- und Abfahrt erfragen Sie bitte einfach kurz telefonisch bei unserem Monteur, damit wir Ihnen ein faires, individuelles Paket schnüren können."
  }
];

export default function App() {
  const [activePractice, setActivePractice] = useState<string>('notdienst');
  const [isEmergencyAssistantOpen, setIsEmergencyAssistantOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  
  // Interactive Price Calculator / Live Estimation States
  const [calcDoorType, setCalcDoorType] = useState<'zugefallen' | 'verschlossen'>('zugefallen');
  const [calcTime, setCalcTime] = useState<'tag' | 'nacht_wochenende'>('tag');
  const [calcLocation, setCalcLocation] = useState<string>('Essen');
  const [estimatedPrice, setEstimatedPrice] = useState<number>(69);
  
  // Waitlist / Callback state
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackAddress, setCallbackAddress] = useState('');
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Subpage view routing state
  const [currentView, setCurrentView] = useState<'home' | 'impressum' | 'datenschutz'>('home');

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentView]);

  // Recalculate price dynamically when user tweaks parameters
  useEffect(() => {
    let base = 69;
    if (calcDoorType === 'verschlossen') {
      // Locked doors require specialized tooling + new profile cylinder
      base = 129;
    }
    
    if (calcTime === 'nacht_wochenende') {
      base = calcDoorType === 'verschlossen' ? 169 : 99;
    }
    
    setEstimatedPrice(base);
  }, [calcDoorType, calcTime]);

  // Handle Callback Request
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackSuccess(true);
    setTimeout(() => {
      setIsCallbackOpen(false);
      setCallbackSuccess(false);
      setCallbackName('');
      setCallbackPhone('');
      setCallbackAddress('');
    }, 3500);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
  };

  const currentPracticeData = practiceModes.find(p => p.id === activePractice) || practiceModes[0];

  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen text-black antialiased relative selection:bg-black selection:text-white">
      
      {/* 
        ========================================================================
        1. FIRST SECTION: NAVBAR + HERO WRAPPER (h-screen, overflow-hidden container)
        ========================================================================
      */}
      {currentView === 'home' ? (
        <div className="h-screen flex flex-col overflow-hidden container max-w-[88rem] mx-auto relative px-0">
          
          {/* Transparent Navbar Over Hero */}
          <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Left Brand Area */}
              <button 
                onClick={() => setCurrentView('home')} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <img 
                  src="https://s1.directupload.eu/images/260617/mswk433t.png" 
                  alt="Türengel" 
                  className="h-10 w-auto object-contain transition-transform duration-500 hover:scale-105" 
                />
              </button>

              {/* Center Navigation Links matches original navigation layout but with lock/key topics */}
              <div className="hidden md:flex items-center gap-8">
                <a 
                  href="#preise" 
                  onClick={(e) => handleNavClick(e, 'preise')}
                  className="text-base text-gray-750 hover:text-black font-medium transition-colors duration-200"
                >
                  Preise
                </a>
                <a 
                  href="#leistungen" 
                  onClick={(e) => handleNavClick(e, 'leistungen')}
                  className="text-base text-gray-750 hover:text-black font-medium transition-colors duration-200"
                >
                  Leistungen
                </a>
                <a 
                  href="#einsatzgebiet" 
                  onClick={(e) => handleNavClick(e, 'einsatzgebiet')}
                  className="text-base text-gray-750 hover:text-black font-medium transition-colors duration-200"
                >
                  Einsatzgebiet
                </a>
                <a 
                  href="#faq" 
                  onClick={(e) => handleNavClick(e, 'faq')}
                  className="text-base text-gray-750 hover:text-black font-medium transition-colors duration-200"
                >
                  F.A.Q.
                </a>
                <a 
                  href="#kontakt" 
                  onClick={(e) => handleNavClick(e, 'kontakt')}
                  className="text-base text-gray-750 hover:text-black font-medium transition-colors duration-200"
                >
                  Kontakt
                </a>
              </div>

              {/* Right Action Button - Premium direct contact */}
              <div>
                <a 
                  href="tel:01776721642"
                  className="bg-black text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-805 transition-all duration-200 shadow-sm flex items-center gap-2 active:scale-95"
                >
                  <Phone className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">0177 6721642</span>
                  <span className="sm:hidden">Anrufen</span>
                </a>
              </div>
            </div>
          </nav>

        {/* Hero Section */}
        <div className="flex-1 px-6 pt-20 pb-6 flex items-end">
          <div 
            className="relative w-full rounded-2xl overflow-hidden shadow-sm"
            style={{ height: 'calc(100vh - 96px)' }}
          >
            {/* Background image replacement in hero area instead of video */}
            <img 
              src="https://images.t-online.de/2021/09/83055758v2/0x100:1920x1080/fit-in/1920x0/schluesseldienst-vereinbaren-sie-vor-der-beauftragung-wenn-moeglich-einen-festpreis.jpg" 
              alt="Schlüsseldienst Türengel Notdienst"
              className="object-cover absolute inset-0 w-full h-full"
            />
            {/* Safe visual overlay with premium backdrop blur for modern high-contrast readability */}
            <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px] bg-gradient-to-r from-white/85 via-white/60 to-transparent pointer-events-none z-0" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 md:p-12 pt-32 md:pt-40 max-w-4xl">
              
              {/* Premium indicator badge */}
              <div className="mb-4 bg-black/5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-mono text-black flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>24 Std. Schlüsselnotdienst Essen &amp; Ruhrgebiet</span>
              </div>

              <h1 
                className="text-black text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight max-w-xl mb-6"
                style={{ letterSpacing: '-0.04em' }}
              >
                Türöffnung<br />ab 69 Euro
              </h1>

              <p 
                className="text-black/80 text-base md:text-xl max-w-md mb-10 leading-relaxed font-sans"
                style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
              >
                Schnell, fair und absolut professionell. Ihr verlässlicher Schlüsseldienst mit Festpreis-Garantie, zerstörungsfreien Methoden und blitzschneller Ankunft.
              </p>

              {/* Pill button to trigger Callback / Call directly */}
              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href="tel:01776721642"
                  className="group inline-flex items-center gap-4 bg-black text-white text-base md:text-lg font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-black/20 active:scale-98"
                >
                  <span>Monteur anrufen</span>
                  <span className="bg-white rounded-full p-2.5 transition-transform duration-300 group-hover:translate-x-1.5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-black" />
                  </span>
                </a>
                
                <button 
                  onClick={() => setIsCallbackOpen(true)}
                  className="bg-white/90 hover:bg-white text-black font-semibold px-6 py-3.5 rounded-full text-sm transition-all duration-200 border border-gray-200/50 backdrop-blur-md active:scale-95"
                >
                  Rückruf in 10 Min anfordern
                </button>
              </div>

              {/* Brand Marquee inside Hero displaying premium hardware brands they utilize */}
              <div className="mt-auto w-full max-w-md overflow-hidden pt-12 md:pt-16">
                <p className="text-black/40 text-xs font-semibold tracking-wider uppercase mb-3 font-mono">
                  Eingesetzte Sicherheits-Qualitätsmarken
                </p>
                
                <div className="w-full overflow-hidden relative">
                  <div className="marquee-track flex py-2 items-center">
                    {/* First Loop */}
                    {partnerBrands.map((brand, i) => (
                      <img 
                        key={`partner-brand-1-${i}`}
                        src={brand.src}
                        alt={brand.alt}
                        className="mx-8 h-8 w-auto object-contain transition-transform duration-200 hover:scale-105 select-none cursor-default"
                      />
                    ))}
                    {/* Second Loop for seamless scroll */}
                    {partnerBrands.map((brand, i) => (
                      <img 
                        key={`partner-brand-2-${i}`}
                        src={brand.src}
                        alt={brand.alt}
                        className="mx-8 h-8 w-auto object-contain transition-transform duration-200 hover:scale-105 select-none cursor-default"
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      ) : (
        <header className="sticky top-0 bg-white border-b border-gray-150 py-4 px-6 z-40 shadow-xs">
          <div className="container max-w-[88rem] mx-auto flex items-center justify-between">
            <button 
              onClick={() => setCurrentView('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                src="https://s1.directupload.eu/images/260617/mswk433t.png" 
                alt="Türengel" 
                className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105" 
              />
            </button>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-base text-gray-750 hover:text-black font-semibold transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>Zurück zur Startseite</span>
              </button>
              <a 
                href="tel:01776721642"
                className="bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>0177 6721642</span>
              </a>
            </div>
          </div>
        </header>
      )}

      {currentView === 'home' && (
        <>

      {/* 
        ========================================================================
        2. INFO SECTION ("Meet USD Halo." -> "Lernen Sie Türengel kennen")
        ========================================================================
      */}
      <section id="preise" className="bg-[#F5F5F5] px-6 py-28 relative">
        <div className="max-w-[88rem] mx-auto">
          
          {/* Row 1: Left Intro + Right Large Concept Paragraph */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-start">
            
            <div className="flex flex-col items-start">
              <h2 
                className="text-black text-5xl md:text-6xl font-medium leading-none mb-8 tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                Garantierte Festpreise.
              </h2>
              
              <button 
                onClick={() => setIsEmergencyAssistantOpen(true)}
                className="group inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-7 pr-2 py-1.5 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm active:scale-95"
              >
                <span>Live Preiskalkulator</span>
                <span className="bg-white rounded-full p-2.5 transition-transform duration-300 group-hover:translate-x-1 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-black" />
                </span>
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-black/75 text-2xl md:text-3xl leading-relaxed md:leading-snug font-light tracking-tight max-w-xl">
                Türengel steht für kompromisslose Vertragstreue. Keine versteckten Gebühren oder dubiosen Zuschläge. Unsere Einsätze orientieren sich streng an unseren transparenten Ortstarifen.
              </p>
              
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-2xl p-5 flex gap-4 max-w-xl">
                <AlertCircle className="w-6 h-6 shrink-0 text-amber-700" />
                <p className="text-sm font-sans leading-relaxed">
                  <strong>Konsumentenschutz-Hinweis:</strong> Seien Sie äußerst skeptisch bei Angeboten wie „Türöffnung ab 20 €“, da es sich fast immer um betrügerische Lockpreise handelt. Am Ende folgen oft horrende Rechnungen im vierstelligen Bereich.
                </p>
              </div>
            </div>

          </div>

          {/* Row 2: Bento Grid Cards (German locksmith prices & features) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Mo-Fr Tagsüber */}
            <div className="bg-white rounded-2xl p-8 min-h-80 flex flex-col justify-between shadow-xs transition-transform duration-300 hover:scale-[1.01] border border-gray-200/50">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#2B2644] font-semibold">Werktags</span>
                  <h3 className="text-black text-3xl font-medium tracking-tight">
                    Montag – Freitag
                  </h3>
                  <p className="text-sm text-gray-500 font-mono">08:00 – 18:00 Uhr</p>
                </div>
                <div className="bg-[#2B2644] text-white px-3 py-1.5 rounded-full text-xs font-mono font-bold">
                  Standard
                </div>
              </div>
              
              <div className="pt-8">
                <div className="text-5xl font-bold tracking-tight text-black mb-2 font-mono">
                  69 € <span className="text-xs font-sans text-gray-500 font-normal">inkl. MwSt.</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Gilt für zugefallene, unverschlossene Wohnungs- und Haustüren. 99% zerstörungsfreie Öffnung.
                </p>
              </div>
            </div>

            {/* Card 2: Mo-Fr Abend/Nacht */}
            <div className="bg-[#2B2644] rounded-2xl p-8 min-h-80 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01] shadow-md border border-white/5">
              <div className="flex justify-between items-start text-white">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">Nachtnotdienst</span>
                  <h3 className="text-white text-3xl font-medium tracking-tight">
                    Montag – Freitag
                  </h3>
                  <p className="text-sm text-white/50 font-mono">18:00 – 08:00 Uhr</p>
                </div>
                <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-mono font-bold">
                  24h Tarif
                </div>
              </div>

              <div className="pt-8">
                <div className="text-5xl font-bold tracking-tight text-white mb-2 font-mono">
                  99 € <span className="text-xs font-sans text-white/55 font-normal">inkl. MwSt.</span>
                </div>
                <p className="text-white/70 text-sm">
                  Fairer Nachtnotdienst-Pauschaltarif für raschen Einlass auch in den späten Stunden.
                </p>
              </div>
            </div>

            {/* Card 3: Wochenende & Feiertage */}
            <div className="bg-[#2B2644] rounded-2xl p-8 min-h-80 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01] shadow-md border border-white/5">
              <div className="flex justify-between items-start text-white">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-semibold">Wochenende</span>
                  <h3 className="text-white text-3xl font-medium tracking-tight">
                    Sa. &amp; So.
                  </h3>
                  <p className="text-sm text-white/50 font-mono">Rund um die Uhr</p>
                </div>
                <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-mono font-bold">
                  Feiertags
                </div>
              </div>

              <div className="pt-8">
                <div className="text-5xl font-bold tracking-tight text-white mb-2 font-mono">
                  99 € <span className="text-xs font-sans text-white/55 font-normal">inkl. MwSt.</span>
                </div>
                <p className="text-white/70 text-sm">
                  Konstanter Wochenend-Pauschaltarif. Keine überzogenen Aufschläge, absolute Planbarkeit.
                </p>
              </div>
            </div>

            {/* Card 4: Faires Qualitätsversprechen */}
            <div 
              className="rounded-2xl p-8 min-h-80 flex flex-col justify-between shadow-xs transition-transform duration-300 hover:scale-[1.01] bg-white border border-gray-150 relative overflow-hidden"
              style={{ 
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url("https://images.t-online.de/2021/09/83055758v2/0x100:1920x1080/fit-in/1920x0/schluesseldienst-vereinbaren-sie-vor-der-beauftragung-wenn-moeglich-einen-festpreis.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-black text-2xl font-semibold leading-tight tracking-tight drop-shadow-xs">
                  Lokaler Notdienst
                </h3>
                <span className="bg-black text-white rounded-full px-3 py-1 text-xs font-mono font-semibold">
                  15-30 Min vor Ort
                </span>
              </div>
              
              <div className="pt-6">
                <p className="text-black text-sm leading-relaxed font-medium bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-xs border border-white/50">
                  Wir sind fest im Ruhrgebiet verwurzelt und garantieren extrem kurze Fahrzeiten sowie echte, lokale Ansprechpartner.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        3. BACKED BY SECTION / CURRENT ACTIVE CITIES (infinite marquee row)
        ========================================================================
      */}
      <section id="einsatzgebiet" className="bg-[#F5F5F5] border-y border-gray-200/50 py-12 px-6">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          
          {/* Left Column (1/4 space) */}
          <div className="md:col-span-1 pr-4">
            <p className="text-black/80 text-base leading-relaxed font-sans font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-black shrink-0 animate-bounce" />
              <span>Lokaler Einsatzdienst in Ihrer Nähe:</span>
            </p>
            <p className="text-xs text-black/50 font-mono mt-1">Zentrale in Essen – Einsätze im gesamten Ruhrgebiet</p>
          </div>

          {/* Right Column (3/4 space with continuous marquee slider of German cities from the PDF) */}
          <div className="md:col-span-3 overflow-hidden relative">
            {/* Edge opacity blurs */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F5F5F5] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F5F5F5] to-transparent z-10 pointer-events-none" />
            
            <div className="backers-track flex py-4 items-center">
              {/* Loop 1 */}
              {citiesList.map((city, i) => (
                <span 
                  key={`city-1-${i}`}
                  className="mx-10 shrink-0 text-black/60 hover:text-black transition-colors duration-200 select-none cursor-default font-sans font-semibold flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {city}
                </span>
              ))}
              {/* Loop 2 */}
              {citiesList.map((city, i) => (
                <span 
                  key={`city-2-${i}`}
                  className="mx-10 shrink-0 text-black/60 hover:text-black transition-colors duration-200 select-none cursor-default font-sans font-semibold flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {city}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        4. LEISTUNGEN & USE CASES SECTION ("Unsere Leistungen" & modes)
        ========================================================================
      */}
      <section id="leistungen" className="bg-[#F5F5F5] px-6 py-28">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Explanatory Header */}
          <div className="md:pr-12 md:pt-2 flex flex-col h-full justify-between">
            <div>
              <span className="text-black/60 text-sm font-semibold tracking-wider uppercase mb-3 font-mono block">
                Türengel Portfolio
              </span>
              
              <h2 
                className="text-black text-6xl md:text-7xl font-semibold leading-none mb-6 tracking-tighter"
                style={{ letterSpacing: '-0.04em' }}
              >
                Unsere Dienste
              </h2>
              
              <p className="text-black/65 text-base leading-relaxed max-w-sm mb-12">
                Hier ist Ihr Zugang zu professioneller Hilfe garantiert. Wir öffnen, sichern und beraten im gesamten Ruhrgebiet rund um das Thema Haus- und Objektsicherheit.
              </p>
            </div>

            {/* Premium Selector Tabs for Interactivity using the exact structural boundary */}
            <div id="praxis" className="flex flex-col gap-3 max-w-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-1">
                Wählen Sie einen Bereich
              </span>
              {practiceModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActivePractice(mode.id)}
                  className={`text-left px-6 py-4.5 rounded-2xl transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                    activePractice === mode.id
                      ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                      : 'bg-white/80 hover:bg-white text-gray-805 border-gray-200/50 hover:border-gray-300/80 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-lg tracking-tight">{mode.tabLabel}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activePractice === mode.id 
                      ? 'bg-white/20 text-white translate-x-1' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-black/5'
                  }`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>

            {/* Quick trust metrics panel */}
            <div className="mt-12 pt-10 border-t border-gray-200/60 max-w-sm">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-black">99%</p>
                  <p className="text-xs text-black/50">Zerstörungsfreie Öffnung</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-black">15-30 Min</p>
                  <p className="text-xs text-black/50">Fahrzeit Durchschnitt</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Card with background video loop and layered content */}
          <div className="relative rounded-3xl overflow-hidden min-h-[640px] md:min-h-[720px] shadow-lg border border-gray-150 flex flex-col justify-end">
            
            {/* Background Image of selected service */}
            <img 
              src={currentPracticeData.imageUrl} 
              alt={currentPracticeData.title}
              className="object-cover absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
            />

            {/* Gradient overlay to guarantee absolute typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent z-1" />

            {/* Interactive Mode Content Layer */}
            <div className="relative z-10 p-8 md:p-12 flex flex-col items-start">
              
              {/* Pulsing Tag */}
              <div className="mb-4 bg-black/5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-mono text-black flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Leistungsdetail</span>
              </div>

              {/* Title */}
              <h3 
                className="text-black text-4xl md:text-5xl font-medium leading-tight mb-5 tracking-tight transition-all duration-300"
                style={{ letterSpacing: '-0.03em' }}
              >
                {currentPracticeData.title}
              </h3>

              {/* Description */}
              <p className="text-black/75 text-base md:text-lg max-w-md mb-8 leading-relaxed font-sans font-normal">
                {currentPracticeData.description}
              </p>

              {/* Interactive link leading to emergency assistant */}
              <button 
                onClick={() => setIsEmergencyAssistantOpen(true)}
                className="group inline-flex items-center gap-3 text-black font-semibold text-base focus:outline-none cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-xs transition-colors group-hover:bg-white border border-gray-150">
                  <ArrowRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <span className="hover:underline underline-offset-4">Jetzt berechnen &amp; buchen</span>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        5. ACCORDION FAQ SECTION (German content from the PDF FAQ block)
        ========================================================================
      */}
      <section id="faq" className="bg-[#F5F5F5] px-6 py-24 border-t border-gray-200/50">
        <div className="max-w-[56rem] mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-2 block">
              Transparenz &amp; Aufklärung
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black mb-4">
              Häufig gestellte Fragen (F.A.Q)
            </h2>
            <p className="text-gray-600 max-w-md mx-auto text-base">
              Haben Sie Fragen zu Preisen, Abläufen oder der zerstörungsfreien Türöffnung? Finden Sie hier schnelle, professionelle Antworten.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/50 overflow-hidden transition-all duration-255"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between text-black hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-base md:text-lg tracking-tight pr-4">
                      {item.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-black text-white' : 'text-gray-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[300px] border-t border-gray-100' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 text-gray-700 text-sm md:text-base leading-relaxed bg-[#FAFAFA]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick contact trigger box */}
          <div className="mt-12 p-6 bg-black text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-semibold text-lg">Haben Sie einen dringenden Notfall?</h4>
              <p className="text-xs text-gray-400 font-mono">24/7 Notfalldienst Essen &amp; Ruhrgebiet</p>
            </div>
            <a 
              href="tel:01776721642"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-base px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>0177 6721642 anrufen</span>
            </a>
          </div>

        </div>
      </section>
        </>
      )}

      {currentView === 'impressum' && (
        <div className="container max-w-4xl mx-auto px-6 py-16 bg-white my-12 rounded-3xl border border-gray-150 shadow-xs">
          <button 
            onClick={() => setCurrentView('home')} 
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full font-medium"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-500" />
            <span>Zurück zur Startseite</span>
          </button>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-black mb-8">Impressum</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed font-sans">
            <section className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h2 className="text-xl font-bold text-black flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                Angaben gemäß § 5 TMG
              </h2>
              <div className="text-gray-800 space-y-1 pl-3 font-medium">
                <p className="text-lg font-bold text-black">Türengel Einbruchschutz &amp; Schlüsselnotdienst</p>
                <p>Bocholderstr. 226</p>
                <p>45356 Essen</p>
              </div>
            </section>

            <section className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h2 className="text-xl font-bold text-black flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                Kontakt &amp; Erreichbarkeit
              </h2>
              <div className="space-y-2 pl-3">
                <p className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium font-sans">Notruf &amp; Zentrale:</span>
                  <a href="tel:01776721642" className="text-emerald-600 font-bold hover:underline">0177 6721642</a> (Rund um die Uhr erreichbar)
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium font-sans">E-Mail:</span>
                  <a href="mailto:kontakt@turengel.de" className="text-black font-semibold hover:underline">kontakt@turengel.de</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium font-sans">Sicherheitsportal:</span>
                  <button onClick={() => setCurrentView('home')} className="text-black font-semibold underline hover:text-emerald-500">www.türengel.de</button>
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">Vertretungsberechtigte Personen</h2>
              <p className="pl-3">
                Zugehörig zur im Handelsregister eingetragenen Einzelfirma bzw. Einzelkaufmann-Registrierung des Hauptsitzes Essen für Sicherheitsnotdienste und Einbautätigkeiten. Die Vertretungsberechtigung erfolgt nach den gesetzlichen Bestimmungen.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">Umsatzsteuer-ID</h2>
              <p className="pl-3">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm text-black inline-block mt-1">DE342893122</span>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">Zuständige Kammer &amp; Aufsichtsbehörde</h2>
              <p className="pl-3">
                Industrie- und Handelskammer (IHK) zu Essen<br />
                Am Waldthausenpark 2, 45127 Essen<br />
                Die Gewerbeberechtigung wurde nach deutschem Recht erteilt.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">Betriebshaftpflichtversicherung</h2>
              <p className="pl-3 text-gray-600">
                Zürich Insurance plc, Niederlassung für Deutschland<br />
                Platz der Einheit 2, 60327 Frankfurt am Main<br />
                Geltungsbereich: Bundesrepublik Deutschland (Umfasst sämtliche Tätigkeiten im Ruhrgebiet bezüglich zerstörungsfreier Türöffnungen, Schlosstausch und Einbruchschutzberatung).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">EU-Streitschlichtung</h2>
              <p className="pl-3 text-sm text-gray-500">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">https://ec.europa.eu/consumers/odr</a>.<br />
                Unsere E-Mail-Adresse finden Sie im obigen Bereich. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      )}

      {currentView === 'datenschutz' && (
        <div className="container max-w-4xl mx-auto px-6 py-16 bg-white my-12 rounded-3xl border border-gray-150 shadow-xs">
          <button 
            onClick={() => setCurrentView('home')} 
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full font-medium"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-500" />
            <span>Zurück zur Startseite</span>
          </button>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-black mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-8 text-gray-750 leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">1. Datenschutz auf einen Blick</h2>
              <p className="pl-3">
                <strong>Allgemeine Hinweise:</strong> Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen entnehmen Sie dem untenstehenden detaillierten Text.
              </p>
              <h3 className="text-base font-semibold text-black mt-3 pl-3">Datenerfassung auf dieser Website</h3>
              <p className="pl-6 text-sm text-gray-600">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in das Rückrufformular oder den Live-Preiskalkulator eingeben.
              </p>
            </section>

            <section className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h2 className="text-xl font-bold text-black flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                2. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <div className="space-y-3 text-sm text-gray-600 pl-3">
                <p>
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.
                </p>
                <p>
                  Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Diese Datenschutzerklärung erläutert, welche Daten wir erheben, wie und zu welchem Zweck das geschieht.
                </p>
                <div className="mt-3 p-4 bg-yellow-50 text-yellow-850 rounded-xl border border-yellow-250 font-normal">
                  <strong>Verantwortliche Stelle:</strong><br />
                  Türengel Einbruchschutz &amp; Schlüsselnotdienst<br />
                  Bocholderstr. 226, 45356 Essen<br />
                  E-Mail: kontakt@turengel.de
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">3. Datenerfassung auf unserer Website</h2>
              
              <h3 className="text-base font-semibold text-black mt-2 pl-3">Hosting</h3>
              <p className="pl-6 text-sm text-gray-650">
                Unsere Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den servern des Hosters gespeichert. Dies können v. a. IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Webseitenzugriffe und sonstige Daten, die über die Website generiert werden, sein.
              </p>

              <h3 className="text-base font-semibold text-black mt-2 pl-3">Server-Log-Dateien</h3>
              <p className="pl-6 text-sm text-gray-650">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt: Browsertyp, Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners sowie Uhrzeit der Serveranfrage.
              </p>

              <h3 className="text-base font-semibold text-black mt-2 pl-3">Rückrufanfragen &amp; Notfall-Assistent</h3>
              <p className="pl-6 text-sm text-gray-650">
                Wenn Sie uns Anfragen über den interaktiven Notfall-Assistenten oder das Rückrufformular zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-100 pb-2">4. Ihre Rechte bezüglich Ihrer Daten</h2>
              <p className="pl-3 text-sm text-gray-650">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenden Sie sich hierzu gerne per E-Mail oder Post an uns. Es steht Ihnen auch ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        6. CONTACT / COMPANY DETAILS SECTION (Anbieterkennzeichnung from PDF)
        ========================================================================
      */}
      <section id="kontakt" className="bg-[#121118] text-white py-20 px-6 relative overflow-hidden">
        <div className="max-w-[88rem] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/10">
            
            {/* Col 1: Brand & Bio */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img 
                  src="https://s1.directupload.eu/images/260617/mswk433t.png" 
                  alt="Türengel" 
                  className="h-10 w-auto object-contain bg-white/15 rounded-xl px-2 py-1" 
                />
              </div>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Türengel ist Ihr fachmännisch geschulter, transparenter Schlüssel- und Sicherheitsnotdienst im gesamten Ruhrgebiet. Wir garantieren erstklassige Arbeit und verlässliche Preise.
              </p>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-mono">
                  Zertifizierter Fachbetrieb
                </div>
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-mono">
                  Ruhrgebiet-Weit
                </div>
              </div>
            </div>

            {/* Col 2: Impressum & Address (from PDF details) */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-gray-400 font-bold">Impressum &amp; Rechtliches</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="font-semibold text-white">Türengel Einbruchschutz &amp; Schlüsselnotdienst</p>
                <p>Bocholderstr. 226</p>
                <p>45356 Essen</p>
                <p className="pt-2">Vertretungsberechtigte Geschäftsführer laut gesetzlichen Bestimmungen.</p>
                <div className="pt-4 flex gap-4 text-xs text-gray-400 font-sans">
                  <button onClick={() => { setCurrentView('impressum'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white cursor-pointer underline text-left font-medium">Impressum</button>
                  <button onClick={() => { setCurrentView('datenschutz'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-white cursor-pointer underline text-left font-medium">Datenschutzerklärung</button>
                </div>
              </div>
            </div>

            {/* Col 3: Direct Contact Information */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-gray-400 font-bold">Direktkontakt 24 Std.</h4>
              <div className="space-y-3">
                <a 
                  href="tel:01776721642" 
                  className="flex items-center gap-3 text-lg font-bold text-emerald-400 hover:text-emerald-350 transition-colors"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>0177 6721642</span>
                </a>
                
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Notruf ist rund um die Uhr besetzt</span>
                </p>

                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Auch an Sonn- &amp; Feiertagen aktiv</span>
                </p>

                <a 
                  href="mailto:kontakt@turengel.de" 
                  className="text-sm text-gray-300 hover:text-white transition-colors block underline underline-offset-4"
                >
                  kontakt@turengel.de
                </a>
              </div>
            </div>

          </div>

          <div className="pt-10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-mono gap-4">
            <p>&copy; {new Date().getFullYear()} Türengel. Alle Rechte vorbehalten. Mitglied der Handwerks-Initiative Ruhr.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-help">Notöffnungen</span>
              <span>·</span>
              <span className="hover:text-white cursor-help">Einbruchschutz</span>
              <span>·</span>
              <span className="hover:text-white cursor-help">Zylindertausch</span>
            </div>
          </div>

        </div>
      </section>


      {/* 
        ========================================================================
        INTERACTIVE EMERGENCY ASSISTANT & LIVE PRICE ESTIMATION (MODAL SANDBOX)
        ========================================================================
      */}
      {isEmergencyAssistantOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl relative border border-gray-150 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top Bar */}
            <div className="p-6 border-b border-gray-200/50 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-transparent p-1">
                  <img 
                    src="https://s1.directupload.eu/images/260617/mswk433t.png" 
                    alt="Türengel Logo" 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-black">Türengel Notfall-Assistent</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Preiskalkulation &amp; Einsatzplanung
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsEmergencyAssistantOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Dynamic Live Estimation Panel */}
              <div className="bg-[#121118] text-white p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <img 
                    src="https://s1.directupload.eu/images/260617/mswk433t.png" 
                    alt="Türengel Logo decoration" 
                    className="w-24 h-auto object-contain invert" 
                  />
                </div>
                
                <p className="text-xs text-gray-400 font-mono tracking-wider">
                  NETTO/BRUTTO FESTPREIS (INKL. DEUTSCHER MWST)
                </p>
                
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2 font-mono text-emerald-400">
                  {estimatedPrice} €
                </h3>

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-white/10 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">ESTIMATED ARRIVAL IN</p>
                    <p className="text-lg font-medium text-emerald-300 font-mono mt-0.5">
                      15 - 30 Minuten
                    </p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Festpreis-Sicherheit
                  </span>
                </div>
              </div>

              {/* Dynamic Settings */}
              <div className="space-y-4">
                
                {/* Parameter: Door State Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono block mb-2">
                    Zustand der Tür / Schloss
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setCalcDoorType('zugefallen')}
                      className={`px-4 py-3 rounded-xl border font-semibold text-sm transition-all flex flex-col items-start ${
                        calcDoorType === 'zugefallen' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-350'
                      }`}
                    >
                      <span>Nur zugefallen</span>
                      <span className={`text-[11px] font-mono mt-0.5 ${calcDoorType === 'zugefallen' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Schlüssel steckt evtl. innen
                      </span>
                    </button>

                    <button 
                      onClick={() => setCalcDoorType('verschlossen')}
                      className={`px-4 py-3 rounded-xl border font-semibold text-sm transition-all flex flex-col items-start ${
                        calcDoorType === 'verschlossen' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-350'
                      }`}
                    >
                      <span>Verschlossen / Defekt</span>
                      <span className={`text-[11px] font-mono mt-0.5 ${calcDoorType === 'verschlossen' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Schlüssel verloren oder abgebrochen
                      </span>
                    </button>
                  </div>
                </div>

                {/* Parameter: Time Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono block mb-2">
                    Einsatzzeitraum
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setCalcTime('tag')}
                      className={`px-4 py-3 rounded-xl border font-semibold text-sm transition-all flex flex-col items-start ${
                        calcTime === 'tag' 
                          ? 'border-[#2B2644] bg-[#2B2644] text-white' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-350'
                      }`}
                    >
                      <span>Mo - Fr (08:00 - 18:00)</span>
                      <span className={`text-[11px] font-mono mt-0.5 ${calcTime === 'tag' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Standard Ortstarif
                      </span>
                    </button>

                    <button 
                      onClick={() => setCalcTime('nacht_wochenende')}
                      className={`px-4 py-3 rounded-xl border font-semibold text-sm transition-all flex flex-col items-start ${
                        calcTime === 'nacht_wochenende' 
                          ? 'border-[#2B2644] bg-[#2B2644] text-white' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-350'
                      }`}
                    >
                      <span>Abend / Wochenende (24h)</span>
                      <span className={`text-[11px] font-mono mt-0.5 ${calcTime === 'nacht_wochenende' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Sonn- &amp; Feiertage
                      </span>
                    </button>
                  </div>
                </div>

                {/* Parameter: Location input */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono block mb-2">
                    Einsatzort im Ruhrgebiet
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select 
                      value={calcLocation}
                      onChange={(e) => setCalcLocation(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black font-semibold text-base"
                    >
                      <option value="Essen">Essen (Zentrale)</option>
                      <option value="Bottrop">Bottrop</option>
                      <option value="Gelsenkirchen">Gelsenkirchen</option>
                      <option value="Duisburg">Duisburg</option>
                      <option value="Mülheim">Mülheim an der Ruhr</option>
                      <option value="Oberhausen">Oberhausen</option>
                      <option value="Bochum">Bochum</option>
                      <option value="Gladbeck">Gladbeck</option>
                      <option value="Dortmund">Dortmund</option>
                      <option value="Düsseldorf">Düsseldorf</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Security & Action Guideline Box */}
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4">
                <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-600" />
                <div className="text-sm text-emerald-800 leading-relaxed">
                  <strong>Türengel Schadensschutz-Garantie:</strong> Mit modernstem Werkzeug (Aufsperrnadeln, Türfallenspachtel und E-Picks) sorgen unsere Monteure für einen komplett schadensfreien Einlass an Ihrer zugefallenen Tür. Keine Folgeschäden an Ihrer Haustür.
                </div>
              </div>

            </div>

            {/* Bottom Call Action bar */}
            <div className="p-6 bg-gray-50 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-550 font-mono">
                <Lock className="w-4 h-4 text-emerald-600" />
                Direkter Draht zum aktiven Einsatzmonteur
              </div>
              <a 
                href="tel:01776721642"
                className="w-full sm:w-auto bg-black text-white text-center font-bold text-base px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Monteur jetzt rufen: 0177 6721642</span>
              </a>
            </div>

          </div>
        </div>
      )}


      {/* 
        ========================================================================
        INTERACTIVE RETURNING CALLBACK SHEET (MODAL)
        ========================================================================
      */}
      {isCallbackOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative border border-gray-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsCallbackOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-4">
              <div className="bg-transparent flex items-center justify-center mb-6">
                <img 
                  src="https://s1.directupload.eu/images/260617/mswk433t.png" 
                  alt="Türengel" 
                  className="h-12 w-auto object-contain" 
                />
              </div>

              <h3 className="text-3xl font-semibold tracking-tight text-black mb-2">
                Rückruf in 10 Min.
              </h3>
              
              <p className="text-base text-gray-550 leading-relaxed mb-6 font-sans">
                Tragen Sie Ihre Mobilnummer ein – unser Team in Essen ruft Sie direkt zurück und packt den Schlüsselkasten für Sie ein.
              </p>

              {callbackSuccess ? (
                <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 flex flex-col items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">Rückruf ist registriert!</p>
                    <p className="text-xs text-emerald-700/80 font-mono mt-1">Ein Mobilmonteur meldet sich in Kürze telefonisch.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="w-full space-y-4">
                  <div className="text-left space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono block mb-1">
                        Ihr Name (optional)
                      </label>
                      <input 
                        type="text"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="z.B. Müller"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-base bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono block mb-1">
                        Telefonnummer *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="z.B. 0177 6721642"
                        className="w-full px-4 py-3 border border-gray-205 rounded-xl focus:border-black focus:outline-none text-base bg-gray-50 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono block mb-1">
                        Einsatzaddresse / Stadt (optional)
                      </label>
                      <input 
                        type="text"
                        value={callbackAddress}
                        onChange={(e) => setCallbackAddress(e.target.value)}
                        placeholder="z.B. Bocholderstr. 226, Essen"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-base bg-gray-50"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-black text-white hover:bg-gray-800 rounded-xl font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Jetzt gratis Rückruf sichern</span>
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-400 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Keine Drittanbieter. Direkte Hilfe.</span>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
