import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Server, Database, Shield, Zap, FileCode2, Mail, CheckCircle2, Users } from 'lucide-react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.5 } }
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, type: "spring", bounce: 0.6 } }
};

// ----------------------------------------------------
// UNIQUE ANIMATION COMPONENTS
// ----------------------------------------------------

const RoadmapLine = () => (
  <svg width="100%" height="200" className="absolute top-1/2 -translate-y-1/2 left-0 -z-10 overflow-visible pointer-events-none">
    {/* Base line */}
    <motion.line
      x1="0" y1="100" x2="100%" y2="100"
      stroke="#334155"
      strokeWidth="4"
    />
    {/* Animated drawing line */}
    <motion.line
      x1="0" y1="100" x2="100%" y2="100"
      stroke="url(#glow-roadmap)"
      strokeWidth="6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 4, ease: "easeInOut" }}
    />
    {/* Moving packet on line */}
    <motion.circle r="6" fill="#ec4899" filter="drop-shadow(0 0 10px #ec4899)" initial={{ cx: 0, cy: 100 }} animate={{ cx: "100%" }} transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }} />
    <defs>
      <linearGradient id="glow-roadmap" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
  </svg>
);

const AnimatedEnvelope = () => (
  <motion.div variants={fadeScale} className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center">
    <div className="relative w-72 h-56 perspective-1000">
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-full h-full relative preserve-3d">
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#e2e8f0] rounded-xl shadow-2xl border border-slate-300"></div>
        {/* Paper flying out */}
        <motion.div 
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-20, -80, -60], opacity: [0, 1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "backOut" }}
          className="absolute inset-x-6 top-0 bottom-6 bg-white rounded-lg shadow-md border border-slate-100 flex flex-col p-6 z-10"
        >
           <div className="w-1/3 h-3 bg-purple-200 rounded mb-6"></div>
           <div className="w-full h-3 bg-slate-100 rounded mb-3"></div>
           <div className="w-5/6 h-3 bg-slate-100 rounded mb-3"></div>
           <div className="w-4/6 h-3 bg-slate-100 rounded"></div>
        </motion.div>
        {/* Envelope Front Left/Right flaps */}
        <div className="absolute inset-0 overflow-hidden rounded-xl z-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[144px] border-l-[#cbd5e1] border-t-[112px] border-t-transparent border-b-[112px] border-b-transparent"></div>
          <div className="absolute top-0 right-0 w-0 h-0 border-r-[144px] border-r-[#cbd5e1] border-t-[112px] border-t-transparent border-b-[112px] border-b-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-0 border-b-[120px] border-b-[#f1f5f9] border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent"></div>
        </div>
        {/* Envelope Flap (opening) */}
        <motion.div 
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -180 }}
          transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "backInOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute top-0 left-0 w-full h-0 border-t-[120px] border-t-[#94a3b8] border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent z-30 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
        ></motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const DatabaseGrid = () => (
  <motion.div variants={fadeScale} className="w-full max-w-sm bg-[#0d1117] border border-slate-700 rounded-xl overflow-hidden font-mono text-[10px] sm:text-xs text-left shadow-[0_0_40px_rgba(34,197,94,0.2)] absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block z-50">
    <div className="bg-[#161b22] p-3 text-slate-400 grid grid-cols-4 gap-2 font-bold tracking-widest border-b border-slate-700">
      <span>ID</span><span>NAME</span><span>EMAIL</span><span>DATE</span>
    </div>
    <div className="p-3 grid grid-cols-4 gap-2 text-slate-500 border-b border-slate-800">
      <span>101</span><span>Rahul</span><span>rah@...</span><span>09:00</span>
    </div>
    <motion.div 
      initial={{ height: 0, opacity: 0, backgroundColor: "#064e3b" }}
      animate={{ height: "auto", opacity: 1, backgroundColor: "transparent" }}
      transition={{ duration: 1.5, delay: 1 }}
      className="p-3 grid grid-cols-4 gap-2 text-emerald-400 font-bold border-b border-emerald-900/50 relative overflow-hidden"
    >
      <motion.div className="absolute inset-0 bg-emerald-500/30" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 2, duration: 1 }}/>
      <span>102</span><span>Arjun</span><span>arj@...</span><span>Just Now</span>
    </motion.div>
  </motion.div>
);

