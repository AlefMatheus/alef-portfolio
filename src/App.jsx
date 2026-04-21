import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const whatsappLink =
  "https://wa.me/5524998547027?text=Ol%C3%A1%20Alef%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20quero%20falar%20sobre%20um%20projeto.";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Solucoes", href: "#solucoes" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

const solutions = [
  {
    eyebrow: "Landing pages",
    title: "Paginas enxutas que explicam, convencem e convertem.",
    text: "Estruturas claras para campanhas, lancamentos e presenca digital com leitura rapida e CTA certeiro.",
  },
  {
    eyebrow: "Aplicacoes web",
    title: "Sistemas e plataformas pensados para operacao real.",
    text: "Da area do cliente ao painel administrativo, com fluidez visual e base preparada para crescer junto com o negocio.",
  },
  {
    eyebrow: "Apps e automacoes",
    title: "Experiencias moveis e fluxos que economizam tempo.",
    text: "Aplicativos e automacoes para reduzir tarefas repetitivas, conectar ferramentas e acelerar o dia a dia do cliente.",
  },
];

const workflow = [
  "Entendo o objetivo do negocio e traduzo isso em uma direcao de produto clara.",
  "Desenho a experiencia com foco em confianca, velocidade e facilidade de uso.",
  "Implemento a solucao completa e deixo tudo pronto para evoluir sem virar retrabalho.",
];

const highlights = [
  {
    number: "01",
    title: "Posicionamento antes de tecnologia",
    text: "Seu cliente final percebe clareza, credibilidade e resultado antes de notar qualquer detalhe tecnico.",
  },
  {
    number: "02",
    title: "Entrega fullstack de ponta a ponta",
    text: "Do layout a logica, da interface ao sistema, com uma visao unica para manter consistencia no produto.",
  },
  {
    number: "03",
    title: "Solucoes modernas que servem ao negocio",
    text: "Landing pages, plataformas, apps e automacoes desenhados para resolver problemas concretos e abrir novas oportunidades.",
  },
];

const sectionIntroClass = "mb-8 grid max-w-3xl gap-4 md:mb-12";
const eyebrowClass =
  "inline-flex w-fit rounded-full border border-black/10 bg-white/55 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-accent-deep backdrop-blur";
const headingClass =
  "mt-4 max-w-[11ch] font-display text-4xl leading-[0.92] tracking-[-0.05em] text-balance text-ink sm:text-5xl lg:text-6xl";
const bodyClass = "max-w-2xl text-sm leading-7 text-muted sm:text-base";
const surfaceClass =
  "border border-black/10 bg-white/45 shadow-[0_30px_80px_rgba(68,38,20,0.12)] backdrop-blur";
const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70";
const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white/55 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5";

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

