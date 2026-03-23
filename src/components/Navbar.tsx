import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";


const Navbar = () => {
  const { itemCount, total } = useCart();
  const formattedTotal = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#87a1b2] text-center py-[10px] text-[14px] font-body font-semibold text-white leading-none">
        📦 Envío gratis península a partir de 49€*
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-[#e8e8e8] sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-[18px] md:px-10 xl:px-14">
          {/* Logo */}
          <Link to="/">
            <img
              src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
              width={220}
              alt="Happymami"
            />
          </Link>

          {/* Nav links */}
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
          <div className="flex items-center gap-7">
            <Link
              to="/design"
              className="hidden rounded-full bg-[#f49898] px-7 py-[13px] font-body text-[15px] font-bold leading-none text-white transition-opacity hover:opacity-90 lg:inline-flex"
            >
              Diseñar Biberón ®
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center gap-[8px] text-[#343f61] transition-colors hover:text-[#f49898]"
            >
              <span className="font-body text-[16px] font-semibold leading-none">
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
      </nav>
    </>
  );
};

export default Navbar;
