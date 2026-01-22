import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  X, 
  Clock, 
  ShieldCheck, 
  MoveRight,
  ArrowRight,
  Calendar,
  Plus,
  Minus
} from 'lucide-react';

/**
 * THEME: "The Refined Blue Soho" - SIMPLE ENGLISH + FAQ HEADING
 * CHANGES:
 * 1. Kept English very simple and easy to understand.
 * 2. Restored the "FAQs" heading in the question section.
 * 3. Fixed all tag nesting for a clean build.
 */

const WHATSAPP_NUMBER = "233242053664";
const getWhatsAppUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const ROOMS = [
  {
    id: "01",
    name: "Fan Comfort Room",
    price: "140",
    desc: "A very neat and simple room for a cool stay. It has a good fan to keep the air fresh and nice.",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
    accent: "Cool & Fresh"
  },
  {
    id: "02",
    name: "Standard AC Room",
    price: "200",
    desc: "A quiet room with a very strong AC. Perfect for people who want to sleep in a very cold place.",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200",
    accent: "Cold Air Stay"
  },
  {
    id: "03",
    name: "Deluxe King Suite",
    price: "250",
    desc: "Our big king room for important people. It is large, beautiful, and very comfortable.",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
    accent: "Big & Beautiful"
  },
  {
    id: "04",
    name: "Double Suite Room",
    price: "300",
    desc: "A big space for friends or family staying together. Two beds and plenty of room to relax.",
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200",
    accent: "Perfect for Groups"
  }
];

