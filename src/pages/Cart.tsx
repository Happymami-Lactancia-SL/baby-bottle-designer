import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Tu carrito está vacío</h1>
        <Link to="/shop" className="btn-primary">Ir a la tienda</Link>
      </div>
    );
  }

  const shipping = total >= 49 ? 0 : 4.95;
  const grandTotal = total + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-foreground text-center mb-10">Tu carrito Happymami</h1>

      <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="hidden md:grid grid-cols-12 text-sm font-body font-bold text-foreground pb-4 border-b border-border">
            <span className="col-span-6">Producto</span>
            <span className="col-span-2">Precio</span>
            <span className="col-span-2">Cantidad</span>
            <span className="col-span-2">Subtotal</span>
          </div>

          {items.map(item => (
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-12 items-center py-6 border-b border-border gap-4">
              <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={16} />
                </button>
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-secondary rounded-lg p-1" />
                <div>
                  <p className="font-body font-bold text-sm text-primary">{item.name}</p>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 font-body text-sm">{item.price.toFixed(2)} €</div>
              <div className="col-span-4 md:col-span-2">
                <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1 w-fit">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                  <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 text-right md:text-left">
                {item.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through block">{(item.originalPrice * item.quantity).toFixed(2)} €</span>
                )}
                <span className="font-body font-bold text-primary">{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            </motion.div>
          ))}

          {/* Free midwife */}
          <div className="flex items-center justify-between py-4 bg-accent/50 rounded-xl px-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-lg">👩‍⚕️</div>
              <span className="font-body text-sm text-primary font-bold">Tu matrona asignada vía WhatsApp</span>
            </div>
            <div className="text-sm">
              <span className="line-through text-muted-foreground mr-2">19,90€</span>
              <span className="font-bold text-green-600">Gratis</span>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="bg-card border border-border rounded-2xl p-6 h-fit">
          <h3 className="font-display font-bold text-lg text-foreground mb-6">Totales del carrito</h3>
          <div className="space-y-4 font-body text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">{total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className={shipping === 0 ? "text-green-600 font-bold" : ""}>{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} €`}</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{grandTotal.toFixed(2)} € <span className="text-xs text-muted-foreground font-normal">(incluye IVA)</span></span>
            </div>
          </div>

          {shipping === 0 && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
              <span className="text-green-600">🚚</span>
              <span className="text-sm font-body text-green-700">¡Ya tienes envío gratuito!</span>
            </div>
          )}

          <Link to="/checkout" className="btn-primary w-full mt-6 py-4 text-base">
            Tramitar pedido - {grandTotal.toFixed(2)} €
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
