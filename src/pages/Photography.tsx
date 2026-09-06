import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { NavbarEditorial } from '@/components/editorial/NavbarEditorial';

type PhotoItem = { id: string; img: string; height: number; alt: string };
const items: PhotoItem[] = [
  { id: 'A', img: '/images/photography/A.jpeg', height: 520, alt: 'Moon night sky' },
  { id: 'B', img: '/images/photography/B.jpg', height: 680, alt: 'Street lamp at dusk' },
  { id: 'C', img: '/images/photography/C.jpeg', height: 520, alt: 'River ghat evening' },
  { id: 'D', img: '/images/photography/D.jpeg', height: 640, alt: 'Park street lamps at night' },
  { id: 'E', img: '/images/photography/E.jpeg', height: 720, alt: 'Basketball hoop under sky' },
  { id: 'F', img: '/images/photography/F.jpg', height: 620, alt: 'Palm street lamp night' },
  { id: 'G', img: '/images/photography/G.jpeg', height: 680, alt: 'Moon through branches' },
  { id: 'H', img: '/images/photography/H.jpeg', height: 580, alt: 'City lights reflections' },
  { id: 'I', img: '/images/photography/I.jpeg', height: 720, alt: 'Evening skyline' },
  { id: 'J', img: '/images/photography/J.jpeg', height: 620, alt: 'Street perspective' },
  { id: 'K', img: '/images/photography/K.jpeg', height: 700, alt: 'Night architecture' },
  { id: 'L', img: '/images/photography/L.jpeg', height: 640, alt: 'Golden hour capture' },
  { id: 'M', img: '/images/photography/M.jpeg', height: 680, alt: 'Urban frame' },
  { id: 'N', img: '/images/photography/N.jpeg', height: 600, alt: 'Light trails' },
  { id: 'O', img: '/images/photography/O.jpeg', height: 700, alt: 'Quiet night' },
];

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  };
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
};

