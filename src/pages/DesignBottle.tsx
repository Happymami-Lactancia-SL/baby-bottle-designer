import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { findOrder, attachDesign } from "@/lib/orderStore";
import { toast } from "sonner";

const TOTAL_STEPS = 7;

const IMG = "https://happymami.com/wp-content/plugins/happymami-wizard/assets/img";
const PROD = "https://happymami.com/wp-content/plugins/happymami-productos/assets/img";

/* ─── bottle images per color ─── */
const bottleImages: Record<string, string> = {
  menta: `${PROD}/1B/1M.webp`,
  rosa: `${PROD}/1B/1R.webp`,
  violeta: `${PROD}/1B/1V.webp`,
};

const colorHex: Record<string, string> = {
  menta: "#c8dfd4",
  rosa: "#deb8b8",
  violeta: "#8e82a6",
};

/* ─── component ─── */
const DesignBottle = () => {
  const [params] = useSearchParams();
  const orderParam = params.get("order") || "";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [colorPreview, setColorPreview] = useState("menta");
  const [helpOpen, setHelpOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  /* order association */
  const [orderVerified, setOrderVerified] = useState(!orderParam);
  const [verifiedOrderId, setVerifiedOrderId] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [orderInput, setOrderInput] = useState(orderParam);
  const [emailInput, setEmailInput] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const navigate = useNavigate();
  const { addItem } = useCart();

  const select = (value: string) => {
    const next = { ...answers, [step]: value };
    setAnswers(next);
    setHelpOpen(false);
    if (step < TOTAL_STEPS - 1) {
      setTimeout(() => setStep((s) => s + 1), 250);
    } else {
      setTimeout(() => setCompleted(true), 250);
    }
  };

  const back = () => {
    if (step > 0) { setStep((s) => s - 1); setHelpOpen(false); }
  };

  const addToCart = () => {
    const color = answers[5] || "menta";
    const size = answers[6] || "250";
    addItem({
      id: `biberon-${color}-${size}`,
      name: `Biberón personalizado - 1 Biberón`,
      variant: `${size}ml`,
      price: 29.95,
      quantity: 1,
      image: bottleImages[color],
    });
    navigate("/cart");
  };

  const verifyOrder = () => {
    setVerifyError("");
    const trimmedId = orderInput.trim().toUpperCase();
    const trimmedEmail = emailInput.trim();
    if (!trimmedId || !trimmedEmail) {
      setVerifyError("Introduce tu número de pedido y email.");
      return;
    }
    const order = findOrder(trimmedId, trimmedEmail);
    if (!order) {
      setVerifyError("No hemos encontrado un pedido con esos datos. Revisa el número de pedido y el email.");
      return;
    }
    if (order.designConfirmed) {
      setVerifyError("Este pedido ya tiene un diseño confirmado.");
      return;
    }
    setVerifiedOrderId(order.id);
    setVerifiedEmail(order.email);
    setOrderVerified(true);
  };

  const confirmDesign = () => {
    const design = {
      forma: answers[0] || "",
      longitud: answers[1] || "",
      diametro: answers[2] || "",
      elasticidad: answers[3] || "",
      flujo: answers[4] || "",
      color: answers[5] || "menta",
      tamaño: answers[6] || "250",
    };
    attachDesign(verifiedOrderId, design);

    toast.success(`📧 Email enviado a ${verifiedEmail}`, {
      description: "Hemos recibido tu diseño. Tu pedido comenzará a prepararse en breve.",
      duration: 6000,
    });

    navigate("/");
  };

  /* ─── Progress bar ─── */
  const ProgressBar = () => (
    <div className="flex items-center justify-center gap-0 mx-auto max-w-[500px] px-6">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 text-[14px] font-body font-bold transition-all ${
              i < step
                ? "border-[#26334d] bg-[#26334d] text-white"
                : i === step
                ? "border-[#26334d] bg-white text-[#26334d]"
                : "border-[#d6dce4] bg-white text-[#d6dce4]"
            }`}
          >
            {i + 1}
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div className={`h-[3px] w-[40px] sm:w-[55px] transition-colors ${i < step ? "bg-[#26334d]" : "bg-[#d6dce4]"}`} />
          )}
        </div>
      ))}
    </div>
  );

  /* ─── Option pill button ─── */
  const Pill = ({ label, value }: { label: string; value: string }) => (
    <button
      onClick={() => select(value)}
      className={`w-full rounded-full border-2 px-6 py-[14px] text-center text-[15px] font-body transition-all ${
        answers[step] === value
          ? "border-[#f49898] bg-[#fdf5f0] font-semibold text-[#26334d]"
          : "border-[#d6dce4] text-[#26334d] hover:border-[#b0b8c4]"
      }`}
    >
      {label}
    </button>
  );

  /* ─── Help accordion ─── */
  const HelpBar = ({ text }: { text: string }) => (
    <div className="mt-10">
      <button
        onClick={() => setHelpOpen(!helpOpen)}
        className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#f0e6dd] px-6 py-4 text-[15px] font-body font-bold text-[#26334d] transition-colors hover:bg-[#e8ddd5]"
      >
        {text}
        {helpOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {helpOpen && (
        <div className="mt-3 rounded-[14px] border border-[#e8ddd5] bg-[#fdf5f0] px-6 py-4 text-[14px] font-body leading-relaxed text-[#4a5568]">
          Consulta a nuestras matronas por WhatsApp si tienes dudas. Te ayudarán encantadas.
        </div>
      )}
    </div>
  );

  /* ─── Completed screen ─── */
  if (completed) {
    const color = answers[5] || "menta";
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-[#f0e6dd] py-4 text-center">
          <img
            src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
            alt="Happymami" className="mx-auto h-[28px]"
          />
          <h2 className="mt-2 font-display text-[26px] font-bold text-[#26334d]">¡Tu biberón está listo!</h2>
        </header>
        <div className="mx-auto max-w-[500px] px-6 py-10 text-center">
          <img src={bottleImages[color]} alt="Tu biberón" className="mx-auto h-[220px] object-contain" />
          <div className="mt-8 rounded-[16px] bg-[#fdf5f0] px-8 py-6 text-left">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[14px] font-body">
              <span className="italic text-[#f49898]">Forma del pecho:</span>
              <span className="font-semibold text-[#26334d]">{answers[0] || "—"}</span>
              <span className="italic text-[#f49898]">Longitud del pezón:</span>
              <span className="font-semibold text-[#26334d]">{answers[1] || "—"}</span>
              <span className="italic text-[#f49898]">Diámetro del pezón:</span>
              <span className="font-semibold text-[#26334d]">{answers[2] || "—"}</span>
              <span className="italic text-[#f49898]">¿Pezón se estira?:</span>
              <span className="font-semibold text-[#26334d]">{answers[3] || "—"}</span>
              <span className="italic text-[#f49898]">Flujo:</span>
              <span className="font-semibold text-[#26334d]">{answers[4] || "—"}</span>
              <span className="italic text-[#f49898]">Color:</span>
              <span className="font-semibold text-[#26334d]">{answers[5] || "—"}</span>
              <span className="italic text-[#f49898]">Tamaño:</span>
              <span className="font-semibold text-[#26334d]">{answers[6] || "—"}</span>
            </div>
          </div>
          <button
            onClick={verifiedOrderId ? confirmDesign : addToCart}
            className="mt-8 w-full rounded-full bg-[#f49898] py-[16px] text-[16px] font-body font-bold text-white transition-opacity hover:opacity-90"
          >
            {verifiedOrderId ? "Confirmar diseño" : "Añadir al carrito — 29,95 €"}
          </button>
          <button
            onClick={() => { setStep(0); setAnswers({}); setCompleted(false); }}
            className="mt-3 text-[14px] font-body text-[#f49898] underline"
          >
            Modificar diseño
          </button>
        </div>
      </div>
    );
  }

  /* ─── Order verification screen ─── */
  if (!orderVerified) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-[#f0e6dd] pb-6 pt-4 text-center">
          <img
            src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
            alt="Happymami"
            className="mx-auto h-[28px]"
          />
          <h2 className="mt-2 font-display text-[26px] font-bold text-[#26334d]">
            Asocia tu diseño al pedido
          </h2>
          <p className="mt-1 font-body text-[14px] text-[#666]">
            Introduce los datos de tu pedido para continuar
          </p>
        </header>

        <div className="mx-auto max-w-[420px] px-6 py-10">
          <div className="rounded-[16px] border border-[#e8ddd6] bg-[#fdf5f0] px-8 py-8">
            <label className="block font-body text-[14px] font-semibold text-[#26334d]">
              Nº de pedido
            </label>
            <input
              type="text"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              placeholder="HM-XXXXXX"
              className="mt-1 w-full rounded-lg border border-[#d6dce4] bg-white px-4 py-3 font-body text-[15px] text-[#26334d] outline-none focus:border-[#f49898]"
            />

            <label className="mt-5 block font-body text-[14px] font-semibold text-[#26334d]">
              Email de la compra
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="tu@email.com"
              className="mt-1 w-full rounded-lg border border-[#d6dce4] bg-white px-4 py-3 font-body text-[15px] text-[#26334d] outline-none focus:border-[#f49898]"
            />

            {verifyError && (
              <p className="mt-3 font-body text-[13px] text-red-500">{verifyError}</p>
            )}

            <button
              onClick={verifyOrder}
              className="mt-6 w-full rounded-full bg-[#f49898] py-[14px] text-[15px] font-body font-bold text-white transition-opacity hover:opacity-90"
            >
              Verificar y continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main render ─── */
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#f0e6dd] pb-6 pt-4 text-center">
        <img
          src="https://happydev.happymamilactancia.com/wp-content/uploads/2025/08/cropped-logotipo-F49898.png.webp"
          alt="Happymami" className="mx-auto h-[28px]"
        />
        <h2 className="mt-2 font-display text-[26px] font-bold text-[#26334d] md:text-[30px]">
          ¡Configura tus medidas!
        </h2>
        <div className="mt-5">
          <ProgressBar />
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-[900px] px-6 py-8">
        {/* Back button */}
        {step > 0 && (
          <button
            onClick={back}
            className="mb-6 text-[14px] font-body font-bold text-[#26334d] underline decoration-[#26334d] hover:text-[#f49898]"
          >
            &lt; Paso anterior
          </button>
        )}

        {/* ═══ STEP 0: Forma del pecho ═══ */}
        {step === 0 && (
          <div>
            <h3 className="text-center font-display text-[20px] font-bold text-[#26334d] md:text-[22px]">
              ¿Como describirías tu pecho de forma general?
            </h3>
            <p className="mt-2 text-center text-[15px] font-body text-[#4a5568]">
              Fíjate principalmente en la forma de la parte final, sin importar si es voluminoso, pequeño o caído.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-5">
              {[
                { label: "Plano", value: "Plano", img: `${IMG}/M1-1.webp` },
                { label: "Redondo", value: "Redondo", img: `${IMG}/M1-2.webp` },
                { label: "Tubular", value: "Tubular", img: `${IMG}/M1-3.webp` },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => select(opt.value)}
                  className={`flex flex-col items-center rounded-[16px] border-2 p-4 transition-all ${
                    answers[0] === opt.value
                      ? "border-[#f49898] shadow-md"
                      : "border-[#d6dce4] hover:border-[#b0b8c4]"
                  }`}
                >
                  <img src={opt.img} alt={opt.label} className="h-[160px] w-auto object-contain" />
                  <span className="mt-3 text-[15px] font-body text-[#26334d]">{opt.label}</span>
                </button>
              ))}
            </div>
            <HelpBar text="¿Dudas sobre la forma?" />
          </div>
        )}

        {/* ═══ STEP 1: Longitud ═══ */}
        {step === 1 && (
          <div>
            <h3 className="text-center font-display text-[20px] font-bold text-[#26334d] md:text-[22px]">
              ¿Cuál es la longitud de tu pezón?
            </h3>
            <p className="mt-2 text-center text-[15px] font-body text-[#4a5568]">
              Mide el pezón en reposo (antes de la toma), sin incluir la areola, desde la base hasta la punta.
            </p>
            <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
              <img src={`${IMG}/M2.webp`} alt="Longitud del pezón" className="mx-auto h-[220px] object-contain" />
              <div className="flex flex-col gap-4">
                <Pill label="Menor a 1,2cm" value="Menor a 1,2cm" />
                <Pill label="Mayor o igual a 1,2cm" value="Mayor o igual a 1,2cm" />
                <Pill label="Uso pezonera" value="Uso pezonera" />
              </div>
            </div>
            <HelpBar text="¿Cómo medir la longitud?" />
          </div>
        )}

        {/* ═══ STEP 2: Diámetro ═══ */}
        {step === 2 && (
          <div>
            <h3 className="text-center font-display text-[20px] font-bold text-[#26334d] md:text-[22px]">
              ¿Cuál es el diámetro de tu pezón?
            </h3>
            <p className="mt-2 text-center text-[15px] font-body text-[#4a5568]">
              Mide el pezón en reposo (antes de la toma), sin incluir la areola.
            </p>
            <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
              <img src={`${IMG}/M3.webp`} alt="Diámetro del pezón" className="mx-auto h-[220px] object-contain" />
              <div className="flex flex-col gap-4">
                <Pill label="Menor o igual a 2,5cm" value="Menor o igual a 2,5cm" />
                <Pill label="Mayor a 2,5cm" value="Mayor a 2,5cm" />
                <Pill label="Uso pezonera" value="Uso pezonera" />
              </div>
            </div>
            <HelpBar text="¿Cómo medir el diámetro?" />
          </div>
        )}

        {/* ═══ STEP 3: Elasticidad ═══ */}
        {step === 3 && (
          <div>
            <h3 className="text-center font-display text-[20px] font-bold text-[#26334d] md:text-[22px]">
              ¿Tu pezón se alarga tras la toma?
            </h3>
            <p className="mt-2 text-center text-[15px] font-body text-[#4a5568]">
              Si estás embarazada, elige "Embarazada / No lo sé".
            </p>
            <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
              <img src={`${IMG}/M4.webp`} alt="Elasticidad del pezón" className="mx-auto h-[220px] object-contain" />
              <div className="flex flex-col gap-4">
                <Pill label="Embarazada / No lo sé" value="Embarazada / No lo sé" />
                <Pill label="No se estira" value="No se estira" />
                <Pill label="Se estira (aunque sea un poco)" value="Se estira (aunque sea un poco)" />
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 4: Flujo ═══ */}
        {step === 4 && (
          <div>
            <h3 className="text-center font-display text-[20px] font-bold text-[#26334d] md:text-[22px]">
              ¿Cuál es la edad de tu bebé?
            </h3>
            <p className="mt-2 text-center text-[15px] font-body text-[#4a5568]">
              Esto nos ayuda a determinar el flujo adecuado de la tetina.
            </p>
            <div className="mx-auto mt-8 grid max-w-[450px] grid-cols-2 gap-4">
              {["0 a 3 meses", "3 a 6 meses", "más de 6 meses", "papillas"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => select(opt)}
                  className={`rounded-full border-2 px-5 py-[12px] text-[14px] font-body transition-all ${
                    answers[4] === opt
                      ? "border-[#f49898] bg-[#fdf5f0] font-semibold text-[#26334d]"
                      : "border-[#d6dce4] text-[#26334d] hover:border-[#b0b8c4]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ STEP 5: Color ═══ */}
        {step === 5 && (
          <div>
            <h3 className="text-center font-display text-[20px] font-bold text-[#26334d] md:text-[22px]">
              Elige el color de tu biberón
            </h3>
            <p className="mt-2 text-center text-[15px] font-body text-[#4a5568]">
              Todos los colores están disponibles en ambos tamaños.
            </p>
            <div className="mx-auto mt-8 flex max-w-[300px] flex-col items-center">
              <img
                src={bottleImages[colorPreview]}
                alt="Biberón"
                className="h-[200px] object-contain"
              />
              <div className="mt-6 flex gap-4">
                {(["menta", "rosa", "violeta"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setColorPreview(c)}
                    className={`h-[36px] w-[36px] rounded-full border-2 transition-all ${
                      colorPreview === c ? "border-[#26334d] scale-110" : "border-[#d6dce4]"
                    }`}
                    style={{ backgroundColor: colorHex[c] }}
                  />
                ))}
              </div>
              <button
                onClick={() => select(colorPreview)}
                className="mt-8 rounded-full bg-[#f49898] px-10 py-[14px] text-[15px] font-body font-bold text-white transition-opacity hover:opacity-90"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ═══ STEP 6: Tamaño ═══ */}
        {step === 6 && (
          <div>
            <h3 className="text-center font-display text-[20px] font-bold text-[#26334d] md:text-[22px]">
              Elige el tamaño
            </h3>
            <p className="mt-2 text-center text-[15px] font-body text-[#4a5568]">
              Recomendamos 150ml para recién nacidos y 250ml a partir de 3 meses.
            </p>
            <div className="mx-auto mt-8 flex max-w-[300px] justify-center gap-4">
              {["150ml", "250ml"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => select(opt)}
                  className={`rounded-full border-2 px-8 py-[12px] text-[15px] font-body transition-all ${
                    answers[6] === opt
                      ? "border-[#f49898] bg-[#fdf5f0] font-semibold text-[#26334d]"
                      : "border-[#d6dce4] text-[#a0a8b4] hover:border-[#b0b8c4] hover:text-[#26334d]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignBottle;
