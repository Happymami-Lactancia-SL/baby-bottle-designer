import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const Checkout = () => {
  const { total, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = total >= 49 ? 0 : 4.95;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({ email: "", phone: "", name: "", address: "", city: "", zip: "", payment: "card" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-display font-bold text-center text-primary mb-2">HAPPYMAMI</h1>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-foreground mb-10">Finalizar mi pedido</h2>

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <label className="font-body text-sm text-foreground block mb-2">Correo electrónico</label>
          <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div>
          <label className="font-body text-sm text-foreground block mb-2">Teléfono *</label>
          <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
            className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <h3 className="font-display font-bold text-lg text-foreground pt-4">Dirección de facturación</h3>

        <div>
          <label className="font-body text-sm text-foreground block mb-2">Nombre completo</label>
          <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div>
          <label className="font-body text-sm text-foreground block mb-2">Dirección</label>
          <input type="text" required value={form.address} onChange={e => setForm({...form, address: e.target.value})}
            className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm text-foreground block mb-2">Ciudad</label>
            <input type="text" required value={form.city} onChange={e => setForm({...form, city: e.target.value})}
              className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="font-body text-sm text-foreground block mb-2">Código postal</label>
            <input type="text" required value={form.zip} onChange={e => setForm({...form, zip: e.target.value})}
              className="w-full border border-border rounded-lg px-4 py-3 font-body text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        {/* Payment method */}
        <div className="pt-4">
          <h3 className="font-display font-bold text-lg text-foreground mb-4">Método de pago</h3>
          <div className="space-y-3">
            {[
              { id: "card", label: "Tarjeta de Crédito / Débito" },
              { id: "paypal", label: "PayPal" },
            ].map(m => (
              <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${form.payment === m.id ? "border-primary bg-accent" : "border-border"}`}>
                <input type="radio" name="payment" value={m.id} checked={form.payment === m.id}
                  onChange={e => setForm({...form, payment: e.target.value})} className="accent-primary" />
                <span className="font-body text-sm">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div className="bg-announcement rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">⏰</span>
          <p className="font-body text-sm">
            ¡Haz tu pedido en menos de <span className="font-bold text-primary">2 horas 30 minutos</span> y te lo enviaremos hoy!
          </p>
        </div>

        <button type="submit" className="btn-primary w-full py-4 text-lg">
          Realizar el pedido
        </button>

        <p className="text-center text-sm text-muted-foreground font-body">
          Total: {grandTotal.toFixed(2)} € (incluye IVA)
        </p>
      </motion.form>
    </div>
  );
};

export default Checkout;
