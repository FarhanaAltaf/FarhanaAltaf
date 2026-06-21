import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
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
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 mix-blend-difference">
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl font-playfair italic font-medium">Farhana Altaf</span>
        </div>

        <div className="hidden md:flex bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-white/90 hover:bg-white/20 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <a
          href="https://github.com/FarhanaAltaf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-all shadow-sm"
        >
          GitHub
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
          <h1 className="text-white leading-[1] mt-[-10dvh]">
            <span
              className="block font-playfair italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.03em', animationDelay: '0.2s' }}
            >
              Farhana Altaf
            </span>
            <span
              className="block font-medium text-lg sm:text-xl md:text-2xl mt-6 tracking-[0.2em] uppercase opacity-80 hero-anim hero-reveal"
              style={{ animationDelay: '0.4s' }}
            >
              GIS Developer | Researcher | Scholar
            </span>
          </h1>
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
                "Self-Management", "Self-Discipline", "Integrity", "Energetic & Initiative", 
                "Punctuality", "Polite Personality", "Quick Learner", "Continuous Learning"
              ].map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-4">Research Interests</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Glacier Modeling</li>
                  <li>Satellite Image Processing (Optical & SAR)</li>
                  <li>Spatial Analysis (Flood Risk, Hazard Zonation)</li>
                  <li>Environmental Resource Management</li>
                  <li>Climate Change Mitigation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-4">Achievements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="font-medium">HKH Women on Ice Expedition</li>
                  <li className="text-sm opacity-80">Ponkar Glacier, Kathmandu (ICIMOD 2024)</li>
                  <li className="font-medium mt-4">MSc Bronze Medalist</li>
                  <li className="text-sm opacity-80">The Islamia University of Bahawalpur</li>
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
                  <h3 className="text-xl font-medium group-hover:text-[#e8702a] transition-colors">{job.role}</h3>
                  <span className="text-sm font-light text-gray-500">{job.date}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.company}</p>
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
                <span className="text-sm font-light text-gray-400 w-24 shrink-0">{edu.date}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm mb-2">{edu.school} {edu.grade ? `• ${edu.grade}` : ''}</p>
                  {edu.thesis && (
                    <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="font-medium text-gray-700">Research:</span> "{edu.thesis}"
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
              <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-6">GIS & Remote Sensing</h3>
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
              <h3 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-6">Professional Software</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">GIS & CAD</p>
                  <p className="text-sm text-gray-800">ArcGIS Pro, QGIS, ArcMap, Google Earth Engine, AutoCAD</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Analysis & Data</p>
                  <p className="text-sm text-gray-800">Python, JavaScript (GEE), Jupyter, SPSS, Minitab, MATLAB, R Studio, XLSTAT</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Specialized Tools</p>
                  <p className="text-sm text-gray-800">Erdas Imagine, GNSS, LiDAR, GRACE Satellite Applications, Photoshop</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Research & Office</p>
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
                  <span className="text-[10px] font-bold text-[#e8702a] uppercase tracking-widest">{cert.date}</span>
                  <h3 className="text-lg font-medium group-hover:text-[#e8702a] transition-colors mt-1">{cert.title}</h3>
                  <p className="text-sm text-gray-500 font-light">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 self-start sticky top-24">
            <h2 className="text-3xl font-playfair italic">Selected Publications</h2>
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
                title: "Resilience and Innovation in Mountain Agriculture: Exploring the Drivers of Agricultural Transformation in the Eastern Hindu Kush, Lotkuh, Pakistan",
                journal: "Journal of Asian Development Studies, 12(4) (2023)"
              },
              {
                title: "Changing Mountain Pastoralism and its Impacts in the HKH region: Case of Kushum, Pakistan",
                journal: "Nomadic Peoples (2024)"
              },
              {
                title: "Climate change impact on Irrigation Water in the Eastern Hindu Kush: The case of Kushum, Chitral, Pakistan",
                journal: "Published (2023)",
                impact: "IF 3.8"
              }
            ].map((pub, i) => (
              <div key={i} className="border-b border-gray-100 pb-8 last:border-0 group">
                <h3 className="text-lg font-normal mb-2 leading-snug group-hover:text-[#e8702a] transition-colors">
                  {pub.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                  <h3 className="text-2xl font-medium group-hover:text-[#e8702a] transition-colors">HKH Women on Ice Expedition</h3>
                  <span className="text-sm font-light text-gray-500">2024</span>
                </div>
                <p className="text-gray-600 font-medium mb-2">ICIMOD (International Centre for Integrated Mountain Development)</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Participated in an all-women glacier expedition to Ponkar Glacier in the Eastern Hindu Kush Mountains, Nepal. Conducted field research on glacier dynamics and contributed to climate change impact assessments in the HKH region.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic border-l-2 border-[#e8702a] pl-4">
                  "Today was an unforgettable chapter of my trekking adventure... a journey that tested my endurance, but the support of the guide and the camaraderie of my group made the experience fulfilling." - From Day 5 Blog
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 bg-[#e8702a]/10 text-[#e8702a] rounded-full">Field Research</span>
                  <span className="text-xs px-3 py-1 bg-[#e8702a]/10 text-[#e8702a] rounded-full">Glacier Dynamics</span>
                  <span className="text-xs px-3 py-1 bg-[#e8702a]/10 text-[#e8702a] rounded-full">International Collaboration</span>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-8 uppercase tracking-widest text-sm">Day 5 Blog: A Journey of Challenges and Beauty</h3>
                <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">The Trek Begins</h4>
                    <p>Today was an unforgettable chapter of my trekking adventure in Nepal. We left the hotel at 8 am after a hearty breakfast. I have always been curious about disasters. As we zigzagged through the rugged, rocky, and dusty mountain trail, sometimes climbing up to the hills and then down by the river, I saw different forms of landslides. My walking partner for the day was Dr Miriam Jackson from Norway, who is an external support for the expedition.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Learning from Geological Processes</h4>
                    <p>Through Dr Jackson, I learnt that landslides are both natural and human induced. Natural ones are caused by heavy rainfall, while others are because of construction of roads, etc. She also pointed to different textures of heavy rocks and sand along the Marshyangdi River, one of the mountain rivers in Nepal, which hinted at the force of rivers and their impact on the landscape. As we started to gain elevation, I noticed how vegetation and landforms changed. I learnt that conical and elongated shapes of trees are nature's way of adapting to the high-altitude environment.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Facing the Challenges of High Altitude</h4>
                    <p>Though I have been up to 3,700 metres above sea level (masl) in Pakistan, hiking in the same elevation in Nepal was quite a challenge. Despite the pleasant weather, we were dressed in quite a few layers. Initially, we removed our second layer due to body warmth from trekking, but as we ascended, the chill returned, and we added the layer back along with windbreakers, gloves, and coats.</p>
                    <p className="mt-3">I am thankful to our guides, particularly Tula and Shankar, who patiently helped us throughout the day. They helped carry our overloaded luggage and met us at every kilometre with cups of ginger-lemon tea, which provided much-needed warmth and energy.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Glaciers as Gold Peaks: A Living Classroom</h4>
                    <p>At around 3,600 masl, I had my first experience of seeing glaciers in Nepal, which was stunning. The way they glistened under the sunlight, made them look like gold peaks. This reminded me of the pressing issue of climate change. Rising temperatures and extreme weather events, such as heavy monsoons, contribute to accelerated glacier melt and landslides. The scenery was both a marvel and a warning of the changing environment.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">A Moment of Triumph</h4>
                    <p>The trek to Bhimthang (3,720 masl) was not just a physical journey but an educational and emotional one. I learned about geological processes, erosion patterns, and the impact of climate change. The challenges tested my endurance, but the support of the guide and the camaraderie of my group made the experience fulfilling. Reaching Bhimthang Guest House around 8 pm, after walking for 12 hours was a moment of triumph. This day will remain etched in my memory as a testament to the resilience required for working on ice and the wonders that await those who embrace the challenge.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-16">
                <h3 className="text-xl font-semibold text-gray-800 mb-8 uppercase tracking-widest text-sm">Photo Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "HKH Women on Ice - Day 5", desc: "Trekking at elevation 3,600+ m with Dr Miriam Jackson, discovering glaciers that glistened like gold peaks in Nepal", url: "/photos/women-on-ice-day-5-1.jpg" },
                    { title: "Team Collaboration", desc: "Overcoming challenges together - 12-hour trek to Bhimthang (3,720 m) with guides Tula and Shankar", url: "/photos/women-on-ice-day-5-2.jpg" },
                    { title: "Glacier Research Expedition", desc: "Educational and emotional journey - learning geological processes and the impact of climate change on the HKH region", url: "/photos/women-on-ice-day-5-3.jpg" }
                  ].map((image, i) => (
                    <div key={i} className="group overflow-hidden rounded-lg">
                      <div className="relative h-72 overflow-hidden rounded-lg bg-gray-100 mb-4">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end">
                          <div className="w-full p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <p className="text-white text-sm font-light">{image.desc}</p>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-800 group-hover:text-[#e8702a] transition-colors">{image.title}</h4>
                      <p className="text-sm text-gray-500 font-light mt-1">{image.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-16">
                <h3 className="text-xl font-semibold text-gray-800 mb-8 uppercase tracking-widest text-sm">Recognitions & Awards</h3>
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#e8702a] mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium mb-1 group-hover:text-[#e8702a] transition-colors">MSc Bronze Medalist</h4>
                        <p className="text-gray-600 text-sm mb-2">The Islamia University of Bahawalpur (2018)</p>
                        <p className="text-gray-700 text-sm">Awarded for exceptional academic performance and research excellence during postgraduate studies in Geography.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#e8702a] mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium mb-1 group-hover:text-[#e8702a] transition-colors">Empowering Women in GIT Certification</h4>
                        <p className="text-gray-600 text-sm mb-2">ICIMOD (2024)</p>
                        <p className="text-gray-700 text-sm">Recognition for active participation and excellence in Women in Geospatial Information Technology program.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#e8702a] mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium mb-1 group-hover:text-[#e8702a] transition-colors">GIS & Remote Sensing Excellence</h4>
                        <p className="text-gray-600 text-sm mb-2">Professional Recognition (2023 - Present)</p>
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
                        <h4 className="font-medium text-gray-800 group-hover:text-[#e8702a] transition-colors">{conf.title}</h4>
                        <p className="text-sm text-gray-500 font-light">{conf.org}</p>
                      </div>
                      <span className="text-sm font-light text-gray-400 ml-4 whitespace-nowrap">{conf.year}</span>
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
            <h2 className="text-3xl font-playfair italic">Day 5 Blog</h2>
            <p className="mt-4 text-sm text-gray-500 max-w-[200px]">
              A journey of challenges and beauty - Expedition diary from Ponkar Glacier
            </p>
            <div className="mt-6 w-12 h-[2px] bg-black/10"></div>
          </div>
          <div className="md:col-span-8">
            <div className="prose prose-sm max-w-none text-gray-700 space-y-8">
              <article className="space-y-8">
                <div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-4">A Journey of Challenges and Beauty</h3>
                  <p className="text-gray-600 text-sm mb-6 italic">From the HKH Women on Ice Expedition - December 2024</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">The Trek Begins</h4>
                  <p className="leading-relaxed text-gray-700">Today was an unforgettable chapter of my trekking adventure in Nepal. We left the hotel at 8 am after a hearty breakfast. I have always been curious about disasters. As we zigzagged through the rugged, rocky, and dusty mountain trail, sometimes climbing up to the hills and then down by the river, I saw different forms of landslides. My walking partner for the day was Dr Miriam Jackson from Norway, who is an external support for the expedition.</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Learning from Geological Processes</h4>
                  <p className="leading-relaxed text-gray-700">Through Dr Jackson, I learnt that landslides are both natural and human induced. Natural ones are caused by heavy rainfall, while others are because of construction of roads, etc. She also pointed to different textures of heavy rocks and sand along the Marshyangdi River, one of the mountain rivers in Nepal, which hinted at the force of rivers and their impact on the landscape. As we started to gain elevation, I noticed how vegetation and landforms changed. I learnt that conical and elongated shapes of trees are nature's way of adapting to the high-altitude environment.</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Facing the Challenges of High Altitude</h4>
                  <p className="leading-relaxed text-gray-700">Though I have been up to 3,700 metres above sea level (masl) in Pakistan, hiking in the same elevation in Nepal was quite a challenge. Despite the pleasant weather, we were dressed in quite a few layers. Initially, we removed our second layer due to body warmth from trekking, but as we ascended, the chill returned, and we added the layer back along with windbreakers, gloves, and coats.</p>
                  <p className="leading-relaxed text-gray-700 mt-4">I am thankful to our guides, particularly Tula and Shankar, who patiently helped us throughout the day. They helped carry our overloaded luggage and met us at every kilometre with cups of ginger-lemon tea, which provided much-needed warmth and energy.</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Glaciers as Gold Peaks: A Living Classroom</h4>
                  <p className="leading-relaxed text-gray-700">At around 3,600 masl, I had my first experience of seeing glaciers in Nepal, which was stunning. The way they glistened under the sunlight, made them look like gold peaks. This reminded me of the pressing issue of climate change. Rising temperatures and extreme weather events, such as heavy monsoons, contribute to accelerated glacier melt and landslides. The scenery was both a marvel and a warning of the changing environment.</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">A Moment of Triumph</h4>
                  <p className="leading-relaxed text-gray-700">The trek to Bhimthang (3,720 masl) was not just a physical journey but an educational and emotional one. I learned about geological processes, erosion patterns, and the impact of climate change. The challenges tested my endurance, but the support of the guide and the camaraderie of my group made the experience fulfilling. Reaching Bhimthang Guest House around 8 pm, after walking for 12 hours was a moment of triumph. This day will remain etched in my memory as a testament to the resilience required for working on ice and the wonders that await those who embrace the challenge.</p>
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
              <h3 className="text-lg font-medium">Dr. Zahir Ahmad</h3>
              <p className="text-sm text-gray-600 mb-4 font-light">Lecturer, Department of Geography, IUB</p>
              <div className="space-y-1 text-sm border-l border-gray-100 pl-4">
                <p className="text-gray-500">+92 300 2450553</p>
                <p className="text-gray-500">Zahir.ahmad@iub.edu.pk</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Prof.Dr. Sher Muhammad Malik</h3>
              <p className="text-sm text-gray-600 mb-4 font-light">Professor / Chairman Hall Council, IUB</p>
              <div className="space-y-1 text-sm border-l border-gray-100 pl-4">
                <p className="text-gray-500">0345 5820158</p>
                <p className="text-gray-500">sher.malik@iub.edu.pk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Contact & Footer Section */}
        <section id="contact" className="space-y-32">
          {/* Bento Grid - What I'm open to */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-12 mb-8">
              <h2 className="text-4xl sm:text-5xl font-playfair italic leading-tight">
                What I'm <span className="text-[#e8702a]">open to</span>
              </h2>
              <p className="mt-6 text-xl text-gray-500 font-light max-w-2xl">
                I'm currently seeking opportunities where I can apply my GIS expertise to global challenges.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Scholarships", desc: "Graduate and research funding for atmospheric and glacial studies." },
                { title: "Research Collaboration", desc: "Joining forces on climate change, SAR, and HKH region studies." },
                { title: "Freelance", desc: "Specialized GIS analysis, cadastral mapping, and remote sensing projects." },
                { title: "Teaching", desc: "Knowledge sharing in GIS, RS, and Physical Geography." }
              ].map((item) => (
                <div key={item.title} className="group p-8 rounded-[2rem] bg-stone-50 border border-stone-200/60 hover:bg-white hover:border-[#e8702a]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#e8702a]/5">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <div className="w-2 h-2 rounded-full bg-[#e8702a]"></div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Available</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex-1 p-8 rounded-[2rem] bg-[#1A1A1A] text-white flex flex-col justify-between group overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-2xl font-playfair italic mb-4">Let's start a conversation</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    I read every message. Email is the best way to get a quick response.
                  </p>
                </div>
                <div className="relative z-10 mt-12">
                  <a href="mailto:farhana786altaf@gmail.com" className="group flex items-center gap-3 text-lg hover:text-[#e8702a] transition-colors">
                    Say Hi <span className="transition-transform group-hover:translate-x-2">→</span>
                  </a>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#e8702a] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://www.linkedin.com/in/farhanaaltaf4213/" 
                  target="_blank" 
                  rel="noopener"
                  className="p-6 rounded-[2rem] border border-stone-200 flex items-center justify-between group hover:bg-stone-50 transition-colors"
                >
                  <span className="font-medium text-sm">LinkedIn</span>
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-white group-hover:border-[#e8702a] transition-all">
                    <span className="group-hover:translate-x-0.5 transition-transform text-xs">→</span>
                  </div>
                </a>
                <a 
                  href="https://github.com/FarhanaAltaf" 
                  target="_blank" 
                  rel="noopener"
                  className="p-6 rounded-[2rem] border border-stone-200 flex items-center justify-between group hover:bg-stone-50 transition-colors"
                >
                  <span className="font-medium text-sm">GitHub</span>
                  <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-white group-hover:border-[#e8702a] transition-all">
                    <span className="group-hover:translate-x-0.5 transition-transform text-xs">→</span>
                  </div>
                </a>
              </div>

              <a 
                href="#publications" 
                className="p-8 rounded-[2rem] border border-stone-200 flex items-center justify-between group hover:bg-stone-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-lg">Publications</span>
                  <span className="text-xs text-gray-400 font-light mt-1 uppercase tracking-widest">Research Archive</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-white group-hover:border-[#e8702a] transition-all">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="relative py-24 border-t border-stone-100 flex flex-col items-center text-center">
            <h2 className="text-7xl sm:text-8xl md:text-9xl font-playfair italic tracking-tighter text-stone-100 absolute top-10 pointer-events-none select-none">
              Get in Touch
            </h2>
            <div className="relative z-10 mt-12">
              <p className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-8">Contact Information</p>
              <div className="flex flex-col gap-4 mb-16">
                <a href="mailto:farhana786altaf@gmail.com" className="text-3xl sm:text-4xl md:text-5xl font-light hover:text-[#e8702a] transition-colors tracking-tight">
                  farhana786altaf@gmail.com
                </a>
                <span className="text-2xl sm:text-3xl font-light text-gray-400">+92 318 6704213</span>
              </div>
              
              <div className="flex gap-12 justify-center text-sm font-medium tracking-widest uppercase">
                <a href="https://github.com/FarhanaAltaf" target="_blank" className="hover:text-[#e8702a] transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/farhanaaltaf4213/" target="_blank" className="hover:text-[#e8702a] transition-colors">LinkedIn</a>
                <a href="#publications" className="hover:text-[#e8702a] transition-colors">Publications</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-20 border-t border-stone-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-gray-400">
          <p>© 2026 Farhana Altaf</p>
          <div className="flex items-center gap-4">
            <div className="w-1 h-1 rounded-full bg-[#e8702a]"></div>
            <p>GIS Specialist & Researcher</p>
          </div>
          <p>Built for the HKH Region</p>
        </div>
      </footer>
    </div>
  )
}
