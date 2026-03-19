import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import bottleMint from "@/assets/bottle-mint.png";
import bottlePink from "@/assets/bottle-pink.png";
import bottleViolet from "@/assets/bottle-violet.png";

const totalSteps = 7;

interface StepConfig {
  title: string;
  subtitle: string;
  options: { label: string; value: string; icon?: string }[];
}

const steps: StepConfig[] = [
  {
    title: "¿Cómo describirías tu pecho de forma general?",
    subtitle: "Fíjate principalmente en la forma de la parte final, sin importar si es voluminoso, pequeño o caído.",
    options: [
      { label: "Plano", value: "plano", icon: "⬛" },
      { label: "Redondo", value: "redondo", icon: "🔵" },
      { label: "Tubular", value: "tubular", icon: "📐" },
    ],
  },
  {
    title: "¿Tu pezón se alarga tras la toma?",
    subtitle: 'Si estás embarazada, elige "Embarazada / No lo sé".',
    options: [
      { label: "Embarazada / No lo sé", value: "embarazada" },
      { label: "No se estira", value: "no-estira" },
      { label: "Se estira (aunque sea un poco)", value: "se-estira" },
    ],
  },
  {
    title: "¿Cuál es el diámetro de tu pezón?",
    subtitle: "Mide el pezón en reposo (antes de la toma), sin incluir la areola.",
    options: [
      { label: "Menor o igual a 2,5cm", value: "small" },
      { label: "Mayor a 2,5cm", value: "large" },
      { label: "Uso pezonera", value: "pezonera" },
    ],
  },
  {
    title: "¿Cuál es la edad de tu bebé?",
    subtitle: "Esto nos ayuda a determinar el flujo adecuado.",
    options: [
      { label: "0 a 3 meses", value: "0-3" },
      { label: "3 a 6 meses", value: "3-6" },
      { label: "Más de 6 meses", value: "6+" },
    ],
  },
  {
    title: "Elige el color de tu biberón",
    subtitle: "Todos los colores están disponibles en ambos tamaños.",
    options: [
      { label: "Mint", value: "mint" },
      { label: "Rosa", value: "rosa" },
      { label: "Violeta", value: "violeta" },
    ],
  },
  {
    title: "Elige el tamaño",
    subtitle: "Recomendamos 150ml para recién nacidos y 250ml para bebés a partir de 3 meses.",
    options: [
      { label: "150ml", value: "150" },
      { label: "250ml", value: "250" },
    ],
  },
  {
    title: "Elige el flujo de la tetina",
    subtitle: "El flujo depende de la edad y las necesidades de tu bebé.",
    options: [
      { label: "0 a 3 meses", value: "flow-0-3" },
      { label: "3 a 6 meses", value: "flow-3-6" },
      { label: "Más de 6 meses", value: "flow-6+" },
      { label: "Papillas", value: "papillas" },
    ],
  },
];

const colorImages: Record<string, string> = {
  mint: bottleMint,
  rosa: bottlePink,
  violeta: bottleViolet,
};

const DesignBottle = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: value }));
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => setCompleted(true), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  if (completed) {
    const selectedColor = answers[4] || "mint";
    const bottleImg = colorImages[selectedColor] || bottleMint;

    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">HAPPYMAMI</h1>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">¡Tu biberón está listo!</h2>
          <img src={bottleImg} alt="Tu biberón personalizado" className="w-48 mx-auto mb-8" />
          <div className="bg-secondary rounded-2xl p-6 text-left space-y-3 font-body text-sm">
            <p><span className="font-bold">Forma:</span> {answers[0]}</p>
            <p><span className="font-bold">Elasticidad:</span> {answers[1]}</p>
            <p><span className="font-bold">Diámetro:</span> {answers[2]}</p>
            <p><span className="font-bold">Edad bebé:</span> {answers[3]}</p>
            <p><span className="font-bold">Color:</span> {answers[4]}</p>
            <p><span className="font-bold">Tamaño:</span> {answers[5]}</p>
            <p><span className="font-bold">Flujo:</span> {answers[6]}</p>
          </div>
          <button onClick={() => { setCurrentStep(0); setAnswers({}); setCompleted(false); }} className="btn-primary mt-8">
            Diseñar otro biberón
          </button>
        </motion.div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-announcement py-6 text-center">
        <h1 className="text-2xl font-display font-bold text-primary">HAPPYMAMI</h1>
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mt-1">¡Configura tus medidas!</h2>

        {/* Progress */}
        <div className="flex items-center justify-center mt-6 gap-0 max-w-md mx-auto px-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className={`step-circle text-xs ${i < currentStep ? "step-completed" : i === currentStep ? "step-active" : "step-inactive"}`}>
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-6 sm:w-10 h-0.5 ${i < currentStep ? "bg-brand-dark" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {currentStep > 0 && (
          <button onClick={goBack} className="flex items-center gap-1 font-body text-sm text-foreground underline mb-6 hover:text-primary transition-colors">
            <ChevronLeft size={16} /> Paso anterior
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl font-display font-bold text-foreground text-center mb-3">{step.title}</h3>
            <p className="text-sm font-body text-muted-foreground text-center mb-8">{step.subtitle}</p>

            {/* Color step with images */}
            {currentStep === 4 ? (
              <div className="flex justify-center gap-6">
                {step.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${answers[currentStep] === opt.value ? "border-primary shadow-md bg-accent" : "border-border hover:border-primary"}`}
                  >
                    <img src={colorImages[opt.value]} alt={opt.label} className="w-20 h-20 object-contain" />
                    <span className="font-body text-sm font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-w-md mx-auto">
                {step.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`text-center py-4 px-6 rounded-xl border-2 font-body text-sm transition-all ${answers[currentStep] === opt.value ? "border-primary bg-accent font-bold" : "border-border hover:border-primary"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DesignBottle;
