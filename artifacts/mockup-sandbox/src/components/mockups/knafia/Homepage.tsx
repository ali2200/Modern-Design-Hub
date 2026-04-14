import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Menu, X, MapPin, Phone, Instagram, Facebook,
  Twitter, Star, ArrowLeft, Clock, Award, Truck, MessageCircle,
  ChevronLeft, ChevronRight, Search, User, Heart, Flame
} from "lucide-react";

/* ─── Tokens ─── */
const C = {
  maroon: "#531c24",
  maroonDark: "#3a1219",
  maroonLight: "#7a2c35",
  maroonGlow: "rgba(83,28,36,0.6)",
  gold: "#c9a87c",
  goldLight: "#e0c49a",
  cream: "#fdf6ee",
  ivory: "#f5ede0",
  sand: "#e7d8c3",
  white: "#ffffff",
  dark: "#0f0608",
  darkCard: "#180b0e",
};

/* ─── Keyframes injected once ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

  * { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.04); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { transform: translateX(60px); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes badgePop {
    0%   { transform: scale(0.6); opacity: 0; }
    80%  { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }

  .fade-up    { animation: fadeUp 0.7s ease forwards; }
  .fade-in    { animation: fadeIn 0.5s ease forwards; }
  .floating   { animation: float 4s ease-in-out infinite; }

  .product-card {
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
  }
  .product-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 28px 60px rgba(83,28,36,0.25) !important;
  }
  .product-card:hover .card-img {
    transform: scale(1.08);
  }
  .card-img {
    transition: transform 0.5s ease;
  }

  .cat-pill {
    transition: all 0.2s ease;
    cursor: pointer;
    white-space: nowrap;
  }
  .cat-pill:hover { opacity: 0.85; }

  .nav-link {
    position: relative;
    transition: color 0.2s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0; right: 0;
    height: 2px;
    background: ${C.gold};
    transform: scaleX(0);
    transition: transform 0.25s ease;
    border-radius: 2px;
  }
  .nav-link:hover::after { transform: scaleX(1); }

  .btn-primary {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,124,0.5); }
  .btn-primary:active { transform: translateY(0); }

  .branch-card { transition: all 0.3s ease; }
  .branch-card:hover { transform: translateY(-5px); border-color: ${C.gold} !important; }

  .testimonial-dot { transition: all 0.3s ease; cursor: pointer; border: none; }

  .social-btn { transition: all 0.25s ease; }
  .social-btn:hover { background: ${C.gold} !important; transform: translateY(-2px); }
  .social-btn:hover svg { color: ${C.maroonDark} !important; }

  .whatsapp-btn {
    animation: pulse 2.5s ease-in-out infinite;
    transition: transform 0.2s;
  }
  .whatsapp-btn:hover { transform: scale(1.12); animation: none; }

  .scroll-indicator { animation: float 2s ease-in-out infinite; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.dark}; }
  ::-webkit-scrollbar-thumb { background: ${C.maroonLight}; border-radius: 4px; }
`;

/* ─── Data ─── */
const NAV = ["الرئيسية", "المنيو", "فروعنا", "من نحن", "اتصل بنا"];

const CATS = [
  { id: "all", label: "الكل", emoji: "✦" },
  { id: "kunafa", label: "كنافة", emoji: "🧇" },
  { id: "baklawa", label: "بقلاوة", emoji: "🍯" },
  { id: "cake", label: "كيك", emoji: "🎂" },
  { id: "cold", label: "حلويات باردة", emoji: "🍮" },
  { id: "drinks", label: "مشروبات", emoji: "☕" },
];

