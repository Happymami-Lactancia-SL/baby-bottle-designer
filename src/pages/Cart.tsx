import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Truck, Gift } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

/* ─── cross-sell data ─── */
const crossSell = [
  {
    image: "https://happymami.com/wp-content/uploads/2024/06/Pack3-biberon-rosa-violeta-menta-blanco-1024x1024.webp",
    name: "Biberón personalizado - 1 Biberón",
    price: 19.95,
    oldPrice: undefined,
    colors: ["#e8c4b8", "#b8a0c4"],
  },
  {
    image: "https://happymami.com/wp-content/uploads/2025/08/termos-3-happyanimals-blanco.webp",
    name: "Termo para líquidos Happyanimals",
    price: 19.95,
    oldPrice: undefined,
    colors: ["#e8c4b8", "#5b7a8a"],
  },
  {
    image: "https://happymami.com/wp-content/uploads/2024/08/3dosificadores-blanco.webp",
    name: "Dosificador de leche en polvo Happymami",
    price: 12.95,
    oldPrice: 13.95,
    colors: ["#e8c4b8", "#b8a0c4", "#5b7a8a"],
  },
  {
    image: "https://happymami.com/wp-content/uploads/2024/07/3-muselinas-blanco-1024x1024.webp",
    name: "Muselinas Happymami",
    price: 14.95,
    oldPrice: undefined,
    colors: ["#e8c4b8", "#b8a0c4"],
  },
];

const fmt = (n: number) => n.toFixed(2).replace(".", ",");

