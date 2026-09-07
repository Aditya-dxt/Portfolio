import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolio } from '@/data/portfolio';
import { NavbarEditorial } from '@/components/editorial/NavbarEditorial';

type Filter = 'all' | 'sports' | 'certs' | 'hacks' | 'achievements' | 'photo';

export default function Archive() {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const sportsCerts = (portfolio as any).sportsCertificates as { name: string; image: string; label: string }[];
  const certs = portfolio.certifications as any[];
  const hacks = portfolio.hackathons as any[];
  const achievements = portfolio.achievements as string[];
  const sportsAchievements = (portfolio as any).sportsAchievements as any[];

  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const map: Record<string, Filter> = { sports: 'sports', certifications: 'certs', certs: 'certs', hackathons: 'hacks', hacks: 'hacks', achievements: 'achievements', photography: 'photo', photo: 'photo' };
      if (map[hash]) setFilter(map[hash]);
      setTimeout(() => {
        const el = document.getElementById(hash === 'sports' ? 'archive-sports' : hash === 'certs' || hash === 'certifications' ? 'archive-certs' : hash === 'hacks' || hash === 'hackathons' ? 'archive-hacks' : hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, []);

  const show = (f: Filter) => filter === 'all' || filter === f;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#0F1F3D]">
      <NavbarEditorial />
      <div className="mx-auto max-w-[1400px] px-[4vw] pt-[96px] pb-6">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#0F1F3D] pb-5">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-[#C89B3C]/20 bg-white px-3.5 py-1.5 font-mono text-[0.70rem] font-bold tracking-wide text-[#0F1F3D] hover:border-[#C89B3C]/40 transition-colors">← Back to portfolio</Link>
            <h1 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-none tracking-tight">ARCHIVE <span className="italic font-normal text-[#7A263A]">— Vault</span></h1>
            <p className="mt-2 max-w-[58rem] font-mono text-[0.72rem] tracking-wide text-[#756F65]">One page for everything: Sports (9) + Certifications (29) + Hackathons (6) + Achievements + Photography (15). Use Explore on the home page to land here — or filter below.</p>
          </div>
          <div className="flex flex-wrap gap-2 self-end">
            <span className="hidden sm:inline-flex rounded-full bg-[#0F1F3D] px-3 py-1.5 font-mono text-[0.66rem] tracking-wide text-[#FAF7F0]">9 SPORTS · 29 CERTS · 6 HACKS · 15 PHOTOS</span>
          </div>
        </div>

        {/* filter pills */}
        <div className="sticky top-[64px] z-20 -mx-[4vw] mt-6 border-y border-[#C89B3C]/12 bg-[#FAF7F0]/90 px-[4vw] py-3 backdrop-blur">
          <div className="flex flex-wrap gap-2">
            {([
              ['all', 'All — 57'],
              ['sports', `Sports — 9`],
              ['certs', `Certifications — ${certs.length}`],
              ['hacks', `Hackathons — ${hacks.length}`],
              ['achievements', `Achievements — ${achievements.length + sportsAchievements.length}`],
              ['photo', 'Photography — 15'],
            ] as const).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k as Filter)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.70rem] font-bold tracking-wide transition-colors ${filter === k ? 'bg-[#0F1F3D] text-[#FAF7F0] border-[#0F1F3D]' : 'bg-white text-[#0F1F3D] border-[#C89B3C]/15 hover:border-[#C89B3C]/30'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        {show('achievements') && (
          <section id="archive-achievements" className="mt-10 scroll-mt-[120px]">
            <div className="flex items-end justify-between border-b border-[#0F1F3D]/10 pb-3">
              <div>
                <span className="font-mono text-[0.72rem] font-bold tracking-[0.14em] text-[#C89B3C]">01 / ACHIEVEMENTS</span>
                <h2 className="font-serif text-[1.6rem] font-extrabold leading-none">ACHIEVEMENTS</h2>
              </div>
              <span className="font-mono text-[0.68rem] text-[#756F65]">{achievements.length + sportsAchievements.length} items</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {achievements.map((a, i) => (
                <div key={a + i} className="rounded-[14px] border border-[#C89B3C]/12 bg-white px-4 py-3.5 font-mono text-[0.78rem] leading-relaxed text-[#0F1F3D] shadow-sm">
                  <span className="mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0F1F3D] px-1.5 font-mono text-[0.62rem] font-bold text-[#C89B3C]">{String(i + 1).padStart(2, '0')}</span>
                  {a}
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {sportsAchievements.map((a: any) => (
                <div key={a.title} className="rounded-[14px] border border-[rgba(122,38,58,0.14)] bg-[#FFF7F0] px-4 py-4">
                  <span className="inline-flex rounded-full bg-[#7A263A] px-2 py-1 font-mono text-[0.58rem] font-bold tracking-wide text-white">{a.badge}</span>
                  <h4 className="mt-2 font-sans text-[0.90rem] font-bold leading-tight text-[#0F1F3D]">{a.title}</h4>
                  <p className="font-mono text-[0.66rem] text-[#756F65]">{a.org} · {a.period}</p>
                  <p className="mt-1.5 font-mono text-[0.70rem] leading-relaxed text-[#3a3a3a]">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SPORTS CERTIFICATES */}
        {show('sports') && (
          <section id="archive-sports" className="mt-12 scroll-mt-[120px]">
            <div className="rounded-[18px] border border-[rgba(200,155,60,0.18)] bg-[#7A263A] p-5 sm:p-6 text-[#FAF7F0]">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/14 pb-4">
                <div>
                  <span className="inline-flex items-center gap-2 font-mono text-[0.70rem] font-bold tracking-[0.14em] text-[#C89B3C]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#C89B3C] text-[#0F1F3D] text-[0.75rem]">🏆</span> 02 / FIELD HONORS — SPORTS</span>
                  <h2 className="mt-2 font-serif text-[1.7rem] font-extrabold leading-none">SPORTS <span className="italic font-normal text-[#F3E8D0]">— Certificates</span></h2>
                  <p className="mt-1 font-mono text-[0.68rem] text-[#F3E8D0]/70">9 framed proofs — courts, podiums & captaincy · tap to enlarge</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[0.66rem] tracking-wide text-white border border-white/10">ST. THOMAS · 2018–24</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sportsCerts.map((c) => (
                  <button key={c.image} onClick={() => setLightbox(c.image)} className="group overflow-hidden rounded-[16px] border border-white/12 bg-[#FAF7F0] text-left hover:border-[#C89B3C]/30 transition-colors">
                    <div className="p-2">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-white">
                        <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-600" />
                        <span className="absolute left-2 top-2 rounded-full bg-[#0F1F3D] px-2 py-1 font-mono text-[0.56rem] font-bold tracking-wide text-[#C89B3C]">{c.label}</span>
                        <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white border border-[#C89B3C]/15 text-[#7A263A] text-[0.68rem]">↗</span>
                      </div>
                    </div>
                    <div className="px-4 pb-3">
                      <h4 className="font-mono text-[0.70rem] font-bold tracking-wide text-[#0F1F3D]">{c.name.replace('Sports Certificate — ', 'Certificate ')}</h4>
                      <p className="font-mono text-[0.62rem] text-[#756F65]">Tap to enlarge · {c.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {show('certs') && (
          <section id="archive-certs" className="mt-12 scroll-mt-[120px]">
            <div className="rounded-[18px] border border-[#C89B3C]/15 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#0F1F3D] pb-4">
                <div>
                  <span className="font-mono text-[0.72rem] font-bold tracking-[0.14em] text-[#C89B3C]">03 / VAULT — TECH</span>
                  <h2 className="font-serif text-[1.7rem] font-extrabold leading-none">CERTIFICATIONS</h2>
                  <p className="mt-1 font-mono text-[0.68rem] text-[#756F65]">{certs.length} credentials — tap any to open full image</p>
                </div>
                <span className="rounded-full bg-[#0F1F3D] px-3 py-1.5 font-mono text-[0.66rem] tracking-wide text-[#FAF7F0]">{certs.length} VAULT</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certs.map((c: any) => (
                  <a key={c.name} href={c.image} target="_blank" rel="noopener" className="group overflow-hidden rounded-[16px] border border-[#C89B3C]/12 bg-[#FAF7F0] hover:border-[#C89B3C]/30 hover:shadow-[0_12px_28px_rgba(15,31,61,0.08)] transition-all flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-white border-b border-[#C89B3C]/10">
                      <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" />
                      <span className="absolute left-3 top-3 rounded-full bg-[#0F1F3D] px-2.5 py-1 font-mono text-[0.60rem] font-bold tracking-wide text-[#FAF7F0]">{c.year || '2025'}</span>
                      <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white border border-[#C89B3C]/15 text-[#1d9a5a] text-[0.68rem]">✓</span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="font-sans text-[0.88rem] font-bold leading-tight text-[#0F1F3D] line-clamp-2">{c.name}</h4>
                      <p className="mt-1 font-mono text-[0.66rem] tracking-wide text-[#756F65]">{c.issuer}</p>
                      <span className="mt-3 inline-flex w-fit rounded-full border border-[#C89B3C]/15 bg-white px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-[#C89B3C]">View ↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* HACKATHONS */}
        {show('hacks') && (
          <section id="archive-hacks" className="mt-12 scroll-mt-[120px] mb-10">
            <div className="rounded-[18px] border border-[rgba(200,155,60,0.14)] bg-[#0F1F3D] p-5 sm:p-6 text-[#FAF7F0]">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/12 pb-4">
                <div>
                  <span className="font-mono text-[0.72rem] font-bold tracking-[0.14em] text-[#C89B3C]">04 / HACKATHONS LED</span>
                  <h2 className="font-serif text-[1.7rem] font-extrabold leading-none">HACKATHONS</h2>
                  <p className="mt-1 font-mono text-[0.68rem] text-[#F3E8D0]/70">Six national stages — team lead, ship fast, learn faster.</p>
                </div>
                <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[0.66rem] tracking-wide text-[#FAF7F0]/80">6 × NATIONAL · LEADER</span>
              </div>
              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                {hacks.map((h: any, i: number) => (
                  <article key={h.name} className="overflow-hidden rounded-[16px] border border-white/10 bg-[#162E4D] flex flex-col md:flex-row">
                    <div className="relative w-full md:w-[42%] shrink-0 bg-[#0F1F3D] overflow-hidden">
                      <img src={h.image} alt={h.name} loading="lazy" className="h-[240px] md:h-full w-full object-cover object-top" />
                      {h.badge && <span className="absolute left-3 top-3 rounded-full bg-[#C89B3C] px-2.5 py-1 font-mono text-[0.60rem] font-bold tracking-wide text-[#0F1F3D]">◆ {h.badge}</span>}
                      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur border border-white/15 px-2.5 py-1 font-mono text-[0.60rem] font-bold text-white/90">0{i + 1} · {h.role.split('—')[0].trim()}</span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <span className="font-mono text-[0.64rem] tracking-wide text-[#C89B3C]">0{i + 1} · {h.role}</span>
                      <h3 className="mt-1 font-serif text-[1.15rem] font-extrabold leading-tight">{h.name}</h3>
                      <p className="font-mono text-[0.68rem] text-white/60 mt-1">{h.org}</p>
                      <p className="font-mono text-[0.66rem] text-white/50 mt-2">{h.venue} · {h.date}</p>
                      {h.project && <p className="font-mono text-[0.70rem] font-bold text-[#C89B3C] mt-2">Project: {h.project}</p>}
                      <p className="mt-3 text-[0.82rem] leading-relaxed text-white/70">{h.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                        {(h.tags ?? []).map((t: string) => <span key={t} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-[0.62rem] text-white/70">{t}</span>)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PHOTOGRAPHY */}
        {show('photo') && (
          <section id="archive-photo" className="mt-12 scroll-mt-[120px] mb-2">
            <div className="rounded-[18px] border border-[#C89B3C]/15 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#0F1F3D] pb-4">
                <div>
                  <span className="font-mono text-[0.72rem] font-bold tracking-[0.14em] text-[#C89B3C]">05 / PHOTOGRAPHY</span>
                  <h2 className="font-serif text-[1.7rem] font-extrabold leading-none">THROUGH MY LENS</h2>
                  <p className="mt-1 font-mono text-[0.68rem] text-[#756F65]">15 frames A–O · masonry archive · includes L — Golden hour capture</p>
                </div>
                <Link to="/photography" className="rounded-full bg-[#0F1F3D] px-4 py-2 font-mono text-[0.70rem] font-bold tracking-wide text-[#FAF7F0] hover:bg-[#162E4D]">Open gallery →</Link>
              </div>
              <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'].map(id => (
                  <Link key={id} to="/photography" className="group relative overflow-hidden rounded-xl border border-[rgba(200,155,60,0.12)] bg-[#0F1F3D] aspect-[4/3] grid place-items-center hover:border-[#C89B3C]/30 transition-colors">
                    <img src={`/images/photography/${id}.${id==='B'||id==='F'?'jpg':'jpeg'}`} alt={id} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                    <span className="absolute left-2 top-2 font-serif text-[1.2rem] leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{id}</span>
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </Link>
                ))}
              </div>
              <p className="mt-3 text-center font-mono text-[0.66rem] text-[#756F65]">Tap any frame → full /photography masonry with lightbox</p>
            </div>
          </section>
        )}

        <div className="mt-8 flex justify-center">
          <Link to="/" className="rounded-full bg-[#0F1F3D] px-6 py-2.5 font-mono text-[0.72rem] font-bold tracking-wide text-[#FAF7F0] hover:bg-[#162E4D] transition-colors">← Back to portfolio</Link>
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#0F1F3D]/80 backdrop-blur-[6px] p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-h-[92vh] max-w-[96vw] overflow-hidden rounded-[18px] bg-[#FAF7F0] p-2 sm:p-3" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="Certificate" className="max-h-[84vh] max-w-[92vw] object-contain rounded-[10px] bg-white" />
            <button onClick={() => setLightbox(null)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-[#0F1F3D] text-white hover:bg-[#7A263A]">✕</button>
            <div className="flex items-center justify-between gap-3 px-1 pt-2">
              <span className="font-mono text-[0.66rem] text-[#756F65]">click outside to close</span>
              <a href={lightbox} target="_blank" rel="noopener" className="rounded-full bg-[#C89B3C] px-4 py-1.5 font-mono text-[0.70rem] font-bold text-[#0F1F3D]">Open original ↗</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