const PRODUCTS = [
  {
    id: 1, name: "كنافة بالجبن الفاخرة", desc: "كنافة ذهبية بالجبن العكاوي الطازج مع قطر ماء الورد", price: 35,
    img: "/__mockup/images/kunafa-pull.png", cat: "kunafa", badge: "الأكثر طلباً", rating: 4.9, cnt: 248, hot: true,
  },
  {
    id: 2, name: "بقلاوة مشكلة راقية", desc: "تشكيلة من البقلاوة بالفستق الحلبي والجوز والمكسرات الفاخرة", price: 55,
    img: "/__mockup/images/baklava-premium.png", cat: "baklawa", badge: "جديد", rating: 4.8, cnt: 167,
  },
  {
    id: 3, name: "كيك الورد والفستق", desc: "كيك شرقي فاخر بمذاق ماء الورد والفستق الحلبي الأصيل", price: 70,
    img: "/__mockup/images/cake-premium.png", cat: "cake", rating: 4.7, cnt: 93,
  },
  {
    id: 4, name: "حلوى المحلبية الباردة", desc: "محلبية كريمية بماء الزهر والفستق، تُقدَّم مثلجة بطريقة أنيقة", price: 28,
    img: "/__mockup/images/cold-dessert.png", cat: "cold", badge: "مميز", rating: 5.0, cnt: 312,
  },
];

const TESTIMONIALS = [
  { name: "نورة الزهراني", city: "الرياض", text: "أفضل كنافة في حياتي! الطعم أصيل والجودة خيالية. كنافيا خياري الأول دائماً.", rating: 5 },
  { name: "محمد العمري", city: "جدة", text: "طلبت تشكيلة البقلاوة لعقد زواج — الضيوف لم يصدقوا أن هذا المستوى موجود في السعودية!", rating: 5 },
  { name: "سارة القحطاني", city: "الدمام", text: "التوصيل سريع والتغليف فاخر جداً. الكنافة وصلت ساخنة وطازجة كأنها من الفرن مباشرة.", rating: 5 },
];

const BRANCHES = [
  { city: "الرياض", area: "حي العليا", hours: "٨ص – ١٢م" },
  { city: "جدة", area: "حي الحمراء", hours: "٨ص – ١٢م" },
  { city: "الدمام", area: "حي الراكة", hours: "٨ص – ١١م" },
  { city: "مكة المكرمة", area: "حي العزيزية", hours: "٩ص – ١١م" },
];

/* ─── Sub-components ─── */
function Stars({ n, size = 12 }: { n: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} fill={s <= n ? C.gold : "none"} color={C.gold} />
      ))}
    </span>
  );
}

function GeomPattern({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
         viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="gp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 72,20 72,60 40,76 8,60 8,20" fill="none" stroke={C.gold} strokeWidth="0.8"/>
          <polygon points="40,16 60,26 60,54 40,64 20,54 20,26" fill="none" stroke={C.gold} strokeWidth="0.4"/>
          <circle cx="40" cy="40" r="6" fill="none" stroke={C.gold} strokeWidth="0.4"/>
          <line x1="40" y1="4" x2="40" y2="16" stroke={C.gold} strokeWidth="0.4"/>
          <line x1="40" y1="64" x2="40" y2="76" stroke={C.gold} strokeWidth="0.4"/>
          <line x1="8" y1="20" x2="20" y2="26" stroke={C.gold} strokeWidth="0.4"/>
          <line x1="60" y1="54" x2="72" y2="60" stroke={C.gold} strokeWidth="0.4"/>
          <line x1="72" y1="20" x2="60" y2="26" stroke={C.gold} strokeWidth="0.4"/>
          <line x1="20" y1="54" x2="8" y2="60" stroke={C.gold} strokeWidth="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gp)"/>
    </svg>
  );
}

