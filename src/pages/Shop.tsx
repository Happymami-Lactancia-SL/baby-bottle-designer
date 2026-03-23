import { Link } from "react-router-dom";

interface ProductCard {
  image: string;
  name: string;
  description: React.ReactNode;
  price: string;
  oldPrice?: string;
  cta: string;
  ctaLink: string;
}

const Shop = () => {
  const biberon: ProductCard = {
    image:
      "https://happymami.com/wp-content/uploads/2022/05/biberon-violeta-tetina-150-transparente-v2.webp",
    name: "Biberón Happymami",
    description: (
      <>
        <b>El único biberón a medida de tu pecho. Logra un 94,3% de aceptación.</b>{" "}
        Te ayudamos a conseguirlo con pautas y el asesoramiento personalizado de
        nuestras matronas.
      </>
    ),
    price: "29,95",
    cta: "Empezar a diseñar",
    ctaLink: "/product",
  };

  const rows: ProductCard[][] = [
    [
      {
        image:
          "https://happymami.com/wp-content/uploads/2025/08/termos-3-happyanimals-blanco.webp",
        name: "Termo Happyanimals",
        description: (
          <>
            El agua para la toma de tu bebé, siempre a la temperatura perfecta.
            Nuestro termo de 500ml la mantiene durante todo el día. Ideal para
            llevarlo a todas partes.
          </>
        ),
        price: "19,95",
        cta: "Ver producto",
        ctaLink: "/product",
      },
      {
        image:
          "https://happymami.com/wp-content/uploads/2024/08/3dosificadores-blanco.webp",
        name: "Dosificador Happymami",
        description: (
          <>
            Con el dosificador para leche en polvo de Happymami podrás preparar
            tu biberón en segundos donde lo necesites. Con cuatro compartimentos
            independientes e intercambiables.
          </>
        ),
        price: "13,95",
        cta: "Ver producto",
        ctaLink: "/product",
      },
    ],
    [
      {
        image:
          "https://happymami.com/wp-content/uploads/2025/09/muselina-pack4-happymami-blanco-1080px.webp",
        name: "Muselinas Happymami",
        description: (
          <>
            Suave y práctica para el día a día de tu bebé, nuestras muselinas
            están <b>hechas de algodón 100% y cuentan con 6 capas</b> que
            garantizan una máxima absorción.
          </>
        ),
        price: "19,95",
        cta: "Ver producto",
        ctaLink: "/product",
      },
      {
        image:
          "https://happymami.com/wp-content/uploads/2025/09/termo-menta-dosificador-menta-blanco-1080px.webp",
        name: "Pack Termo + Dosificador",
        description: (
          <>
            El pack imprescindible para vuestras salidas.{" "}
            <b>Incluye el termo de 500ml y el dosificador de 4 tomas.</b> Ten
            siempre a mano todo lo necesario para su biberón
          </>
        ),
        price: "25,90",
        oldPrice: "33,90",
        cta: "Ver producto",
        ctaLink: "/product",
      },
    ],
    [
      {
        image:
          "https://happymami.com/wp-content/uploads/2025/10/biberon-150-violeta-termo-violeta-blanco.webp",
        name: "Pack Biberón + Termo",
        description: (
          <>
            Prepara su biberón al instante, estés donde estés.{" "}
            <b>Este pack une nuestro biberón y el termo</b> para mantener el
            agua siempre a la temperatura perfecta para su toma.
          </>
        ),
        price: "39,90",
        oldPrice: "49,90",
        cta: "Empezar a diseñar",
        ctaLink: "/design",
      },
      {
        image:
          "https://happymami.com/wp-content/uploads/2025/10/Biberon-250-Rosa-Dosificador-Rosa.webp",
        name: "Pack Biberón + Dosificador",
        description: (
          <>
            Simplifica las tomas fuera de casa. Este pack{" "}
            <b>
              incluye nuestro biberón personalizado y el práctico dosificador de
              4 compartimentos
            </b>{" "}
            para una preparación siempre rápida.
          </>
        ),
        price: "36,90",
        oldPrice: "43,90",
        cta: "Empezar a diseñar",
        ctaLink: "/design",
      },
    ],
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-14">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <h1 className="font-display text-[40px] font-bold italic leading-tight text-[#6b2d3e] md:text-[52px]">
            Productos Happymami
          </h1>
          <p className="mt-3 text-[18px] font-body text-[#4a5568] leading-relaxed">
            Creados por matronas
          </p>
          <p className="text-[18px] font-body text-[#4a5568] leading-relaxed">
            para ayudarte en tu lactancia
          </p>
        </div>
      </section>

      {/* Featured: Biberón (single centered) */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[560px] px-6 text-center">
          <Link to="/product" className="mx-auto mb-6 block overflow-hidden rounded-[20px] border border-[#d6dce4] p-6 transition-shadow hover:shadow-lg">
            <img
              src={biberon.image}
              alt={biberon.name}
              className="mx-auto h-[340px] object-contain"
            />
          </Link>
          <h2 className="text-[22px] font-body font-bold text-[#26334d]">
            {biberon.name}
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-[15px] font-body leading-relaxed text-[#4a5568]">
            {biberon.description}
          </p>
          <p className="mt-4 text-[22px] font-body font-bold italic text-[#f49898]">
            Desde {biberon.price} €
          </p>
          <Link
            to={biberon.ctaLink}
            className="mt-4 inline-block rounded-full bg-[#f49898] px-8 py-[14px] text-[16px] font-body font-semibold text-white transition-opacity hover:opacity-90"
          >
            {biberon.cta}
          </Link>
        </div>
      </section>

      {/* Product Rows (2 columns) */}
      {rows.map((row, ri) => (
        <section key={ri} className="bg-white pb-16">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-x-12 gap-y-14 px-6 md:grid-cols-2">
            {row.map((p, ci) => (
              <div key={ci} className="flex flex-col items-center text-center">
                {/* Image card */}
                <div className="mb-6 w-full overflow-hidden rounded-[20px] border border-[#d6dce4] p-6">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="mx-auto h-[300px] object-contain"
                  />
                </div>

                {/* Name */}
                <h3 className="text-[20px] font-body font-bold text-[#26334d]">
                  {p.name}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-2 max-w-[440px] text-[15px] font-body leading-relaxed text-[#4a5568]">
                  {p.description}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline justify-center gap-2">
                  {p.oldPrice && (
                    <span className="text-[16px] font-body text-[#a0a8b4] line-through">
                      {p.oldPrice} €
                    </span>
                  )}
                  <span className="text-[22px] font-body font-bold italic text-[#f49898]">
                    {p.price} €
                  </span>
                </div>

                {/* CTA */}
                <Link
                  to={p.ctaLink}
                  className="mt-4 inline-block rounded-full bg-[#f49898] px-8 py-[14px] text-[16px] font-body font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Shop;
