import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { itemCount, total } = useCart();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-announcement text-center py-2 text-sm font-body text-foreground">
        🍼 Envío gratis península a partir de 49€*
      </div>
      {/* Nav */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <Link to="/" className="font-display text-2xl font-bold tracking-widest text-primary">
            HAPPYMAMI
          </Link>
          <div className="hidden md:flex items-center gap-8 font-body text-sm text-foreground">
            <Link to="/shop" className="hover:text-primary transition-colors">Tienda</Link>
            <Link to="/shop" className="hover:text-primary transition-colors">Regalar Happymami</Link>
            <span className="hover:text-primary transition-colors cursor-pointer">Acerca de ▾</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Consejos maternidad ▾</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/design" className="btn-primary hidden sm:inline-flex">
              Diseñar Biberón ®
            </Link>
            <Link to="/cart" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative">
              <span className="font-body text-sm font-bold">{total.toFixed(2)} €</span>
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
