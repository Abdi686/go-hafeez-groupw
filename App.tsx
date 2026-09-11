import { useState } from "react";
import { ArrowRight, Menu, X, CheckCircle, Clock, Tag, ChevronLeft } from "lucide-react";
import brandLogos from "../imports/Brand_Logos.png";
import { blogs, type Blog } from "./blogs";

type ServiceType = "ride" | "cater" | "consult";
type Page = "home" | "about" | "blog" | "post";

const ORANGE = "#F07322";
const TEAL = "#1B9CC4";
const DARK = "#0f1923";
const STORM = "#1a1112";

const services: Record<ServiceType, {
  tag: string; headline: string; body: string; features: string[];
  stat: string; statLabel: string; imgSrc: string; imgAlt: string; badge: string; color: string;
}> = {
  ride: {
    tag: "Transit Logistics",
    headline: "Dedicated shift-transit, mapped to your hub.",
    body: "A fleet of 30 specialist minibuses running geofenced routes timed precisely to parcel-hub start times. Every driver holds a current CPC certificate and completes a digital circle check before departure.",
    features: ["DVSA O-Licence active", "2-min dispatch SOP", "Live GPS tracking", "6-week PMI schedule"],
    stat: "100%", statLabel: "On-time SLA",
    imgSrc: "https://images.unsplash.com/photo-1535655685871-dc8158ff167e?w=900&h=500&fit=crop&auto=format",
    imgAlt: "Go Ride white Mercedes Sprinter shuttle van",
    badge: "30 vehicles · DVSA licensed", color: ORANGE,
  },
  cater: {
    tag: "Kitchen Operations",
    headline: "Volume dining scaled to your headcount.",
    body: "Our kitchen teams receive the inbound passenger manifest from Go Ride and calibrate portions in real time — keeping food costs hard below 30% while hitting FSA 5-star hygiene targets.",
    features: ["FSA 5-star EHO target", "Twice-daily HACCP logs", "14-allergen separation", "≤ 5% waste cap"],
    stat: "4.2%", statLabel: "Average waste",
    imgSrc: "https://images.unsplash.com/photo-1666479258732-5ea17469b610?w=900&h=500&fit=crop&auto=format",
    imgAlt: "Go Cater professional kitchen chef",
    badge: "FSA 5-star · HACCP daily", color: TEAL,
  },
  consult: {
    tag: "Corporate Advisory",
    headline: "Operational blueprints that actually get built.",
    body: "We audit workflows, close turnover leaks, and design multi-entity synchronisation engines. Every engagement delivers a costed SOP your ops team can run from day one.",
    features: ["Turnover reduction models", "SOP design & mapping", "Regulatory frameworks", "OpEx audits"],
    stat: "+18%", statLabel: "Avg efficiency gain",
    imgSrc: "https://images.unsplash.com/photo-1586528116022-aeda1613c63d?w=900&h=500&fit=crop&auto=format",
    imgAlt: "Warehouse logistics workers on site",
    badge: "ISO-configured frameworks", color: ORANGE,
  },
};

