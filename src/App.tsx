import { useEffect, useRef, useState } from 'react'
import { Menu, Mail, Phone, ArrowUpRight, Linkedin, Github, BookOpen } from 'lucide-react'
import RevealLayer from './components/RevealLayer'

const BG_IMAGE_1 =
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop'

const BG_IMAGE_2 =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop'

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Expertise', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Publications', href: '#publications' },
  { name: 'Events & Awards', href: '#events' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
]
const SPOTLIGHT_R = 260

export default function App() {
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>(0)
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })
  const [isPastHero, setIsPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > window.innerHeight - 80)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      setCursorPos({ x: smooth.current.x, y: smooth.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] tracking-[-0.01em] selection:bg-[#FFDAB9]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 bg-transparent transition-colors duration-300 ${isPastHero ? 'text-[#1A1A1A]' : 'text-white'}`}>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-playfair italic font-medium transition-colors duration-300 ${isPastHero ? 'text-black' : 'text-white'}`}>
            Farhana Altaf
          </span>
        </div>

        <div className={`hidden md:flex backdrop-blur-md rounded-full px-2 py-2 items-center gap-1 border transition-all duration-300 ${isPastHero ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${isPastHero ? 'text-black/85 hover:bg-black/5 hover:text-black' : 'text-white/90 hover:bg-white/20 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          className={`md:hidden p-2 transition-colors duration-300 ${isPastHero ? 'text-black' : 'text-white'}`}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <a
          href="https://calendly.com/farhana786altaf/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:block bg-transparent border text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm ${isPastHero ? 'text-black border-black/20 hover:bg-black/5' : 'text-white border-white/20 hover:bg-white/10'}`}
        >
          Book a Call
        </a>
      </nav>

      <section
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: '100dvh' }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom opacity-50 grayscale"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
          spotlightRadius={SPOTLIGHT_R}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 pointer-events-none z-50">
          <h1 className="leading-[1] mt-[-10dvh]">
            <span
              className="block font-playfair italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl hero-anim hero-reveal bg-gradient-to-r from-[#00F2FE] via-[#FFDAB9] to-[#E8702A] bg-clip-text text-transparent pb-3"
              style={{ letterSpacing: '-0.03em', animationDelay: '0.2s' }}
            >
              Farhana Altaf
            </span>
            <span
              className="block font-bold text-xs sm:text-sm md:text-base mt-6 tracking-[0.3em] uppercase hero-anim hero-reveal bg-gradient-to-r from-[#E8702A] via-[#FFDAB9] to-[#00F2FE] bg-clip-text text-transparent"
              style={{ animationDelay: '0.4s' }}
            >
              GIS Developer | Researcher | Scholar
            </span>
          </h1>
        </div>

        {/* Expedition Archive Flow on bottom of Hero page */}
        <div 
          className="absolute bottom-36 left-0 right-0 w-full overflow-hidden py-2 hero-anim hero-fade pointer-events-auto z-40"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="relative w-full">
            {/* Gradient Masks to blend scroll edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee gap-3">
              {[
                "/photos/DSC09100.jpg",
                "/photos/DSC09515.jpg",
                "/photos/ICEMOD.png",
                "/photos/group2.jpg",
                "/photos/photo 1.jpeg",
                "/photos/photo 2.jpeg",
                "/photos/photo 3.jpeg",
                "/photos/photo 4.jpeg",
                "/photos/photo 5.jpeg",
                "/photos/photo 6.jpeg",
                "/photos/photo 7.jpeg",
                "/photos/photo 8.jpeg",
                "/photos/photo 9.jpeg",
                "/photos/photo 10.jpeg",
                "/photos/photo 13.jpeg",
                "/photos/photo 14.jpeg",
                "/photos/photo 15.jpeg",
                "/photos/photo 16.jpeg",
                "/photos/photo 17.jpeg",
                "/photos/photo 18.jpeg",
                "/photos/photo 19.jpeg",
                "/photos/photo 20.jpeg",
                "/photos/photo 21.jpeg",
                "/photos/photo 22.jpeg",
                "/photos/photo 23.jpeg",
                "/photos/photo 24.jpeg",
                "/photos/photo 25.jpeg",
                "/photos/photo 26.jpeg",
                "/photos/photo 28.jpeg",
                "/photos/photo 30.jpeg",
                "/photos/photo 31.jpeg",
                "/photos/photo 32.jpeg",
                "/photos/photo 33.jpeg",
                "/photos/photo 34.jpeg",
                "/photos/photo 35.jpeg",
                "/photos/photo 36.jpeg",
                "/photos/photo 37.jpeg",
                "/photos/photo 38.jpeg",
                "/photos/photo 39.jpeg",
                "/photos/photo 40.jpeg",
                "/photos/photo 41.jpeg",
                "/photos/women-ice-day-1-2-3.jpg",
                "/photos/women-on-ice-day-5-4.jpg",
                "/photos/women-on-ice-day-9-1.jpg"
              ].map((src, i) => (
                <div key={i} className="w-36 h-24 sm:w-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm shadow-md">
                  <img
                    src={src}
                    alt="Expedition Photo"
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
              {[
                "/photos/DSC09100.jpg",
                "/photos/DSC09515.jpg",
                "/photos/ICEMOD.png",
                "/photos/group2.jpg",
                "/photos/photo 1.jpeg",
                "/photos/photo 2.jpeg",
                "/photos/photo 3.jpeg",
                "/photos/photo 4.jpeg",
                "/photos/photo 5.jpeg",
                "/photos/photo 6.jpeg",
                "/photos/photo 7.jpeg",
                "/photos/photo 8.jpeg",
                "/photos/photo 9.jpeg",
                "/photos/photo 10.jpeg",
                "/photos/photo 13.jpeg",
                "/photos/photo 14.jpeg",
                "/photos/photo 15.jpeg",
                "/photos/photo 16.jpeg",
                "/photos/photo 17.jpeg",
                "/photos/photo 18.jpeg",
                "/photos/photo 19.jpeg",
                "/photos/photo 20.jpeg",
                "/photos/photo 21.jpeg",
                "/photos/photo 22.jpeg",
                "/photos/photo 23.jpeg",
                "/photos/photo 24.jpeg",
                "/photos/photo 25.jpeg",
                "/photos/photo 26.jpeg",
                "/photos/photo 28.jpeg",
                "/photos/photo 30.jpeg",
                "/photos/photo 31.jpeg",
                "/photos/photo 32.jpeg",
                "/photos/photo 33.jpeg",
                "/photos/photo 34.jpeg",
                "/photos/photo 35.jpeg",
                "/photos/photo 36.jpeg",
                "/photos/photo 37.jpeg",
                "/photos/photo 38.jpeg",
                "/photos/photo 39.jpeg",
                "/photos/photo 40.jpeg",
                "/photos/photo 41.jpeg",
                "/photos/women-ice-day-1-2-3.jpg",
                "/photos/women-on-ice-day-5-4.jpg",
                "/photos/women-on-ice-day-9-1.jpg"
              ].map((src, i) => (
                <div key={`dup-${i}`} className="w-36 h-24 sm:w-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm shadow-md">
                  <img
                    src={src}
                    alt="Expedition Photo"
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50 hero-anim hero-fade"
          style={{ animationDelay: '1s' }}
        >
          <div className="w-[1px] h-12 bg-white/30 animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold">Scroll</span>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        
        {/* Profile Section */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Profile</h2>
            <div className="mt-4 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl leading-relaxed text-gray-800 font-light">
              Highly motivated and results-oriented GIS professional with a background in 
              Geography and Geoinformatics. Expert in spatial analysis, remote sensing, and 
              geospatial assessment of environmental changes. Dedicated to precision, 
              self-management, and continuous learning.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-sm">
              {[
                { name: "Self-Management", color: "text-[#E8702A] bg-[#E8702A]/5 border-[#E8702A]/20" },
                { name: "Self-Discipline", color: "text-[#00A8CC] bg-[#00A8CC]/5 border-[#00A8CC]/20" },
                { name: "Integrity", color: "text-[#8B5CF6] bg-[#8B5CF6]/5 border-[#8B5CF6]/20" },
                { name: "Energetic & Initiative", color: "text-[#D97706] bg-[#D97706]/5 border-[#D97706]/20" },
                { name: "Punctuality", color: "text-[#E8702A] bg-[#E8702A]/5 border-[#E8702A]/20" },
                { name: "Polite Personality", color: "text-[#00A8CC] bg-[#00A8CC]/5 border-[#00A8CC]/20" },
                { name: "Quick Learner", color: "text-[#8B5CF6] bg-[#8B5CF6]/5 border-[#8B5CF6]/20" },
                { name: "Continuous Learning", color: "text-[#D97706] bg-[#D97706]/5 border-[#D97706]/20" }
              ].map(tag => (
                <span key={tag.name} className={`px-3 py-1 rounded-full border ${tag.color}`}>
                  {tag.name}
                </span>
              ))}
            </div>
            
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-[#3730A3] mb-4">Research Interests</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Glacier Modeling</li>
                  <li>Satellite Image Processing (Optical & SAR)</li>
                  <li>Spatial Analysis (Flood Risk, Hazard Zonation)</li>
                  <li>Environmental Resource Management</li>
                  <li>Climate Change Mitigation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-[#3730A3] mb-4">Achievements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="font-medium">HKH Women on Ice Expedition</li>
                  <li className="text-sm opacity-80 text-[#00A8CC] font-medium">Ponkar Glacier, Kathmandu (ICIMOD 2024)</li>
                  <li className="font-medium mt-4">MSc Bronze Medalist</li>
                  <li className="text-sm opacity-80 text-[#00A8CC] font-medium">The Islamia University of Bahawalpur</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Professional Experience</h2>
            <div className="mt-4 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8 space-y-16">
            {[
              {
                role: "GIS Coordinator & Developer",
                company: "Defence Housing Authority Bahawalpur (DHAB)",
                date: "Jan 2026 - Present",
                desc: "Managing and coordinating GIS projects, including land use analysis, computerization of land records, and maintenance of spatial databases (telecom/sewerage). Develops GIS applications and provides technical support."
              },
              {
                role: "GIS Analyst",
                company: "Board of Revenue Punjab (BOR PULSE)",
                date: "Aug 2024 - Dec 2025",
                desc: "Expertise in digital land record systems, cadastral mapping, Parcel Mapping, and QC Check across Lodhran, Layyah, and Multan. Experienced in Massavi Reading, Georeferencing, and Vector error removal."
              },
              {
                role: "GIS Analyst",
                company: "URBAN UNIT / R2V Private Ltd",
                date: "Mar 2024 - Aug 2024",
                desc: "Focused on DHA Bwp Project. Maintained land data in COREGIS and Geoserver. Responsibilities included Land use analysis, computerization of records, Mosaicking (Masavi), and CAD to GIS conversion."
              },
              {
                role: "GIS Analyst",
                company: "Cholistan Development Authority (CDA) Project",
                date: "2023",
                desc: "Worked with the team to maintain urban GIS databases and ensure data accuracy and consistency."
              },
              {
                role: "GIS & RS Lab Coordinator / TA",
                company: "The Islamia University of Bahawalpur",
                date: "2021 - 2023",
                desc: "Managed geospatial analysis and database management. Teaching experience in GIS, Remote Sensing, Physical Geography, and Population Geography."
              }
            ].map((job, i) => (
              <div key={i} className="group relative">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-medium text-[#3730A3] group-hover:text-[#e8702a] transition-colors">{job.role}</h3>
                  <span className="text-sm font-medium text-[#8B5CF6]">{job.date}</span>
                </div>
                <p className="text-[#00A8CC] mb-4">{job.company}</p>
                <p className="text-gray-800 text-sm leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Education</h2>
            <div className="mt-4 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8 space-y-12">
            {[
              {
                degree: "Post Graduate Diploma in GIS & Remote Sensing",
                school: "The Islamia University of Bahawalpur",
                date: "2025 - 2026",
                grade: "3.74 / 4.0 GPA",
                thesis: "Geospatial Assessment of Permafrost Dynamics in the Eastern HKH Region"
              },
              {
                degree: "M.Phil. Geography & Geoinformatics",
                school: "The Islamia University of Bahawalpur",
                date: "2021 - 2023",
                grade: "3.96 / 4.0 GPA (Specialization: Glaciology)",
                thesis: "Impacts of Climate Change on the Cryosphere: A Geospatial Assessment of Glaciers of The Eastern HKH, Chitral, Pakistan"
              },
              {
                degree: "B.Sc (Botany, Zoology, Geography)",
                school: "Govt Degree College for Women DMR / IUB",
                date: "2019 - 2021",
                grade: "The Islamia University of Bahawalpur"
              },
              {
                degree: "MSc Geography (Bronze Medalist)",
                school: "The Islamia University of Bahawalpur",
                date: "2016 - 2018",
                grade: "3.6 / 4.0 GPA",
                thesis: "Socio-Economic Conditions of Darwaza Village Khanaspur (District: Abbottabad)"
              },
              {
                degree: "F.Sc (Pre Medical)",
                school: "Intermediate Education",
                date: "2014 - 2016"
              },
              {
                degree: "Matriculation (Physics, Chemistry, Biology)",
                school: "Secondary Education",
                date: "2012 - 2014"
              }
            ].map((edu, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-l border-gray-100 pl-6 relative">
                <div className="absolute left-[-5px] top-2 w-[10px] h-[10px] bg-gray-200 rounded-full"></div>
                <span className="text-sm font-medium text-[#8B5CF6] w-24 shrink-0">{edu.date}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#3730A3]">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm mb-2">{edu.school} {edu.grade ? `• ${edu.grade}` : ''}</p>
                  {edu.thesis && (
                    <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="font-medium text-[#3730A3]">Research:</span> "{edu.thesis}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Software Section */}
        <section id="skills" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Technical Expertise</h2>
            <div className="mt-4 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-widest text-[#3730A3] mb-6">GIS & Remote Sensing</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2"><span>•</span> Glacier Modeling & Cryosphere Assessment</li>
                <li className="flex gap-2"><span>•</span> Satellite Image Processing (Optical & SAR)</li>
                <li className="flex gap-2"><span>•</span> Spatial Analysis & Modeling (Permafrost, Flood Risk)</li>
                <li className="flex gap-2"><span>•</span> Image Processing (Classification, Change Detection)</li>
                <li className="flex gap-2"><span>•</span> Thematic & Physiographic Mapping</li>
                <li className="flex gap-2"><span>•</span> Cadastral, Parcel & Khasra Mapping</li>
                <li className="flex gap-2"><span>•</span> Hyperthermal Image Unmixing</li>
                <li className="flex gap-2"><span>•</span> Environmental Resource Management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-widest text-[#3730A3] mb-6">Professional Software</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#00A8CC] uppercase mb-2">GIS & CAD</p>
                  <p className="text-sm text-gray-800">ArcGIS Pro, QGIS, ArcMap, Google Earth Engine, AutoCAD</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#00A8CC] uppercase mb-2">Analysis & Data</p>
                  <p className="text-sm text-gray-800">Python, JavaScript (GEE), Jupyter, SPSS, Minitab, MATLAB, R Studio, XLSTAT</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#00A8CC] uppercase mb-2">Specialized Tools</p>
                  <p className="text-sm text-gray-800">Erdas Imagine, GNSS, LiDAR, GRACE Satellite Applications, Photoshop</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#00A8CC] uppercase mb-2">Research & Office</p>
                  <p className="text-sm text-gray-800">Mendeley, Endnote, Microsoft Office Suite</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Certifications</h2>
            <div className="mt-4 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {[
                { title: "Microwave Remote Sensing SAR", issuer: "Professional Training", date: "2025" },
                { title: "Esri MOOC: GIS & Climate Action", issuer: "Esri", date: "2024" },
                { title: "Empowering Women in GIT", issuer: "ICIMOD (Nepal)", date: "2024" },
                { title: "Google Earth Engine", issuer: "Punjab University", date: "2024" },
                { title: "Coordinate Reference Systems", issuer: "Spatial Data Representation", date: "2023" },
                { title: "Soil Sustainability", issuer: "PCWR", date: "2023" },
                { title: "OGGM Glacier Modeling", issuer: "Nepal Training", date: "2023" },
                { title: "HKH Women on Ice Expedition", issuer: "ICIMOD", date: "2024" }
              ].map((cert, i) => (
                <div key={i} className="group">
                  <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest">{cert.date}</span>
                  <h3 className="text-lg font-medium text-[#3730A3] group-hover:text-[#e8702a] transition-colors mt-1">{cert.title}</h3>
                  <p className="text-sm text-gray-500 font-light">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Publications</h2>
            <p className="mt-4 text-sm text-gray-500 max-w-[200px]">
              My research focuses on the intersection of climate change and geospatial assessment.
            </p>
            <div className="mt-6 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8 space-y-10">
            {[
              {
                title: "Glacier Recession and Climate Change in Chitral, Eastern Hindu Kush Mountains of Pakistan (1992-2022)",
                journal: "Geosciences (2025)",
                link: "https://doi.org/10.3390/geosciences15050167",
                impact: "Published May 2025"
              },
              {
                title: "Spatiotemporal analysis of temperature variability and trends in the Cholistan Desert, Pakistan: Implications for water management",
                journal: "Environmental Earth Sciences (2025)",
                link: "10.1007/s12665-025-12665-8"
              },
              {
                title: "Community Resilience and Innovation in Livelihood Strategies: Exploring the Drivers of Change in Mountain Agriculture in Lotkuh Valley, Pakistan",
                journal: "Journal of Asian Development Studies, 12(4) (2023)",
                link: "https://poverty.com.pk/index.php/Journal/article/view/35"
              },
              {
                title: "Changing Mountain Pastoralism and its Impacts in the Hindu Kush Himalayan Region: The Case of Kushum, Pakistan",
                journal: "Nomadic Peoples (2024)",
                link: "https://www.liverpooluniversitypress.co.uk/doi/full/10.3828/whpnp.63837646691066"
              },
              {
                title: "Water crisis in the Eastern Hindu Kush: a micro-level study of community-based irrigation water management in the mountain village Kushum, Pakistan",
                journal: "Published (2023)",
                link: "https://www.researchgate.net/publication/340288396_Water_crisis_in_the_Eastern_Hindu_Kush_a_micro-level_study_of_community-based_irrigation_water_management_in_the_mountain_village_Kushum_Pakistan",
                impact: "IF 3.8"
              }
            ].map((pub, i) => (
              <div key={i} className="border-b border-gray-100 pb-8 last:border-0 group">
                <h3 className="text-lg font-medium text-[#3730A3] mb-2 leading-snug group-hover:text-[#e8702a] transition-colors">
                  {pub.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#00A8CC] mb-3">
                  <span className="italic">{pub.journal}</span>
                  {pub.impact && <span className="text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-200 rounded uppercase tracking-wider">{pub.impact}</span>}
                </div>
                {pub.link && (
                  <a href={pub.link.startsWith('http') ? pub.link : `https://doi.org/${pub.link}`} target="_blank" rel="noopener" className="text-xs text-[#e8702a] font-medium tracking-wider uppercase hover:opacity-70">
                    Access Research →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Events & Achievements Section */}
        <section id="events" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Events & Achievements</h2>
            <p className="mt-4 text-sm text-gray-500 max-w-[200px]">
              Notable experiences, expeditions, and recognitions in my academic and professional journey.
            </p>
            <div className="mt-6 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-16">
              <div className="group">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-2xl font-medium text-[#3730A3] group-hover:text-[#e8702a] transition-colors">HKH Women on Ice Expedition</h3>
                  <span className="text-sm font-medium text-[#8B5CF6]">2024</span>
                </div>
                <p className="text-[#00A8CC] font-medium mb-2">ICIMOD (International Centre for Integrated Mountain Development)</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Participated in an all-women glacier expedition to Ponkar Glacier in the Eastern Hindu Kush Mountains, Nepal. Conducted field research on glacier dynamics and contributed to climate change impact assessments in the HKH region.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic border-l-2 border-[#e8702a] pl-4">
                  "Today was an unforgettable chapter of my trekking adventure... a journey that tested my endurance, but the support of the guide and the camaraderie of my group made the experience fulfilling." - From Day 5 Blog
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 bg-[#E8702A]/10 text-[#E8702A] rounded-full">Field Research</span>
                  <span className="text-xs px-3 py-1 bg-[#00A8CC]/10 text-[#00A8CC] rounded-full">Glacier Dynamics</span>
                  <span className="text-xs px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full">International Collaboration</span>
                </div>
                <a 
                  href="https://blog.icimod.org/cryosphere-water-risks/hkh-women-on-ice-daily-blogs/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-[#e8702a] text-sm font-medium hover:opacity-70 transition-opacity mb-6"
                >
                  Read Full Blog Series →
                </a>
              </div>

              <div className="border-t border-gray-100 pt-16">
                <h3 className="text-xl font-semibold text-gray-800 mb-8 uppercase tracking-widest text-sm">Recognitions & Awards</h3>
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#e8702a] mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-[#3730A3] mb-1 group-hover:text-[#e8702a] transition-colors">MSc Bronze Medalist</h4>
                        <p className="text-[#00A8CC] text-sm mb-2">The Islamia University of Bahawalpur <span className="text-[#8B5CF6] font-medium">(2018)</span></p>
                        <p className="text-gray-700 text-sm">Awarded for exceptional academic performance and research excellence during postgraduate studies in Geography.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#e8702a] mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-[#3730A3] mb-1 group-hover:text-[#e8702a] transition-colors">Empowering Women in GIT Certification</h4>
                        <p className="text-[#00A8CC] text-sm mb-2">ICIMOD <span className="text-[#8B5CF6] font-medium">(2024)</span></p>
                        <p className="text-gray-700 text-sm">Recognition for active participation and excellence in Women in Geospatial Information Technology program.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#e8702a] mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-[#3730A3] mb-1 group-hover:text-[#e8702a] transition-colors">GIS & Remote Sensing Excellence</h4>
                        <p className="text-[#00A8CC] text-sm mb-2">Professional Recognition <span className="text-[#8B5CF6] font-medium">(2023 - Present)</span></p>
                        <p className="text-gray-700 text-sm">Recognized for technical expertise and innovative solutions in GIS applications, cadastral mapping, and remote sensing projects.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-16">
                <h3 className="text-xl font-semibold text-gray-800 mb-8 uppercase tracking-widest text-sm">Conferences & Workshops</h3>
                <div className="space-y-6">
                  {[
                    { title: "Mountain Research Symposium", org: "HKH Region Studies", year: "2024" },
                    { title: "Climate Change & Geospatial Technologies", org: "ICIMOD", year: "2024" },
                    { title: "Advanced Remote Sensing Applications", org: "Punjab University", year: "2024" },
                    { title: "Glacier Modeling & Cryosphere Assessment", org: "Nepal Training", year: "2023" },
                    { title: "Cadastral Mapping & Land Records Digitization", org: "BOR Punjab", year: "2024-2025" }
                  ].map((conf, i) => (
                    <div key={i} className="flex justify-between items-baseline p-4 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-medium text-[#3730A3] group-hover:text-[#e8702a] transition-colors">{conf.title}</h4>
                        <p className="text-sm text-[#00A8CC] font-light">{conf.org}</p>
                      </div>
                      <span className="text-sm font-medium text-[#8B5CF6] ml-4 whitespace-nowrap">{conf.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Day 5 Blog Section */}
        <section id="blog" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Day 5 - A journey of challenges and beauty</h2>
            <p className="mt-4 text-sm text-gray-500 max-w-[200px]">
              Expedition diary from Ponkar Glacier
            </p>
            <div className="mt-6 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8">
            <div className="prose prose-sm max-w-none text-gray-700 space-y-8">
              <article className="space-y-8">
                <div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">Day 5 - A journey of challenges and beauty</h3>
                  <p className="text-[#00A8CC] text-sm mb-4 italic">From the HKH Women on Ice Expedition - <span className="text-[#8B5CF6] font-semibold">December 2024</span></p>
                  <p className="text-gray-800 font-medium text-base mb-6">Today’s blog is from Farhana Altaf.</p>
                </div>

                <div className="space-y-6">
                  <p className="leading-relaxed text-gray-700">
                    Today was an unforgettable chapter of my trekking adventure in Nepal. We left the hotel at 8 am after a hearty breakfast. I have always been curious about disasters. As we zigzagged through the rugged, rocky, and dusty mountain trail, sometimes climbing up to the hills and then down by the river, I saw different forms of landslides. My walking partner for the day was Dr Miriam Jackson from Norway, who is an external support for the expedition. I asked her many questions.
                  </p>

                  <p className="leading-relaxed text-gray-700">
                    Through her I learnt that these landslides are both natural and human induced. Natural ones are caused by heavy rainfall, while others are because of construction of roads, etc. She also pointed to different textures of heavy rocks and sand along the Marshyangdi River, one of the mountain rivers in Nepal, which hinted at the force of rivers and their impact on the landscape.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                        <img
                           src="/photos/photo 29.jpeg"
                           alt="Photo 29"
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                        <img
                           src="/photos/women-on-ice-day-5-1.jpg"
                           alt="Women on Ice Day 5 - 1"
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  <figure className="my-8">
                    <img
                      src="/photos/landslide-bhimthang.png"
                      alt="Landslide enroute to Bhimthang"
                      className="w-full h-[400px] object-cover rounded-2xl shadow-md border border-gray-100"
                    />
                    <figcaption className="text-xs text-[#00A8CC] mt-3 text-center italic">
                      Landslide enroute to Bhimthang. Photo: Purnima Shrestha.
                    </figcaption>
                  </figure>

                  <p className="leading-relaxed text-gray-700">
                    As we started to gain elevation, I noticed how vegetation and landforms changed. I learnt that conical and elongated shapes of trees are nature’s way of adapting to the high-altitude environment. Old erosion scars where tree roots were exposed, revealed the passage of time and nature’s unrelenting force.
                  </p>

                  <p className="leading-relaxed text-gray-700">
                    Though I have been up to 3,700 metres above sea level (masl) in Pakistan, hiking in the same elevation in Nepal was quite a challenge. Despite the pleasant weather, we were dressed in quite a few layers. Initially, we removed our second layer due to body warmth from trekking, but as we ascended, the chill returned, and we added the layer back along with windbreakers, gloves, and coats.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
                    {[
                      { src: "/photos/DSC08638.jpg", alt: "DSC08638" },
                      { src: "/photos/Image-6.jpg", alt: "Image-6" },
                      { src: "/photos/photo 12.jpeg", alt: "Photo 12" },
                      { src: "/photos/photo 11.jpeg", alt: "Photo 11" }
                    ].map((img, idx) => (
                      <div key={idx} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-16 border-t border-gray-200/80">
                  <h3 className="text-2xl font-playfair italic text-gray-800 mb-8">Photo Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    {[
                      { title: "HKH Women on Ice - Day 5", desc: "Trekking at elevation 3,600+ m with Dr Miriam Jackson, discovering glaciers that glistened like gold peaks in Nepal", url: "/photos/women-on-ice-day-5-1.jpg" },
                      { title: "Team Collaboration", desc: "Overcoming challenges together - 12-hour trek to Bhimthang (3,720 m) with guides Tula and Shankar", url: "/photos/women-on-ice-day-5-2.jpg" },
                      { title: "Glacier Research Expedition", desc: "Educational and emotional journey - learning geological processes and the impact of climate change on the HKH region", url: "/photos/women-on-ice-day-5-3.jpg" }
                    ].map((image, i) => (
                      <div key={i} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative aspect-[3/2] overflow-hidden bg-gray-50 mb-4">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 pt-0">
                          <h4 className="font-medium text-[#3730A3] group-hover:text-[#e8702a] transition-colors">{image.title}</h4>
                          <p className="text-sm text-gray-500 font-light mt-2">{image.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-gray-100">
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-[#00A8CC] mb-6">Expedition Archive Flow</h4>
                    <div className="relative w-full overflow-hidden py-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <div className="flex animate-marquee gap-4">
                        {[
                          "/photos/DSC09100.jpg",
                          "/photos/DSC09515.jpg",
                          "/photos/ICEMOD.png",
                          "/photos/group2.jpg",
                          "/photos/photo 1.jpeg",
                          "/photos/photo 2.jpeg",
                          "/photos/photo 3.jpeg",
                          "/photos/photo 4.jpeg",
                          "/photos/photo 5.jpeg",
                          "/photos/photo 6.jpeg",
                          "/photos/photo 7.jpeg",
                          "/photos/photo 8.jpeg",
                          "/photos/photo 9.jpeg",
                          "/photos/photo 10.jpeg",
                          "/photos/photo 13.jpeg",
                          "/photos/photo 14.jpeg",
                          "/photos/photo 15.jpeg",
                          "/photos/photo 16.jpeg",
                          "/photos/photo 17.jpeg",
                          "/photos/photo 18.jpeg",
                          "/photos/photo 19.jpeg",
                          "/photos/photo 20.jpeg",
                          "/photos/photo 21.jpeg",
                          "/photos/photo 22.jpeg",
                          "/photos/photo 23.jpeg",
                          "/photos/photo 24.jpeg",
                          "/photos/photo 25.jpeg",
                          "/photos/photo 26.jpeg",
                          "/photos/photo 28.jpeg",
                          "/photos/photo 30.jpeg",
                          "/photos/photo 31.jpeg",
                          "/photos/photo 32.jpeg",
                          "/photos/photo 33.jpeg",
                          "/photos/photo 34.jpeg",
                          "/photos/photo 35.jpeg",
                          "/photos/photo 36.jpeg",
                          "/photos/photo 37.jpeg",
                          "/photos/photo 38.jpeg",
                          "/photos/photo 39.jpeg",
                          "/photos/photo 40.jpeg",
                          "/photos/photo 41.jpeg",
                          "/photos/women-ice-day-1-2-3.jpg",
                          "/photos/women-on-ice-day-5-4.jpg",
                          "/photos/women-on-ice-day-9-1.jpg"
                        ].map((src, i) => (
                          <div key={i} className="w-64 h-48 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <img
                              src={src}
                              alt="Expedition Photo"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ))}
                        {[
                          "/photos/DSC09100.jpg",
                          "/photos/DSC09515.jpg",
                          "/photos/ICEMOD.png",
                          "/photos/group2.jpg",
                          "/photos/photo 1.jpeg",
                          "/photos/photo 2.jpeg",
                          "/photos/photo 3.jpeg",
                          "/photos/photo 4.jpeg",
                          "/photos/photo 5.jpeg",
                          "/photos/photo 6.jpeg",
                          "/photos/photo 7.jpeg",
                          "/photos/photo 8.jpeg",
                          "/photos/photo 9.jpeg",
                          "/photos/photo 10.jpeg",
                          "/photos/photo 13.jpeg",
                          "/photos/photo 14.jpeg",
                          "/photos/photo 15.jpeg",
                          "/photos/photo 16.jpeg",
                          "/photos/photo 17.jpeg",
                          "/photos/photo 18.jpeg",
                          "/photos/photo 19.jpeg",
                          "/photos/photo 20.jpeg",
                          "/photos/photo 21.jpeg",
                          "/photos/photo 22.jpeg",
                          "/photos/photo 23.jpeg",
                          "/photos/photo 24.jpeg",
                          "/photos/photo 25.jpeg",
                          "/photos/photo 26.jpeg",
                          "/photos/photo 28.jpeg",
                          "/photos/photo 30.jpeg",
                          "/photos/photo 31.jpeg",
                          "/photos/photo 32.jpeg",
                          "/photos/photo 33.jpeg",
                          "/photos/photo 34.jpeg",
                          "/photos/photo 35.jpeg",
                          "/photos/photo 36.jpeg",
                          "/photos/photo 37.jpeg",
                          "/photos/photo 38.jpeg",
                          "/photos/photo 39.jpeg",
                          "/photos/photo 40.jpeg",
                          "/photos/photo 41.jpeg",
                          "/photos/women-ice-day-1-2-3.jpg",
                          "/photos/women-on-ice-day-5-4.jpg",
                          "/photos/women-on-ice-day-9-1.jpg"
                        ].map((src, i) => (
                          <div key={`dup-${i}`} className="w-64 h-48 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <img
                              src={src}
                              alt="Expedition Photo"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <a href="https://blog.icimod.org/cryosphere-water-risks/hkh-women-on-ice-daily-blogs/" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[#e8702a] font-medium hover:opacity-70 transition-opacity">
                    Read full expedition blog series on ICIMOD →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section id="references" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">References</h2>
            <div className="mt-4 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8 flex flex-col sm:flex-row gap-12">
            <div>
              <h3 className="text-lg font-medium text-[#3730A3]">Dr. Zahir Ahmad</h3>
              <p className="text-sm text-[#00A8CC] mb-4 font-light">Lecturer, Department of Geography, IUB</p>
              <div className="space-y-1 text-sm border-l border-gray-100 pl-4">
                <p className="text-[#00A8CC] font-medium">+92 300 2450553</p>
                <p className="text-[#8B5CF6]">Zahir.ahmad@iub.edu.pk</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#3730A3]">Prof.Dr. Sher Muhammad Malik</h3>
              <p className="text-sm text-[#00A8CC] mb-4 font-light">Professor / Chairman Hall Council, IUB</p>
              <div className="space-y-1 text-sm border-l border-gray-100 pl-4">
                <p className="text-[#00A8CC] font-medium">+92 345 5820158</p>
                <p className="text-[#8B5CF6]">sher.malik@iub.edu.pk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Contact & Footer Section */}
        <section id="contact" className="space-y-32">
          {/* Bento Grid - What I'm open to */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-12 mb-8">
              <span className="text-xs font-bold text-[#E8702A] uppercase tracking-[0.3em] block mb-3">OPPORTUNITIES</span>
              <h2 className="text-4xl sm:text-5xl font-playfair italic leading-tight">
                What I'm <span className="bg-gradient-to-r from-[#E8702A] to-[#FFDAB9] bg-clip-text text-transparent font-medium">open to</span>
              </h2>
              <p className="mt-4 text-lg text-gray-500 font-light max-w-2xl">
                I'm currently seeking opportunities where I can apply my GIS expertise to global challenges.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  title: "PhD Scholarships", 
                  desc: "Seeking PhD opportunities and research funding for atmospheric, glacial, and cryosphere studies.", 
                  color: "#E8702A",
                  glow: "rgba(232, 112, 42, 0.08)",
                  gradient: "hover:bg-gradient-to-br hover:from-white hover:to-[#E8702A]/5 hover:border-[#E8702A]/30"
                },
                { 
                  title: "Research Collaboration", 
                  desc: "Joining forces on climate change, SAR, and HKH region studies.", 
                  color: "#00A8CC",
                  glow: "rgba(0, 168, 204, 0.08)",
                  gradient: "hover:bg-gradient-to-br hover:from-white hover:to-[#00A8CC]/5 hover:border-[#00A8CC]/30"
                },
                { 
                  title: "Freelance", 
                  desc: "Specialized GIS analysis, cadastral mapping, and remote sensing projects.", 
                  color: "#8B5CF6",
                  glow: "rgba(139, 92, 246, 0.08)",
                  gradient: "hover:bg-gradient-to-br hover:from-white hover:to-[#8B5CF6]/5 hover:border-[#8B5CF6]/30"
                },
                { 
                  title: "Teaching", 
                  desc: "Knowledge sharing in GIS, RS, and Physical Geography.", 
                  color: "#D97706",
                  glow: "rgba(217, 119, 6, 0.08)",
                  gradient: "hover:bg-gradient-to-br hover:from-white hover:to-[#D97706]/5 hover:border-[#D97706]/30"
                }
              ].map((item) => (
                <div 
                  key={item.title} 
                  className={`group p-8 rounded-[2rem] bg-[#FDFCFB] border border-stone-200/80 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[var(--glow-color)] ${item.gradient}`}
                  style={{ 
                    '--hover-color': item.color, 
                    '--glow-color': item.glow 
                  } as React.CSSProperties}
                >
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-500">
                      <div className="w-2.5 h-2.5 rounded-full relative" style={{ backgroundColor: item.color }}>
                        <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: item.color }}></div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400">Available</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#3730A3] mb-3 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex-1 p-8 rounded-[2rem] bg-gradient-to-br from-[#1E1B4B] to-[#0F0C31] text-white flex flex-col justify-between group overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-500 border border-white/5">
                <div className="relative z-10">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#00A8CC] font-bold block mb-3">GET IN TOUCH</span>
                  <h3 className="text-2xl font-playfair italic mb-4">Let's start a conversation</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    I read every message. Email is the best way to get a quick response.
                  </p>
                </div>
                <div className="relative z-10 mt-12 flex flex-wrap gap-3">
                  <a 
                    href="mailto:farhana786altaf@gmail.com" 
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm group-hover:scale-[1.02]"
                  >
                    <span>Say Hi</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                  <a 
                    href="https://calendly.com/farhana786altaf/30min" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#00A8CC]/20 hover:bg-[#00A8CC]/30 border border-[#00A8CC]/30 hover:border-[#00A8CC]/50 rounded-full text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm hover:scale-[1.02]"
                  >
                    <span>Book a Call</span>
                    <ArrowUpRight size={16} className="transition-transform hover:translate-x-1 hover:-translate-y-1" />
                  </a>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E8702A] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00A8CC] rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://www.linkedin.com/in/farhanaaltaf4213/" 
                  target="_blank" 
                  rel="noopener"
                  className="p-6 rounded-[2rem] border border-stone-200/80 flex items-center justify-between group hover:bg-white hover:border-[#00A8CC]/30 hover:shadow-md transition-all duration-500"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-gray-400 group-hover:text-[#00A8CC] transition-colors" />
                    <span className="font-medium text-sm text-gray-700 group-hover:text-black transition-colors">LinkedIn</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#00A8CC] group-hover:border-[#00A8CC] group-hover:text-white transition-all">
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-500 group-hover:text-white" />
                  </div>
                </a>
                <a 
                  href="https://github.com/FarhanaAltaf" 
                  target="_blank" 
                  rel="noopener"
                  className="p-6 rounded-[2rem] border border-stone-200/80 flex items-center justify-between group hover:bg-white hover:border-[#8B5CF6]/30 hover:shadow-md transition-all duration-500"
                >
                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-gray-400 group-hover:text-[#8B5CF6] transition-colors" />
                    <span className="font-medium text-sm text-gray-700 group-hover:text-black transition-colors">GitHub</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:border-[#8B5CF6] group-hover:text-white transition-all">
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-500 group-hover:text-white" />
                  </div>
                </a>
              </div>

              <a 
                href="#publications" 
                className="p-8 rounded-[2rem] border border-stone-200/80 flex items-center justify-between group hover:bg-white hover:border-[#e8702a]/30 hover:shadow-md transition-all duration-500"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-gray-400 group-hover:text-[#E8702A] transition-colors" />
                    <span className="font-medium text-[#3730A3] text-lg">Publications</span>
                  </div>
                  <span className="text-xs text-gray-400 font-light mt-1 uppercase tracking-widest pl-6">Research Archive</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-[#E8702A] group-hover:border-[#E8702A] group-hover:text-white transition-all">
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-500 group-hover:text-white" />
                </div>
              </a>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="relative py-24 border-t border-stone-200 flex flex-col items-center text-center overflow-hidden">
            <h2 className="text-7xl sm:text-8xl md:text-9xl font-playfair italic tracking-tighter bg-gradient-to-r from-[#00A8CC] via-[#FFDAB9] to-[#E8702A] bg-clip-text text-transparent absolute top-6 pointer-events-none select-none w-full text-center opacity-25">
              Let's Connect
            </h2>
            <div className="relative z-10 mt-12">
              <p className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-8 font-semibold">Contact Information</p>
              <div className="flex flex-col gap-6 mb-16">
                <a 
                  href="mailto:farhana786altaf@gmail.com" 
                  className="group flex items-center justify-center gap-3 text-2xl sm:text-4xl md:text-5xl font-light hover:text-[#e8702a] transition-colors tracking-tight"
                >
                  <Mail size={32} className="text-gray-400 group-hover:text-[#e8702a] group-hover:scale-110 transition-all duration-300" />
                  <span className="border-b border-transparent group-hover:border-[#e8702a] pb-1 transition-all duration-300">
                    farhana786altaf@gmail.com
                  </span>
                </a>
                <span className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-light text-gray-500">
                  <Phone size={24} className="text-gray-400" />
                  <span>+92 318 6704213</span>
                </span>
              </div>
              
              <div className="flex gap-12 justify-center text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                <a href="https://github.com/FarhanaAltaf" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5 group">
                  <Github size={12} className="text-gray-400 group-hover:text-[#8B5CF6]" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/farhanaaltaf4213/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00A8CC] transition-colors flex items-center gap-1.5 group">
                  <Linkedin size={12} className="text-gray-400 group-hover:text-[#00A8CC]" /> LinkedIn
                </a>
                <a href="https://calendly.com/farhana786altaf/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[#00A8CC] transition-colors flex items-center gap-1.5 group">
                  <ArrowUpRight size={12} className="text-gray-400 group-hover:text-[#00A8CC]" /> Book Call
                </a>
                <a href="#publications" className="hover:text-[#E8702A] transition-colors flex items-center gap-1.5 group">
                  <BookOpen size={12} className="text-gray-400 group-hover:text-[#E8702A]" /> Publications
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-20 border-t border-stone-200/80 bg-stone-50/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-gray-400">
          <p>© 2026 Farhana Altaf</p>
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8702a] animate-pulse"></div>
            <p className="font-semibold text-gray-500">GIS Specialist & Researcher</p>
          </div>
          <p className="flex items-center gap-1 text-[#00A8CC] font-bold">
            Built for the HKH Region
          </p>
        </div>
      </footer>
    </div>
  )
}
