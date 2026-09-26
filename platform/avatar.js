/* ============================================================
   <cb-avatar> — avatarul dinamic al platformei Cyber-Bridge Range
   Dynamic avatar for the Cyber-Bridge Range training site

   Un cap stilizat, fără trăsături faciale, cu căști: prezența care
   ascultă și răspunde. Nu are ochi sau gură, ca să rămână o prezență
   profesională, nu o mascotă, și să nu cadă în uncanny valley.

   Utilizare / usage:
     <script src="avatar.js"></script>
     <cb-avatar state="idle"></cb-avatar>

   Atribute / attributes:
     state    idle | listening | thinking | speaking | alert
     palette  brand (implicit) | aurora | range
     track    dacă e prezent, capul urmărește discret cursorul
     static   fără animație (pentru capturi, e-mail, print)

   API:
     el.state = "speaking"      schimbă starea
     el.pulse(0..1)             un impuls de voce (ex. la fiecare fragment de text)

   Totul se oprește la prefers-reduced-motion.
   ============================================================ */
(function(){
  if(customElements.get("cb-avatar"))return;
  let N=0;
  const STATES=["idle","listening","thinking","speaking","alert"];
  const RM=window.matchMedia("(prefers-reduced-motion: reduce)");

  const CSS=`
  :host{display:inline-block;width:160px;aspect-ratio:1;position:relative;vertical-align:middle;
    /* paleta brand: albastrul Cyber-Bridge spre violet și piersică */
    --a1:#3B82F6;--a2:#8B5CF6;--a3:#F0ABFC;--a4:#FDBA74;--a5:#67E8F9;
    --skin1:#E9E3FF;--skin2:#C4B5FD;--glow:#8B5CF6;--band:#FFFFFF}
  :host([palette="aurora"]){--a1:#A78BFA;--a2:#F472B6;--a3:#FBCFE8;--a4:#FDBA74;--a5:#7DD3FC;
    --skin1:#FCE7F3;--skin2:#E9D5FF;--glow:#F472B6}
  :host([palette="range"]){--a1:#22D3EE;--a2:#6366F1;--a3:#A5B4FC;--a4:#38BDF8;--a5:#2DD4BF;
    --skin1:#C7D2FE;--skin2:#6366F1;--glow:#22D3EE}
  :host([state="alert"]){--a1:#F97316;--a2:#EF4444;--a3:#FDA4AF;--a4:#FBBF24;--a5:#FB7185;
    --skin1:#FFE4E6;--skin2:#FDA4AF;--glow:#EF4444}
  svg{width:100%;height:100%;display:block;overflow:visible}
  stop{transition:stop-color .7s ease}
  .s1{stop-color:var(--a1)}.s2{stop-color:var(--a2)}.s3{stop-color:var(--a3)}
  .s4{stop-color:var(--a4)}.s5{stop-color:var(--a5)}
  .k1{stop-color:var(--skin1)}.k2{stop-color:var(--skin2)}
  .g0{stop-color:var(--glow)}
  .wave{fill:none;stroke:var(--a2);stroke-linecap:round;opacity:0}
  .orb{fill:var(--a5)}
  .led{fill:var(--a5);transition:fill .7s}
  :host([state="alert"]) .led{fill:#FFF1F2}
  `;

  // Geometrie: cap din profil, privind spre dreapta, ca în afișele de tip „AI summit”.
  const HEAD="M92 198 C88 178 70 168 62 148 C46 112 56 62 98 41 C140 20 188 44 190 92 "
            +"C191 111 185 123 187 134 C189 149 177 161 162 163 C150 165 142 171 140 184 L141 198 Z";
  const BODY="M14 240 C24 206 64 190 96 194 L140 194 C178 194 218 210 230 240 Z";

  class CbAvatar extends HTMLElement{
    static get observedAttributes(){return ["state","static"];}
    constructor(){
      super();
      const id="cbav"+(++N);this._id=id;
      const r=this.attachShadow({mode:"open"});
      r.innerHTML=`<style>${CSS}</style>
<svg viewBox="0 0 240 240" part="svg" aria-hidden="true">
 <defs>
  <radialGradient id="${id}glow" cx="50%" cy="50%" r="50%">
   <stop offset="0" class="g0" stop-opacity=".55"/><stop offset="1" class="g0" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="${id}iri" gradientUnits="userSpaceOnUse" x1="40" y1="30" x2="200" y2="210">
   <stop offset="0" class="s5"/><stop offset=".28" class="s1"/><stop offset=".55" class="s2"/>
   <stop offset=".8" class="s3"/><stop offset="1" class="s4"/>
  </linearGradient>
  <radialGradient id="${id}skin" gradientUnits="userSpaceOnUse" cx="150" cy="80" r="150">
   <stop offset="0" stop-color="#FFFFFF"/><stop offset=".35" class="k1"/><stop offset="1" class="k2"/>
  </radialGradient>
  <linearGradient id="${id}body" x1="0" y1="0" x2="1" y2="1">
   <stop offset="0" class="s1" stop-opacity=".9"/><stop offset=".5" class="s3" stop-opacity=".85"/>
   <stop offset="1" class="s4" stop-opacity=".9"/>
  </linearGradient>
  <radialGradient id="${id}cup" cx="38%" cy="32%" r="75%">
   <stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" class="s3"/><stop offset="1" class="s2"/>
  </radialGradient>
  <clipPath id="${id}clip"><path d="${HEAD}"/></clipPath>
  <filter id="${id}soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
 </defs>

 <circle class="halo" cx="122" cy="112" r="112" fill="url(#${id}glow)"/>
 <g class="orbits"></g>

 <path class="body" d="${BODY}" fill="url(#${id}body)"/>
 <path d="M60 240 C70 212 92 202 112 204" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>

 <g class="head">
  <path d="${HEAD}" fill="url(#${id}skin)"/>
  <g clip-path="url(#${id}clip)">
   <path class="iri" d="${HEAD}" fill="url(#${id}iri)" opacity=".62"/>
   <ellipse cx="148" cy="66" rx="40" ry="24" fill="#fff" opacity=".55" filter="url(#${id}soft)"/>
   <ellipse cx="70" cy="150" rx="30" ry="42" class="led" opacity=".35" filter="url(#${id}soft)"/>
  </g>
  <path d="${HEAD}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/>

  <!-- căștile: arcul peste cap, apoi cupa pe ureche -->
  <path d="M112 92 C100 48 122 18 160 22" fill="none" stroke="url(#${id}iri)" stroke-width="11" stroke-linecap="round"/>
  <path d="M112 92 C100 48 122 18 160 22" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="110" cy="120" rx="30" ry="34" fill="url(#${id}iri)"/>
  <ellipse cx="113" cy="119" rx="24" ry="28" fill="url(#${id}cup)"/>
  <ellipse class="led" cx="113" cy="119" rx="7" ry="8" opacity=".9"/>
  <ellipse cx="104" cy="106" rx="9" ry="6" fill="#fff" opacity=".7"/>
 </g>

 <g class="waves" transform="translate(196 128)">
  <path class="wave" d="M0 -14 A18 18 0 0 1 0 14" stroke-width="3"/>
  <path class="wave" d="M8 -24 A30 30 0 0 1 8 24" stroke-width="3"/>
  <path class="wave" d="M16 -34 A42 42 0 0 1 16 34" stroke-width="3"/>
 </g>
</svg>`;
      const q=s=>r.querySelector(s);
      this._el={head:q(".head"),halo:q(".halo"),iriG:r.getElementById(id+"iri"),
        iri:q(".iri"),waves:[...r.querySelectorAll(".wave")],orbits:q(".orbits")};
      // particulele care orbitează în starea „thinking”
      const ns="http://www.w3.org/2000/svg";
      this._orbs=[0,1,2,3].map(()=>{const c=document.createElementNS(ns,"circle");
        c.setAttribute("class","orb");c.setAttribute("r","4");c.setAttribute("opacity","0");
        this._el.orbits.appendChild(c);return c;});
      this._lvl=0;this._tilt=0;this._tiltT=0;this._mix={think:0,speak:0,listen:0};
      this._tick=this._tick.bind(this);
      this._onMove=e=>{const b=this.getBoundingClientRect();
        const dx=(e.clientX-(b.left+b.width/2))/Math.max(300,innerWidth/2);
        const dy=(e.clientY-(b.top+b.height/2))/Math.max(300,innerHeight/2);
        this._tiltT=Math.max(-1,Math.min(1,dx))*4+Math.max(-1,Math.min(1,dy))*3;};
    }
    get state(){const s=this.getAttribute("state");return STATES.includes(s)?s:"idle";}
    set state(v){this.setAttribute("state",v);}
    pulse(v){this._lvl=Math.min(1,Math.max(this._lvl,v==null?.9:v));}
    connectedCallback(){
      if(!this.hasAttribute("role"))this.setAttribute("role","img");
      this._label();
      if(this.hasAttribute("track"))addEventListener("pointermove",this._onMove,{passive:true});
      this._run=true;this._raf=requestAnimationFrame(this._tick);
    }
    disconnectedCallback(){this._run=false;cancelAnimationFrame(this._raf);removeEventListener("pointermove",this._onMove);}
    attributeChangedCallback(){this._label();}
    _label(){
      if(this.hasAttribute("aria-hidden"))return;
      const ro=(document.documentElement.lang||"ro").startsWith("ro");
      const m=ro?{idle:"în așteptare",listening:"ascultă",thinking:"se gândește",speaking:"vorbește",alert:"alertă"}
                :{idle:"idle",listening:"listening",thinking:"thinking",speaking:"speaking",alert:"alert"};
      this.setAttribute("aria-label",(ro?"Facilitator, ":"Facilitator, ")+m[this.state]);
    }
    _tick(now){
      if(!this._run)return;
      const still=RM.matches||this.hasAttribute("static");
      const t=still?0:now/1000,st=this.state,E=this._el,m=this._mix;
      // tranziții line între stări, nu salturi
      const ease=(k,on)=>m[k]+=((on?1:0)-m[k])*.08;
      ease("think",st==="thinking");ease("speak",st==="speaking");ease("listen",st==="listening");
      const alert=st==="alert";

      // respirația capului și înclinarea spre cursor
      this._tilt+=(this._tiltT-this._tilt)*.06;
      const bob=Math.sin(t*1.1)*1.6, nod=m.speak*Math.sin(t*5.2)*1.2*(.4+this._lvl);
      const tilt=this._tilt+m.listen*-3+m.think*Math.sin(t*.9)*2;
      E.head.setAttribute("transform",`translate(0 ${(bob+nod).toFixed(2)}) rotate(${tilt.toFixed(2)} 120 190)`);

      // degradeul irizat curge prin cap; mai repede când gândește
      const flow=t*(12+m.think*40+(alert?30:0));
      E.iriG.setAttribute("gradientTransform",`rotate(${(flow%360).toFixed(1)} 120 120)`);
      E.iri.setAttribute("opacity",(.55+Math.sin(t*.7)*.08+m.think*.15).toFixed(3));

      // halo: respiră lent, bate în alertă, urcă cu vocea
      let h=.75+Math.sin(t*1.3)*.08;
      if(alert)h=.8+Math.abs(Math.sin(t*3.4))*.3;
      h+=m.speak*this._lvl*.35+m.listen*.1;
      E.halo.setAttribute("transform",`translate(122 112) scale(${h.toFixed(3)}) translate(-122 -112)`);

      // vorbirea: undele pleacă din fața capului, cu amplitudinea vocii
      if(m.speak>.01&&!still){
        // fără semnal real de voce, o amplitudine plauzibilă, ca vorbirea să nu pară mecanică
        const synth=.35+.35*Math.abs(Math.sin(t*7.3)*Math.sin(t*3.1+1));
        this._lvl=Math.max(this._lvl*.92,synth*m.speak);
      }else this._lvl*=.9;
      E.waves.forEach((w,i)=>{
        const ph=((t*1.6+i/3)%1);
        const a=m.speak*(1-ph)*(.35+this._lvl*.9);
        w.setAttribute("opacity",Math.max(0,a).toFixed(3));
        w.setAttribute("transform",`scale(${(.8+ph*.5).toFixed(3)})`);
      });

      // gândirea: particule care orbitează capul
      this._orbs.forEach((o,i)=>{
        const a=t*1.8+i*Math.PI/2;
        o.setAttribute("cx",(122+Math.cos(a)*104).toFixed(1));
        o.setAttribute("cy",(112+Math.sin(a)*40-20).toFixed(1));
        o.setAttribute("opacity",(m.think*(.45+.45*Math.sin(a))).toFixed(3));
      });

      this._raf=requestAnimationFrame(this._tick);
    }
  }
  customElements.define("cb-avatar",CbAvatar);
})();