function SectionIntro({ label, title, text }) {
  return (
    <motion.div className={sectionIntroClass} {...fadeUp}>
      <span className={eyebrowClass}>{label}</span>
      <h2 className="font-display text-3xl leading-[0.96] tracking-[-0.05em] text-balance text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text ? <p className={bodyClass}>{text}</p> : null}
    </motion.div>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const heroShift = useTransform(scrollYProgress, [0, 0.25], [0, 90]);
  const year = new Date().getFullYear();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [emailStatus, setEmailStatus] = useState({
    type: "idle",
    message: "",
  });

  const handleEmailFieldChange = (event) => {
    const { name, value } = event.target;

    if (emailStatus.type !== "idle") {
      setEmailStatus({
        type: "idle",
        message: "",
      });
    }

    setEmailForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEmailToggle = () => {
    if (!showEmailForm) {
      setEmailStatus({
        type: "idle",
        message: "",
      });
    }

    setShowEmailForm((current) => !current);
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    setEmailStatus({
      type: "loading",
      message: "Enviando mensagem...",
    });

    const payload = {
      name: emailForm.name,
      email: emailForm.email,
      _subject: emailForm.subject || `Contato via portfolio - ${emailForm.name || "Novo lead"}`,
      message: emailForm.message,
      _captcha: "false",
      _template: "table",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/alefmatheus.0101@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar.");
      }

      setEmailForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setShowEmailForm(false);
      setEmailStatus({
        type: "success",
        message: "Email enviado com sucesso. Vou te responder em breve.",
      });
    } catch {
      setEmailStatus({
        type: "error",
        message: "Nao foi possivel enviar agora. Tente novamente em instantes.",
      });
    }
  };

  return (
    <div className="bg-page-glow px-4 pb-28 pt-4 text-ink sm:px-5 lg:px-8">
      <header className="sticky top-3 z-30 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-white/50 bg-paper/75 px-4 py-3 shadow-[0_30px_80px_rgba(68,38,20,0.12)] backdrop-blur md:px-5">
        <a
          className="font-display text-sm font-bold uppercase tracking-[0.22em] text-ink sm:text-base"
          href="#inicio"
        >
          Alef Garcia
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="hidden min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 sm:inline-flex"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          Falar sobre projeto
        </a>
      </header>

      <main>
        <section
          className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-7xl items-center gap-6 py-8 md:py-12 lg:py-16"
          id="inicio"
        >
          <motion.div className="max-w-2xl" style={{ y: heroShift }}>
            <motion.span
              className={eyebrowClass}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Desenvolvedor Fullstack • Engenheiro de Sistemas
            </motion.span>

            <motion.h1
              className={headingClass}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
            >
              Solucoes modernas para negocios que precisam parecer serios e funcionar bem.
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
            >
              Meu foco nao e vender tecnologia por tecnologia. Eu entrego landing pages,
              aplicacoes web, apps e automacoes que resolvem o problema certo e valorizam a
              presenca digital do cliente.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3 }}
            >
              <a className={primaryButtonClass} href="#solucoes">
                Ver solucoes
              </a>
              <a
                className={secondaryButtonClass}
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Chamar no WhatsApp
              </a>
            </motion.div>

            <motion.div
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.4 }}
            >
              {["Estrategia", "Experiencia", "Execucao"].map((item) => (
                <div
                  key={item}
                  className={`${surfaceClass} rounded-2xl px-4 py-4 text-sm font-semibold text-ink`}
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="hidden relative isolate min-h-[27rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(165deg,rgba(15,14,13,0.98),rgba(49,33,24,0.9))] shadow-[0_30px_80px_rgba(68,38,20,0.12)] sm:min-h-[32rem] lg:min-h-[42rem]">
            <div className="absolute inset-4 rounded-[1.5rem] border border-white/10" />

            <div className="absolute left-4 top-4 w-[calc(100%-2rem)] max-w-xs rounded-[1.4rem] border border-white/12 bg-white/7 px-4 py-4 text-white/85 backdrop-blur md:left-6 md:top-6">
              <span className="mb-3 inline-block text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white/60">
                Presenca premium
              </span>
              <strong className="block font-display text-xl leading-tight text-white sm:text-2xl">
                Interfaces que passam confianca ja no primeiro scroll.
              </strong>
            </div>

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0.1)_25%,transparent_45%),radial-gradient(circle_at_52%_52%,#ffb686,#d96d38_45%,#6a2410_78%)] shadow-[0_0_120px_rgba(217,109,56,0.34),inset_0_-20px_40px_rgba(88,28,0,0.35)] saturate-105 sm:w-[19rem] lg:w-[24rem]"
            />

            <div className="absolute bottom-4 right-4 w-[calc(100%-2rem)] max-w-xs rounded-[1.4rem] border border-white/12 bg-white/7 px-4 py-4 text-sm text-white/82 backdrop-blur md:bottom-6 md:right-6">
              <span className="mb-3 inline-block text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white/60">
                Entrega sob medida
              </span>
              <ul className="space-y-2 pl-4 leading-7">
                <li>Landing pages estaticas</li>
                <li>Aplicacoes web completas</li>
                <li>Apps de celular</li>
                <li>Automacoes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:pb-16">
          <motion.p className="max-w-2xl text-sm leading-7 text-muted sm:text-base" {...fadeUp}>
            Solucoes pensadas para transformar ideia em produto claro, rapido e pronto para
            gerar resultado.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" {...fadeUp}>
            {["Clareza", "Responsividade", "Presenca"].map((item) => (
              <strong
                key={item}
                className="rounded-full border border-black/10 bg-white/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink sm:text-sm"
              >
                {item}
              </strong>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl py-10 sm:py-14 lg:py-20" id="solucoes">
          <SectionIntro
            label="Solucoes"
            title="O produto precisa resolver. O visual precisa sustentar esse valor."
            text="Cada frente foi organizada para mostrar o tipo de entrega que faz sentido para clientes que querem algo moderno, confiavel e alinhado ao momento do negocio."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((item, index) => (
              <motion.article
                key={item.title}
                className={`${surfaceClass} rounded-[1.75rem] p-5 sm:p-6`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              >
                <span className={eyebrowClass}>{item.eyebrow}</span>
                <h3 className="mt-4 font-display text-2xl leading-[1.02] tracking-[-0.04em] text-ink sm:text-[1.9rem]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-10 sm:py-14 lg:py-20" id="processo">
          <SectionIntro
            label="Processo"
            title="Uma construcao enxuta, mas com visao de sistema."
            text="Eu uno direcao visual, logica de produto e implementacao para evitar solucoes bonitas por fora e frageis por dentro."
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.8fr)]">
            <motion.div className="grid gap-4" {...fadeUp}>
              {workflow.map((step, index) => (
                <div
                  key={step}
                  className="grid gap-3 border-t border-black/10 py-5 last:border-b sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-4"
                >
                  <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-accent-deep">
                    {`0${index + 1}`}
                  </span>
                  <p className="text-sm leading-7 text-muted sm:text-base">{step}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className={`${surfaceClass} rounded-[1.75rem] p-5 lg:sticky lg:top-28 lg:self-start lg:p-6`}
              {...fadeUp}
            >
              <span className={eyebrowClass}>Meu posicionamento</span>
              <p className="mt-4 text-base leading-8 text-muted">
                Sou Desenvolvedor Fullstack e Engenheiro de Sistemas, mas a conversa com o
                cliente comeca em solucao, nao em stack. O que importa e entregar algo moderno,
                responsivo, funcional e pronto para sustentar crescimento.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-10 sm:py-14 lg:py-20">
          <SectionIntro
            label="Diferencial"
            title="Voce nao precisa so de codigo. Precisa de direcao, consistencia e entrega."
          />

          <div className="grid">
            {highlights.map((item, index) => (
              <motion.article
                key={item.number}
                className="grid gap-3 border-t border-black/10 py-5 last:border-b sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-5"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              >
                <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-accent-deep">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-[1.02] tracking-[-0.04em] text-ink sm:text-[1.9rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted sm:text-base">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl py-10 sm:py-14 lg:py-20" id="contato">
          <motion.div className={`${surfaceClass} grid gap-5 rounded-[2rem] p-6 sm:p-8`} {...fadeUp}>
            <span className={eyebrowClass}>Contato</span>
            <h2 className="font-display text-3xl leading-[0.96] tracking-[-0.05em] text-balance text-ink sm:text-4xl lg:text-5xl">
              Se voce quer tirar um projeto do papel com mais clareza e mais presenca, vamos
              conversar.
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">
              Posso te ajudar a construir desde uma pagina de venda ate uma aplicacao completa,
              um app mobile ou uma automacao que reduza trabalho manual.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className={primaryButtonClass} href={whatsappLink} target="_blank" rel="noreferrer">
                Conversar no WhatsApp
              </a>
              <button className={secondaryButtonClass} type="button" onClick={handleEmailToggle}>
                Enviar e-mail
              </button>
            </div>

            <AnimatePresence initial={false}>
              {showEmailForm ? (
                <motion.form
                  className="grid gap-4 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/55 p-4 sm:p-5"
                  onSubmit={handleEmailSubmit}
                  initial={{ opacity: 0, y: 18, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -12, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Seu nome
                      <input
                        className="min-h-12 rounded-2xl border border-black/10 bg-paper px-4 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-accent"
                        type="text"
                        name="name"
                        value={emailForm.name}
                        onChange={handleEmailFieldChange}
                        placeholder="Como voce se chama?"
                        required
                      />
                    </label>

                    <label className="grid gap-2 text-sm font-medium text-ink">
                      Seu e-mail
                      <input
                        className="min-h-12 rounded-2xl border border-black/10 bg-paper px-4 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-accent"
                        type="email"
                        name="email"
                        value={emailForm.email}
                        onChange={handleEmailFieldChange}
                        placeholder="voce@exemplo.com"
                        required
                      />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm font-medium text-ink">
                    Assunto
                    <input
                      className="min-h-12 rounded-2xl border border-black/10 bg-paper px-4 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-accent"
                      type="text"
                      name="subject"
                      value={emailForm.subject}
                      onChange={handleEmailFieldChange}
                      placeholder="Sobre o que voce quer falar?"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-ink">
                    Mensagem
                    <textarea
                      className="min-h-36 rounded-[1.5rem] border border-black/10 bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-accent"
                      name="message"
                      value={emailForm.message}
                      onChange={handleEmailFieldChange}
                      placeholder="Conte um pouco sobre o projeto, prazo ou objetivo."
                      required
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button className={primaryButtonClass} type="submit" disabled={emailStatus.type === "loading"}>
                      {emailStatus.type === "loading" ? "Enviando..." : "Enviar mensagem"}
                    </button>
                    <button
                      className={secondaryButtonClass}
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                    >
                      Fechar formulario
                    </button>
                  </div>
                </motion.form>
              ) : null}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {emailStatus.type === "success" ? (
                <motion.p
                  key="success-message"
                  className="rounded-2xl border border-emerald-600/15 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {emailStatus.message}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {emailStatus.type === "error" ? (
                <motion.p
                  key="error-message"
                  className="rounded-2xl border border-red-600/15 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {emailStatus.message}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 pb-4 text-sm text-muted sm:pb-8 lg:flex-row lg:justify-between">
        <p>Alef Garcia</p>
        <p>Desenvolvedor Fullstack e Engenheiro de Sistemas.</p>
        <p>{year}</p>
      </footer>

      <nav
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-2 rounded-full border border-white/50 bg-paper/85 px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-[0_30px_80px_rgba(68,38,20,0.12)] backdrop-blur lg:hidden"
        aria-label="Navegacao mobile"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="truncate text-center transition hover:text-accent-deep"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_24px_55px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 sm:h-16 sm:w-16 lg:bottom-5"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 fill-current">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.95c0 1.75.46 3.46 1.34 4.97L2 22l5.22-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.48 0 9.95-4.46 9.95-9.95a9.88 9.88 0 0 0-2.93-6.99Zm-7.02 15.26h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.52 3.68-8.2 8.22-8.2 2.19 0 4.24.85 5.79 2.4a8.14 8.14 0 0 1 2.41 5.8c0 4.53-3.69 8.22-8.2 8.22Zm4.5-6.14c-.25-.13-1.47-.73-1.7-.81-.22-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.25-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.22.25-.86.84-.86 2.06 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.75.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.17.21-.57.21-1.06.15-1.16-.06-.11-.22-.17-.48-.29Z" />
        </svg>
      </a>
    </div>
  );
}

export default App;
