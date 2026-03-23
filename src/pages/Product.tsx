import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, ChevronUp, ChevronLeft, Info, Tag, Truck, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

/* ─── data ─── */
const allImages = [
  "https://happymami.com/wp-content/uploads/2024/06/Pack3-biberon-rosa-violeta-menta-blanco-1024x1024.webp",
  "https://happymami.com/wp-content/uploads/2024/06/fotos-biberon-verde-vaso-rosa-tetina-violeta-1024x1024.webp",
  "https://happymami.com/wp-content/uploads/2024/06/biberon-250ml-rosa-dos-manos-transparente-1024x1024.webp",
  "https://happymami.com/wp-content/uploads/2024/09/pack-completo-2btd-violeta-1080-blanco-1024x1024.webp",
  "https://happymami.com/wp-content/uploads/2024/06/biberon-medidas-250ml-verde-mano-transparente-1024x1024.webp",
];

const VISIBLE_THUMBS = 4;

const packs = [
  { id: "single", name: "1 Biberón", price: 29.95, originalPrice: undefined, badge: undefined, desc: undefined },
  { id: "duo", name: "Set de 2 biberones", price: 49.9, originalPrice: 59.9, badge: "ENVÍO GRATIS", desc: undefined },
  {
    id: "essential",
    name: "Pack Esencial",
    desc: "2 Biberones + Termo + Dosificador",
    price: 69.8,
    originalPrice: 93.8,
    badge: "AHORRO DE 24€ + ENVÍO GRATIS",
  },
];

const tabs = ["Acompañamiento por matronas", "Incluye", "Beneficios", "Especificaciones"] as const;

const reviews = [
  {
    stars: 5,
    text: "Es magia como la bebe ha cogido este biberón. No ha querido ningún otro, ni chupete ni nada y desde el primer momento le ha encantado el…",
    name: "Carmen PC",
    date: "2 Febrero 2026",
    color: "#4caf50",
  },
  {
    stars: 5,
    text: "Ante todo dar mil millones de gracias, después de mas de 8 biberones, tetinas distintas, no se cuantas cosas mas, me anime a comprar happymami, que gran…",
    name: "Diana Stan",
    date: "14 Diciembre 2025",
    color: "#ff9800",
  },
  {
    stars: 5,
    text: "Después de probar muchas marcas de biberones y ninguna me cogía por fin decidí a comprar un biberón de Happymami para ver cómo última opció…",
    name: "Irene Luna Jiménez",
    date: "4 Diciembre 2025",
    color: "#9c27b0",
  },
];

const relatedProducts = [
  {
    image: "https://happymami.com/wp-content/uploads/2024/08/3dosificadores-blanco.webp",
    name: "Dosificador de leche en polvo Happymami",
    price: "13,95 €",
    oldPrice: undefined,
  },
  {
    image: "https://happymami.com/wp-content/uploads/2025/09/termo-menta-dosificador-menta-blanco-1080px.webp",
    name: "Pack termo y dosificador de leche en polvo Happymami",
    price: "25,90 €",
    oldPrice: "33,90 €",
  },
  {
    image: "https://happymami.com/wp-content/uploads/2025/08/termos-3-happyanimals-blanco.webp",
    name: "Termo para líquidos Happyanimals",
    price: "19,95 €",
    oldPrice: undefined,
  },
];

const faqs = [
  {
    q: "Mi bebé rechaza todos los biberones ¿me aseguras que cogerá este?",
    a: [
      "Nuestra tasa de aceptación es muy alta debido a que hacemos un biberón diseñado a medida para cada bebé.",
      "Además, te daremos unas pautas a seguir, y si no lo cogiera, te pediremos vídeos para ver dónde puede estar el problema.",
      "No te podemos asegurar el 100% de que lo vaya a aceptar, pero si que lo vamos a intentar todo.",
    ],
  },
  { q: "¿Es anticólicos?", a: [] },
  { q: "No estoy segura de mi diseño", a: [] },
  { q: "¿Qué flujo escojo para mi bebé?", a: [] },
  { q: "¿Este biberón funciona con fórmula?", a: [] },
  { q: "Doy lactancia artificial o mixta ¿puede funcionar?", a: [] },
  { q: "¿Estos biberones protegen la lactancia materna?", a: [] },
  { q: "¿Cuando me llegará?", a: [] },
  { q: "No estoy segura de si comprar", a: [] },
];

