import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, CreditCard, Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/lib/orderStore";
import { toast } from "sonner";

const fmt = (n: number) => n.toFixed(2).replace(".", ",");

const provincias = [
  "Álava","Albacete","Alicante","Almería","Asturias","Ávila","Badajoz","Barcelona",
  "Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ciudad Real","Córdoba","A Coruña",
  "Cuenca","Girona","Granada","Guadalajara","Guipúzcoa","Huelva","Huesca","Islas Baleares",
  "Jaén","León","Lleida","Lugo","Madrid","Málaga","Murcia","Navarra","Ourense","Palencia",
  "Las Palmas","Pontevedra","La Rioja","Salamanca","Santa Cruz de Tenerife","Segovia",
  "Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya",
  "Zamora","Zaragoza",
];

const Checkout = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = total >= 49 ? 0 : 4.95;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    email: "", phonePrefix: "+34", phone: "", dni: "",
    nombre: "", apellidos: "", pais: "España",
    direccion1: "", direccion2: "", cp: "", ciudad: "", provincia: "Las Palmas",
    enviarOtra: false, notas: "",
    payment: "card",
    terms: false, newsletter: false,
  });
  const [totalOpen, setTotalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms) return;

    const order = createOrder(
      form.email,
      `${form.nombre} ${form.apellidos}`,
      items.map((i) => ({ name: i.name, variant: i.variant, price: i.price, quantity: i.quantity, image: i.image })),
      grandTotal,
    );

    clearCart();

    toast.success(`📧 Email enviado a ${form.email}`, {
      description: `Pedido ${order.id} — Tu diseño está pendiente. Revisa tu correo.`,
      duration: 6000,
    });

    navigate(`/thank-you?order=${order.id}`);
  };

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const inputCls =
    "w-full border border-[#d6dce4] rounded-[6px] px-4 py-[10px] text-[14px] font-body text-[#26334d] placeholder:text-[#a0a8b4] outline-none focus:border-[#f49898] bg-white";
  const labelCls = "block text-[13px] font-body text-[#26334d] mb-1";
  const selectCls =
    "w-full appearance-none border border-[#d6dce4] rounded-[6px] px-4 py-[10px] text-[14px] font-body text-[#26334d] outline-none focus:border-[#f49898] bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23737b8c%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ═══ Header ═══ */}
      <header className="border-b border-[#e8e8e8] bg-white py-4 text-center">
        <Link to="/">
          <img
            src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
            alt="Happymami"
            className="mx-auto h-[28px] w-auto"
          />
        </Link>
      </header>

      {/* ═══ Title ═══ */}
      <div className="pt-8 pb-2 text-center">
        <h1 className="font-display text-[28px] font-bold italic text-[#26334d] md:text-[32px]">
          Finalizar mi pedido
        </h1>
      </div>

      {/* ═══ Main grid ═══ */}
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[1000px] flex-1 px-6 pb-28">
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          {/* ── Left: form ── */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className={labelCls}>Correo electrónico</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                placeholder="tu@ejemplo.com" className={inputCls} required />
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>Teléfono <span className="text-[#f49898]">*</span></label>
              <div className="flex gap-2">
                <select value={form.phonePrefix} onChange={(e) => set("phonePrefix", e.target.value)} className={`${selectCls} w-[140px] sm:w-[170px] flex-shrink-0`}>
                  <option>España (+34)</option>
                </select>
                <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  placeholder="603470573" className={`${inputCls} flex-1`} required />
              </div>
            </div>

            {/* DNI */}
            <div>
              <label className={labelCls}>DNI <span className="text-[#f49898]">*</span></label>
              <input type="text" value={form.dni} onChange={(e) => set("dni", e.target.value)}
                placeholder="12345678Z" className={inputCls} required />
            </div>

            {/* Billing address */}
            <h3 className="pt-2 text-[16px] font-body font-bold text-[#26334d]">Dirección de facturación</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nombre</label>
                <input type="text" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Apellidos</label>
                <input type="text" value={form.apellidos} onChange={(e) => set("apellidos", e.target.value)} className={inputCls} required />
              </div>
            </div>

            {/* País */}
            <div>
              <label className={labelCls}>País o región</label>
              <select value={form.pais} onChange={(e) => set("pais", e.target.value)} className={selectCls}>
                <option>España</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className={labelCls}>Línea 1 de dirección</label>
              <input type="text" value={form.direccion1} onChange={(e) => set("direccion1", e.target.value)}
                placeholder="Calle Fondos de Segura s/n" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Línea 2 de dirección</label>
              <input type="text" value={form.direccion2} onChange={(e) => set("direccion2", e.target.value)}
                placeholder="Número de apartamento, suite, vivienda, etc. (opcional)" className={inputCls} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Código postal</label>
                <input type="text" value={form.cp} onChange={(e) => set("cp", e.target.value)}
                  placeholder="35019" className={inputCls} required />
              </div>
            </div>

            <div>
              <label className={labelCls}>Ciudad</label>
              <input type="text" value={form.ciudad} onChange={(e) => set("ciudad", e.target.value)}
                placeholder="Las Palmas de Gran Canaria" className={inputCls} required />
            </div>

            <div>
              <label className={labelCls}>Provincia</label>
              <select value={form.provincia} onChange={(e) => set("provincia", e.target.value)} className={selectCls}>
                {provincias.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>

            {/* Ship to different */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.enviarOtra} onChange={(e) => set("enviarOtra", e.target.checked)}
                className="h-[16px] w-[16px] rounded border-[#d6dce4] accent-[#f49898]" />
              <span className="text-[13px] font-body text-[#26334d]">¿Enviar a una dirección diferente?</span>
            </label>

            {/* Notes */}
            <div>
              <h4 className="text-[14px] font-body font-bold text-[#26334d]">Notas al repartidor (opcional)</h4>
              <textarea
                value={form.notas}
                onChange={(e) => set("notas", e.target.value)}
                placeholder="Notas para la entrega."
                rows={3}
                className={`${inputCls} mt-2 resize-y`}
              />
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">
            {/* Urgency card */}
            <div className="flex items-center gap-3 rounded-[12px] bg-[#fdf5f0] px-5 py-4">
              <span className="text-[28px]">⏰</span>
              <p className="text-[13px] font-body leading-snug text-[#26334d]">
                ¡Haz tu pedido en menos de <b className="text-[#f49898]">6 horas 40 minutos</b> y te lo <b className="text-[#f49898]">enviaremos hoy</b>!
              </p>
            </div>

            {/* Payment method */}
            <div className="rounded-[12px] border border-[#d6dce4]">
              {/* Card option */}
              <label className={`flex cursor-pointer items-center justify-between border-b border-[#d6dce4] px-5 py-4 ${form.payment === "card" ? "bg-white" : ""}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="pay" value="card" checked={form.payment === "card"}
                    onChange={() => set("payment", "card")} className="h-[16px] w-[16px] accent-[#f49898]" />
                  <span className="text-[14px] font-body text-[#26334d]">Tarjeta de Crédito / Débito</span>
                </div>
                <CreditCard size={18} className="text-[#737b8c]" />
              </label>

              {/* Card form (visible when card selected) */}
              {form.payment === "card" && (
                <div className="border-b border-[#d6dce4] bg-[#f9f9f9] px-5 py-5">
                  <p className="flex items-center gap-1 text-[13px] font-body text-[#5bbead]">
                    <Lock size={12} /> Pago seguro y rápido con Link ↓
                  </p>
                  <div className="mt-3">
                    <label className="text-[12px] font-body text-[#737b8c]">Número de tarjeta</label>
                    <div className="mt-1 flex items-center rounded-[6px] border border-[#d6dce4] bg-white px-4 py-[10px]">
                      <input type="text" placeholder="1234 1234 1234 1234" className="flex-1 text-[14px] font-body text-[#26334d] placeholder:text-[#a0a8b4] outline-none" />
                      <div className="flex gap-1">
                        <span className="rounded bg-[#1a1f71] px-[4px] py-[1px] text-[8px] font-bold text-white">VISA</span>
                        <span className="flex items-center"><span className="h-[10px] w-[10px] rounded-full bg-[#eb001b]" /><span className="-ml-[3px] h-[10px] w-[10px] rounded-full bg-[#ff5f00] opacity-80" /></span>
                        <span className="text-[9px] font-bold text-[#006fcf]">amex</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[12px] font-body text-[#737b8c]">Fecha de caducidad</label>
                      <input type="text" placeholder="MM / AA" className={`${inputCls} mt-1`} />
                    </div>
                    <div>
                      <label className="text-[12px] font-body text-[#737b8c]">Código de seguridad</label>
                      <input type="text" placeholder="CVC" className={`${inputCls} mt-1`} />
                    </div>
                  </div>
                </div>
              )}

              {/* Bizum */}
              <label className={`flex cursor-pointer items-center justify-between border-b border-[#d6dce4] px-5 py-4 ${form.payment === "bizum" ? "bg-white" : ""}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="pay" value="bizum" checked={form.payment === "bizum"}
                    onChange={() => set("payment", "bizum")} className="h-[16px] w-[16px] accent-[#f49898]" />
                  <span className="text-[14px] font-body text-[#26334d]">Bizum</span>
                </div>
                <span className="text-[16px] font-bold text-[#00a5e3]">B<span className="text-[#34b78f]">i</span>zum</span>
              </label>

              {/* PayPal */}
              <label className={`flex cursor-pointer items-center justify-between px-5 py-4 ${form.payment === "paypal" ? "bg-white" : ""}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="pay" value="paypal" checked={form.payment === "paypal"}
                    onChange={() => set("payment", "paypal")} className="h-[16px] w-[16px] accent-[#f49898]" />
                  <span className="text-[14px] font-body text-[#26334d]">PayPal</span>
                </div>
                <span className="text-[16px] font-bold italic text-[#003087]">Pay<span className="text-[#009cde]">Pal</span></span>
              </label>
            </div>

            {/* Terms */}
            <div className="space-y-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)}
                  className="mt-[3px] h-[16px] w-[16px] rounded border-[#d6dce4] accent-[#f49898]" required />
                <span className="text-[12px] font-body leading-snug text-[#4a5568]">
                  He leído y acepto los <span className="text-[#f49898] underline cursor-pointer">términos y condiciones</span> y <span className="text-[#f49898] underline cursor-pointer">política de privacidad</span> del sitio web <span className="text-[#f49898]">*</span>
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.newsletter} onChange={(e) => set("newsletter", e.target.checked)}
                  className="mt-[3px] h-[16px] w-[16px] rounded border-[#d6dce4] accent-[#f49898]" />
                <span className="text-[12px] font-body leading-snug text-[#4a5568]">
                  Me gustaría recibir información sobre mi pedido, novedades y actualizaciones a través de correo electrónico.
                </span>
              </label>
            </div>

            {/* ── Collapsible Total card ── */}
            <div className="rounded-[12px] bg-[#fdf5f0] border border-[#e8ddd5]">
              <button
                type="button"
                onClick={() => setTotalOpen(!totalOpen)}
                className="flex w-full items-center justify-between px-5 py-4"
              >
                <div>
                  <span className="text-[15px] font-body font-bold text-[#26334d]">Total</span>
                  <p className="text-[12px] font-body text-[#737b8c]">{itemCount} artículos</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-body text-[#737b8c]">EUR</span>
                  <span className="text-[24px] font-body font-bold text-[#f49898]">{fmt(grandTotal)} €</span>
                  {totalOpen ? <ChevronUp size={16} className="text-[#f49898]" /> : <ChevronDown size={16} className="text-[#f49898]" />}
                </div>
              </button>

              {totalOpen && (
                <div className="border-t border-[#e8ddd5] px-5 py-4">
                  {/* Product list */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-[1fr_auto] gap-4 text-[13px] font-body font-bold text-[#26334d]">
                      <span>Producto</span>
                      <span>Subtotal</span>
                    </div>
                    {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-[1fr_auto] gap-4 text-[13px] font-body text-[#26334d]">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="text-[#f49898] font-bold">
                          {item.originalPrice && (
                            <span className="mr-1 text-[#a0a8b4] line-through">{fmt(item.originalPrice * item.quantity)} €</span>
                          )}
                          {fmt(item.price * item.quantity)} €
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr className="my-3 border-[#e8ddd5]" />
                  <div className="flex justify-between text-[14px] font-body">
                    <span className="font-bold text-[#26334d]">Subtotal</span>
                    <span className="text-[#26334d]">{fmt(total)} €</span>
                  </div>
                  <div className="mt-2 flex justify-between text-[14px] font-body">
                    <span className="font-bold text-[#26334d]">Envío</span>
                    <span className="text-[#5bbead] font-semibold">
                      {shipping === 0 ? "Envío Premium Gratuito" : `${fmt(shipping)} €`}
                    </span>
                  </div>
                  <hr className="my-3 border-[#e8ddd5]" />
                  <div className="flex justify-between text-[16px] font-body font-bold">
                    <span className="text-[#26334d]">Total</span>
                    <span className="text-[#26334d]">{fmt(grandTotal)} €</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* ═══ Floating CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-6 pb-4 pt-3 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <button
          type="submit"
          form="checkout-form"
          onClick={(e) => {
            e.preventDefault();
            const formEl = document.querySelector("form");
            if (formEl) formEl.requestSubmit();
          }}
          className="mx-auto block w-full max-w-[700px] rounded-full bg-[#f49898] py-[16px] text-center text-[17px] font-body font-bold text-white transition-opacity hover:opacity-90"
        >
          Realizar el pedido
        </button>
      </div>

      {/* ═══ Footer ═══ */}
      <footer className="mt-auto border-t border-[#e8e8e8] bg-white py-6 text-center">
        <img
          src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
          alt="Happymami"
          className="mx-auto h-[24px] w-auto"
        />
        <p className="mt-3 text-[12px] font-body text-[#737b8c]">
          Copyright 2026 © | Happymami Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};

export default Checkout;