/* ─── Main Component ─── */
export function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState(0);
  const [cat, setCat] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [tIdx, setTIdx] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const addCart = (id: number) => {
    setCart(c => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1400);
  };
  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const shown = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <>
      <style>{STYLES}</style>
      <div dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif", background: C.dark, color: C.white, overflowX: "hidden" }}>

        {/* ══════════ NAVBAR ══════════ */}
        <header style={{
          position: "fixed", top: 0, width: "100%", zIndex: 100,
          background: scrolled ? "rgba(15,6,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,124,0.12)" : "none",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", lineHeight: 1 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: C.sand, letterSpacing: 1 }}>كنافيا</span>
              <span style={{ fontSize: 9, letterSpacing: 4, color: C.gold, fontWeight: 400, marginTop: 2 }}>KNAFIA BAKERY</span>
            </div>

            {/* Nav links */}
            <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {NAV.map(n => (
                <a key={n} href="#" className="nav-link" style={{ color: "rgba(231,216,195,0.8)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>{n}</a>
              ))}
            </nav>

            {/* Right actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(231,216,195,0.6)" }}>
                <Search size={18} />
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(231,216,195,0.6)" }}>
                <User size={18} />
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: "rgba(231,216,195,0.8)" }}>
                <ShoppingCart size={20} />
                {cart > 0 && (
                  <span style={{
                    position: "absolute", top: -8, left: -8, background: C.gold, color: C.maroonDark,
                    borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "badgePop 0.3s ease",
                  }}>{cart}</span>
                )}
              </button>
              <button onClick={() => {}} style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                color: C.maroonDark, border: "none", borderRadius: 24, padding: "9px 22px",
                fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
              }} className="btn-primary">
                اطلب الآن
              </button>
            </div>
          </div>
        </header>

        {/* ══════════ HERO ══════════ */}
        <section ref={heroRef} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
          {/* bg image */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/__mockup/images/hero-kunafa.png)", backgroundSize: "cover", backgroundPosition: "center 30%", filter: "brightness(0.35)" }} />

          {/* gradient overlays */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.dark} 35%, transparent 80%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.dark} 0%, transparent 50%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 20% 50%, ${C.maroonGlow} 0%, transparent 60%)` }} />

          <GeomPattern opacity={0.06} />

          {/* Floating gold orbs */}
          <div style={{ position: "absolute", top: "18%", right: "12%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,124,0.12) 0%, transparent 70%)`, pointerEvents: "none" }} className="floating" />
          <div style={{ position: "absolute", bottom: "25%", right: "28%", width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,124,0.08) 0%, transparent 70%)`, pointerEvents: "none", animationDelay: "1.5s" }} className="floating" />

          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px", width: "100%", paddingTop: 100, paddingBottom: 80, display: "flex", alignItems: "center", gap: 60 }}>
            {/* Left text */}
            <div style={{ flex: "0 0 56%", animation: "fadeUp 0.9s ease both" }}>
              {/* Tag */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 32, height: 1, background: C.gold }} />
                <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
                  نكهات شرقية أصيلة
                </span>
                <div style={{ width: 32, height: 1, background: C.gold }} />
              </div>

              <h1 style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 900, lineHeight: 1.15, margin: "0 0 24px", color: C.sand }}>
                أفخر الحلويات
                <br />
                <span style={{ WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundImage: `linear-gradient(135deg, ${C.gold}, ${C.goldLight}, ${C.gold})` }}>
                  الشرقية الأصيلة
                </span>
              </h1>

              <p style={{ color: "rgba(231,216,195,0.65)", fontSize: 17, lineHeight: 1.9, maxWidth: 500, marginBottom: 40 }}>
                من قلب المطبخ العربي الأصيل، نقدم لكم أشهى الكنافة والبقلاوة والحلويات المصنوعة بأجود المكونات وبحرفية متوارثة.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 16, marginBottom: 56 }}>
                <button className="btn-primary" style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                  color: C.maroonDark, border: "none", borderRadius: 40, padding: "15px 38px",
                  fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
                  boxShadow: `0 8px 28px rgba(201,168,124,0.35)`,
                }}>
                  اطلب الآن
                </button>
                <button style={{
                  background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)",
                  color: C.sand, border: "1px solid rgba(231,216,195,0.2)", borderRadius: 40,
                  padding: "15px 38px", fontWeight: 700, fontSize: 16, cursor: "pointer",
                  fontFamily: "'Tajawal', sans-serif", transition: "all 0.3s",
                }}>
                  تصفح المنيو
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 48 }}>
                {[
                  { val: "+١٢٠", lbl: "صنف شهي" },
                  { val: "+٨٠٠٠", lbl: "عميل سعيد" },
                  { val: "٤", lbl: "مدن المملكة" },
                  { val: "١٠+", lbl: "سنوات خبرة" },
                ].map(s => (
                  <div key={s.lbl} style={{ borderRight: `1px solid rgba(201,168,124,0.2)`, paddingRight: 24 }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: C.gold, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: "rgba(231,216,195,0.5)", marginTop: 4 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image showcase */}
            <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", animation: "slideIn 1s ease both" }}>
              {/* Glow ring */}
              <div style={{
                position: "absolute", inset: -20, borderRadius: "50%",
                background: `conic-gradient(from 0deg, ${C.gold}40, transparent, ${C.gold}20, transparent, ${C.gold}40)`,
                animation: "spin 12s linear infinite",
              }} />
              <div style={{
                width: 380, height: 380, borderRadius: "50%", overflow: "hidden", position: "relative",
                border: `2px solid rgba(201,168,124,0.25)`,
                boxShadow: `0 0 80px rgba(201,168,124,0.18), inset 0 0 60px rgba(83,28,36,0.5)`,
              }}>
                <img src="/__mockup/images/kunafa-pull.png" alt="كنافة" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: 30, right: -10,
                background: "rgba(15,6,8,0.85)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(201,168,124,0.2)", borderRadius: 18,
                padding: "14px 20px", display: "flex", alignItems: "center", gap: 12,
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}>
                <div style={{ background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`, borderRadius: 12, padding: 10 }}>
                  <Award size={20} color={C.gold} />
                </div>
                <div>
                  <div style={{ color: C.sand, fontWeight: 700, fontSize: 14 }}>الأفضل في المملكة</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <Stars n={5} size={11} />
                    <span style={{ color: "rgba(231,216,195,0.5)", fontSize: 11 }}>٤.٩ تقييم</span>
                  </div>
                </div>
              </div>

              {/* Mini badge top left */}
              <div style={{
                position: "absolute", top: 30, left: -10,
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                borderRadius: 14, padding: "10px 16px",
                boxShadow: "0 8px 24px rgba(201,168,124,0.4)",
              }}>
                <div style={{ color: C.maroonDark, fontWeight: 800, fontSize: 13 }}>توصيل الآن</div>
                <div style={{ color: C.maroon, fontSize: 11, fontWeight: 500 }}>٣٠ – ٤٥ دقيقة</div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "rgba(231,216,195,0.35)", letterSpacing: 2 }}>اكتشف المزيد</span>
            <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, rgba(201,168,124,0.5), transparent)` }} />
          </div>
        </section>

        {/* ══════════ FEATURES RIBBON ══════════ */}
        <section style={{ background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`, position: "relative", overflow: "hidden" }}>
          <GeomPattern opacity={0.08} />
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "22px 28px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16, position: "relative" }}>
            {[
              { icon: <Truck size={18} />, title: "توصيل سريع", sub: "لباب منزلك" },
              { icon: <Award size={18} />, title: "مكونات طازجة ١٠٠٪", sub: "جودة مضمونة" },
              { icon: <Clock size={18} />, title: "٨ص – ١٢م يومياً", sub: "نحن هنا لخدمتك" },
              { icon: <MessageCircle size={18} />, title: "دعم واتساب", sub: "رد فوري" },
              { icon: <Flame size={18} />, title: "مخبوز طازج", sub: "يومياً بلا توقف" },
            ].map(f => (
              <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ color: C.gold }}>{f.icon}</div>
                <div>
                  <div style={{ color: C.sand, fontSize: 13, fontWeight: 700 }}>{f.title}</div>
                  <div style={{ color: "rgba(231,216,195,0.55)", fontSize: 11 }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ MENU ══════════ */}
        <section style={{ background: C.dark, padding: "90px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>

            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={{ color: C.gold, fontSize: 12, letterSpacing: 4, fontWeight: 700 }}>أصناف لا تُقاوم</span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: C.sand, margin: "10px 0 6px" }}>منيو كنافيا</h2>
              <div style={{ width: 60, height: 2, background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`, margin: "0 auto" }} />
            </div>

            {/* Category pills */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
              {CATS.map(c => {
                const active = cat === c.id;
                return (
                  <button key={c.id} onClick={() => setCat(c.id)} className="cat-pill" style={{
                    padding: "10px 22px", borderRadius: 30, fontWeight: 700, fontSize: 14,
                    border: active ? "none" : "1px solid rgba(201,168,124,0.2)",
                    background: active ? `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` : "rgba(255,255,255,0.04)",
                    color: active ? C.maroonDark : "rgba(231,216,195,0.7)",
                    boxShadow: active ? `0 6px 20px rgba(201,168,124,0.3)` : "none",
                    fontFamily: "'Tajawal', sans-serif",
                  }}>
                    {c.emoji} {c.label}
                  </button>
                );
              })}
            </div>

            {/* Products grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
              {(shown.length ? shown : PRODUCTS).map(p => (
                <div key={p.id} className="product-card" style={{
                  background: C.darkCard, borderRadius: 24, overflow: "hidden",
                  border: "1px solid rgba(201,168,124,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}>
                  {/* Image */}
                  <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                    <img src={p.img} alt={p.name} className="card-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {/* gradient */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,6,8,0.7) 0%, transparent 50%)" }} />

                    {/* Badge */}
                    {p.badge && (
                      <div style={{
                        position: "absolute", top: 14, right: 14,
                        background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                        color: C.maroonDark, padding: "4px 12px", borderRadius: 20,
                        fontSize: 11, fontWeight: 800,
                      }}>{p.badge}</div>
                    )}

                    {/* Like */}
                    <button onClick={() => toggleLike(p.id)} style={{
                      position: "absolute", top: 14, left: 14,
                      background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
                      border: "none", borderRadius: "50%", width: 36, height: 36,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "transform 0.2s",
                    }}>
                      <Heart size={16} fill={liked.has(p.id) ? "#e74c6e" : "none"} color={liked.has(p.id) ? "#e74c6e" : C.sand} />
                    </button>

                    {/* Hot badge */}
                    {p.hot && (
                      <div style={{
                        position: "absolute", bottom: 12, right: 14, display: "flex", alignItems: "center", gap: 4,
                        color: C.gold, fontSize: 11, fontWeight: 700,
                      }}>
                        <Flame size={13} fill={C.gold} color={C.gold} />
                        الأكثر مبيعاً
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 20px" }}>
                    <h3 style={{ color: C.sand, fontWeight: 800, fontSize: 16, margin: "0 0 6px" }}>{p.name}</h3>
                    <p style={{ color: "rgba(231,216,195,0.5)", fontSize: 13, lineHeight: 1.6, margin: "0 0 12px", minHeight: 38 }}>{p.desc}</p>

                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                      <Stars n={p.rating} size={12} />
                      <span style={{ color: C.gold, fontSize: 12, fontWeight: 700 }}>{p.rating}</span>
                      <span style={{ color: "rgba(231,216,195,0.35)", fontSize: 12 }}>({p.cnt})</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: 22, fontWeight: 900, color: C.gold }}>{p.price}</span>
                        <span style={{ fontSize: 12, color: "rgba(231,216,195,0.45)", marginRight: 4 }}>ر.س</span>
                      </div>
                      <button onClick={() => addCart(p.id)} style={{
                        background: addedId === p.id
                          ? `linear-gradient(135deg, #27ae60, #2ecc71)`
                          : `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
                        color: C.sand, border: "none", borderRadius: 14,
                        padding: "9px 18px", fontSize: 13, fontWeight: 700,
                        cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
                        transition: "all 0.3s", boxShadow: "0 4px 14px rgba(83,28,36,0.4)",
                      }}>
                        {addedId === p.id ? "✓ تمت الإضافة" : "+ أضف للسلة"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See all */}
            <div style={{ textAlign: "center", marginTop: 44 }}>
              <button className="btn-primary" style={{
                background: "transparent", color: C.gold,
                border: `1.5px solid rgba(201,168,124,0.35)`, borderRadius: 40,
                padding: "13px 40px", fontWeight: 700, fontSize: 15, cursor: "pointer",
                fontFamily: "'Tajawal', sans-serif", display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                عرض المنيو الكامل <ArrowLeft size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════ ABOUT ══════════ */}
        <section style={{ background: C.darkCard, position: "relative", overflow: "hidden" }}>
          <GeomPattern opacity={0.05} />
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "90px 28px", display: "flex", alignItems: "center", gap: 72, position: "relative" }}>
            {/* Image side */}
            <div style={{ flex: "0 0 45%", position: "relative" }}>
              <div style={{
                borderRadius: 28, overflow: "hidden",
                boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,124,0.1)`,
                position: "relative",
              }}>
                <img src="/__mockup/images/sweets-topdown.png" alt="حلويات كنافيا" style={{ width: "100%", height: 400, objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.maroon}30, transparent)` }} />
              </div>
              {/* Floating card */}
              <div style={{
                position: "absolute", bottom: -24, left: -20,
                background: "rgba(15,6,8,0.9)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(201,168,124,0.15)", borderRadius: 20,
                padding: "18px 24px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}>
                <div style={{ color: C.gold, fontSize: 34, fontWeight: 900 }}>١٠+</div>
                <div style={{ color: C.sand, fontSize: 13, fontWeight: 600 }}>سنوات من الحرفية</div>
                <div style={{ color: "rgba(231,216,195,0.45)", fontSize: 12 }}>في صناعة الحلويات الشرقية</div>
              </div>
            </div>

            {/* Text side */}
            <div style={{ flex: 1, textAlign: "right" }}>
              <span style={{ color: C.gold, fontSize: 11, letterSpacing: 4, fontWeight: 700 }}>قصتنا</span>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: C.sand, margin: "12px 0 20px", lineHeight: 1.25 }}>
                حلاوة الأصالة
                <br />
                <span style={{ color: C.gold }}>بروح عصرية</span>
              </h2>
              <p style={{ color: "rgba(231,216,195,0.6)", fontSize: 16, lineHeight: 1.95, marginBottom: 20 }}>
                انطلقنا من شغف حقيقي بالموروث الحلو العربي، مع رؤية تمزج بين الوصفات الأصيلة المتوارثة والمكونات المختارة بعناية فائقة. كل قطعة حلوى نصنعها تحمل روح الضيافة العربية الكريمة.
              </p>
              <p style={{ color: "rgba(231,216,195,0.6)", fontSize: 16, lineHeight: 1.95, marginBottom: 36 }}>
                نؤمن بأن الجودة ليست خياراً بل التزام، لذا نختار أجود الفستق الحلبي، وأطيب الجبن العكاوي، وأنقى قطر ماء الورد لنقدم لكم تجربة لا تُنسى.
              </p>

              {/* Values */}
              <div style={{ display: "flex", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
                {["جودة لا تُساوَم", "مكونات طبيعية", "وصفات أصيلة", "تجربة لا تُنسى"].map(v => (
                  <div key={v} style={{
                    background: `rgba(201,168,124,0.08)`, border: "1px solid rgba(201,168,124,0.15)",
                    borderRadius: 20, padding: "8px 16px", fontSize: 13, color: C.gold, fontWeight: 600,
                  }}>{v}</div>
                ))}
              </div>

              <button className="btn-primary" style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                color: C.maroonDark, border: "none", borderRadius: 30,
                padding: "13px 32px", fontWeight: 800, fontSize: 15, cursor: "pointer",
                fontFamily: "'Tajawal', sans-serif",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}>
                اقرأ قصتنا كاملة <ArrowLeft size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════ TESTIMONIALS ══════════ */}
        <section style={{ background: C.dark, padding: "90px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(83,28,36,0.3) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 28px", position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={{ color: C.gold, fontSize: 11, letterSpacing: 4, fontWeight: 700 }}>آراء عملائنا</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.sand, margin: "10px 0 0" }}>ماذا يقولون عنا</h2>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(201,168,124,0.12)", borderRadius: 28,
              padding: "48px 56px", textAlign: "right", position: "relative",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              minHeight: 220,
            }}>
              {/* Big quote */}
              <div style={{ position: "absolute", top: 20, right: 48, fontSize: 100, color: `${C.gold}15`, fontFamily: "serif", lineHeight: 1 }}>"</div>

              <div style={{ marginBottom: 20, animation: "fadeIn 0.4s ease" }}>
                <Stars n={TESTIMONIALS[tIdx].rating} size={16} />
              </div>
              <p style={{ color: "rgba(231,216,195,0.8)", fontSize: 18, lineHeight: 1.85, marginBottom: 28, fontWeight: 500, animation: "fadeUp 0.4s ease" }}>
                {TESTIMONIALS[tIdx].text}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Prev/next */}
                  <button onClick={() => setTIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.sand }}>
                    <ChevronRight size={18} />
                  </button>
                  <button onClick={() => setTIdx(i => (i + 1) % TESTIMONIALS.length)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.sand }}>
                    <ChevronLeft size={18} />
                  </button>
                  <div style={{ display: "flex", gap: 6 }}>
                    {TESTIMONIALS.map((_, i) => (
                      <button key={i} onClick={() => setTIdx(i)} className="testimonial-dot" style={{
                        width: i === tIdx ? 24 : 8, height: 8, borderRadius: 4,
                        background: i === tIdx ? C.gold : "rgba(201,168,124,0.25)",
                      }} />
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: C.sand, fontWeight: 700, fontSize: 15 }}>{TESTIMONIALS[tIdx].name}</div>
                    <div style={{ color: "rgba(231,216,195,0.4)", fontSize: 13 }}>{TESTIMONIALS[tIdx].city}</div>
                  </div>
                  <div style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.gold, fontWeight: 900, fontSize: 20,
                    border: `2px solid rgba(201,168,124,0.25)`,
                  }}>
                    {TESTIMONIALS[tIdx].name[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ BRANCHES ══════════ */}
        <section style={{ background: C.darkCard, padding: "90px 0" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={{ color: C.gold, fontSize: 11, letterSpacing: 4, fontWeight: 700 }}>دائماً قريبون منكم</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: C.sand, margin: "10px 0 6px" }}>فروعنا</h2>
              <div style={{ width: 50, height: 2, background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`, margin: "0 auto" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
              {BRANCHES.map(b => (
                <div key={b.city} className="branch-card" style={{
                  background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(201,168,124,0.1)", borderRadius: 22,
                  padding: "28px 24px", textAlign: "right",
                }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: `linear-gradient(135deg, ${C.maroon}60, ${C.maroonLight}40)`,
                    border: "1px solid rgba(201,168,124,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 18, marginRight: 0, marginLeft: "auto",
                  }}>
                    <MapPin size={22} color={C.gold} />
                  </div>
                  <h3 style={{ color: C.sand, fontWeight: 800, fontSize: 18, margin: "0 0 4px" }}>{b.city}</h3>
                  <p style={{ color: "rgba(231,216,195,0.45)", fontSize: 13, margin: "0 0 16px" }}>{b.area}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, color: "rgba(231,216,195,0.55)", fontSize: 13 }}>
                    {b.hours} <Clock size={13} color="rgba(231,216,195,0.4)" />
                  </div>
                  <button style={{
                    marginTop: 18, width: "100%",
                    background: "rgba(201,168,124,0.08)", border: "1px solid rgba(201,168,124,0.15)",
                    borderRadius: 12, padding: "9px 0", color: C.gold, fontSize: 13,
                    fontWeight: 700, cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
                    transition: "all 0.2s",
                  }}>
                    احصل على الاتجاهات
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA FINAL ══════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "80px 0" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/__mockup/images/hero-kunafa.png)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.2)" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.maroon}cc, ${C.dark}99)` }} />
          <GeomPattern opacity={0.06} />

          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 28px", textAlign: "center", position: "relative" }}>
            <span style={{ color: C.gold, fontSize: 11, letterSpacing: 4, fontWeight: 700 }}>ابدأ تجربتك الآن</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: C.sand, margin: "14px 0 16px", lineHeight: 1.25 }}>
              اطلب أشهى الحلويات
              <br />
              <span style={{ color: C.gold }}>مباشرة لباب منزلك</span>
            </h2>
            <p style={{ color: "rgba(231,216,195,0.6)", fontSize: 16, marginBottom: 40 }}>
              توصيل سريع في الرياض، جدة، الدمام، ومكة المكرمة. دفع آمن بجميع الطرق.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                color: C.maroonDark, border: "none", borderRadius: 40,
                padding: "15px 44px", fontWeight: 800, fontSize: 16, cursor: "pointer",
                fontFamily: "'Tajawal', sans-serif",
                boxShadow: `0 10px 32px rgba(201,168,124,0.4)`,
              }}>اطلب الآن</button>
              <button style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)",
                color: C.sand, border: "1px solid rgba(231,216,195,0.2)", borderRadius: 40,
                padding: "15px 44px", fontWeight: 700, fontSize: 16, cursor: "pointer",
                fontFamily: "'Tajawal', sans-serif",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                <Phone size={17} /> تواصل معنا
              </button>
            </div>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */}
        <footer style={{ background: "#070204", borderTop: "1px solid rgba(201,168,124,0.06)", padding: "60px 0 28px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, textAlign: "right" }}>

              {/* Brand */}
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: C.sand, marginBottom: 4 }}>كنافيا</div>
                <div style={{ fontSize: 9, letterSpacing: 4, color: C.gold, marginBottom: 16 }}>KNAFIA BAKERY & SWEETS</div>
                <p style={{ color: "rgba(231,216,195,0.4)", fontSize: 13, lineHeight: 1.75, marginBottom: 24 }}>
                  نكهات شرقية أصيلة بلمسة عصرية — مصنوعة بحب وحرفية منذ عقد من الزمن.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <button key={i} className="social-btn" style={{
                      width: 38, height: 38, borderRadius: 11,
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,124,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}>
                      <Icon size={16} color={C.gold} />
                    </button>
                  ))}
                </div>
              </div>

              {[
                { title: "روابط سريعة", links: ["الرئيسية", "المنيو الكامل", "فروعنا", "من نحن", "اتصل بنا"] },
                { title: "خدمات العملاء", links: ["تتبع الطلب", "سياسة الإرجاع", "الأسئلة الشائعة", "برنامج الولاء"] },
                { title: "تواصل معنا", links: ["info@knafia.sa", "920-001-1234", "واتساب: 0512345678", "الرياض، المملكة العربية السعودية"] },
              ].map(col => (
                <div key={col.title}>
                  <h4 style={{ color: C.sand, fontWeight: 700, marginBottom: 20, fontSize: 14 }}>{col.title}</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {col.links.map(l => (
                      <li key={l} style={{ marginBottom: 12 }}>
                        <a href="#" style={{ color: "rgba(231,216,195,0.4)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                           onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                           onMouseLeave={e => (e.currentTarget.style.color = "rgba(231,216,195,0.4)")}>
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(201,168,124,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ color: "rgba(231,216,195,0.25)", fontSize: 13 }}>© ٢٠٢٦ كنافيا — جميع الحقوق محفوظة</span>
              <div style={{ display: "flex", gap: 20 }}>
                {["سياسة الخصوصية", "الشروط والأحكام"].map(l => (
                  <a key={l} href="#" style={{ color: "rgba(231,216,195,0.25)", fontSize: 13, textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* ══════════ WHATSAPP FAB ══════════ */}
        <a href="#" className="whatsapp-btn" style={{
          position: "fixed", bottom: 28, left: 28, width: 58, height: 58,
          borderRadius: "50%", background: "linear-gradient(135deg, #25d366, #128c7e)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(37,211,102,0.45)", zIndex: 200,
          textDecoration: "none",
        }}>
          <MessageCircle size={26} color="white" fill="white" />
        </a>

      </div>
    </>
  );
}