const WhatsAppMock = () => (
  <motion.div variants={fadeScale} className="bg-[#efeae2] w-64 rounded-[30px] p-2 shadow-2xl absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block border-[6px] border-slate-800 z-50">
    <div className="bg-[#00a884] -mx-2 -mt-2 p-3 text-white font-bold mb-4 flex items-center gap-3 shadow-md rounded-t-[24px]">
       <div className="w-8 h-8 rounded-full bg-slate-200"></div>
       <span className="text-sm">Academy Portal</span>
    </div>
    <div className="h-40 relative px-2">
      <motion.div 
        initial={{ scale: 0, originBottom: 0, originRight: 100 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", bounce: 0.6 }}
        className="bg-[#d9fdd3] text-slate-800 p-2.5 rounded-2xl rounded-tr-sm shadow-md text-xs ml-auto w-[90%] relative"
      >
        <strong className="text-[#025b4b]">New Lead!</strong><br/>
        Name: Arjun Kotwal<br/>Interest: B.Com<br/>
        <div className="text-[9px] text-slate-500 text-right mt-1">17:24 <CheckCircle2 size={10} className="inline text-blue-500"/></div>
      </motion.div>
    </div>
  </motion.div>
);

// ----------------------------------------------------
// UNIQUE ANIMATION COMPONENTS
// ----------------------------------------------------

const AdvancedDataFlow = () => (
  <div className="w-full max-w-[1000px] h-[400px] relative mx-auto mt-12 hidden lg:block perspective-1000">
    
    {/* SVG Path */}
    <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible">
      {/* 
        React Form is at left: 0, top: 200 (center left)
        PHP is at left: 500, top: 0 (center top)
        HubSpot is at left: 1000, top: 0 (right top)
      */}
      <motion.path 
        d="M 128 250 L 350 250 Q 400 250 400 200 L 400 120 Q 400 70 450 70 L 500 70" 
        fill="transparent" stroke="#334155" strokeWidth="4" strokeDasharray="10 10" 
      />
      <motion.path 
        d="M 128 250 L 350 250 Q 400 250 400 200 L 400 120 Q 400 70 450 70 L 500 70" 
        fill="transparent" stroke="url(#flow-gradient-1)" strokeWidth="6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle r="8" fill="#ec4899" filter="drop-shadow(0 0 12px #ec4899)">
         <animateMotion dur="1.5s" repeatCount="indefinite" path="M 128 250 L 350 250 Q 400 250 400 200 L 400 120 Q 400 70 450 70 L 500 70" />
      </motion.circle>

      {/* Path from PHP to HubSpot */}
      <motion.path 
        d="M 500 70 L 700 70" 
        fill="transparent" stroke="#334155" strokeWidth="4" strokeDasharray="10 10" 
      />
      <motion.path 
        d="M 500 70 L 700 70" 
        fill="transparent" stroke="url(#flow-gradient-2)" strokeWidth="6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle r="8" fill="#f97316" filter="drop-shadow(0 0 12px #f97316)">
         <animateMotion dur="1.5s" begin="0.75s" repeatCount="indefinite" path="M 500 70 L 700 70" />
      </motion.circle>

      <defs>
        <linearGradient id="flow-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="flow-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>

    {/* Stage 1: Client/React */}
    <motion.div variants={fadeScale} className="absolute left-0 top-[170px] w-64 h-[160px] bg-[#0f172a] rounded-2xl border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] p-4 flex flex-col justify-between z-10">
      <div className="flex items-center gap-3 border-b border-slate-700 pb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><FileCode2 size={16} className="text-blue-400" /></div>
        <span className="font-bold text-white text-sm">React UI Form</span>
      </div>
      <div className="flex flex-col gap-2 mt-2">
         <div className="w-full h-6 bg-slate-800 rounded flex items-center px-2 text-[10px] text-slate-400 font-mono">Arjun Kotwal</div>
         <div className="w-full h-6 bg-slate-800 rounded flex items-center px-2 text-[10px] text-slate-400 font-mono">arjun@example.com</div>
         <div className="w-full h-7 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold text-white mt-1 uppercase shadow-md shadow-blue-500/30">Submit Form</div>
      </div>
    </motion.div>

    {/* Stage 2: PHP API (Center, shifted up) */}
    <motion.div variants={fadeScale} className="absolute left-1/2 -translate-x-1/2 top-0 w-64 h-32 bg-[#020617] rounded-full border-[4px] border-purple-500 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.4)] z-10">
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border-2 border-dashed border-purple-500/50 rounded-full" />
      <div className="flex flex-col items-center">
         <Server size={32} className="text-purple-400 mb-2" />
         <span className="font-bold text-white text-lg">PHP API</span>
         <span className="text-[10px] text-purple-400 font-mono tracking-widest bg-purple-500/10 px-2 py-1 rounded mt-1 border border-purple-500/20">CURL_POST()</span>
      </div>
    </motion.div>

    {/* JSON Payload (Floating) */}
    <motion.div 
       animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }} 
       transition={{ duration: 2, repeat: Infinity }}
       className="absolute left-[34%] top-[190px] bg-[#020617] p-2 rounded-lg border border-pink-500 shadow-[0_0_20px_#ec4899] z-20 flex items-center gap-2"
    >
       <Zap size={14} className="text-pink-400" />
       <span className="text-pink-400 font-mono text-[9px] font-bold tracking-widest uppercase">JSON PAYLOAD</span>
    </motion.div>

    {/* Stage 3: HubSpot CRM */}
    <motion.div variants={fadeScale} className="absolute right-0 top-0 w-72 h-[160px] bg-[#0f172a] rounded-2xl border border-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.3)] p-4 flex flex-col z-10">
      <div className="flex items-center justify-between border-b border-orange-500/30 pb-2 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center"><Users size={16} className="text-orange-400" /></div>
          <span className="font-bold text-white text-sm">HubSpot CRM</span>
        </div>
        <div className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[9px] font-bold rounded animate-pulse">200 OK</div>
      </div>
      
      {/* Fake CRM UI */}
      <div className="flex-1 bg-[#020617] rounded-lg p-2 border border-slate-700 relative overflow-hidden shadow-inner">
         {/* Incoming Lead Animation */}
         <motion.div 
           initial={{ x: -200, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 1 }}
           className="w-full bg-orange-500/20 border border-orange-500/50 rounded p-1.5 flex items-center justify-between mb-2 absolute inset-x-2 top-2 z-10 shadow-lg"
         >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[8px] font-bold text-white shadow">AK</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white leading-tight">Arjun Kotwal</span>
                <span className="text-[8px] text-slate-400 leading-tight">arjun@example.com</span>
              </div>
            </div>
            <span className="text-[8px] text-orange-400 font-bold bg-orange-500/10 px-1 py-0.5 rounded border border-orange-500/30">NEW LEAD</span>
         </motion.div>
         
         <div className="w-full h-8 bg-slate-800 rounded p-1.5 flex items-center justify-between opacity-50 mt-10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-600"></div>
              <div className="w-16 h-1.5 bg-slate-700 rounded"></div>
            </div>
         </div>
      </div>
    </motion.div>

  </div>
)