/* ─── component ─── */
const Product = () => {
  const [selected, setSelected] = useState("duo");
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const navigate = useNavigate();
  const { addItem } = useCart();

  /* ── Swipe logic for mobile ── */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const swipeImage = useCallback(
    (dir: 1 | -1, forGallery = false) => {
      const setter = forGallery ? setGalleryIdx : setActiveImage;
      setter((prev) => {
        const next = prev + dir;
        if (next < 0) return allImages.length - 1;
        if (next >= allImages.length) return 0;
        return next;
      });
    },
    [],
  );
  const onTouchEnd = useCallback(
    (e: React.TouchEvent, forGallery = false) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      if (Math.abs(dx) > 50) swipeImage(dx < 0 ? 1 : -1, forGallery);
      touchStart.current = null;
    },
    [swipeImage],
  );

  /* ── Pinch-to-zoom ── */
  const [scale, setScale] = useState(1);
  const initialDistance = useRef<number | null>(null);
  const initialScale = useRef(1);
  const onPinchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance.current = Math.hypot(dx, dy);
        initialScale.current = scale;
      }
    },
    [scale],
  );
  const onPinchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const newScale = Math.min(Math.max(initialScale.current * (dist / initialDistance.current), 1), 3);
      setScale(newScale);
    }
  }, []);
  const onPinchEnd = useCallback(() => {
    initialDistance.current = null;
    setScale((s) => (s < 1.15 ? 1 : s));
  }, []);

  /* ── Keyboard for gallery modal ── */
  useEffect(() => {
    if (!galleryOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryOpen(false);
      if (e.key === "ArrowRight") swipeImage(1, true);
      if (e.key === "ArrowLeft") swipeImage(-1, true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [galleryOpen, swipeImage]);

  const openGallery = (idx: number) => {
    setGalleryIdx(idx);
    setScale(1);
    setGalleryOpen(true);
  };

  const handleSelect = (id: string) => {
    setSelected(id);
    const pack = packs.find((p) => p.id === id)!;
    addItem({
      id: pack.id,
      name: `Biberón personalizado - ${pack.name}`,
      variant: pack.name,
      price: pack.price,
      originalPrice: pack.originalPrice,
      quantity: 1,
      image: allImages[0],
    });
    navigate("/cart");
  };

  return (
    <div className="bg-white">
      {/* ═══ HERO ═══ */}
      <section className="mx-auto max-w-[1200px] px-4 pt-8 pb-6 sm:px-6 sm:pt-10 md:px-10">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
          {/* Left: images */}
          <div>
            {/* Main image – swipeable & pinch-zoomable */}
            <div
              className="relative flex cursor-zoom-in touch-none items-center justify-center overflow-hidden"
              onTouchStart={(e) => { onTouchStart(e); onPinchStart(e); }}
              onTouchMove={onPinchMove}
              onTouchEnd={(e) => { onTouchEnd(e); onPinchEnd(); }}
              onClick={() => openGallery(activeImage)}
            >
              <img
                src={allImages[activeImage]}
                alt="Biberones Happymami"
                className="h-auto max-h-[480px] w-auto object-contain transition-transform duration-200"
                style={{ transform: `scale(${scale})` }}
                draggable={false}
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 sm:mt-5 sm:gap-3">
              {allImages.slice(0, VISIBLE_THUMBS).map((t, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[10px] border-2 bg-white p-1 transition-all hover:shadow-md ${
                    activeImage === i ? "border-[#f49898]" : "border-[#d6dce4]"
                  }`}
                >
                  <img src={t} alt="" className="h-full w-full object-contain" />
                </div>
              ))}
              {allImages.length > VISIBLE_THUMBS && (
                <button
                  onClick={() => openGallery(VISIBLE_THUMBS)}
                  className="flex h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] flex-shrink-0 items-center justify-center rounded-[10px] border border-[#d6dce4] bg-[#3a3a3a] text-white text-[18px] font-bold cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                >
                  +{allImages.length - VISIBLE_THUMBS}
                </button>
              )}
            </div>

            {/* ── Tu diseño ── */}
            <div className="mt-8 rounded-[16px] bg-[#fdf5f0] px-4 py-5 text-center sm:px-8 sm:py-6">
              <h3 className="text-[16px] font-body text-[#4a5568]">Tu diseño</h3>
              <div className="mx-auto mt-4 max-w-[440px] rounded-[10px] border border-[#e8ddd5] bg-white px-4 py-3 text-left text-[13px] font-body sm:px-6 sm:py-4 sm:text-[14px]">
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 sm:gap-x-6">
                  <span className="italic text-[#f49898]">Forma del pecho:</span>
                  <span className="font-semibold text-[#26334d]">Redondo</span>
                  <span className="italic text-[#f49898]">Longitud del pezón:</span>
                  <span className="font-semibold text-[#26334d]">Mayor o igual a 1,2cm</span>
                  <span className="italic text-[#f49898]">Diámetro del pezón:</span>
                  <span className="font-semibold text-[#26334d]">Menor o igual a 2,5cm</span>
                  <span className="italic text-[#f49898]">¿Pezón se estira?:</span>
                  <span className="font-semibold text-[#26334d]">No se estira</span>
                </div>
              </div>
              <Link
                to="/design"
                className="mt-5 inline-block rounded-full bg-[#f49898] px-6 py-[12px] text-[14px] font-body font-semibold text-white transition-opacity hover:opacity-90"
              >
                Modificar diseño
              </Link>
            </div>
          </div>

          {/* ── Gallery Lightbox Modal ── */}
          {galleryOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80" onClick={() => setGalleryOpen(false)}>
              <div className="relative flex h-full w-full max-w-[920px] flex-col items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button onClick={() => setGalleryOpen(false)} className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40">
                  <X size={24} />
                </button>

                {/* Arrows */}
                <button
                  onClick={() => swipeImage(-1, true)}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/40 md:left-4"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() => swipeImage(1, true)}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/40 md:right-4"
                >
                  <ChevronRight size={28} />
                </button>

                {/* Gallery image – swipeable & pinch-zoomable */}
                <div
                  className="touch-none select-none"
                  onTouchStart={(e) => { onTouchStart(e); onPinchStart(e); }}
                  onTouchMove={onPinchMove}
                  onTouchEnd={(e) => { onTouchEnd(e, true); onPinchEnd(); }}
                >
                  <img
                    src={allImages[galleryIdx]}
                    alt=""
                    className="max-h-[80vh] w-auto max-w-full object-contain transition-transform duration-200"
                    style={{ transform: `scale(${scale})` }}
                    draggable={false}
                  />
                </div>

                {/* Dots */}
                <div className="mt-4 flex gap-2">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIdx(i)}
                      className={`h-2 w-2 rounded-full transition-colors ${galleryIdx === i ? "bg-white" : "bg-white/40"}`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <p className="mt-2 text-[13px] text-white/70">{galleryIdx + 1} / {allImages.length}</p>
              </div>
            </div>
          )}

          {/* Right: info */}
          <div>
            <h1 className="font-display text-[26px] sm:text-[34px] font-bold leading-tight text-[#26334d]">
              Biberón Personalizado
            </h1>
            <p className="mt-1 text-[18px] font-body text-[#4a5568]">
              &amp; Acompañamiento por Matronas
            </p>

            <p className="mt-6 text-center text-[15px] font-body text-[#4a5568]">
              Elige tu pack y ahorra
            </p>

            {/* Pack options */}
            <div className="mt-4 flex flex-col gap-4">
              {packs.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => handleSelect(pack.id)}
                  className={`relative w-full rounded-full border-2 px-4 py-3 text-left transition-all sm:px-6 sm:py-4 ${
                    selected === pack.id
                      ? "border-[#f49898] shadow-sm"
                      : "border-[#d6dce4] hover:border-[#b0b8c4]"
                  }`}
                >
                  {pack.badge && (
                    <span className="absolute -top-[12px] right-4 rounded-full bg-[#f49898] px-3 py-[4px] text-[11px] font-bold uppercase tracking-wide text-white">
                      {pack.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[16px] font-body font-semibold text-[#26334d]">
                        {pack.name}
                      </span>
                      {pack.desc && (
                        <p className="text-[13px] font-body text-[#737b8c]">{pack.desc}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        {pack.originalPrice && (
                          <span className="block text-[13px] font-body text-[#a0a8b4] line-through">
                            {pack.originalPrice.toFixed(2).replace(".", ",")} €
                          </span>
                        )}
                        <span className="text-[18px] font-body font-bold text-[#26334d]">
                          {pack.price.toFixed(2).replace(".", ",")} €
                        </span>
                      </div>
                      <ChevronRight size={22} className="text-[#f49898]" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Payment & shipping info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 rounded-[8px] border border-[#d6dce4] px-3 py-3 sm:px-4 flex-wrap">
                <span className="text-[12px] text-[#737b8c]">🔒 Pago seguro garantizado</span>
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#4a5568] flex-wrap">
                  <span className="rounded bg-[#1a1f71] px-[6px] py-[2px] text-white">VISA</span>
                  <span className="text-[#eb001b]">●●</span>
                  <span>Apple Pay</span>
                  <span className="text-[#00a5e3]">bizum</span>
                  <span className="text-[#003087]">P</span>
                  <span>G Pay</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[14px] font-body text-[#4a5568]">
                <Tag size={18} className="text-[#f49898]" />
                IVA incluido
              </div>
              <div className="flex items-center gap-3 text-[14px] font-body text-[#4a5568]">
                <Info size={18} className="text-[#87a1b2]" />
                Entrega en 24/48h hábiles{" "}
                <span className="underline cursor-pointer">(+ info)</span>
              </div>
              <div className="flex items-center gap-3 text-[14px] font-body text-[#4a5568]">
                <Truck size={18} className="text-[#87a1b2]" />
                Envío gratis península a partir de 49€
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TABS ═══ */}
      <section className="mx-auto max-w-[1100px] px-4 pb-10 sm:px-6">
        <div className="rounded-[16px] border border-[#d6dce4] overflow-hidden">
          {/* Tab headers */}
          <div className="flex overflow-x-auto border-b border-[#d6dce4]" style={{ scrollbarWidth: "none" }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[120px] whitespace-nowrap py-3 px-2 text-center text-[13px] sm:text-[15px] sm:py-4 font-body transition-colors ${
                  activeTab === tab
                    ? "font-semibold text-[#26334d] border-b-[3px] border-[#f49898]"
                    : "text-[#737b8c] hover:text-[#26334d]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Tab content */}
          <div className="p-4 sm:p-8">
            {/* ── Acompañamiento por matronas ── */}
            {activeTab === "Acompañamiento por matronas" && (
              <div className="grid gap-8 md:grid-cols-2 md:items-start">
                <img
                  src="https://happymami.com/wp-content/uploads/2024/10/matrona-whatsapp-happymami-biberon-personalizado.png.webp"
                  alt="Matrona WhatsApp"
                  className="w-full rounded-[12px]"
                />
                <div>
                  <h3 className="text-[20px] font-body font-bold text-[#26334d]">
                    Whatsapp matronas reales
                  </h3>
                  <p className="mt-3 text-[15px] font-body leading-relaxed text-[#4a5568]">
                    No estás sola. Con tu Happymami tienes acceso directo a nuestro equipo de matronas
                    reales por WhatsApp. Te escuchamos, resolvemos tus dudas y te guiamos paso a paso
                    para que te sientas segura y tranquila.
                  </p>
                  <h3 className="mt-6 text-[20px] font-body font-bold text-[#26334d]">
                    Guía de pautas de aceptación
                  </h3>
                  <p className="mt-3 text-[15px] font-body leading-relaxed text-[#4a5568]">
                    Te damos un plan claro. Recibirás nuestra guía profesional con el método exacto
                    para ofrecer el biberón, asegurando la mejor experiencia para ti y tu bebé desde
                    la primera toma.
                  </p>
                </div>
              </div>
            )}

            {/* ── Incluye ── */}
            {activeTab === "Incluye" && (
              <div className="grid gap-8 md:grid-cols-2 md:items-start">
                <img
                  src="https://happymami.com/wp-content/uploads/2024/06/fotos-biberon-verde-vaso-rosa-tetina-violeta-1024x1024.webp"
                  alt="Contenido del pack"
                  className="w-full rounded-[12px]"
                />
                <div>
                  <h3 className="text-[20px] font-body font-bold text-[#26334d]">
                    Tu Happymami incluye
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {[
                      { icon: "fa-solid fa-baby-carriage", title: "Biberón personalizado", desc: "Diseñado según tus medidas para una máxima aceptación." },
                      { icon: "fa-solid fa-hand-holding-heart", title: "Tetina a medida de tu pecho", desc: "Forma, longitud, diámetro y elasticidad adaptados a ti." },
                      { icon: "fa-brands fa-whatsapp", title: "WhatsApp con matronas reales", desc: "Acceso directo a nuestro equipo de matronas para resolver tus dudas." },
                      { icon: "fa-solid fa-book-open", title: "Guía de pautas de aceptación", desc: "El método exacto para ofrecer el biberón desde la primera toma." },
                      { icon: "fa-solid fa-shield-halved", title: "Doble sistema anticólicos", desc: "Integrado en la tetina, sin piezas adicionales. Funciona en cualquier posición." },
                      { icon: "fa-solid fa-certificate", title: "Libre de BPA", desc: "Silicona de grado alimentario, segura para tu bebé." },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <i className={`${item.icon} mt-1 text-[18px] text-[#f49898]`} />
                        <div>
                          <p className="text-[15px] font-body font-semibold text-[#26334d]">{item.title}</p>
                          <p className="text-[14px] font-body text-[#4a5568]">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ── Beneficios ── */}
            {activeTab === "Beneficios" && (
              <div>
                <h3 className="text-center text-[22px] font-body font-bold text-[#26334d]">
                  Beneficios de Happymami
                </h3>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { icon: "fa-solid fa-pencil-ruler", title: "Diseñado a medida", desc: "Creado por matronas para adaptarse a la forma de tu pecho." },
                    { icon: "fa-solid fa-heart", title: "94,3% de aceptación", desc: "La tasa de aceptación más alta del mercado frente al 39% de biberones genéricos." },
                    { icon: "fa-solid fa-seedling", title: "Protege tu lactancia", desc: "Protección de la lactancia materna del 97,4% frente al 50% de biberones genéricos." },
                    { icon: "fa-solid fa-flask", title: "Basado en ciencia", desc: "Eficacia probada con un estudio de más de 1.600 mamás." },
                  ].map((b) => (
                    <div key={b.title} className="flex flex-col items-center rounded-[14px] bg-[#fdf5f0] px-5 py-6 text-center">
                      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#f49898]/15">
                        <i className={`${b.icon} text-[22px] text-[#f49898]`} />
                      </div>
                      <h4 className="mt-3 text-[15px] font-body font-bold text-[#26334d]">{b.title}</h4>
                      <p className="mt-2 text-[13px] font-body leading-relaxed text-[#4a5568]">{b.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {[
                    { icon: "fa-solid fa-wind", title: "Doble sistema anticólicos", desc: "Previene cólicos en cualquier posición, sin piezas añadidas, fácil de limpiar." },
                    { icon: "fa-solid fa-droplet", title: "Silicona de grado alimentario", desc: "Resistente a lavavajillas, calienta biberones, esterilizadores y microondas." },
                    { icon: "fa-solid fa-broom", title: "Fácil de limpiar", desc: "Completamente desmontable y con boca ancha para una limpieza rápida y cómoda." },
                  ].map((b) => (
                    <div key={b.title} className="flex items-start gap-3 rounded-[12px] border border-[#e8e0d8] px-5 py-4">
                      <i className={`${b.icon} mt-1 text-[18px] text-[#f49898]`} />
                      <div>
                        <p className="text-[15px] font-body font-semibold text-[#26334d]">{b.title}</p>
                        <p className="mt-1 text-[13px] font-body text-[#4a5568]">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Especificaciones ── */}
            {activeTab === "Especificaciones" && (
              <div className="mx-auto max-w-[600px]">
                <h3 className="text-center text-[20px] font-body font-bold text-[#26334d]">
                  Especificaciones técnicas
                </h3>
                <table className="mt-6 w-full text-[14px] font-body">
                  <tbody>
                    {[
                      ["Material tetina", "Silicona de grado alimentario"],
                      ["Material cuerpo", "Polipropileno (PP), libre de BPA"],
                      ["Tamaños disponibles", "150 ml / 250 ml"],
                      ["Colores", "Menta, Rosa, Violeta"],
                      ["Sistema anticólicos", "Doble sistema integrado en la tetina"],
                      ["Flujos de tetina", "Lento (recién nacido) / Medio (+3 meses)"],
                      ["Compatibilidad", "Lavavajillas, calienta biberones, esterilizadores, microondas"],
                      ["Boca", "Boca ancha para fácil limpieza y preparación"],
                      ["Diseño tetina", "Personalizado según medidas del pecho materno"],
                      ["Certificaciones", "Libre de BPA, ftalatos y sustancias nocivas"],
                    ].map(([label, value], i) => (
                      <tr key={label} className={i % 2 === 0 ? "bg-[#fdf5f0]" : ""}>
                        <td className="px-4 py-3 font-semibold text-[#26334d]">{label}</td>
                        <td className="px-4 py-3 text-[#4a5568]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Seleccionar set */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full bg-[#f49898] px-10 py-[14px] text-[16px] font-body font-semibold text-white transition-opacity hover:opacity-90"
          >
            Seleccionar set
          </button>
        </div>
      </section>

      {/* ═══ GOOGLE REVIEWS ═══ */}
      <section className="py-14">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <h2 className="font-display text-[28px] font-bold text-[#26334d] md:text-[34px]">
            <span className="text-[#f6b93b]">★</span> 5/5 en Google{" "}
            <span className="mx-2 text-[#d6dce4]">|</span> +100.000 familias confían en
            Happymami
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="rounded-[16px] border border-[#d6dce4] px-6 py-5 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-[2px] text-[16px] text-[#f6b93b]">
                    {"★★★★★".split("").map((s, si) => (
                      <span key={si}>{s}</span>
                    ))}
                    <span className="ml-1 text-[14px] text-[#4285f4]">✓</span>
                  </div>
                  <span className="text-[20px] font-bold">
                    <span className="text-[#4285f4]">G</span>
                    <span className="text-[#ea4335]">o</span>
                    <span className="text-[#fbbc05]">o</span>
                    <span className="text-[#4285f4]">g</span>
                    <span className="text-[#34a853]">l</span>
                    <span className="text-[#ea4335]">e</span>
                  </span>
                </div>
                <p className="mt-3 text-[14px] font-body leading-relaxed text-[#4a5568]">
                  {r.text}
                </p>
                <p className="mt-1 text-[13px] font-body text-[#f49898] cursor-pointer">
                  Leer más
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-full text-[14px] font-bold text-white"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[14px] font-body font-semibold text-[#26334d]">
                      {r.name}
                    </p>
                    <p className="text-[12px] font-body text-[#737b8c]">{r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TE PUEDE INTERESAR ═══ */}
      <section className="mx-auto max-w-[1000px] px-4 pb-14 sm:px-6">
        <div className="rounded-[20px] bg-[#f5f0eb] px-4 py-6 sm:px-8 sm:py-8">
          <h3 className="text-center text-[16px] font-body text-[#4a5568]">Te puede interesar</h3>
          <div className="mx-1 mt-1 h-[3px] w-[80px] mx-auto rounded bg-[#f49898]" />

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {relatedProducts.map((rp, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-full overflow-hidden rounded-[14px] border border-[#d6dce4] bg-white p-3">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="mx-auto h-[160px] object-contain"
                  />
                </div>
                <h4 className="mt-3 text-[14px] font-body font-bold text-[#26334d]">
                  {rp.name}
                </h4>
                <p className="mt-1 text-[14px] font-body">
                  {rp.oldPrice && (
                    <span className="mr-1 text-[#a0a8b4] line-through">{rp.oldPrice}</span>
                  )}
                  <span className="font-bold italic text-[#f49898]">{rp.price}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="mx-auto max-w-[1100px] px-4 pb-10 sm:px-6">
        <h2 className="text-center font-display text-[28px] sm:text-[32px] italic text-[#737b8c]">
          ¿Aún tienes dudas?
        </h2>

        <div className="mt-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[#f49898]">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="text-[15px] font-body font-bold text-[#26334d]">
                  {faq.q}
                </span>
                {openFaq === i ? (
                  <ChevronUp size={20} className="text-[#737b8c]" />
                ) : (
                  <ChevronDown size={20} className="text-[#737b8c]" />
                )}
              </button>
              {openFaq === i && faq.a.length > 0 && (
                <div className="pb-5 space-y-3">
                  {faq.a.map((line, li) => (
                    <p key={li} className="text-[14px] font-body leading-relaxed text-[#4a5568]">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mx-auto max-w-[1100px] px-6 pb-10">
        <p className="text-[11px] font-body italic leading-relaxed text-[#a0a8b4]">
          * Esta información no sustituye la necesidad de valoración por un profesional experto en
          la materia, son recomendaciones generales basadas en evidencia, pero cada caso es
          particular y necesita de una valoración íntegra por el personal cualificado
        </p>
      </div>
    </div>
  );
};

export default Product;
