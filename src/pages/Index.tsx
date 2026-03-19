import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.jpg";
import bottlesGroup from "@/assets/bottles-group.png";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <img src={heroImage} alt="Madre alimentando a su bebé" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-card tracking-wider mb-4">HAPPYMAMI</h1>
            <p className="text-xl md:text-2xl font-display text-card/90 mb-2">
              Lactancia segura, conciliación real y apoyo constante
            </p>
            <p className="text-card/80 font-body mb-8 max-w-lg">
              Gracias a tener un biberón a medida con la forma de tu pecho
            </p>
            <Link to="/design" className="btn-primary text-base px-10 py-4">
              Diseñar mi biberón
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4 Steps */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Personaliza tu biberón en 4 pasos
          </h2>
          <p className="text-muted-foreground font-body mb-12">Diseñado a medida para tu bebé</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {["Elige la forma", "Mide el diámetro", "Elasticidad", "Personaliza"].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-3">
                <div className="step-circle step-active text-lg">{i + 1}</div>
                <span className="font-body text-sm text-foreground">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Productos Happymami
          </h2>
          <p className="text-muted-foreground font-body mb-12">Creados por matronas para ayudarte en tu lactancia</p>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-sm mx-auto">
            <Link to="/shop" className="block">
              <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <img src={bottlesGroup} alt="Biberones Happymami" className="w-full h-64 object-contain mb-6" />
                <h3 className="font-display text-xl font-bold text-foreground">Biberón Happymami</h3>
                <p className="text-muted-foreground font-body text-sm mt-2">Desde 29,95 €</p>
              </div>
            </Link>
          </motion.div>
          <Link to="/shop" className="btn-primary mt-10 inline-flex">Ver todos los productos</Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
