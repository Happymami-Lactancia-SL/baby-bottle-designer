import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { itemCount, total } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const formattedTotal = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#87a1b2] text-center py-[10px] text-[13px] sm:text-[14px] font-body font-semibold text-white leading-none">
        📦 Envío gratis península a partir de 49€*
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-[#e8e8e8] sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-[14px] sm:px-6 sm:py-[18px] md:px-10 xl:px-14">
          {/* Left: burger + logo */}
          <div className="flex items-center gap-3">
            {/* Burger button – visible below xl */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-[36px] w-[36px] items-center justify-center rounded-md text-[#2a3761] transition-colors hover:bg-[#f5f0eb] xl:hidden"
              aria-label="Menú"
            >
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-[20px]`} />
            </button>

            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img
                src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
                className="h-[24px] w-auto sm:h-[30px] md:h-auto md:w-[220px]"
                alt="Happymami"
              />
            </Link>
          </div>

          {/* Nav links – desktop */}
          <div className="hidden items-center gap-10 font-body text-[16px] text-[#2a3761] nav-links xl:flex">
            <Link to="/shop" className="hover:text-[#f49898] transition-colors">
              Tienda
            </Link>
            <Link to="/shop" className="hover:text-[#f49898] transition-colors">
              Regalar Happymami
            </Link>
            <span className="inline-flex items-center gap-[5px] cursor-pointer hover:text-[#f49898] transition-colors">
              Acerca de <span className="text-[11px]">▾</span>
            </span>
            <span className="inline-flex items-center gap-[5px] cursor-pointer hover:text-[#f49898] transition-colors">
              Consejos maternidad <span className="text-[11px]">▾</span>
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 sm:gap-7">
            <Link
              to="/design"
              className="hidden rounded-full bg-[#f49898] px-7 py-[13px] font-body text-[15px] font-bold leading-none text-white transition-opacity hover:opacity-90 lg:inline-flex"
            >
              Diseñar Biberón ®
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center gap-[6px] sm:gap-[8px] text-[#343f61] transition-colors hover:text-[#f49898]"
            >
              <span className="hidden font-body text-[16px] font-semibold leading-none sm:inline">
                {formattedTotal}&nbsp;€
              </span>
              <span className="relative">
                <i className="fas fa-baby-carriage text-[20px]" />
                {itemCount > 0 && (
                  <span className="absolute -top-[10px] -right-[10px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#5bbead] text-[11px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </div>

        {/* ── Mobile slide-out menu ── */}
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity xl:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col bg-white shadow-xl transition-transform duration-300 xl:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img
                src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
                className="h-[24px] w-auto"
                alt="Happymami"
              />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-[32px] w-[32px] items-center justify-center rounded-md text-[#2a3761] hover:bg-[#f5f0eb]"
              aria-label="Cerrar menú"
            >
              <i className="fas fa-times text-[18px]" />
            </button>
          </div>

          {/* Drawer links */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="flex flex-col gap-5 font-body text-[16px] text-[#2a3761]">
              <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-[#f49898] transition-colors">
                Tienda
              </Link>
              <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-[#f49898] transition-colors">
                Regalar Happymami
              </Link>
              <span className="cursor-pointer hover:text-[#f49898] transition-colors">
                Acerca de
              </span>
              <span className="cursor-pointer hover:text-[#f49898] transition-colors">
                Consejos maternidad
              </span>
            </div>
          </div>

          {/* Drawer CTA */}
          <div className="border-t border-[#e8e8e8] px-5 py-5">
            <Link
              to="/design"
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-full bg-[#f49898] py-[13px] text-center font-body text-[15px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Diseñar Biberón ®
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
