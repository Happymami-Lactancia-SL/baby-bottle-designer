import { Link } from "react-router-dom";
import bottlesGroup from "@/assets/bottles-group.png";

const Index = () => {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative h-[calc(100vh-125px)] min-h-[620px] overflow-hidden md:min-h-[720px]">
        <img src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/12/banner-hero-degradado-2-scaled-1-2048x758.webp" alt="Madre alimentando a su bebé" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center px-6 md:px-10 xl:px-14">
          <div className="flex max-w-[720px] flex-col items-start">
            <img
              src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/logo-principal-blanco.webp"
              width={380}
              alt="Happymami"
              className="mb-4"
            />
            <p className="hero-subtitle mb-2 text-white">
              Lactancia segura, conciliación real y apoyo constante
            </p>
            <p className="mb-8 text-[18px] font-body font-normal text-white/90 leading-[1.4] md:text-[20px]">
              Gracias a tener un biberón a medida con la forma de tu pecho
            </p>
            <Link to="/design" className="rounded-full bg-[#f49898] px-10 py-[16px] text-[16px] font-body font-semibold leading-none text-white transition-opacity hover:opacity-90">
              Diseñar mi biberón
            </Link>
            <img
              src="https://happymami.com/wp-content/uploads/2023/11/biberon.png.webp"
              srcSet="https://happymami.com/wp-content/uploads/2023/11/biberon-300x69.png.webp 300w, https://happymami.com/wp-content/uploads/2023/11/biberon-768x176.png.webp 768w, https://happymami.com/wp-content/uploads/2023/11/biberon-600x138.png.webp 600w, https://happymami.com/wp-content/uploads/2023/11/biberon.png.webp 889w"
              sizes="(max-width: 300px) 300px, 200px"
              width={200}
              alt="Google Verified Reviews"
              className="mt-6"
            />
          </div>
        </div>
      </section>

      <a
        href="#"
        aria-label="Abrir chat"
        className="fixed bottom-6 left-5 z-40 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-[0_4px_18px_rgba(31,41,55,0.18)] border border-gray-100"
      >
        <img
          src="https://storage.googleapis.com/media.landbot.io/493419/channels/ZSJLD0KPPGK788B5748MP7P8MOAV7XKS.png"
          alt="Chatbot"
          className="h-[34px] w-[34px] rounded-full"
        />
      </a>

      <button
        type="button"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-[6px] rounded-full bg-white px-5 py-[10px] text-[14px] font-medium text-[#8b3d3f] shadow-[0_4px_18px_rgba(31,41,55,0.16)] border border-gray-100"
      >
        <span className="text-[18px] leading-none">🇪🇸</span>
        Español
      </button>

      {/* 4 Steps */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Personaliza tu biberón en 4 pasos
          </h2>
          <p className="text-muted-foreground font-body mb-12">Diseñado a medida para tu bebé</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {["Elige la forma", "Mide el diámetro", "Elasticidad", "Personaliza"].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="step-circle step-active text-lg">{i + 1}</div>
                <span className="font-body text-sm text-foreground">{step}</span>
              </div>
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
          <div className="max-w-sm mx-auto">
            <Link to="/shop" className="block">
              <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <img src={bottlesGroup} alt="Biberones Happymami" className="w-full h-64 object-contain mb-6" />
                <h3 className="font-display text-xl font-bold text-foreground">Biberón Happymami</h3>
                <p className="text-muted-foreground font-body text-sm mt-2">Desde 29,95 €</p>
              </div>
            </Link>
          </div>
          <Link to="/shop" className="btn-primary mt-10 inline-flex">Ver todos los productos</Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
