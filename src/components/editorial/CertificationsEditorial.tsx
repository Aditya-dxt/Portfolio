import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';

const CERT_MAIN = 5;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function CertificationsEditorial() {
  const ref = useRef<HTMLElement>(null);
  const ready = useAppReady();
  const [showCert, setShowCert] = useState(false);
  const certs = portfolio.certifications as any[];

  useEffect(() => {
    const root = ref.current;
    if (!root || isReducedMotion() || !ready) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>('.cert-card'), {
        y: 22, autoAlpha: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 84%' }
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const certPreview = certs.slice(0, CERT_MAIN);

  return (
    <section ref={ref} id="certifications" className="bg-white text-[#0F1F3D] border-t border-[#C89B3C]/10">
      <div className="max-w-[1400px] mx-auto px-[4vw] py-[72px] sm:py-[88px]">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#0F1F3D] pb-4 mb-8">
          <div>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#C89B3C] block mb-1.5">06 / VAULT</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-extrabold tracking-[-0.02em] leading-none">CERTIFICATIONS</h2>
            <p className="font-mono text-[0.72rem] tracking-wide text-[#756F65] mt-2">9 credentials — Oracle, AWS, JP Morgan, Microsoft & more · tap to preview</p>
          </div>
          <button
            onClick={() => { setShowCert(v => !v); if (!showCert) setTimeout(() => scrollToId('certifications-archive'), 120); }}
            className="font-mono text-[0.72rem] font-bold tracking-wide bg-[#0F1F3D] text-[#FAF7F0] px-4 py-2 rounded-full hover:bg-[#162E4D] transition-colors"
          >
            {showCert ? 'Hide vault ↑' : 'View all 9 →'}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certPreview.map((c: any) => (
            <a key={c.name} href={c.image || '#'} target={c.image ? '_blank' : undefined} rel="noopener" className="cert-card group overflow-hidden rounded-[18px] border border-[#C89B3C]/15 bg-white hover:border-[#C89B3C]/30 hover:shadow-[0_12px_28px_rgba(15,31,61,0.07)] transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F0] border-b border-[#C89B3C]/10">
                {c.image ? (
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" />
                ) : (
                  <div className="flex h-full items-center justify-center font-serif text-[1.6rem] font-black text-[#0F1F3D]/10">{c.name.slice(0, 2).toUpperCase()}</div>
                )}
                <span className="absolute left-3 top-3 font-mono text-[0.64rem] font-bold tracking-[0.08em] bg-[#0F1F3D] text-[#FAF7F0] px-2.5 py-1 rounded-full">{c.year || '2025'}</span>
                <span className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#C89B3C]/15 text-[#1d9a5a] text-[0.72rem]">✓</span>
              </div>
              <div className="p-4 flex flex-1 flex-col">
                <h4 className="font-sans text-[0.92rem] font-bold leading-tight text-[#0F1F3D] line-clamp-2">{c.name}</h4>
                <p className="mt-1 font-mono text-[0.70rem] tracking-wide text-[#756F65]">{c.issuer}</p>
                <span className="mt-3 inline-flex w-fit font-mono text-[0.66rem] tracking-wide text-[#C89B3C] border border-[#C89B3C]/15 bg-[#FAF7F0] px-2.5 py-1 rounded-full">View certificate ↗</span>
              </div>
            </a>
          ))}
          <button
            type="button"
            onClick={() => { setShowCert(true); setTimeout(() => scrollToId('certifications-archive'), 120); }}
            className="cert-card group relative overflow-hidden rounded-[18px] border border-[#C89B3C]/20 bg-[#0F1F3D] p-6 text-left hover:bg-[#162E4D] transition-colors flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#C89B3C] text-[#0F1F3D] font-bold">◈</span>
              <h4 className="mt-3 font-serif text-[1.18rem] font-extrabold leading-tight text-[#FAF7F0]">Explore complete vault</h4>
              <p className="mt-1 font-mono text-[0.72rem] leading-relaxed text-[#F3E8D0]/70">{certs.length} credentials · Oracle, AWS, JP Morgan, Microsoft & more</p>
            </div>
            <div className="mt-4">
              <div className="flex -space-x-2">
                {certs.slice(0, 4).map((c: any) => (
                  <span key={c.name} className="h-8 w-8 rounded-full border-2 border-[#0F1F3D] bg-[#FAF7F0] grid place-items-center font-mono text-[0.58rem] font-bold text-[#0F1F3D]">{c.issuer.slice(0, 2).toUpperCase()}</span>
                ))}
                <span className="h-8 w-8 rounded-full border-2 border-[#0F1F3D] bg-[#C89B3C] grid place-items-center font-mono text-[0.62rem] font-bold text-[#0F1F3D]">+{certs.length - 4}</span>
              </div>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold tracking-wide text-[#C89B3C]">Open vault <span className="transition-transform group-hover:translate-x-1">→</span></span>
            </div>
          </button>
        </div>

        <div id="certifications-archive" className={`${showCert ? 'block' : 'hidden'} mt-6 rounded-[18px] border border-[#C89B3C]/15 bg-[#0F1F3D] p-5 sm:p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h4 className="font-serif text-[1.05rem] font-extrabold text-[#FAF7F0]">Complete vault — {certs.length} certificates</h4>
            <div className="flex gap-2">
              <button onClick={() => setShowCert(false)} className="font-mono text-[0.70rem] text-[#FAF7F0] border border-[rgba(200,155,60,0.18)] bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10">Close ✕</button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((c: any) => (
              <a key={c.name + c.issuer} href={c.image || '#'} target={c.image ? '_blank' : undefined} rel="noopener" className="group overflow-hidden rounded-[16px] border border-[rgba(200,155,60,0.14)] bg-[#162E4D] hover:border-[#C89B3C]/30 transition-colors flex flex-col">
                <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F0]">
                  {c.image ? <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" /> : <div className="grid h-full place-items-center font-serif text-xl font-black text-[#0F1F3D]/10">{c.name.slice(0, 2)}</div>}
                </div>
                <div className="p-4">
                  <h5 className="font-sans text-[0.88rem] font-bold leading-tight text-[#FAF7F0]">{c.name}</h5>
                  <p className="mt-1 font-mono text-[0.68rem] text-[#F3E8D0]/70">{c.issuer} · {c.year || ''}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[0.68rem] text-[#F3E8D0]/50">Click any card to open full certificate image · /public/images/certifications</p>
        </div>
      </div>
    </section>
  );
}
