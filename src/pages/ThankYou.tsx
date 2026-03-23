import { Link, useSearchParams } from "react-router-dom";
import { getOrder } from "@/lib/orderStore";

const ThankYou = () => {
  const [params] = useSearchParams();
  const orderId = params.get("order") || "";
  const order = orderId ? getOrder(orderId) : null;

  return (
    <div className="min-h-screen bg-[#fdf5f0]">
      {/* header */}
      <header className="bg-white py-5 text-center shadow-sm">
        <img
          src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
          alt="Happymami"
          className="mx-auto h-[28px]"
        />
      </header>

      <div className="mx-auto max-w-[560px] px-6 py-14 text-center">
        {/* check icon */}
        <div className="mx-auto mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#d4edda]">
          <i className="fa-solid fa-check text-[36px] text-[#28a745]" />
        </div>

        <h1 className="font-display text-[28px] font-bold text-[#26334d] md:text-[32px]">
          ¡Gracias por tu pedido!
        </h1>

        {order && (
          <p className="mt-3 rounded-lg bg-white px-5 py-3 text-[15px] font-body font-semibold text-[#26334d] shadow-sm inline-block">
            Nº de pedido: <span className="text-[#f49898]">{order.id}</span>
          </p>
        )}

        <p className="mt-6 font-body text-[15px] leading-relaxed text-[#555]">
          Hemos enviado un correo electrónico a{" "}
          {order ? (
            <span className="font-semibold text-[#26334d]">{order.email}</span>
          ) : (
            "tu dirección"
          )}{" "}
          con todos los detalles de tu compra.
        </p>

        {/* design pending notice */}
        <div className="mt-8 rounded-[16px] border border-[#f49898]/30 bg-white px-8 py-6 text-left shadow-sm">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-palette mt-1 text-[20px] text-[#f49898]" />
            <div>
              <h3 className="font-display text-[16px] font-bold text-[#26334d]">
                Tu diseño está pendiente
              </h3>
              <p className="mt-1 font-body text-[14px] leading-relaxed text-[#666]">
                Para completar tu pedido, necesitamos que diseñes tu biberón personalizado.
                Accede al proceso de diseño e introduce tu número de pedido y email para asociarlo.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to design */}
        <Link
          to={orderId ? `/design?order=${orderId}` : "/design"}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f49898] px-10 py-[14px] text-[16px] font-body font-bold text-white shadow transition-opacity hover:opacity-90"
        >
          <i className="fa-solid fa-wand-magic-sparkles" />
          Diseñar mi biberón
        </Link>

        <div className="mt-5">
          <Link
            to="/"
            className="text-[14px] font-body text-[#999] underline transition-colors hover:text-[#26334d]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