// ----------------------------------------------------
// CODE BLOCKS
// ----------------------------------------------------

const HackerCode = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      i += 2;
      if (i >= text.length) {
        setDisplayedText(text);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, i));
      }
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      {displayedText}
      <span className="inline-block w-2.5 h-4 bg-green-500 animate-pulse ml-1 align-middle shadow-[0_0_10px_#22c55e]"></span>
    </>
  );
};

const CodeBlock = ({ title, code, width = "w-full lg:w-2/3" }) => (
  <motion.div variants={fadeUp} className={`text-left rounded-2xl overflow-hidden border border-green-500/40 shadow-[0_0_40px_rgba(34,197,94,0.15)] bg-[#050505] relative group mt-6 ${width}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none"></div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30"></div>
    <div className="flex items-center px-4 py-3 bg-[#0a0a0a] border-b border-green-500/30 relative z-20">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_#22c55e]"></div>
      </div>
      <span className="ml-4 text-xs font-mono text-green-500/80 font-bold lowercase">root@server:~# ./{title.replace(/\s+/g, '_').toLowerCase()}.sh</span>
    </div>
    <div className="p-5 overflow-x-auto relative z-20">
      <pre className="text-xs sm:text-sm font-mono leading-relaxed text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
        <code><HackerCode text={code} /></code>
      </pre>
    </div>
  </motion.div>
);

// ----------------------------------------------------
// SLIDES
// ----------------------------------------------------

const SLIDES = [
  {
    id: 1,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col items-center justify-center h-full text-center relative z-10 px-4">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[100px] -z-10 rounded-full" />
        <motion.div variants={fadeScale} className="relative">
          <motion.div className="absolute -inset-10 border border-blue-500/30 rounded-full" animate={{ rotate: 360, scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] leading-tight">PHP<br/><span className="text-4xl md:text-6xl font-light text-slate-300">x</span><br/>REACT</h1>
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="text-3xl text-white font-bold mt-16 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Academy of Excellence</motion.h2>
        
        <motion.div variants={fadeUp} className="mt-10 flex w-full max-w-4xl justify-between items-center relative z-20">
           
           {/* Left side: Submitted By */}
           <div className="flex flex-col items-start bg-[#0f172a]/80 backdrop-blur-md border border-slate-700/50 px-8 py-5 rounded-3xl shadow-2xl group relative overflow-hidden min-w-[300px]">
             <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <span className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2 relative z-10">Submitted By</span>
             <span className="text-2xl text-blue-400 font-bold mb-1 drop-shadow-[0_0_5px_#3b82f6] relative z-10">Kamlesh Singh</span>
             <span className="text-sm text-slate-400 font-mono tracking-widest bg-[#020617] px-4 py-1 rounded-full border border-slate-800 mt-2 group-hover:border-blue-500/30 transition-colors relative z-10">Roll No: 2446586</span>
           </div>

           {/* Right side: Submitted To */}
           <div className="flex flex-col items-end bg-[#0f172a]/80 backdrop-blur-md border border-slate-700/50 px-8 py-5 rounded-3xl shadow-2xl group relative overflow-hidden min-w-[300px] text-right">
             <motion.div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <span className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2 relative z-10">Submitted To</span>
             <span className="text-2xl text-purple-400 font-bold mb-1 drop-shadow-[0_0_5px_#8b5cf6] relative z-10">Ms. Pratiksha Bagga</span>
             <span className="text-sm text-slate-400 font-mono tracking-widest bg-[#020617] px-4 py-1 rounded-full border border-slate-800 mt-2 group-hover:border-purple-500/30 transition-colors relative z-10">Project Guide</span>
           </div>

        </motion.div>
      </motion.div>
    )
  },
  {
    id: 2,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center items-center px-16 relative z-10">
        <motion.h2 variants={fadeUp} className="text-6xl font-bold text-white mb-20 text-center">The Foundation</motion.h2>
        <div className="flex gap-12 w-full max-w-5xl">
          {[
            { t: "React", d: "Dynamic UI", c: "from-blue-400 to-cyan-400", shadow: "shadow-[0_0_40px_rgba(59,130,246,0.4)]" },
            { t: "Three.js", d: "3D Rendering", c: "from-purple-400 to-pink-400", shadow: "shadow-[0_0_40px_rgba(168,85,247,0.4)]" },
            { t: "Framer", d: "Fluid Motion", c: "from-emerald-400 to-teal-400", shadow: "shadow-[0_0_40px_rgba(52,211,153,0.4)]" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="relative flex-1 group perspective-1000">
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-[#020617]/80 backdrop-blur-xl border-2 border-slate-800 rounded-[40px] p-8 text-center h-64 flex flex-col justify-center relative overflow-hidden transition-all duration-300 group-hover:border-slate-500 group-hover:${item.shadow}`}
              >
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 4, repeat: Infinity }} className={`absolute inset-0 bg-gradient-to-b ${item.c}`} />
                <h3 className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.c} mb-4 relative z-10 group-hover:scale-110 transition-transform`}>{item.t}</h3>
                <p className="text-slate-400 text-xl uppercase tracking-widest font-mono relative z-10">{item.d}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  },
  {
    id: 3,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.h2 variants={fadeUp} className="text-6xl font-bold text-white mb-24 text-center">The Architecture</motion.h2>
        
        <div className="flex items-center justify-between w-full relative h-64 max-w-5xl mx-auto">
          {/* Animated Data Packets Flow */}
          <div className="absolute top-1/2 left-[15%] right-[50%] h-1 bg-slate-800 rounded-full -z-10 -translate-y-1/2">
            <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_20px_#8b5cf6]" />
          </div>
          <div className="absolute top-1/2 left-[50%] right-[15%] h-1 bg-slate-800 rounded-full -z-10 -translate-y-1/2">
            <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500 rounded-full shadow-[0_0_20px_#10b981]" />
          </div>

          <motion.div variants={fadeScale} className="z-10 w-64 h-64 bg-[#020617] rounded-full border-4 border-blue-500 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><FileCode2 size={56} className="text-blue-400 mb-4" /></motion.div>
            <span className="text-3xl font-bold text-white">React UI</span>
            <span className="text-blue-400 font-mono text-sm mt-2">fetch(POST)</span>
          </motion.div>

          <motion.div variants={fadeScale} className="z-10 w-64 h-64 bg-[#020617] rounded-full border-4 border-purple-500 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.4)] relative">
            <motion.div className="absolute -inset-6 border-2 border-purple-500/50 rounded-full" animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}><Server size={56} className="text-purple-400 mb-4" /></motion.div>
            <span className="text-3xl font-bold text-white">PHP API</span>
            <span className="text-purple-400 font-mono text-sm mt-2">php://input</span>
          </motion.div>

          <motion.div variants={fadeScale} className="z-10 w-64 h-64 bg-[#020617] rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)]">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, delay: 1, repeat: Infinity }}><Database size={56} className="text-emerald-400 mb-4" /></motion.div>
            <span className="text-3xl font-bold text-white">MySQL</span>
            <span className="text-emerald-400 font-mono text-sm mt-2">PDO Bind</span>
          </motion.div>
        </div>
      </motion.div>
    )
  },
  {
    id: 4,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-2">
          <Shield size={40} className="text-emerald-400" />
          <h2 className="text-4xl font-bold text-emerald-400">Security Core</h2>
        </motion.div>
        <motion.p variants={fadeUp} className="text-xl text-slate-400 font-light max-w-2xl">Block XSS. Validate everything.</motion.p>
        <CodeBlock title="sanitize" width="w-full lg:w-4/5" code={`// Strip malicious script tags