const menuItems = [
  { name: "Chicken Biryani", price: "£5.99", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=280&h=220&fit=crop&auto=format" },
  { name: "Lamb Biryani",    price: "£8.99", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=280&h=220&fit=crop&auto=format" },
  { name: "Butter Chicken",  price: "£7.49", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=280&h=220&fit=crop&auto=format" },
  { name: "Korma Curry",     price: "£6.99", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=280&h=220&fit=crop&auto=format" },
  { name: "Crispy Samosas",  price: "£3.49", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=280&h=220&fit=crop&auto=format" },
  { name: "Masala Chai",     price: "£2.49", img: "https://images.unsplash.com/photo-1561336526-2914f13ceb36?w=280&h=220&fit=crop&auto=format" },
];

type TimelineEvent = {
  year: string;
  era?: string;
  title: string;
  brand?: string;
  body: string;
  color: string;
  tags?: string[];
  side: "left" | "right";
};

const timeline: TimelineEvent[] = [
  {
    year: "Chapter I",
    era: "Where it all began",
    title: "A first job. A first love.",
    body: "It started with two jobs and a student who needed work. A shift at Burger King and part-time hours at a local baguette shop — nothing glamorous, nothing planned. But somewhere between the early starts and the busy service counters, something clicked. The energy of a kitchen under pressure. The satisfaction of food done well. A love affair with catering that would never leave.",
    color: ORANGE,
    tags: ["Burger King", "Baguette Shop", "The Beginning", "Birmingham"],
    side: "right",
  },
  {
    year: "Chapter II",
    era: "The entrepreneur awakens",
    title: "Sandwiches. Offices. A spark of something bigger.",
    body: "Working in those kitchens gave skill — but also vision. Walking past offices and business parks, the idea formed: these people needed proper food delivered to them. So deliveries began. Local businesses, office blocks, small companies across Birmingham — all served with fresh, well-made food. The customers loved it. The logic was clear: quality and convenience would always win.",
    color: TEAL,
    tags: ["Food Delivery", "Offices", "Local Businesses", "Birmingham"],
    side: "left",
  },
  {
    year: "Chapter III",
    era: "The rise",
    title: "Eat for Less. Birmingham city centre. A proper success.",
    body: "The delivery rounds led somewhere greater. Eat for Less opened in Birmingham city centre — and quickly became a beloved local destination. Proper food. Honest prices. It thrived. Buoyed by that success, the next move was bolder still: opening a brand new baguette shop on the Dudley Road. Another success. The blueprint was working. The confidence was building.",
    color: ORANGE,
    tags: ["Eat for Less", "Birmingham City Centre", "Dudley Road", "Baguette Shop"],
    side: "right",
  },
  {
    year: "2016",
    era: "The storm",
    title: "Everything stopped.",
    body: "2016 was not a chapter anyone would choose. The businesses that had been built with so much energy hit a wall. Struggle followed struggle — the kind of pressure that tests not just a business plan, but a person to their core. The decision was made to step back. To breathe. To stop. It felt like the end. It was not. It was the quiet before everything changed.",
    color: STORM,
    tags: ["2016", "Setback", "Reset", "Resilience"],
    side: "left",
  },
  {
    year: "2020",
    era: "The comeback",
    title: "Two people. A car park in Lichfield. A new beginning.",
    body: "Four years after stepping away, it started again — not with fanfare or a business plan, but with two people who needed a lift to a warehouse shift. From a car park outside a Tesco in Lichfield, the first runs went out. Workers heard there was a driver who actually showed up, who got you there on time. The phone started ringing. RHC was born — not in a boardroom, but on a dark morning at a car park, one quiet act of reliability at a time.",
    color: ORANGE,
    tags: ["2020", "Lichfield Tesco", "2 Passengers", "RHC Born"],
    side: "right",
  },
  {
    year: "The Rise",
    era: "Transport builds",
    title: "From two seats to full coaches. DHL. Evri. DPD.",
    body: "Every run completed on time built something that could not be faked: a reputation. Two passengers became a minibus. A minibus became a fleet. Lichfield became the Midlands. The Midlands became a network. The biggest names in UK parcel logistics — DHL, Evri, DPD — began trusting their workforce transport to a business that had started from a supermarket car park with two people and an unshakeable work ethic. RHC became Go Ride.",
    color: TEAL,
    tags: ["DHL", "Evri", "DPD", "Go Ride", "Full Fleet"],
    side: "left",
  },
  {
    year: "The Return",
    era: "Back to the kitchen",
    title: "The canteen opportunity. No hesitation.",
    body: "Running transport into warehouses every day made one thing impossible to ignore: the workers arriving had nowhere decent to eat. When the opportunity came to open a canteen inside an Evri hub, there was no hesitation. Within weeks, a fully fitted kitchen was operational — HACCP-compliant, allergen-controlled, serving hot food built for people doing physical work. It worked immediately. A second site followed. Then a third. Then a fourth.",
    color: ORANGE,
    tags: ["Evri Canteen", "4 Kitchens", "Food Vans", "HACCP"],
    side: "right",
  },
  {
    year: "Today →",
    era: "Go Cater · Go Ride · Go Hafeez Group",
    title: "B1 Professional Café becomes a group of canteens.",
    body: "What began as B1 Professional Café — a name built on pride in Birmingham's heritage — is now Go Cater: four fully fitted warehouse kitchens, food vans serving outdoor workers, and more warehouses coming on board. Go Ride covers DHL, Evri, and DPD. The group is not done. This story is still being written — one early morning, one served plate, one shift at a time.",
    color: TEAL,
    tags: ["Go Cater", "Go Ride", "B1 Professional Café", "4 Kitchens", "Go Hafeez Group"],
    side: "left",
  },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<ServiceType>("ride");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Blog | null>(null);

  const svc = services[active];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setModalOpen(true);
  }

  function navigate(p: Page) {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPost(blog: Blog) {
    setCurrentPost(blog);
    setPage("post");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const categoryColors: Record<string, string> = {
    Catering: TEAL,
    Transport: ORANGE,
    Productivity: "#7C3AED",
    Operations: "#059669",
    Compliance: "#DC2626",
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <img src={brandLogos} alt="Go Hafeez Group logos" className="h-10 w-auto object-contain object-left" />
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {page === "home" ? (
              <>
                <a href="#services" className="hover:text-foreground transition-colors">Services</a>
                <a href="#gocater" className="hover:text-foreground transition-colors">Go Cater</a>
                <a href="#compliance" className="hover:text-foreground transition-colors">Standards</a>
              </>
            ) : null}
            <button onClick={() => navigate(page === "about" ? "home" : "about")} className="hover:text-foreground transition-colors font-semibold" style={{ color: page === "about" ? ORANGE : undefined }}>
              Our Story
            </button>
            <button onClick={() => navigate("blog")} className="hover:text-foreground transition-colors font-semibold" style={{ color: page === "blog" || page === "post" ? ORANGE : undefined }}>
              Blog
            </button>
            <a href="#contact" onClick={() => page !== "home" && navigate("home")} className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          <a href="#contact" onClick={(e) => { if (page !== "home") { e.preventDefault(); navigate("home"); } }} className="hidden md:inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ background: ORANGE }}>
            Request a pilot <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-muted-foreground hover:text-foreground">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-6 py-5 space-y-4">
            <button onClick={() => navigate("home")} className="block text-sm font-medium text-foreground w-full text-left">Home</button>
            <button onClick={() => navigate("about")} className="block text-sm font-medium w-full text-left text-foreground">Our Story</button>
            <button onClick={() => navigate("blog")} className="block text-sm font-medium w-full text-left text-foreground">Blog</button>
            <a href="#contact" onClick={() => { setMenuOpen(false); if (page !== "home") navigate("home"); }} className="block w-full text-center text-white text-sm font-semibold py-2.5 rounded-lg mt-2" style={{ background: ORANGE }}>
              Request a pilot
            </a>
          </div>
        )}
      </header>

      {/* ── ABOUT PAGE ── */}
      {page === "about" && (
        <main>
          {/* About Hero */}
          <section className="relative overflow-hidden py-24 px-6" style={{ background: DARK }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${ORANGE} 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${TEAL} 0%, transparent 50%)` }} />
            <div className="max-w-4xl mx-auto relative z-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: ORANGE }}>A Birmingham story · Built from nothing</span>
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
                From a car park<br />
                <em className="not-italic" style={{ color: ORANGE }}>in Lichfield.</em>
              </h1>
              <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                This is not a story that starts with investment or a business plan. It starts with a first shift at Burger King, a love of catering that never left, a brutal setback in 2016, and two people who needed a lift to work in 2020. Everything else followed from that.
              </p>
            </div>
          </section>

          {/* Founder quote */}
          <section className="border-b border-border py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto flex gap-8 items-start">
              <div className="hidden sm:block flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-2xl" style={{ background: ORANGE }}>H</div>
              <div>
                <p className="text-xl font-medium text-foreground leading-relaxed mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                  "The catering was always there, waiting. The love of it never went anywhere. It just needed the right moment to come back — and when it did, nothing was going to stop it."
                </p>
                <p className="text-sm font-semibold" style={{ color: ORANGE }}>Founder, Go Hafeez Group</p>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-24 px-6 bg-background">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: TEAL }}>The journey</span>
                <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>The story behind the group</h2>
                <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">From a first shift behind a counter to a fleet of coaches and four warehouse kitchens. No shortcuts. No investors. Just graft.</p>
              </div>

              {/* Timeline spine */}
              <div className="relative">
                {/* Centre line */}
                <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 hidden md:block" style={{ background: `linear-gradient(to bottom, ${ORANGE}, ${TEAL}, ${ORANGE})` }} />

                <div className="space-y-16">
                  {timeline.map((ev, i) => (
                    <div key={i} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${ev.side === "right" ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Content card */}
                      <div className={`md:w-[calc(50%-2.5rem)] ${ev.side === "right" ? "md:pr-10" : "md:pl-10"}`}>
                        <div
                          className="rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow group"
                          style={ev.color === STORM
                            ? { background: STORM, border: `1px solid rgba(240,115,34,0.25)` }
                            : { background: "var(--card)", border: "1px solid var(--border)" }
                          }
                        >
                          {ev.era && (
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-3 block" style={{ color: ev.color === STORM ? "#F07322" : ev.color }}>
                              {ev.era}
                            </span>
                          )}
                          <h3
                            className="text-lg font-bold mb-3 leading-snug"
                            style={{ fontFamily: "'Fraunces', serif", color: ev.color === STORM ? "#fff" : "var(--foreground)" }}
                          >
                            {ev.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed mb-4"
                            style={{ color: ev.color === STORM ? "rgba(255,255,255,0.55)" : "var(--muted-foreground)" }}
                          >
                            {ev.body}
                          </p>
                          {ev.tags && (
                            <div className="flex flex-wrap gap-2">
                              {ev.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                                  style={ev.color === STORM
                                    ? { color: ORANGE, borderColor: `${ORANGE}40`, background: `${ORANGE}12` }
                                    : { color: ev.color, borderColor: `${ev.color}30`, background: `${ev.color}0f` }
                                  }
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Year badge — centred on spine */}
                      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 flex-shrink-0 self-start md:self-auto">
                        <div
                          className="flex items-center justify-center w-20 h-20 rounded-full border-4 shadow-lg font-black text-sm text-center leading-tight"
                          style={{
                            background: ev.color === STORM ? STORM : ev.color,
                            borderColor: ev.color === STORM ? ORANGE : "var(--background)",
                            color: ev.color === STORM ? ORANGE : "#fff",
                          }}
                        >
                          {ev.year}
                        </div>
                      </div>

                      {/* Empty opposite side spacer */}
                      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Brand lineage chart */}
          <section className="border-t border-border py-20 px-6 bg-secondary">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center">
                <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: ORANGE }}>Brand lineage</span>
                <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>How the names evolved</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Catering lineage */}
                <div className="bg-card rounded-2xl border border-border p-7 space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ background: TEAL }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>Catering</span>
                  </div>
                  {[
                    { year: "Early", name: "Eat for Less", note: "Birmingham city centre — a popular local favourite" },
                    { year: "Then", name: "B1 Professional Café", note: "First warehouse canteen inside an Evri hub" },
                    { year: "Now", name: "Go Cater", note: "4 fully fitted kitchens · food vans · expanding" },
                  ].map((step, i, arr) => (
                    <div key={step.name} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0" style={{ background: TEAL }}>{step.year}</div>
                        {i < arr.length - 1 && <div className="w-0.5 h-8 mt-1" style={{ background: `${TEAL}30` }} />}
                      </div>
                      <div className="pt-1">
                        <p className="font-bold text-foreground text-sm">{step.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.note}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transport lineage */}
                <div className="bg-card rounded-2xl border border-border p-7 space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ background: ORANGE }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>Transport</span>
                  </div>
                  {[
                    { year: "2020", name: "2 people & a car", note: "Lichfield Tesco car park — the very first run" },
                    { year: "→", name: "RHC Transport", note: "Grew into a licensed fleet serving the Midlands" },
                    { year: "Now", name: "Go Ride", note: "DHL · Evri · DPD · DVSA O-Licence · Full fleet" },
                  ].map((step, i, arr) => (
                    <div key={step.name} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0" style={{ background: ORANGE }}>{step.year}</div>
                        {i < arr.length - 1 && <div className="w-0.5 h-8 mt-1" style={{ background: `${ORANGE}30` }} />}
                      </div>
                      <div className="pt-1">
                        <p className="font-bold text-foreground text-sm">{step.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-6 text-center" style={{ background: DARK }}>
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                The story is still being written.
              </h2>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                More warehouses. More kitchens. More routes. From a car park in Lichfield to wherever your operation is — if you want what Go Hafeez Group builds, the conversation starts here.
              </p>
              <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm" style={{ background: ORANGE }}>
                Back to services <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </main>
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <main>
          {/* Hero */}
          <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: TEAL }}>UK Enterprise Logistics</span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-8" style={{ fontFamily: "'Fraunces', serif" }}>
                Three pillars.{" "}
                <em className="not-italic" style={{ color: ORANGE }}>One</em>{" "}
                synchronized operation.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                Go Hafeez Group combines shift transit, site catering, and operational consultancy under a single coordinated framework — so your workforce arrives, eats, and performs without friction.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#services" className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity" style={{ background: ORANGE }}>
                  Explore services <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={() => navigate("about")} className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-secondary transition-colors text-sm">
                  Our story
                </button>
              </div>
            </div>

            {/* Hero image strip */}
            <div className="mt-16 grid grid-cols-3 gap-3">
              {[
                { src: "https://images.unsplash.com/photo-1535655685871-dc8158ff167e?w=600&h=400&fit=crop&auto=format", alt: "Go Ride shuttle van", label: "GO RIDE", sub: "Transit" },
                { src: "https://images.unsplash.com/photo-1666479258732-5ea17469b610?w=600&h=400&fit=crop&auto=format", alt: "Go Cater kitchen", label: "GO CATER", sub: "Catering" },
                { src: "https://images.unsplash.com/photo-1586528116022-aeda1613c63d?w=600&h=400&fit=crop&auto=format", alt: "Warehouse logistics", label: "GO CONSULT", sub: "Advisory" },
              ].map((img) => (
                <div key={img.label} className="relative rounded-2xl overflow-hidden h-44 bg-stone-200">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-black text-xs tracking-tight leading-none block">{img.label}</span>
                    <span className="text-white/60 text-[9px] uppercase tracking-widest">{img.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat strip */}
            <div className="mt-6 grid grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
              {[
                { value: "30", label: "Minibuses on route" },
                { value: "100%", label: "Driver SLA compliance" },
                { value: "≤ 5%", label: "Kitchen waste cap" },
              ].map((s) => (
                <div key={s.label} className="bg-background px-8 py-7">
                  <p className="text-3xl font-bold mb-1" style={{ fontFamily: "'Fraunces', serif", color: ORANGE }}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section id="services" className="bg-secondary border-y border-border py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-12">
                <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: TEAL }}>Our entities</span>
                <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>What we do</h2>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {(["ride", "cater", "consult"] as ServiceType[]).map((key) => {
                  const labels = { ride: "Go Ride", cater: "Go Cater", consult: "Go Consult" };
                  const isActive = active === key;
                  return (
                    <button key={key} onClick={() => setActive(key)} className="px-5 py-2 rounded-full text-sm font-semibold transition-all border"
                      style={isActive ? { background: ORANGE, color: "#fff", borderColor: ORANGE } : { background: "#fff", color: "#6b7280", borderColor: "rgba(0,0,0,0.09)" }}>
                      {labels[key]}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden h-56 bg-stone-200">
                    <img src={svc.imgSrc} alt={svc.imgAlt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-xs" style={{ background: svc.color }}>H</div>
                      <div>
                        <span className="text-white font-black text-sm tracking-tight leading-none block">
                          {active === "ride" ? "GO RIDE" : active === "cater" ? "GO CATER" : "GO CONSULT"}
                        </span>
                        <span className="text-white/60 text-[9px] uppercase tracking-widest">{svc.tag}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white text-[10px] font-semibold">{svc.badge}</div>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-8 space-y-5">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: svc.color }}>{svc.tag}</span>
                    <h3 className="text-2xl font-bold text-foreground leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>{svc.headline}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{svc.body}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: svc.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="rounded-2xl p-8 text-white flex-1 flex flex-col justify-between" style={{ background: svc.color }}>
                    <p className="text-sm font-medium text-white/70">{svc.statLabel}</p>
                    <p className="text-6xl font-bold mt-2" style={{ fontFamily: "'Fraunces', serif" }}>{svc.stat}</p>
                    <p className="text-sm text-white/60 mt-4">Measured across active client deployments</p>
                  </div>
                  <div className="bg-card rounded-2xl border border-border p-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">UK Network</p>
                      <p className="text-sm font-semibold text-foreground">DPD · DHL · Major hubs</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Go Cater Display Board */}
          <section id="gocater" className="py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: ORANGE }}>On-site dining</span>
                <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>Go Cater — {"Today's Menu"}</h2>
                <p className="text-sm text-muted-foreground mt-2">Hot, fresh, allergen-labelled. Scaled to your shift headcount every day.</p>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: DARK }}>
                <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-3">
                    <img src={brandLogos} alt="Go Hafeez Group" className="h-8 w-auto object-contain object-left brightness-0 invert" />
                    <div className="h-5 w-px bg-white/20" />
                    <div>
                      <span className="font-black text-base tracking-tight leading-none block" style={{ color: ORANGE }}>GO CATER</span>
                      <span className="text-white/40 text-[9px] uppercase tracking-widest">Staff Dining</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: ORANGE }} />
                    <span className="text-xs font-semibold" style={{ color: ORANGE }}>Live Menu</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                  {menuItems.map((item) => (
                    <div key={item.name} className="relative overflow-hidden" style={{ background: DARK }}>
                      <div className="relative h-36 bg-stone-800">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-2 right-2 rounded-md px-2 py-0.5 text-xs font-black text-white" style={{ background: ORANGE }}>{item.price}</div>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-white text-sm font-semibold leading-snug">{item.name}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: TEAL }}>Freshly prepared · Allergens listed</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Portions scaled to shift manifest · HACCP verified · Hot hold ≥ 63°C</span>
                  <span className="text-[10px] font-semibold" style={{ color: TEAL }}>gohafeezgroup.co.uk</span>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance */}
          <section id="compliance" className="bg-secondary border-y border-border py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-12">
                <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: TEAL }}>Standards</span>
                <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>Audit-ready by design</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "DVSA O-Licence", color: ORANGE, body: "All Go Ride vehicles are PMI-tested every six weeks by certified mechanics. Driver hours and tachograph logs are audited continuously." },
                  { title: "FSA 5-Star EHO", color: TEAL, body: "Go Cater operates twice-daily HACCP logs, hot holds verified ≥ 63°C, cold holds ≤ 4°C, with full 14-allergen separation." },
                  { title: "Go Consult Certification", color: ORANGE, body: "Every advisory staff member is examined and certified through our internal framework before handling client deployment." },
                ].map((c) => (
                  <div key={c.title} className="border border-border rounded-2xl p-7 space-y-3 bg-card hover:shadow-md transition-shadow">
                    <div className="w-8 h-0.5 rounded-full" style={{ background: c.color }} />
                    <h4 className="font-semibold text-foreground">{c.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="py-20">
            <div className="max-w-2xl mx-auto px-6">
              <div className="mb-10 text-center">
                <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: ORANGE }}>Get started</span>
                <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Request a strategic pilot</h2>
                <p className="text-muted-foreground text-sm">{"We'll configure a trial shuttle route and kitchen service to prove the numbers on your site."}</p>
                <p className="text-muted-foreground text-sm mt-1">Or email us directly: <a href="mailto:info@gohafeezgroup.com" className="font-semibold hover:underline" style={{ color: ORANGE }}>info@gohafeezgroup.com</a></p>
              </div>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Full name</label>
                    <input required type="text" placeholder="Your name" className="w-full bg-input-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none transition" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Work email</label>
                    <input required type="email" placeholder="you@company.com" className="w-full bg-input-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none transition" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Hub location</label>
                  <input required type="text" placeholder="e.g. Birmingham Central Hub" className="w-full bg-input-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Workforce size</label>
                  <select className="w-full bg-input-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none transition">
                    <option>50 – 150 workers</option>
                    <option>150 – 500 workers</option>
                    <option>500 – 1,000 workers</option>
                    <option>1,000+ workers</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Additional context</label>
                  <textarea rows={3} placeholder="Shift patterns, current challenges, existing setup…" className="w-full bg-input-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none transition resize-none" />
                </div>
                <button type="submit" className="w-full text-white font-semibold py-3 rounded-lg text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2" style={{ background: ORANGE }}>
                  Submit request <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </section>
        </main>
      )}

      {/* ── BLOG LISTING PAGE ── */}
      {page === "blog" && (
        <main>
          <section className="py-20 px-6" style={{ background: DARK }}>
            <div className="max-w-4xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-widest block mb-4" style={{ color: ORANGE }}>Insights & Guides</span>
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                The Go Hafeez<br /><em className="not-italic" style={{ color: ORANGE }}>Knowledge Base</em>
              </h1>
              <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                Practical guides for warehouse and logistics operators on staff welfare, transport, canteen management, and operational efficiency.
              </p>
            </div>
          </section>

          <section className="py-16 px-6 bg-background">
            <div className="max-w-6xl mx-auto">
              {/* Featured post */}
              <div className="mb-12">
                <button onClick={() => openPost(blogs[0])} className="group w-full text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
                    <div className="relative h-64 lg:h-auto bg-stone-200">
                      <img src={blogs[0].hero} alt={blogs[0].heroAlt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                    </div>
                    <div className="bg-card p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white" style={{ background: categoryColors[blogs[0].category] ?? ORANGE }}>
                            {blogs[0].category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{blogs[0].readTime}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors" style={{ fontFamily: "'Fraunces', serif" }}>
                          {blogs[0].title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">{blogs[0].excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-6 text-sm font-semibold" style={{ color: ORANGE }}>
                        Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Blog grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.slice(1).map((blog) => (
                  <button key={blog.slug} onClick={() => openPost(blog)} className="group text-left bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-44 bg-stone-200">
                      <img src={blog.hero} alt={blog.heroAlt} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full text-white" style={{ background: categoryColors[blog.category] ?? ORANGE }}>
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />{blog.readTime}
                        <span className="mx-1">·</span>
                        {blog.date}
                      </div>
                      <h3 className="font-bold text-foreground leading-snug text-sm group-hover:text-primary transition-colors mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                        {blog.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{blog.excerpt}</p>
                      <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color: ORANGE }}>
                        Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ── BLOG POST PAGE ── */}
      {page === "post" && currentPost && (
        <main>
          {/* Hero */}
          <div className="relative h-72 sm:h-96 bg-stone-300 overflow-hidden">
            <img src={currentPost.hero} alt={currentPost.heroAlt} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <div className="max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white mb-4 inline-block" style={{ background: categoryColors[currentPost.category] ?? ORANGE }}>
                  {currentPost.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug mt-2" style={{ fontFamily: "'Fraunces', serif" }}>
                  {currentPost.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-10 pb-6 border-b border-border">
              <button onClick={() => navigate("blog")} className="flex items-center gap-1 font-semibold hover:text-foreground transition-colors" style={{ color: ORANGE }}>
                <ChevronLeft className="w-3.5 h-3.5" /> Back to Blog
              </button>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{currentPost.readTime}</span>
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{currentPost.date}</span>
            </div>

            {/* Lead */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-medium" style={{ fontFamily: "'Fraunces', serif" }}>
              {currentPost.excerpt}
            </p>

            {/* Sections */}
            <div className="space-y-10">
              {currentPost.body.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="text-2xl font-bold text-foreground mb-4 mt-2" style={{ fontFamily: "'Fraunces', serif" }}>
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-base text-foreground leading-[1.8] mb-4">{p}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2.5 my-4 pl-1">
                      {section.bullets.map((b, k) => (
                        <li key={k} className="flex items-start gap-3 text-sm text-foreground leading-relaxed">
                          <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* CTA banner */}
            <div className="mt-16 rounded-2xl p-8 text-white text-center" style={{ background: DARK }}>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Go Hafeez Group</p>
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif" }}>Ready to see this in practice?</h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>Request a no-obligation site visit and we will show you how Go Ride and Go Cater can be configured for your operation.</p>
              <button onClick={() => navigate("home")} className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm" style={{ background: ORANGE }}>
                Talk to us <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* More posts */}
            <div className="mt-16">
              <h3 className="text-lg font-bold text-foreground mb-6" style={{ fontFamily: "'Fraunces', serif" }}>More from the blog</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogs.filter((b) => b.slug !== currentPost.slug).slice(0, 2).map((blog) => (
                  <button key={blog.slug} onClick={() => openPost(blog)} className="group text-left bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-32 bg-stone-200">
                      <img src={blog.hero} alt={blog.heroAlt} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: categoryColors[blog.category] ?? ORANGE }}>{blog.category}</p>
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>{blog.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={brandLogos} alt="Go Hafeez Group" className="h-8 w-auto object-contain object-left" />
          <div className="flex gap-6 text-xs text-muted-foreground">
            <button onClick={() => navigate("about")} className="hover:text-foreground transition-colors">Our Story</button>
            <button onClick={() => navigate("blog")} className="hover:text-foreground transition-colors">Blog</button>
            <a href="#services" onClick={() => page !== "home" && navigate("home")} className="hover:text-foreground transition-colors">Services</a>
            <a href="#contact" onClick={() => page !== "home" && navigate("home")} className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 text-xs text-muted-foreground">
            <a href="mailto:info@gohafeezgroup.com" className="hover:text-foreground transition-colors">info@gohafeezgroup.com</a>
            <span className="hidden sm:inline">·</span>
            <span>© 2026 · DVSA & FSA Audited · United Kingdom</span>
          </div>
        </div>
      </footer>

      {/* Success modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/20 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-10 max-w-sm w-full text-center space-y-5 shadow-xl">
            <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${ORANGE}18` }}>
              <CheckCircle className="w-7 h-7" style={{ color: ORANGE }} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Fraunces', serif" }}>Request received</h3>
              <p className="text-sm text-muted-foreground">{"An operations lead will contact you within 24 hours to map out your trial framework."}</p>
            </div>
            <button onClick={() => setModalOpen(false)} className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-opacity hover:opacity-90" style={{ background: ORANGE }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
