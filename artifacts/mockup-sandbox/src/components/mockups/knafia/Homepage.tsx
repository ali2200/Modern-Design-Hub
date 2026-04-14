import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, ChevronDown, MapPin, Phone, Instagram, Facebook, Twitter, Star, ArrowLeft, ChevronRight, Clock, Award, Truck, MessageCircle } from "lucide-react";

const BRAND = {
  primary: "#531c24",
  primaryLight: "#7a2c35",
  primaryDark: "#3a1219",
  secondary: "#e7d8c3",
  accent: "#c9a87c",
  cream: "#fdf6ee",
  white: "#ffffff",
};

const categories = [
  { id: "kunafa", label: "كنافة", icon: "🧇" },
  { id: "baklawa", label: "بقلاوة", icon: "🍯" },
  { id: "basbousa", label: "بسبوسة", icon: "🟡" },
  { id: "cake", label: "كيك شرقي", icon: "🎂" },
  { id: "cold", label: "حلويات باردة", icon: "🍮" },
  { id: "drinks", label: "مشروبات", icon: "☕" },
];

const products = [
  {
    id: 1,
    name: "كنافة بالجبن",
    desc: "كنافة ذهبية بالجبن العكاوي الطازج مع قطر عسل الورد",
    price: "٣٥",
    image: "/__mockup/images/kunafa-slice.png",
    category: "kunafa",
    badge: "الأكثر طلباً",
    rating: 4.9,
    reviews: 248,
  },
  {
    id: 2,
    name: "بقلاوة مشكلة",
    desc: "تشكيلة فاخرة من البقلاوة بالفستق والجوز والمكسرات",
    price: "٥٥",
    image: "/__mockup/images/baklava.png",
    category: "baklawa",
    badge: "جديد",
    rating: 4.8,
    reviews: 167,
  },
  {
    id: 3,
    name: "كيك الورد والفستق",
    desc: "كيك شرقي بمذاق ماء الورد والفستق الحلبي الطازج",
    price: "٧٠",
    image: "/__mockup/images/oriental-cake.png",
    category: "cake",
    rating: 4.7,
    reviews: 93,
  },
  {
    id: 4,
    name: "تشكيلة الحلويات الفاخرة",
    desc: "صينية راقية بأفخر أنواع الحلويات الشرقية المختارة",
    price: "١٢٠",
    image: "/__mockup/images/sweets-assortment.png",
    category: "baklawa",
    badge: "مميز",
    rating: 5.0,
    reviews: 312,
  },
];

const testimonials = [
  {
    name: "نورة الزهراني",
    text: "أفضل كنافة تذوقتها في حياتي! الطعم أصيل والجودة رائعة. أنصح الجميع بتجربة كنافيا.",
    rating: 5,
    location: "الرياض",
  },
  {
    name: "محمد العمري",
    text: "طلبت تشكيلة البقلاوة لمناسبة خاصة، الجميع أثنى على الجودة. سيكون كنافيا خياري الدائم.",
    rating: 5,
    location: "جدة",
  },
  {
    name: "سارة القحطاني",
    text: "التوصيل سريع والتغليف أنيق جداً. الكنافة وصلت ساخنة وطازجة. شكراً كنافيا!",
    rating: 5,
    location: "الدمام",
  },
];

function ArabicPattern() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="opacity-10">
      <defs>
        <pattern id="arabicPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <polygon points="25,5 45,15 45,35 25,45 5,35 5,15" fill="none" stroke="#e7d8c3" strokeWidth="1" />
          <polygon points="25,12 38,18 38,32 25,38 12,32 12,18" fill="none" stroke="#e7d8c3" strokeWidth="0.5" />
          <circle cx="25" cy="25" r="3" fill="none" stroke="#e7d8c3" strokeWidth="0.5" />
          <line x1="25" y1="5" x2="25" y2="12" stroke="#e7d8c3" strokeWidth="0.5" />
          <line x1="25" y1="38" x2="25" y2="45" stroke="#e7d8c3" strokeWidth="0.5" />
          <line x1="5" y1="15" x2="12" y2="18" stroke="#e7d8c3" strokeWidth="0.5" />
          <line x1="38" y1="32" x2="45" y2="35" stroke="#e7d8c3" strokeWidth="0.5" />
          <line x1="45" y1="15" x2="38" y2="18" stroke="#e7d8c3" strokeWidth="0.5" />
          <line x1="12" y1="32" x2="5" y2="35" stroke="#e7d8c3" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#arabicPattern)" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} fill={s <= rating ? "#c9a87c" : "none"} color={s <= rating ? "#c9a87c" : "#c9a87c"} />
      ))}
    </div>
  );
}