/* ─── component ─── */
const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[600px] px-4 py-20 text-center">
        <h1 className="font-display text-[28px] font-bold text-[#26334d]">Tu carrito está vacío</h1>
        <p className="mt-3 text-[15px] font-body text-[#4a5568]">Añade productos para empezar</p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-[#f49898] px-8 py-3 text-[15px] font-body font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  const shipping = total >= 49 ? 0 : 4.95;
  const grandTotal = total + shipping;
  const freeShippingProgress = Math.min(total / 49, 1);

  const scrollCarousel = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* ═══ Delivery banner ═══ */}
      <div className="bg-[#87a1b2] py-2 text-center text-[13px] font-body text-white">
        <span className="mr-1">⚡</span> Entrega prevista entre mañana y el miércoles
      </div>

      {/* ═══ Coupon toggle ═══ */}
      <div className="border-b border-[#e8e0da] bg-[#fdf5f0]">
        <button
          onClick={() => setCouponOpen(!couponOpen)}
          className="mx-auto flex items-center gap-1 py-3 text-[13px] font-body text-[#26334d] transition-colors hover:text-[#4a5568]"
        >
          {couponOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          Añadir cupón promocional
        </button>
        {couponOpen && (
          <div className="mx-auto flex max-w-[600px] items-center gap-3 px-6 pb-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Código de cupón"
              className="flex-1 rounded-full border border-[#d6dce4] bg-white px-5 py-3 text-[14px] font-body text-[#26334d] placeholder:text-[#a0a8b4] outline-none focus:border-[#f49898]"
            />
            <button className="rounded-full bg-[#f49898] px-6 py-3 text-[14px] font-body font-semibold text-white transition-opacity hover:opacity-90">
              Aplicar cupón
            </button>
          </div>
        )}
      </div>

      {/* ═══ Main content ═══ */}
      <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-14">
        <h1 className="text-center font-display text-[28px] font-bold text-[#26334d] md:text-[32px]">
          Tu carrito Happymami
        </h1>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          {/* ── Left: product list ── */}
          <div>
            {/* Table header */}
            <div className="hidden border-b border-[#d6dce4] pb-3 md:grid md:grid-cols-[1fr_100px_90px_100px] md:gap-4">
              <span className="text-[13px] font-body font-bold text-[#26334d]">Producto</span>
              <span className="text-[13px] font-body font-bold text-[#26334d]">Precio</span>
              <span className="text-[13px] font-body font-bold text-[#26334d]">Cantidad</span>
              <span className="text-right text-[13px] font-body font-bold text-[#26334d]">Subtotal</span>
            </div>

            {/* Cart items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="grid items-center gap-4 border-b border-[#d6dce4] py-5 md:grid-cols-[1fr_100px_90px_100px]"
              >
                {/* Product info */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-sm border border-[#d6dce4] text-[10px] text-[#a0a8b4] transition-colors hover:border-[#f49898] hover:text-[#f49898]"
                  >
                    ✕
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[65px] w-[65px] flex-shrink-0 rounded-[8px] object-contain"
                  />
                  <div className="min-w-0">
                    <Link to="/product" className="text-[14px] font-body font-bold text-[#f49898] hover:underline">
                      {item.name}
                    </Link>

                  </div>
                </div>
                {/* Price */}
                <span className="text-[14px] font-body text-[#26334d]">{fmt(item.price)} €</span>
                {/* Quantity */}
                <div className="flex items-center rounded-[6px] border border-[#d6dce4] w-fit">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 text-[#737b8c] transition-colors hover:text-[#26334d]"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-[28px] text-center text-[14px] font-body text-[#26334d]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-[#737b8c] transition-colors hover:text-[#26334d]"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                {/* Subtotal */}
                <div className="text-right">
                  {item.originalPrice && (
                    <span className="mr-2 text-[13px] font-body text-[#a0a8b4] line-through">
                      {fmt(item.originalPrice * item.quantity)} €
                    </span>
                  )}
                  <span className="text-[16px] font-body font-bold text-[#f49898]">
                    {fmt(item.price * item.quantity)} €
                  </span>
                </div>
              </div>
            ))}

            {/* ── Matrona row ── */}
            <div className="flex items-center justify-between rounded-[12px] bg-[#eef4f8] px-5 py-4 mt-1 border-b border-[#d6dce4]">
              <div className="flex items-center gap-3">
                <img
                  src="https://happymami.com/wp-content/plugins/happymami-productos/assets/img/producto-matrona.webp"
                  alt="Matronas"
                  className="h-[48px] w-[48px] flex-shrink-0 rounded-[10px] object-cover"
                />
                <span className="text-[14px] font-body font-bold text-[#5b7a8a] underline decoration-[#5b7a8a]">
                  Tu matrona asignada vía whatsapp
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-body text-[#a0a8b4] line-through">19,90€</span>
                <span className="text-[16px] font-body font-bold text-green-600">Gratis</span>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-6">
            {/* Cross-sell carousel */}
            <div>
              <h3 className="text-[16px] font-body font-bold text-[#26334d]">Añádelo con descuento</h3>
              <div className="relative mt-3">
                <button
                  onClick={() => scrollCarousel(-1)}
                  className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 shadow-md transition-colors hover:bg-[#f5f0eb]"
                >
                  <ChevronLeft size={16} className="text-[#737b8c]" />
                </button>
                <div
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
                  style={{ scrollbarWidth: "none" }}
                >
                  {crossSell.map((p, i) => (
                    <div
                      key={i}
                      className="flex w-[150px] flex-shrink-0 flex-col rounded-[12px] border border-[#d6dce4] bg-white p-3"
                    >
                      <div className="flex h-[110px] items-center justify-center">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <p className="mt-2 text-[12px] font-body font-bold leading-tight text-[#26334d]">
                        {p.name}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        {p.oldPrice && (
                          <span className="text-[12px] font-body text-[#a0a8b4] line-through">
                            {fmt(p.oldPrice)} €
                          </span>
                        )}
                        <span className="text-[13px] font-body font-bold text-[#f49898]">
                          {fmt(p.price)} €
                        </span>
                      </div>
                      {p.colors && (
                        <div className="mt-1.5 flex gap-1">
                          {p.colors.map((c, ci) => (
                            <span
                              key={ci}
                              className="h-[14px] w-[14px] rounded-full border border-[#d6dce4]"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      )}
                      <button className="mt-2 w-full rounded-full bg-[#f49898] py-[6px] text-[11px] font-body font-semibold text-white transition-opacity hover:opacity-90">
                        Añadir al carrito
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollCarousel(1)}
                  className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 shadow-md transition-colors hover:bg-[#f5f0eb]"
                >
                  <ChevronRight size={16} className="text-[#737b8c]" />
                </button>
              </div>
              {/* Scroll indicator */}
              <div className="mt-2 flex justify-center">
                <div className="h-[3px] w-[80px] rounded-full bg-[#d6dce4]">
                  <div className="h-full w-[40%] rounded-full bg-[#a0a8b4]" />
                </div>
              </div>
            </div>

            {/* ── Totals card ── */}
            <div className="rounded-[12px] border border-[#d6dce4] bg-white">
              <div className="px-6 py-5">
                <h3 className="text-[16px] font-body font-bold italic text-[#26334d]">Totales del carrito</h3>

                <div className="mt-4 space-y-3 text-[14px] font-body">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#26334d]">Subtotal</span>
                    <span className="text-[#26334d]">{fmt(grandTotal)} €</span>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="font-bold text-[#26334d]">Envío</span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-[#5bbead]">
                      {shipping === 0 ? "Envío Premium Gratuito" : `${fmt(shipping)} €`}
                    </p>
                    <p className="text-[12px] text-[#f49898] underline cursor-pointer">Cambiar dirección</p>
                  </div>
                  <hr className="border-[#d6dce4]" />
                  <div className="flex justify-between text-[16px] font-bold">
                    <span className="text-[#26334d]">Total</span>
                    <span className="text-[#26334d]">{fmt(grandTotal)} €</span>
                  </div>
                </div>

                {/* Free shipping progress */}
                <div className="mt-5 rounded-[10px] border border-[#d6dce4] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="flex-shrink-0 text-[#26334d]" />
                    <div className="flex-1">
                      <p className="text-[12px] font-body text-[#26334d]">
                        {freeShippingProgress >= 1
                          ? <>¡Ya tienes <b>envío gratuito</b>!</>
                          : <>Te faltan <b>{fmt(49 - total)} €</b> para envío gratis</>
                        }
                      </p>
                      <div className="mt-1.5 h-[6px] w-full rounded-full bg-[#e8e0da]">
                        <div
                          className="h-full rounded-full bg-[#34a853] transition-all duration-500"
                          style={{ width: `${freeShippingProgress * 100}%` }}
                        />
                      </div>
                    </div>
                    <Gift size={16} className="flex-shrink-0 text-[#5bbead]" />
                  </div>
                </div>

                {/* CTA buttons */}
                <Link
                  to="/checkout"
                  className="mt-5 block w-full rounded-full bg-[#f49898] py-[14px] text-center text-[16px] font-body font-bold text-white transition-opacity hover:opacity-90"
                >
                  Tramitar pedido - {fmt(grandTotal)} €
                </Link>

                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-[6px] border border-[#d6dce4] bg-white py-[10px] text-[14px] font-body text-[#26334d] transition-colors hover:bg-[#f9f9f9]">
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Pay
                </button>

                <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#00d66f] py-[10px] text-[14px] font-body font-bold text-white transition-opacity hover:opacity-90">
                  Pagar con{" "}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="white"/><path d="M16 8l-8 8M16 16L8 8" stroke="#00d66f" strokeWidth="2" strokeLinecap="round"/></svg>{" "}
                  link
                </button>

                <button className="mt-2 w-full rounded-[6px] bg-[#ffc439] py-[10px] text-[14px] font-body font-bold text-[#003087] transition-opacity hover:opacity-90">
                  PayPal
                </button>

                {/* Payment method icons */}
                <div className="mt-3 flex items-center justify-center gap-2 text-[10px]">
                  <span className="rounded bg-[#1a1f71] px-[5px] py-[2px] text-[9px] font-bold text-white">VISA</span>
                  <span className="flex items-center">
                    <span className="h-[12px] w-[12px] rounded-full bg-[#eb001b]" />
                    <span className="-ml-[4px] h-[12px] w-[12px] rounded-full bg-[#ff5f00] opacity-80" />
                  </span>
                  <span className="text-[10px] font-bold text-[#26334d]">Apple Pay</span>
                  <span className="text-[10px] font-bold text-[#00a5e3]">bizum</span>
                  <span className="text-[10px] font-bold text-[#003087]">P</span>
                  <span className="text-[10px] font-bold text-[#5b7a8a]">G Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
