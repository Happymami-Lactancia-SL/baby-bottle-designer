import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bottleMint from "@/assets/bottle-mint.png";

const Shop = () => {
  return (
    <div>
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Productos Happymami
          </h1>
          <p className="text-muted-foreground font-body">Creados por matronas</p>
          <p className="text-muted-foreground font-body">para ayudarte en tu lactancia</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/product" className="block">
                <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all group">
                  <div className="overflow-hidden rounded-xl">
                    <img src={bottleMint} alt="Biberón Happymami" className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mt-4">Biberón Happymami</h3>
                  <p className="text-muted-foreground font-body text-sm mt-1">Desde 29,95 €</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