export function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  const addToCart = (id: number) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div
      dir="rtl"
      style={{ fontFamily: "'Tajawal', sans-serif", background: BRAND.cream, color: "#2d1a1e" }}
      className="min-h-screen overflow-x-hidden"
    >
      {/* ─── Navbar ─── */}
      <header
        style={{
          background: scrolled ? `${BRAND.primary}f5` : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          borderBottom: scrolled ? `1px solid rgba(231,216,195,0.15)` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: BRAND.secondary }} className="lg:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden lg:flex gap-8 items-center">
            {["الرئيسية", "المنيو", "فروعنا", "من نحن", "اتصل بنا"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: BRAND.secondary, fontWeight: 500, fontSize: 15 }}
                className="hover:opacity-70 transition-opacity"
              >
                {item}
              </a>
            ))}
          </nav>

          <div
            style={{
              fontFamily: "'Tajawal', serif",
              color: BRAND.secondary,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            كنافيا
            <span style={{ color: BRAND.accent, fontSize: 11, display: "block", fontWeight: 400, letterSpacing: 3 }}>
              KNAFIA BAKERY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              style={{
                background: BRAND.accent,
                color: BRAND.primaryDark,
                padding: "8px 20px",
                borderRadius: 30,
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
              }}
              className="hidden lg:block hover:opacity-90 transition-opacity"
            >
              تسجيل الدخول
            </button>
            <button style={{ color: BRAND.secondary, position: "relative" }}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -8,
                    left: -8,
                    background: BRAND.accent,
                    color: BRAND.primaryDark,
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: BRAND.primary, padding: "16px 24px 24px" }}>
            {["الرئيسية", "المنيو", "فروعنا", "من نحن", "اتصل بنا"].map((item) => (
              <div key={item} style={{ borderBottom: "1px solid rgba(231,216,195,0.1)", padding: "12px 0" }}>
                <a href="#" style={{ color: BRAND.secondary, fontWeight: 500, fontSize: 16 }}>
                  {item}
                </a>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section
        style={{ background: BRAND.primary, minHeight: "100vh", position: "relative", overflow: "hidden" }}
        className="flex items-center"
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <ArabicPattern />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/__mockup/images/kunafa-hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${BRAND.primary} 45%, transparent 100%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10 flex flex-col lg:flex-row items-center gap-12 w-full">
          <div className="flex-1 text-right">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201,168,124,0.15)",
                border: "1px solid rgba(201,168,124,0.35)",
                borderRadius: 30,
                padding: "6px 18px",
                marginBottom: 24,
              }}
            >
              <span style={{ color: BRAND.accent, fontSize: 13, fontWeight: 600 }}>
                نكهات شرقية بلمسة عصرية
              </span>
              <Star size={14} fill={BRAND.accent} color={BRAND.accent} />
            </div>

            <h1
              style={{
                color: BRAND.secondary,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: 20,
              }}
            >
              أفخر الحلويات
              <br />
              <span style={{ color: BRAND.accent }}>الشرقية الأصيلة</span>
            </h1>

            <p
              style={{
                color: "rgba(231,216,195,0.75)",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 480,
                marginBottom: 36,
              }}
            >
              من قلب المطبخ العربي الأصيل، نقدم لكم أشهى الكنافة، البقلاوة، والحلويات الشرقية
              المصنوعة بأجود المكونات وبحرفية تُورث جيلاً بعد جيل.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                style={{
                  background: BRAND.accent,
                  color: BRAND.primaryDark,
                  padding: "14px 32px",
                  borderRadius: 40,
                  fontWeight: 800,
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(201,168,124,0.4)",
                }}
                className="hover:opacity-90 transition-all"
              >
                اطلب الآن
              </button>
              <button
                style={{
                  background: "transparent",
                  color: BRAND.secondary,
                  padding: "14px 32px",
                  borderRadius: 40,
                  fontWeight: 700,
                  fontSize: 16,
                  border: `2px solid rgba(231,216,195,0.3)`,
                  cursor: "pointer",
                }}
                className="hover:border-opacity-60 transition-all"
              >
                تصفح المنيو
              </button>
            </div>

            <div className="flex gap-8 mt-10">
              {[
                { value: "+١٠٠", label: "صنف شهي" },
                { value: "+٥٠٠٠", label: "عميل سعيد" },
                { value: "٤", label: "فروع في المملكة" },
              ].map((stat) => (
                <div key={stat.label} className="text-right">
                  <div style={{ color: BRAND.accent, fontSize: 28, fontWeight: 900 }}>{stat.value}</div>
                  <div style={{ color: "rgba(231,216,195,0.6)", fontSize: 13 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <div
              style={{
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${BRAND.primaryLight}80, ${BRAND.primary})`,
                border: `2px solid rgba(201,168,124,0.2)`,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src="/__mockup/images/kunafa-slice.png"
                alt="كنافة فاخرة"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 40,
                right: -20,
                background: BRAND.white,
                borderRadius: 16,
                padding: "14px 20px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ background: BRAND.primary, borderRadius: 10, padding: 10 }}>
                <Award size={20} color={BRAND.accent} />
              </div>
              <div>
                <div style={{ color: BRAND.primary, fontWeight: 700, fontSize: 14 }}>أفضل حلويات</div>
                <div style={{ color: "#888", fontSize: 12 }}>تقييم ٤.٩ من ٥</div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: `linear-gradient(to bottom, transparent, ${BRAND.cream})`,
          }}
        />
      </section>

      {/* ─── Features Strip ─── */}
      <section style={{ background: BRAND.white, borderBottom: `1px solid ${BRAND.secondary}50` }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-around gap-4">
          {[
            { icon: <Truck size={20} />, text: "توصيل سريع لباب منزلك" },
            { icon: <Award size={20} />, text: "مكونات طازجة 100%" },
            { icon: <Clock size={20} />, text: "خدمة من ٨ص حتى ١٢م" },
            { icon: <MessageCircle size={20} />, text: "دعم عبر واتساب" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <div style={{ color: BRAND.primary }}>{item.icon}</div>
              <span style={{ color: "#555", fontSize: 14, fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section style={{ background: BRAND.cream, padding: "60px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 style={{ color: BRAND.primary, fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
              تصفح حسب الفئة
            </h2>
            <div style={{ width: 60, height: 3, background: BRAND.accent, borderRadius: 4, margin: "0 auto" }} />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 justify-center flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                padding: "10px 22px",
                borderRadius: 30,
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeCategory === "all" ? BRAND.primary : BRAND.white,
                color: activeCategory === "all" ? BRAND.white : BRAND.primary,
                boxShadow: activeCategory === "all" ? "0 4px 14px rgba(83,28,36,0.25)" : "none",
              }}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 30,
                  fontWeight: 700,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeCategory === cat.id ? BRAND.primary : BRAND.white,
                  color: activeCategory === cat.id ? BRAND.white : BRAND.primary,
                  boxShadow: activeCategory === cat.id ? "0 4px 14px rgba(83,28,36,0.25)" : "none",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Products Grid ─── */}
      <section style={{ background: BRAND.cream, padding: "20px 0 70px" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
              <div
                key={product.id}
                style={{
                  background: BRAND.white,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(83,28,36,0.08)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                className="hover:-translate-y-1 hover:shadow-xl"
              >
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  />
                  {product.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: BRAND.accent,
                        color: BRAND.primaryDark,
                        padding: "4px 12px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>

                <div style={{ padding: "16px 18px" }}>
                  <h3 style={{ color: BRAND.primary, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                    {product.name}
                  </h3>
                  <p style={{ color: "#777", fontSize: 13, lineHeight: 1.5, marginBottom: 10, minHeight: 40 }}>
                    {product.desc}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} />
                    <span style={{ color: "#999", fontSize: 12 }}>({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span style={{ color: BRAND.primary, fontWeight: 800, fontSize: 18 }}>
                      {product.price} ر.س
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      style={{
                        background: addedId === product.id ? BRAND.accent : BRAND.primary,
                        color: addedId === product.id ? BRAND.primaryDark : BRAND.white,
                        border: "none",
                        borderRadius: 12,
                        padding: "8px 16px",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {addedId === product.id ? "تمت الإضافة ✓" : "أضف للسلة"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              style={{
                background: "transparent",
                color: BRAND.primary,
                border: `2px solid ${BRAND.primary}`,
                borderRadius: 40,
                padding: "12px 36px",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              className="hover:bg-rose-900 hover:text-white transition-all"
            >
              عرض كل المنتجات
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── About Banner ─── */}
      <section style={{ background: BRAND.primary, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <ArabicPattern />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="/__mockup/images/bakery-interior.png"
              alt="مخبز كنافيا"
              style={{ borderRadius: 20, width: "100%", maxWidth: 480, boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}
            />
          </div>
          <div className="flex-1 text-right">
            <div style={{ color: BRAND.accent, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
              قصتنا
            </div>
            <h2 style={{ color: BRAND.secondary, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: 20 }}>
              حلاوة الأصالة
              <br />
              مع روح العصر
            </h2>
            <p style={{ color: "rgba(231,216,195,0.75)", fontSize: 16, lineHeight: 1.9, marginBottom: 28 }}>
              انطلقت كنافيا من حب عميق للموروث الحلو العربي، مع رؤية تجمع بين الوصفات الأصيلة
              المتوارثة والمكونات المختارة بعناية. نؤمن بأن كل قطعة حلوى هي تجربة لا تُنسى
              تجمع الأهل والأصدقاء على مائدة واحدة.
            </p>
            <button
              style={{
                background: BRAND.accent,
                color: BRAND.primaryDark,
                padding: "12px 28px",
                borderRadius: 30,
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              اقرأ قصتنا
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section style={{ background: BRAND.secondary, padding: "70px 0" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 style={{ color: BRAND.primary, fontSize: 30, fontWeight: 800, marginBottom: 8 }}>
              ماذا يقول عملاؤنا
            </h2>
            <div style={{ width: 50, height: 3, background: BRAND.primary, borderRadius: 4, margin: "0 auto" }} />
          </div>

          <div
            style={{
              background: BRAND.white,
              borderRadius: 24,
              padding: "40px 48px",
              boxShadow: "0 8px 40px rgba(83,28,36,0.1)",
              textAlign: "right",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 80,
                color: BRAND.secondary,
                position: "absolute",
                top: 20,
                right: 36,
                fontFamily: "serif",
                lineHeight: 1,
              }}
            >
              "
            </div>
            <div style={{ marginBottom: 20 }}>
              <StarRating rating={testimonials[testimonialIdx].rating} />
            </div>
            <p style={{ color: "#444", fontSize: 17, lineHeight: 1.8, marginBottom: 24 }}>
              {testimonials[testimonialIdx].text}
            </p>
            <div className="flex items-center gap-3 justify-end">
              <div>
                <div style={{ color: BRAND.primary, fontWeight: 700 }}>{testimonials[testimonialIdx].name}</div>
                <div style={{ color: "#888", fontSize: 13 }}>{testimonials[testimonialIdx].location}</div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: BRAND.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: BRAND.secondary,
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                {testimonials[testimonialIdx].name[0]}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  style={{
                    width: i === testimonialIdx ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === testimonialIdx ? BRAND.primary : BRAND.secondary,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Branches ─── */}
      <section style={{ background: BRAND.cream, padding: "70px 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ color: BRAND.primary, fontSize: 30, fontWeight: 800, marginBottom: 8 }}>
              فروعنا
            </h2>
            <div style={{ width: 50, height: 3, background: BRAND.accent, borderRadius: 4, margin: "0 auto 12px" }} />
            <p style={{ color: "#777", fontSize: 15 }}>نحن دائماً قريبون منكم</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { city: "الرياض", area: "العليا", hours: "٨ص – ١٢م" },
              { city: "جدة", area: "الحمراء", hours: "٨ص – ١٢م" },
              { city: "الدمام", area: "الراكة", hours: "٨ص – ١١م" },
              { city: "مكة المكرمة", area: "العزيزية", hours: "٩ص – ١١م" },
            ].map((branch) => (
              <div
                key={branch.city}
                style={{
                  background: BRAND.white,
                  borderRadius: 18,
                  padding: "24px 20px",
                  textAlign: "right",
                  border: `1px solid ${BRAND.secondary}`,
                  boxShadow: "0 2px 12px rgba(83,28,36,0.06)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${BRAND.primary}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    marginRight: "auto",
                    marginLeft: 0,
                  }}
                >
                  <MapPin size={22} color={BRAND.primary} />
                </div>
                <h3 style={{ color: BRAND.primary, fontWeight: 800, fontSize: 17, marginBottom: 4 }}>
                  {branch.city}
                </h3>
                <p style={{ color: "#888", fontSize: 13, marginBottom: 10 }}>{branch.area}</p>
                <div className="flex items-center gap-2" style={{ justifyContent: "flex-end" }}>
                  <span style={{ color: "#666", fontSize: 13 }}>{branch.hours}</span>
                  <Clock size={14} color="#999" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryLight})`,
          padding: "60px 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <ArabicPattern />
        </div>
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <h2 style={{ color: BRAND.secondary, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900, marginBottom: 16 }}>
            ابدأ طلبك الآن واستمتع
            <br />
            <span style={{ color: BRAND.accent }}>بأشهى الحلويات</span>
          </h2>
          <p style={{ color: "rgba(231,216,195,0.7)", fontSize: 15, marginBottom: 32 }}>
            توصيل سريع لباب منزلك في الرياض، جدة، الدمام، ومكة المكرمة
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              style={{
                background: BRAND.accent,
                color: BRAND.primaryDark,
                padding: "14px 36px",
                borderRadius: 40,
                fontWeight: 800,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(201,168,124,0.4)",
              }}
            >
              اطلب الآن
            </button>
            <button
              style={{
                background: "transparent",
                color: BRAND.secondary,
                padding: "14px 36px",
                borderRadius: 40,
                fontWeight: 700,
                fontSize: 16,
                border: `2px solid rgba(231,216,195,0.3)`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Phone size={18} />
              تواصل معنا
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ background: "#1a0a0d", padding: "50px 0 24px" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-right">
            <div>
              <div style={{ color: BRAND.secondary, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
                كنافيا
              </div>
              <div style={{ color: BRAND.accent, fontSize: 11, letterSpacing: 3, marginBottom: 16 }}>
                KNAFIA BAKERY & SWEETS
              </div>
              <p style={{ color: "rgba(231,216,195,0.5)", fontSize: 13, lineHeight: 1.7 }}>
                نكهات شرقية أصيلة بلمسة عصرية منذ أكثر من عقد من الزمن
              </p>
              <div className="flex gap-3 mt-4 justify-end">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button
                    key={i}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(231,216,195,0.08)",
                      border: "1px solid rgba(231,216,195,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={16} color={BRAND.accent} />
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: "روابط سريعة",
                links: ["الرئيسية", "المنيو", "الفروع", "من نحن", "اتصل بنا"],
              },
              {
                title: "خدمات العملاء",
                links: ["تتبع الطلب", "سياسة الإرجاع", "الأسئلة الشائعة", "الدعم الفني"],
              },
              {
                title: "تواصل معنا",
                links: ["info@knafia.sa", "920001234", "واتساب: 0512345678"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ color: BRAND.secondary, fontWeight: 700, marginBottom: 16 }}>{col.title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link} style={{ marginBottom: 10 }}>
                      <a
                        href="#"
                        style={{ color: "rgba(231,216,195,0.5)", fontSize: 13, textDecoration: "none" }}
                        className="hover:opacity-80 transition-opacity"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(231,216,195,0.1)",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ color: "rgba(231,216,195,0.35)", fontSize: 13 }}>
              © ٢٠٢٦ كنافيا. جميع الحقوق محفوظة.
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {["سياسة الخصوصية", "الشروط والأحكام"].map((link) => (
                <a key={link} href="#" style={{ color: "rgba(231,216,195,0.35)", fontSize: 13 }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── WhatsApp Float ─── */}
      <a
        href="#"
        style={{
          position: "fixed",
          bottom: 28,
          left: 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25d366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          zIndex: 100,
        }}
      >
        <MessageCircle size={26} color="white" fill="white" />
      </a>
    </div>
  );
}