export default function Photography() {
  const columns = useMedia(['(min-width:1280px)', '(min-width:900px)', '(min-width:600px)', '(min-width:400px)'], [4, 4, 3, 2], 1);
  const [containerRef, { width }] = useMeasure();
  const sectionRef = useRef<HTMLElement>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<PhotoItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(items.map((it) => new Promise<{id:string; ratio:number}>((resolve)=>{
      const img=new Image(); img.src=it.img;
      const done=()=>{ const r= img.naturalWidth ? img.naturalHeight/img.naturalWidth : it.height/400; resolve({id:it.id, ratio:r});};
      img.onload=done; img.onerror=()=>resolve({id:it.id, ratio: it.height/400});
    }))).then(arr=>{
      if(cancelled) return;
      const map:Record<string,number>={};
      arr.forEach(({id,ratio})=>{ map[id]= Math.min(1.65, Math.max(0.85, ratio));});
      setRatios(map); setImagesReady(true);
    });
    return ()=>{cancelled=true;};
  }, []);

  useEffect(()=>{ if(!selected) return; const onKey=(e:KeyboardEvent)=> e.key==='Escape'&&setSelected(null); window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);},[selected]);

  const grid = useMemo(()=>{
    if(!width) return [];
    const colHeights=new Array(columns).fill(0);
    const columnWidth=width/columns;
    return items.map((child)=>{
      const col=colHeights.indexOf(Math.min(...colHeights));
      const x=columnWidth*col;
      const ratio=ratios[child.id] ?? child.height/400;
      const h=columnWidth*ratio;
      const y=colHeights[col];
      colHeights[col]+=h+12;
      return {...child, x,y,w:columnWidth,h};
    });
  },[columns,width,ratios]);

  const containerHeight = useMemo(()=> !grid.length? 520: Math.max(...grid.map(g=>g.y+g.h)),[grid]);

  useEffect(()=>{ if(!grid.length||!imagesReady) return; const t=setTimeout(()=>ScrollTrigger.refresh(),120); return ()=>clearTimeout(t);},[grid,imagesReady]);

  useLayoutEffect(()=>{
    if(!sectionRef.current||!grid.length||!imagesReady) return;
    const ctx=gsap.context(()=>{
      grid.forEach(item=>{ gsap.set(`[data-key="${item.id}"]`,{x:item.x,y:item.y,width:item.w,height:item.h});});
      ScrollTrigger.batch('[data-masonry-card]',{
        onEnter:(batch)=> gsap.fromTo(batch,{y:48,opacity:0,filter:'blur(6px)',scale:0.96},{y:0,opacity:1,filter:'blur(0px)',scale:1,duration:0.85,ease:'power3.out',stagger:0.07,overwrite:'auto'}),
        start:'top 92%', end:'bottom 10%'
      });
      gsap.set('[data-masonry-card]',{y:48,opacity:0,filter:'blur(6px)'});
      ScrollTrigger.refresh();
    },sectionRef);
    return ()=>ctx.revert();
  },[grid,imagesReady]);

  useLayoutEffect(()=>{ if(!grid.length) return; grid.forEach(item=>{ gsap.to(`[data-key="${item.id}"]`,{x:item.x,y:item.y,width:item.w,height:item.h,duration:0.5,ease:'power3.out',overwrite:'auto'});});},[grid]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#0F1F3D]">
      <NavbarEditorial />
      <section ref={sectionRef} className="mx-auto max-w-[1400px] px-[4vw] pt-[96px] pb-10">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#0F1F3D] pb-5">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-[#C89B3C]/20 bg-white px-3.5 py-1.5 font-mono text-[0.70rem] font-bold tracking-wide text-[#0F1F3D] hover:border-[#C89B3C]/40">← Back to portfolio</Link>
            <h1 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-none">THROUGH <span className="text-[#C89B3C]">MY</span> LENS <span className="align-super font-mono text-[0.72rem] font-bold tracking-wide text-[#756F65] border border-[#C89B3C]/15 bg-white px-2 py-1 rounded-full ml-2">15 FRAMES A–O</span></h1>
            <p className="mt-2 max-w-[60rem] font-mono text-[0.72rem] tracking-wide text-[#756F65]">Full masonry archive — includes Golden hour capture (L) · every frame finds its place · tap any to view full</p>
          </div>
          <Link to="/archive" className="self-end hidden sm:inline-flex rounded-full bg-[#0F1F3D] px-4 py-2 font-mono text-[0.70rem] font-bold tracking-wide text-[#FAF7F0] hover:bg-[#162E4D]">Open vault →</Link>
        </div>

        <div ref={containerRef} className="relative mt-8 w-full overflow-hidden rounded-[20px] border border-[rgba(200,155,60,0.14)] bg-white/60 shadow-[0_16px_48px_rgba(15,31,61,0.08)] p-2 sm:p-3" style={{height: containerHeight}}>
          {!imagesReady && <div className="absolute inset-0 grid place-items-center font-mono text-xs tracking-wide text-[#756F65]">Loading frames…</div>}
          {grid.map((item)=>(
            <div key={item.id} data-key={item.id} className="absolute top-0 left-0 p-[6px] will-change-transform" style={{width:item.w, height:item.h}}>
              <div data-masonry-card className="group relative h-full w-full overflow-hidden rounded-xl border border-[rgba(200,155,60,0.12)] bg-[#0F1F3D] shadow-[0_8px_24px_rgba(15,31,61,0.12)] cursor-pointer hover:border-[rgba(200,155,60,0.28)] hover:shadow-[0_14px_36px_rgba(15,31,61,0.18)] transition-[border-color,box-shadow] duration-300 will-change-transform" onClick={()=>setSelected(item)} tabIndex={0} role="button" aria-label={`View ${item.id}: ${item.alt}`} onKeyDown={(e)=> e.key==='Enter'&&setSelected(item)}>
                <img src={item.img} alt={item.alt} loading="lazy" draggable={false} className="h-full w-full object-cover object-center" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45 opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="pointer-events-none absolute left-3 top-2 font-serif text-[clamp(18px,3vw,26px)] leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{item.id}</span>
                <span className="pointer-events-none absolute bottom-2 left-3 right-3 font-mono text-[0.58rem] tracking-wide text-white/88 line-clamp-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">{item.alt}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[0.68rem] tracking-wide text-[#756F65]/80">All 15 frames A–O · scroll slowly — frames rise as they enter view</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="rounded-full bg-[#0F1F3D] px-6 py-2.5 font-mono text-[0.72rem] font-bold tracking-wide text-[#FAF7F0] hover:bg-[#162E4D]">← Back to portfolio</Link>
          <Link to="/archive" className="rounded-full border border-[#C89B3C]/20 bg-white px-6 py-2.5 font-mono text-[0.72rem] font-bold tracking-wide text-[#0F1F3D] hover:border-[#C89B3C]/40">Vault archive →</Link>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-[#0F1F3D]/70 backdrop-blur-[2px]" onClick={()=>setSelected(null)} role="dialog" aria-modal="true">
          <div className="relative max-h-[86vh] w-full max-w-[720px] overflow-hidden rounded-2xl bg-black shadow-[0_28px_80px_rgba(0,0,0,0.55)]" onClick={e=>e.stopPropagation()}>
            <img src={selected.img} alt={selected.alt} className="block h-auto max-h-[72vh] w-full object-contain" draggable={false} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 py-4">
              <span className="font-serif text-2xl text-white">{selected.id}</span>
              <span className="ml-3 font-mono text-xs tracking-wide text-white/80">{selected.alt}</span>
            </div>
            <button onClick={()=>setSelected(null)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur hover:bg-white hover:text-black" aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