$name = htmlspecialchars(strip_tags($data['name'] ?? ''));
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);

// Strict regex/format validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email."]);
    exit;
}`} />
      </motion.div>
    )
  },
  {
    id: 5,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-2">
          <Database size={40} className="text-blue-400" />
          <h2 className="text-4xl font-bold text-blue-400">Silent Logging</h2>
        </motion.div>
        <motion.p variants={fadeUp} className="text-xl text-slate-400 font-light max-w-2xl">Immune to SQL Injection using Prepared Statements.</motion.p>
        
        <CodeBlock title="mysql_pdo" width="w-full lg:w-1/2" code={`$stmt = $pdo->prepare('
  INSERT INTO contacts 
  (name, email, subject, message) 
  VALUES (?, ?, ?, ?)
');

$stmt->execute([
  $name, $email, $subject, $message
]);`} />
        
        <DatabaseGrid />
      </motion.div>
    )
  },
  {
    id: 6,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-2">
          <Mail size={40} className="text-purple-400" />
          <h2 className="text-4xl font-bold text-purple-400">Auto Responders</h2>
        </motion.div>
        <motion.p variants={fadeUp} className="text-xl text-slate-400 font-light max-w-2xl">Instant confirmation dispatch via SMTP.</motion.p>
        
        <CodeBlock title="smtp_mail" width="w-full lg:w-3/5" code={`$subject = "Thank you for contacting us!";
$body = "Hello $name,\\nWe received your inquiry.";
$headers = "From: admin@academy.com\\r\\n";

// Dispatch silently in background
@mail($email, $subject, $body, $headers);`} />

        <AnimatedEnvelope />
      </motion.div>
    )
  },
  {
    id: 7,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-2">
          <Zap size={40} className="text-yellow-400" />
          <h2 className="text-4xl font-bold text-yellow-400">Dual-Action Guarantee</h2>
        </motion.div>
        <motion.p variants={fadeUp} className="text-xl text-slate-400 font-light max-w-2xl">Even if PHP crashes, the WhatsApp redirect executes.</motion.p>
        
        <CodeBlock title="react_fallback" width="w-full lg:w-1/2" code={`try {
  await fetch('/api/contact.php', {
    method: 'POST', body: JSON.stringify(data)
  });
} finally {
  // Guaranteed Execution
  window.open(\`https://wa.me/\${phone}\`, '_blank');
}`} />
        
        <WhatsAppMock />
      </motion.div>
    )
  },
  {
    id: 8,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.h2 variants={fadeUp} className="text-6xl font-bold text-white mb-20 text-center">The Results</motion.h2>
        <div className="flex gap-12 justify-center">
          {[
            { i: <Zap size={64}/>, t: "Zero Friction", color: "text-yellow-400", border: "border-yellow-400", shadow: "shadow-[0_0_40px_rgba(250,204,21,0.3)]" },
            { i: <Shield size={64}/>, t: "Total Security", color: "text-emerald-400", border: "border-emerald-400", shadow: "shadow-[0_0_40px_rgba(52,211,153,0.3)]" },
            { i: <Database size={64}/>, t: "Data Ownership", color: "text-blue-400", border: "border-blue-400", shadow: "shadow-[0_0_40px_rgba(96,165,250,0.3)]" }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeScale} whileHover={{ scale: 1.1 }} className={`flex flex-col items-center justify-center w-72 h-72 rounded-full border-4 ${item.border} bg-[#020617] ${item.shadow} relative group cursor-pointer transition-transform`}>
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity }} className={`absolute -inset-6 border-2 ${item.border} rounded-full opacity-50 pointer-events-none`} />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8 + idx, repeat: Infinity, ease: "linear" }} className={`absolute inset-2 border-2 border-dashed ${item.border} rounded-full opacity-30 pointer-events-none`} />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className={`${item.color} mb-6 group-hover:scale-125 transition-transform`}>{item.i}</motion.div>
              <span className="text-2xl font-bold text-white uppercase tracking-widest">{item.t}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  },
  {
    id: 9,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.h2 variants={fadeUp} className="text-6xl font-bold text-white mb-24 text-center">Future Enhancements</motion.h2>
        
        <div className="flex justify-between items-center w-full relative px-4">
          <RoadmapLine />
          
          <motion.div variants={fadeUp} className="w-1/4 flex flex-col items-center relative -top-24 mt-4">
            <motion.div className="absolute top-10 w-1 h-[120px] bg-blue-500 -z-10" initial={{ scaleY: 0, transformOrigin: "top" }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 0.5 }} />
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-20 h-20 rounded-full bg-[#020617] border-[6px] border-blue-500 flex items-center justify-center z-10 shadow-[0_0_30px_#3b82f6] text-blue-500 font-black text-3xl">1</motion.div>
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-blue-500/30 mt-6 text-center w-full shadow-lg group hover:border-blue-500 transition-colors">
              <h3 className="font-bold text-white mb-2 text-xl group-hover:text-blue-400 transition-colors">Admin Panel</h3>
              <p className="text-blue-400/60 font-mono text-sm">React + Sessions</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="w-1/4 flex flex-col items-center relative top-24 mb-4">
            <motion.div className="absolute bottom-10 w-1 h-[120px] bg-purple-500 -z-10" initial={{ scaleY: 0, transformOrigin: "bottom" }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 1 }} />
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-purple-500/30 mb-6 text-center w-full shadow-lg group hover:border-purple-500 transition-colors">
              <h3 className="font-bold text-white mb-2 text-xl group-hover:text-purple-400 transition-colors">Twilio API</h3>
              <p className="text-purple-400/60 font-mono text-sm">Automated SMS</p>
            </div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-20 h-20 rounded-full bg-[#020617] border-[6px] border-purple-500 flex items-center justify-center z-10 shadow-[0_0_30px_#8b5cf6] text-purple-500 font-black text-3xl">2</motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="w-1/4 flex flex-col items-center relative -top-24 mt-4">
            <motion.div className="absolute top-10 w-1 h-[120px] bg-emerald-500 -z-10" initial={{ scaleY: 0, transformOrigin: "top" }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 1.5 }} />
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-20 h-20 rounded-full bg-[#020617] border-[6px] border-emerald-500 flex items-center justify-center z-10 shadow-[0_0_30px_#10b981] text-emerald-500 font-black text-3xl">3</motion.div>
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-emerald-500/30 mt-6 text-center w-full shadow-lg group hover:border-emerald-500 transition-colors">
              <h3 className="font-bold text-white mb-2 text-xl group-hover:text-emerald-400 transition-colors">reCAPTCHA</h3>
              <p className="text-emerald-400/60 font-mono text-sm">Bot Protection</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="w-1/4 flex flex-col items-center relative top-24 mb-4">
            <motion.div className="absolute bottom-10 w-1 h-[120px] bg-pink-500 -z-10" initial={{ scaleY: 0, transformOrigin: "bottom" }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 2 }} />
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-pink-500/30 mb-6 text-center w-full shadow-lg group hover:border-pink-500 transition-colors">
              <h3 className="font-bold text-white mb-2 text-xl group-hover:text-pink-400 transition-colors">Webhooks</h3>
              <p className="text-pink-400/60 font-mono text-sm">HubSpot Sync</p>
            </div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-20 h-20 rounded-full bg-[#020617] border-[6px] border-pink-500 flex items-center justify-center z-10 shadow-[0_0_30px_#ec4899] text-pink-500 font-black text-3xl">4</motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  },
  {
    id: 10,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full justify-center px-16 max-w-7xl mx-auto relative z-10 w-full">
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-2">
          <Zap size={40} className="text-pink-400" />
          <h2 className="text-4xl font-bold text-pink-400">HubSpot Webhook</h2>
        </motion.div>
        <motion.p variants={fadeUp} className="text-xl text-slate-400 font-light max-w-2xl">Instant event-driven sync. Push leads in real-time, zero polling.</motion.p>
        
        <AdvancedDataFlow />
      </motion.div>
    )
  },
  {
    id: 11,
    component: () => (
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col items-center justify-center h-full text-center relative z-10 w-full px-4">
        {/* Rotating multi-color background glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
          className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-[120px] -z-10 rounded-full w-[80%] h-[80%] m-auto pointer-events-none" 
        />
        
        {/* Animated Popping Checkmark/Star Icon */}
        <motion.div 
           variants={fadeScale}
           className="mb-10 relative"
        >
           <motion.div className="absolute -inset-8 border border-purple-500/30 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} />
           <div className="w-32 h-32 rounded-full bg-[#020617] border-[6px] border-purple-500 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.6)] relative z-10">
             <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
               <CheckCircle2 size={64} className="text-purple-400" />
             </motion.div>
           </div>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-8xl md:text-[110px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          Thank You!
        </motion.h2>
        
        <motion.div variants={fadeScale} className="w-64 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-10"></motion.div>
        
        <motion.p variants={fadeUp} className="text-2xl md:text-3xl text-slate-300 font-light tracking-wide max-w-4xl leading-relaxed">
          A highly secure, zero-friction integration bridging the gap between <strong className="text-blue-400 font-semibold drop-shadow-[0_0_8px_#3b82f6]">React</strong> and <strong className="text-purple-400 font-semibold drop-shadow-[0_0_8px_#8b5cf6]">PHP</strong>.
        </motion.p>
        
        <motion.div variants={fadeUp} className="mt-16 border border-slate-700/50 bg-[#0f172a]/80 backdrop-blur-md px-10 py-4 rounded-full shadow-2xl relative overflow-hidden group">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <p className="text-lg md:text-xl text-slate-400 font-mono tracking-[0.2em] uppercase relative z-10 group-hover:text-white transition-colors">
            Open for Questions & Demo
          </p>
        </motion.div>
      </motion.div>
    )
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = useCallback((newDirection) => {
    const nextSlide = currentSlide + newDirection;
    if (nextSlide >= 0 && nextSlide < SLIDES.length) {
      setPage([nextSlide, newDirection]);
      setCurrentSlide(nextSlide);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
  };

  const CurrentComponent = SLIDES[currentSlide].component;

  return (
    <div className="relative w-screen h-screen bg-[#020617] overflow-hidden font-sans text-white selection:bg-purple-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div key={page} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="absolute inset-0 w-full h-full">
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full z-50">
        <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" initial={{ width: 0 }} animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }} transition={{ duration: 0.5 }} />
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8 z-50">
        <button onClick={() => paginate(-1)} disabled={currentSlide === 0} className="p-4 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur-md border border-slate-700/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group">
          <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} disabled={currentSlide === SLIDES.length - 1} className="p-4 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur-md border border-slate-700/80 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] group">
          <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
