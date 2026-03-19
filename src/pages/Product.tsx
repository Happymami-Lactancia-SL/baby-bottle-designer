import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import bottlesGroup from "@/assets/bottles-group.png";
import bottleMint from "@/assets/bottle-mint.png";

const packs = [
  { id: "single", name: "1 Biberón", price: 29.95, originalPrice: undefined, badge: undefined },
  { id: "duo", name: "Set de 2 biberones", price: 49.90, originalPrice: 59.90, badge: "ENVÍO GRATIS" },
  { id: "essential", name: "Pack Esencial", desc: "2 Biberones + Termo + Dosificador", price: 69.80, originalPrice: 93.80, badge: "AHORRO DE 24€ + ENVÍO GRATIS" },
];

const Product = () => {
  const [selected, setSelected] = useState("duo");
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const pack = packs.find(p => p.id === selected)!;
    addItem({
      id: pack.id,
      name: `Biberón personalizado - ${pack.name}`,
      variant: pack.name,
      price: pack.price,
      originalPrice: pack.originalPrice,
      quantity: 1,
      image: bottlesGroup,
    });
    navigate("/cart");
  };

  return (
    <div className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-secondary rounded-2xl p-8">
              <img src={bottlesGroup} alt="Biberones Happymami" className="w-full object-contain" />
            </div>
            <div className="flex gap-3 mt-4">
              {[bottlesGroup, bottleMint].map((img, i) => (
                <div key={i} className="w-20 h-20 bg-secondary rounded-lg p-2 border border-border cursor-pointer hover:border-primary transition-colors">
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Biberón Personalizado
            </h1>
            <p className="text-muted-foreground font-body mt-2 text-lg">& Acompañamiento por Matronas</p>

            <p className="font-body text-sm text-muted-foreground mt-6 mb-4">Elige tu pack y ahorra</p>

            <div className="flex flex-col gap-4">
              {packs.map(pack => (
                <button
                  key={pack.id}
                  onClick={() => setSelected(pack.id)}
                  className={`relative text-left ${selected === pack.id ? "option-card-selected" : "option-card"}`}
                >
                  {pack.badge && (
                    <span className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {pack.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-body font-bold text-foreground">{pack.name}</span>
                      {pack.desc && <p className="text-sm text-muted-foreground mt-1">{pack.desc}</p>}
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        {pack.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through block">{pack.originalPrice.toFixed(2)} €</span>
                        )}
                        <span className="font-bold text-lg text-foreground">{pack.price.toFixed(2)} €</span>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button onClick={handleAddToCart} className="btn-primary w-full mt-8 py-4 text-base">
              Añadir al carrito
            </button>

            <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground font-body">
              <Shield size={16} />
              <span>Pago seguro garantizado</span>
            </div>
            <p className="text-sm text-muted-foreground font-body mt-2">🏷️ IVA incluido</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Product;
