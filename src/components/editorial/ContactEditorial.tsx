import { useState } from 'react';
import { useMagnetic } from '@/components/editorial/useMagnetic';
import { portfolio } from '@/data/portfolio';

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className="rounded-full border border-[rgba(200,155,60,0.22)] bg-[rgba(200,155,60,0.10)] px-2.5 py-1 font-mono text-[0.66rem] tracking-wide text-[#C89B3C] hover:bg-[rgba(200,155,60,0.18)] transition-colors"
    >
      {ok ? 'Copied ✓' : 'Copy'}
    </button>
  );
}

export function ContactEditorial() {
  const submitRef = useMagnetic<HTMLButtonElement>(10);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const subject = String(fd.get('subject') || 'Portfolio inquiry').trim();
    const message = String(fd.get('message') || '').trim();
    if (!name || !email || !message) return;
    setSending(true);
    const mailSubject = encodeURIComponent(`${subject} — from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}\n\n— sent via aditya-dixit.vercel.app`);
    // small delay for polish then open mail client + show success inline
    setTimeout(() => {
      window.location.href = `mailto:${portfolio.email}?subject=${mailSubject}&body=${body}`;
      setSending(false);
      setSent(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSent(false), 4000);
    }, 450);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0F1F3D] text-[#FAF7F0]">
      {/* subtle editorial watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[18px] hidden select-none justify-center lg:flex">
        <span className="font-serif text-[11rem] font-black leading-none tracking-[-0.04em] text-[#162E4D] opacity-60">CONTACT</span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-[4vw] py-[72px] sm:py-[92px]">
        {/* header */}
        <div className="reveal text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.16em] text-[#C89B3C]">
            <span className="h-1 w-1 rounded-full bg-[#C89B3C] shadow-[0_0_8px_rgba(200,155,60,0.9)]" /> 08 / GET IN TOUCH
          </span>
          <h2 className="mx-auto mt-3 max-w-[14ch] font-serif text-[clamp(2.2rem,6vw,4.4rem)] font-extrabold leading-[0.9] tracking-[-0.02em] text-[#FAF7F0]">
            LET'S CREATE SOMETHING <span className="font-normal italic text-[#C89B3C]">extraordinary.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] font-sans text-[0.92rem] leading-relaxed text-[#F3E8D0]/75">
            Have a brief, an idea, or just want to say hi? I reply within 24 hours — every message gets a thoughtful reply. Open to internships, freelance & collabs.
          </p>
          <div className="mx-auto mt-6 h-px w-full max-w-[980px] bg-[rgba(200,155,60,0.14)]" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.22fr] lg:gap-7 lg:items-start">
          {/* LEFT — profile + quick contact */}
          <div className="reveal flex flex-col gap-4">
            {/* profile */}
            <div className="relative overflow-hidden rounded-[20px] border border-[rgba(200,155,60,0.14)] bg-[#162E4D] p-5 sm:p-6">
              <div className="flex gap-4 sm:gap-5">
                <img src="/images/contact-profile.png" alt="Aditya Dixit" className="h-[88px] w-[88px] shrink-0 rounded-2xl object-cover border border-[rgba(200,155,60,0.18)] sm:h-[104px] sm:w-[104px]" />
                <div className="min-w-0">
                  <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[#C89B3C]">FULL-STACK & AI ENGINEER</p>
                  <h3 className="mt-1 font-serif text-[1.35rem] font-extrabold leading-none text-[#FAF7F0]">Aditya Dixit</h3>
                  <p className="mt-1 font-sans text-[0.82rem] text-[#F3E8D0]/80">B.Tech CSE ’28 · PSIT Kanpur · India</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[rgba(122,255,122,0.18)] bg-[rgba(122,255,122,0.08)] px-2.5 py-1 font-mono text-[0.66rem] text-[#B6F5B6]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7CFF7C] shadow-[0_0_8px_rgba(124,255,124,0.9)]" /> AVAILABLE FOR WORK · 2026
                  </span>
                </div>
              </div>
              <p className="mt-4 rounded-xl bg-[#0F1F3D] border border-[rgba(200,155,60,0.10)] px-3.5 py-3 font-sans text-[0.82rem] leading-relaxed text-[#F3E8D0]/80">
                “Shipping production code — not just prototypes.” · Response time ~12 hours · Kanpur (IST)
              </p>
            </div>

            {/* contact rows */}
            <div className="grid gap-3">
              <div className="group flex items-center justify-between gap-3 rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#162E4D] px-4 py-3.5 transition-colors hover:border-[rgba(200,155,60,0.28)]">
                <div className="min-w-0">
                  <p className="font-mono text-[0.66rem] tracking-[0.12em] text-[#C89B3C]">EMAIL</p>
                  <a href={`mailto:${portfolio.email}`} className="block truncate font-sans text-[0.88rem] font-semibold text-[#FAF7F0] hover:text-[#C89B3C]">{portfolio.email}</a>
                  <p className="font-mono text-[0.68rem] text-[#F3E8D0]/60">Preferred — replies in &lt;24h</p>
                </div>
                <CopyBtn text={portfolio.email} />
              </div>

              <div className="flex gap-3">
                <a href={portfolio.github} target="_blank" rel="noopener" className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#162E4D] px-4 py-3.5 hover:border-[rgba(200,155,60,0.28)] transition-colors">
                  <span>
                    <span className="font-mono text-[0.66rem] tracking-[0.12em] text-[#C89B3C]">GITHUB</span>
                    <span className="block font-mono text-[0.78rem] text-[#FAF7F0]">Aditya-dxt</span>
                  </span>
                  <span className="text-[#C89B3C]">↗</span>
                </a>
                <a href={portfolio.linkedin} target="_blank" rel="noopener" className="flex flex-1 items-center justify-between gap-2 rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#162E4D] px-4 py-3.5 hover:border-[rgba(200,155,60,0.28)] transition-colors">
                  <span>
                    <span className="font-mono text-[0.66rem] tracking-[0.12em] text-[#C89B3C]">LINKEDIN</span>
                    <span className="block font-mono text-[0.78rem] text-[#FAF7F0]">aditya-dixit</span>
                  </span>
                  <span className="text-[#C89B3C]">↗</span>
                </a>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#162E4D] px-4 py-3.5">
                <div>
                  <p className="font-mono text-[0.66rem] tracking-[0.12em] text-[#C89B3C]">LOCATION & TIME</p>
                  <p className="font-sans text-[0.84rem] text-[#FAF7F0]">Kanpur, Uttar Pradesh · IST (UTC+5:30)</p>
                </div>
                <span className="hidden sm:inline-flex rounded-full bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] px-2.5 py-1 font-mono text-[0.66rem] text-[#F3E8D0]/70">{portfolio.phone}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a href={portfolio.bookingUrl} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C89B3C] px-5 py-3 font-sans text-[0.88rem] font-bold text-[#0F1F3D] hover:bg-[#E8DCC8] transition-colors">
                Book 30-min call <span aria-hidden>→</span>
              </a>
              <a href={`mailto:${portfolio.email}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(200,155,60,0.22)] bg-transparent px-5 py-3 font-mono text-[0.78rem] font-bold tracking-wide text-[#F3E8D0] hover:bg-[rgba(200,155,60,0.10)] transition-colors">
                Email directly
              </a>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="reveal lg:sticky lg:top-[84px]" style={{ transitionDelay: '0.08s' }}>
            <form onSubmit={onSubmit} className="rounded-[20px] border border-[rgba(200,155,60,0.14)] bg-[#162E4D] p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-[1.45rem] font-bold leading-none text-[#FAF7F0]">Send a message</h3>
                  <p className="mt-1.5 font-sans text-[0.82rem] text-[#F3E8D0]/75">Takes ~30 seconds. I read every submission personally.</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[rgba(200,155,60,0.14)] bg-[rgba(200,155,60,0.08)] px-2.5 py-1 font-mono text-[0.68rem] text-[#C89B3C]">24h reply</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[0.68rem] tracking-[0.08em] text-[#F3E8D0]/80">YOUR NAME *</span>
                  <input name="name" required autoComplete="name" placeholder="Aditya Dixit" className="rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] px-3.5 py-3 font-sans text-[0.9rem] text-[#FAF7F0] placeholder:text-[#756F65]/80 focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[rgba(200,155,60,0.18)] transition" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[0.68rem] tracking-[0.08em] text-[#F3E8D0]/80">YOUR EMAIL *</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] px-3.5 py-3 font-sans text-[0.9rem] text-[#FAF7F0] placeholder:text-[#756F65]/80 focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[rgba(200,155,60,0.18)] transition" />
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-1.5">
                <span className="font-mono text-[0.68rem] tracking-[0.08em] text-[#F3E8D0]/80">SUBJECT</span>
                <input name="subject" placeholder="Project, internship, or just hello" className="rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] px-3.5 py-3 font-sans text-[0.9rem] text-[#FAF7F0] placeholder:text-[#756F65]/80 focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[rgba(200,155,60,0.18)] transition" />
              </label>

              <label className="mt-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.68rem] tracking-[0.08em] text-[#F3E8D0]/80">MESSAGE *</span>
                  <span className="font-mono text-[0.66rem] text-[#F3E8D0]/50">min 10 chars</span>
                </div>
                <textarea name="message" required rows={5} minLength={10} placeholder="Tell me about your project, timeline and what success looks like..." className="min-h-[128px] resize-none rounded-xl border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] px-3.5 py-3 font-sans text-[0.9rem] leading-relaxed text-[#FAF7F0] placeholder:text-[#756F65]/80 focus:border-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[rgba(200,155,60,0.18)] transition" />
              </label>

              <p className="mt-3 font-mono text-[0.66rem] leading-relaxed text-[#F3E8D0]/55">By sending, you agree I can reply via email. No spam — just a direct reply from me.</p>

              <button ref={submitRef} type="submit" disabled={sending} className="magnetic mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C89B3C] px-6 py-3.5 font-sans text-[0.92rem] font-bold tracking-wide text-[#0F1F3D] hover:bg-[#E8DCC8] active:bg-[#D0C0A0] disabled:opacity-70 disabled:cursor-not-allowed will-change-transform transition-colors">
                {sending ? 'Opening mail app…' : 'Send message →'}
              </button>

              {sent && (
                <div className="mt-3 rounded-xl border border-[rgba(122,255,122,0.18)] bg-[rgba(122,255,122,0.08)] px-3.5 py-3 font-sans text-[0.84rem] text-[#B6F5B6]">Message handed to your mail app — I’ll reply within 24h. If nothing opened, email me directly at {portfolio.email}.</div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[rgba(200,155,60,0.10)] pt-4">
                <span className="font-mono text-[0.66rem] tracking-wide text-[#F3E8D0]/55">Also:</span>
                <a href={portfolio.github} target="_blank" rel="noopener" className="rounded-full border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] px-2.5 py-1 font-mono text-[0.68rem] text-[#F3E8D0]/80 hover:text-[#C89B3C]">GitHub</a>
                <a href={portfolio.linkedin} target="_blank" rel="noopener" className="rounded-full border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] px-2.5 py-1 font-mono text-[0.68rem] text-[#F3E8D0]/80 hover:text-[#C89B3C]">LinkedIn</a>
                <a href={portfolio.leetcode} target="_blank" rel="noopener" className="rounded-full border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] px-2.5 py-1 font-mono text-[0.68rem] text-[#F3E8D0]/80 hover:text-[#C89B3C]">LeetCode</a>
                <span className="ml-auto font-mono text-[0.66rem] text-[#F3E8D0]/40">Press Enter to send</span>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(200,155,60,0.14)] pt-5 font-mono text-[0.70rem] text-[#F3E8D0]/60">
          <span>© {new Date().getFullYear()} Aditya Dixit · Kanpur, India · IST</span>
          <span className="inline-flex items-center gap-2">Built with React · Tailwind · GSAP · Vite <a href="#" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'});}} className="ml-2 rounded-full border border-[rgba(200,155,60,0.18)] px-2.5 py-1 text-[#C89B3C] hover:bg-[rgba(200,155,60,0.10)]">Back to top ↑</a></span>
        </div>
      </div>
    </section>
  );
}
