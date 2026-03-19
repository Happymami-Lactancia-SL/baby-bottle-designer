import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-xl">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
        <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          ¡Gracias por tu pedido!
        </h1>
        <p className="font-body text-muted-foreground mb-8">
          Tu pedido ha sido confirmado. Recibirás un email con los detalles de tu compra.
        </p>
        <p className="font-body text-foreground mb-6">
          Ahora es el momento de <span className="font-bold text-primary">diseñar tu biberón personalizado</span>. 
          Completa el formulario para que podamos crear tu biberón a medida.
        </p>
        <Link to="/design" className="btn-primary text-lg px-12 py-4">
          Diseñar mi biberón
        </Link>
        <div className="mt-6">
          <Link to="/" className="text-sm font-body text-muted-foreground hover:text-primary transition-colors underline">
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