const FAQS = [
  {
    q: "What time can I check in or check out?",
    a: "You can come in from 2:00 PM. You should leave by 12:00 PM noon. If you want to stay longer, just talk to us."
  },
  {
    q: "Do you pick people up from the airport?",
    a: "Yes, we have a car to pick you up. Please tell us one day before you arrive so we can be ready."
  },
  {
    q: "Is breakfast free?",
    a: "Breakfast is free for our Deluxe and Double Suite rooms. For other rooms, you can pay a small amount to get food."
  },
  {
    q: "Is my car safe at your place?",
    a: "Yes. We have a gate and a security man 24 hours. Your car is very safe with us."
  }
];

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav 
        className={`fixed w-full z-[100] px-6 py-4 md:px-12 flex justify-between items-center transition-all duration-500 
        ${scrolled 
          ? 'bg-white/40 backdrop-blur-md py-3 border-b border-white/20 shadow-sm' 
          : 'bg-transparent py-6'}`}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${scrolled ? 'text-[#0047FF]' : 'text-white'}`}
        >
          F<span className="italic font-serif">A</span>TIROS<span className="text-blue-500">.</span>
        </motion.div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="group p-2 flex flex-col gap-1.5 items-end transition-all"
          aria-label="Open Menu"
        >
          <motion.div 
            animate={{ width: scrolled ? 28 : 36 }} 
            className={`h-[2px] transition-all duration-300 ${scrolled ? 'bg-[#00103A]' : 'bg-white'} group-hover:bg-[#0047FF]`} 
          />
          <motion.div 
            animate={{ width: scrolled ? 18 : 24 }} 
            className={`h-[2px] transition-all duration-300 ${scrolled ? 'bg-[#00103A]' : 'bg-white'} group-hover:bg-[#0047FF]`} 
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] bg-[#0047FF] text-white p-8 md:p-20 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-black">FATIROS.</div>
              <button onClick={() => setIsOpen(false)} className="w-16 h-16 flex items-center justify-center rounded-full border border-white/20 hover:rotate-90 transition-all duration-500">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              {['Home', 'Suites', 'FAQ', 'Contact'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, ...transition }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-6xl md:text-[9vw] font-black leading-[0.8] tracking-tighter hover:text-white/40 transition-all uppercase relative group w-fit"
                >
                  <span className="relative z-10">{item}</span>
                  <motion.span className="absolute left-0 bottom-0 h-2 bg-white w-0 group-hover:w-full transition-all duration-500" />
                </motion.a>
              ))}
              
              <motion.a 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ...transition }}
                href={getWhatsAppUrl("Hello Fatiros Lodge, I want to book a room.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-16 flex items-center gap-6 group w-fit"
              >
                <div className="w-20 h-20 rounded-full bg-white text-[#0047FF] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Calendar size={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-5xl font-black uppercase tracking-tighter">Book Room</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Message Us Now</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-100 py-8">
    <button 
      onClick={onClick}
      className="flex justify-between items-center w-full text-left group"
    >
      <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-[#00103A] group-hover:text-[#0047FF] transition-colors">
        {question}
      </h3>
      <div className={`w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all ${isOpen ? 'bg-[#0047FF] text-white' : 'text-gray-400'}`}>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg text-gray-500 mt-6 leading-relaxed max-w-3xl">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], [0, 250]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="bg-[#FAFAFA] text-[#00103A] font-sans selection:bg-[#0047FF] selection:text-white scroll-smooth overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen w-full bg-[#0047FF] overflow-hidden flex items-center">
          <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000" 
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity" 
              alt="Fatiros Lodge Luxury" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0047FF]/20 via-transparent to-[#0047FF]" />
          </motion.div>
          <div className="relative z-10 w-full px-6 md:px-12 mt-20">
            <motion.div style={{ opacity: opacityHero }}>
              <motion.div initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 1, delay: 0.5 }} className="h-[2px] bg-white mb-8" />
              <h1 className="text-[16vw] md:text-[13vw] font-black text-white leading-[0.75] tracking-tighter mb-16 uppercase overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="block">
                  STAY <br /> 
                  <span className="italic font-serif font-normal text-[#0047FF] stroke-white" style={{ WebkitTextStroke: '2px white' }}>Cool.</span>
                </motion.span>
              </h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <a 
                  href={getWhatsAppUrl("Hello, I want to book a room at Fatiros Lodge.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white text-[#0047FF] px-14 py-8 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-2xl transition-all hover:scale-105 inline-block"
                >
                  <span className="relative z-10 flex items-center gap-4">Book on WhatsApp <ArrowRight className="group-hover:translate-x-2 transition-transform" /></span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="home" className="py-48 px-6 md:px-12 bg-white relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full md:w-1/2">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-[#0047FF]">
                ACCRA <br /> <span className="text-gray-100 italic">Best Stay.</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="w-full md:w-1/2 flex flex-col justify-center">
              <p className="text-2xl text-gray-500 font-medium leading-relaxed mb-16 italic font-serif">
                "We make sure you feel at home. Our place in Nii Boi Town is very quiet, safe, and beautiful for anyone visiting Accra."
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <ShieldCheck size={40} className="text-[#0047FF]" />
                  <span className="font-black text-xs uppercase tracking-widest">Safe & Secured</span>
                </div>
                <div className="flex flex-col gap-4">
                  <Clock size={40} className="text-[#0047FF]" />
                  <span className="font-black text-xs uppercase tracking-widest">Always Open</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SUITES */}
        <div id="suites">
          {ROOMS.map((room, index) => {
            const isEven = index % 2 === 0;
            return (
              <section key={room.id} className="py-32 md:py-64 px-6 md:px-12 bg-[#FAFAFA] overflow-hidden">
                <div className="max-w-[1500px] mx-auto">
                  <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-20 md:gap-32`}>
                    <div className="w-full md:w-[55%] relative">
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative z-10 rounded-[80px] overflow-hidden group shadow-2xl"
                      >
                        <img src={room.img} className="w-full aspect-[4/5] md:aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-110" alt={room.name} />
                        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-md text-[#0047FF] w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-xl z-20">
                          <span className="text-[10px] font-black uppercase">GHS</span>
                          <span className="text-2xl font-black">{room.price}</span>
                        </motion.div>
                      </motion.div>
                      <div className={`absolute -top-16 ${isEven ? '-left-8' : '-right-8'} text-[15vw] font-black text-[#0047FF]/5 uppercase leading-none select-none z-0`}>
                        {room.id}
                      </div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} className="w-full md:w-[45%]">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0047FF] mb-6 block">{room.accent}</span>
                      <h3 className="text-7xl md:text-[8vw] font-black text-[#00103A] tracking-tighter leading-[0.85] mb-10 uppercase">
                        {room.name.split(' ')[0]} <br /> 
                        <span className="text-blue-600 italic font-serif font-normal lowercase">{room.name.split(' ')[1]}</span>
                      </h3>
                      <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium">{room.desc}</p>
                      <a href={getWhatsAppUrl(`Hello, I want to book the ${room.name}`)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 text-[#0047FF]">
                         <div className="w-14 h-14 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-[#0047FF] group-hover:text-white transition-all"><MoveRight /></div>
                         <span className="text-xs font-black uppercase tracking-[0.4em]">WhatsApp Booking</span>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* FAQ */}
        <section id="faq" className="py-48 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0047FF] mb-6 block">Common Questions</span>
              <h2 className="text-7xl md:text-9xl font-black text-[#00103A] tracking-tighter leading-none uppercase">
                FA<span className="text-blue-100 italic font-serif">Q</span>s
              </h2>
            </motion.div>
            <div className="flex flex-col">
              {FAQS.map((faq, idx) => (
                <FAQItem 
                  key={idx}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFAQ === idx}
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-48 md:py-80 bg-[#0047FF] relative overflow-hidden flex items-center justify-center text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative z-10 px-6">
            <h2 className="text-8xl md:text-[15vw] font-black text-white uppercase leading-[0.75] tracking-tighter mb-12">Call <br /> Us.</h2>
            <a 
              href={getWhatsAppUrl("I am ready to book my stay at Fatiros Lodge.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0047FF] p-12 rounded-[50px] inline-flex flex-col items-center hover:scale-105 transition-transform shadow-2xl"
            >
              <span className="text-[10px] font-black uppercase tracking-widest mb-4 font-mono text-blue-300">WhatsApp Now</span>
              <span className="text-3xl font-black tracking-tight">+233 24 205 3664</span>
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="bg-white py-24 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="text-4xl font-black text-[#0047FF] tracking-tighter">FATIROS<span className="text-blue-100">.</span></div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <p>© 2026 Fatiros Lodge Accra</p>
            <address className="not-italic">Accra, Ghana</address>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;