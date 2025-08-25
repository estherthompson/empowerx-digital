import React, { useEffect, useRef, useState } from 'react';
import vision from '../assets/1.png'
import mission from '../assets/2.png'
import carousel1 from '../assets/4.png'
import carousel2 from '../assets/5.png'
import carousel3 from '../assets/6.png'
const Home = () => {
  const canvasRef = useRef(null);
  const [openSection, setOpenSection] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleSection = (sectionNumber) => {
    setOpenSection(openSection === sectionNumber ? null : sectionNumber);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: 0, y: 0 };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Particle system
    const particles = [];
    const particleCount = 200;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.vz = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.shape = Math.random() > 0.5 ? 'circle' : 'square';
      }

      update() {
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (this.z < 0 || this.z > 1000) this.vz *= -1;

        // Mouse interaction - particles spread away from mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          // Reverse direction to make particles move away from mouse
          this.vx -= dx * force * 0.02;
          this.vy -= dy * force * 0.02;
        }

        // Apply friction
        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      draw() {
        // Remove 3D scaling to fix positioning
        const x = this.x;
        const y = this.y;
        const size = this.size;

        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          ctx.fillStyle = `rgba(59, 130, 246, 1.8)`;
          
          if (this.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Square shape
            ctx.fillRect(x - size, y - size, size * 2, size * 2);
          }
        }
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)';
      ctx.lineWidth = 2;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const x1 = p1.x;
          const y1 = p1.y;
          const x2 = p2.x;
          const y2 = p2.y;
          
          const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
          
          if (distance < 200) {
            const opacity = (200 - distance) / 200 * 1.0;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative">
      {/* 3D Interactive Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Home Section */}
      <section id="home" className="relative z-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
            Empower<span className='text-[#fe9900]'>X</span> <span className="font-light italic">Digital</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Empowering Tomorrow's Digital Leaders
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
          >
            Learn More
          </button>
          
          {/* Photo Carousel */}
          <div className="mt-16 max-w-4xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                <div className="w-full flex-shrink-0 p-4 md:p-8">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#FF7A00]">Digital Innovation Hub</h3>
                    <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">State-of-the-art facilities where creativity meets technology</p>
                    <div className="relative h-40 md:h-64 rounded-xl overflow-hidden bg-gradient-to-r from-[#00BFA5] to-[#0056D2]">
                      <img src={carousel1} alt="Digital Innovation Hub" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20 rounded-xl"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex-shrink-0 p-4 md:p-8">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#2ECC71]">Youth Empowerment</h3>
                    <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">Empowering the next generation of digital leaders</p>
                    <div className="relative h-40 md:h-64 rounded-xl overflow-hidden bg-gradient-to-r from-[#FF7A00] to-[#2ECC71]">
                      <img src={carousel2} alt="Youth Empowerment" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20 rounded-xl"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex-shrink-0 p-4 md:p-8">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0056D2]">Mentorship & Networking</h3>
                    <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">Collaborative growth through meaningful connections and expert guidance</p>
                    <div className="relative h-40 md:h-64 rounded-xl overflow-hidden bg-gradient-to-r from-[#2ECC71] to-[#FF7A00]">
                      <img src={carousel3} alt="Mentorship & Networking" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-[#00BFA5]' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              

            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 min-h-screen flex items-center justify-center bg-black/50">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-5xl font-bold mb-8 text-[#2ECC71]">About Us</h2>
            <p className="text-xl leading-relaxed mb-8">
            At EmpowerX Digital, we believe the future belongs to those who can navigate and shape the digital landscape.
            Our mission centers on fostering digital empowerment among young people worldwide, particularly those in underserved and marginalized communities. We provide emerging leaders with essential digital skills, cutting-edge tools, dedicated mentorship, and meaningful opportunities—creating pathways for them to unlock their full potential and confidently lead in our increasingly digital world.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm flex flex-col items-center group relative overflow-hidden">
                    <h3 className="text-2xl font-bold mb-4">Vision</h3>
                    <div className="relative h-60 w-full flex items-center justify-center">
                        <img 
                            src={vision} 
                            alt="Vision" 
                            className="h-60 w-auto transition-all duration-700 group-hover:scale-0 group-hover:rotate-180 group-hover:opacity-0" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                            <p className="text-center text-sm leading-relaxed px-4">
                                To build a digitally inclusive world where every young person, irrespective of background, geography, or socio-economic status, could access, learn, and lead using technology. We envision a future where digital skills empower youth to create solutions that address real-world challenges and drive positive change in their communities and beyond.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm flex flex-col items-center group relative overflow-hidden">
                    <h3 className="text-2xl font-bold mb-4">Mission</h3>
                    <div className="relative h-60 w-full flex items-center justify-center">
                        <img 
                            src={mission} 
                            alt="Mission" 
                            className="h-60 w-auto transition-all duration-700 group-hover:scale-0 group-hover:rotate-180 group-hover:opacity-0" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                            <p className="text-center text-sm leading-relaxed px-4">
                                To foster a generation of digitally empowered youth by providing comprehensive education, practical skills development, accessible technology, mentorship, and innovation opportunities. We aim to bridge the digital divide and cultivate a culture of responsible digital citizenship that prepares young people to thrive in an increasingly connected world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                <p>Pushing boundaries and exploring new possibilities in digital technology.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">Leadership</h3>
                <p>Equipping future leaders with the skills to thrive.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">Community</h3>
                <p>Building a network of passionate digital professionals and enthusiasts.</p>
                </div>
            
            </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="relative z-10 min-h-screen flex items-center justify-center bg-black/80 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-bold mb-16 text-[#00BFA5]">Our Core Programs</h2>
          
          {/* Accordion Container */}
          <div className="space-y-4">
            {/* Digital Literacy */}
            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
              <button 
                onClick={() => toggleSection(1)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00BFA5] rounded-full flex items-center justify-center text-black font-bold text-xl mr-6">1</div>
                  <h3 className="text-2xl font-bold text-white">Digital Literacy & Citizenship</h3>
                </div>
                <div className={`transform transition-transform duration-300 ${openSection === 1 ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-[#00BFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openSection === 1 && (
                                  <div className="px-6 pb-6">
                    <p className="text-lg leading-relaxed mb-8 text-gray-300">
                   We focus on building real digital literacy and citizenship — helping young adults not only understand how to use technology, but how to think critically, stay safe online, and build the confidence to participate meaningfully in the digital world. From cybersecurity to digital communication, from evaluating information to ethical technology use, our approach prepares learners for life in an increasingly connected society.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Connected Communication</h4>
                        <p className="text-sm text-gray-300">Learn how to communicate effectively and responsibly in digital spaces.</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Critical Thinking</h4>
                        <p className="text-sm text-gray-300">Develop skills to evaluate information and media critically</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Digital Confidence</h4>
                        <p className="text-sm text-gray-300">Build confidence to engage meaningfully with technology</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Media Literacy</h4>
                        <p className="text-sm text-gray-300">Critical thinking skills to discern misinformation</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Ethical Technology</h4>
                        <p className="text-sm text-gray-300">Respect for privacy and security in digital interactions</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Positive Engagement</h4>
                        <p className="text-sm text-gray-300">Contribute positively to digital communities and social platforms</p>
                      </div>
                    </div>
                  </div>
              )}
            </div>

            {/* Skill Development */}
            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
              <button 
                onClick={() => toggleSection(2)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00BFA5] rounded-full flex items-center justify-center text-black font-bold text-xl mr-6">2</div>
                  <h3 className="text-2xl font-bold text-white">Skill Development</h3>
                </div>
                <div className={`transform transition-transform duration-300 ${openSection === 2 ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-[#00BFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openSection === 2 && (
                <div className="px-6 pb-6">
                  <p className="text-lg leading-relaxed mb-8 text-gray-300">
                    To prepare youth for the jobs and opportunities of tomorrow, EmpowerX DIGITAL offers comprehensive, hands-on training in cutting-edge technology fields. Our curriculum is designed to be adaptive, practical, and industry-relevant.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition duration-300">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Coding & Software Development</h4>
                      <p className="text-sm text-gray-300">Master programming languages and software engineering principles</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition duration-300">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Data Analysis & AI</h4>
                      <p className="text-sm text-gray-300">Learn data science, machine learning, and artificial intelligence</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition duration-300">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Cloud Computing & Cybersecurity</h4>
                      <p className="text-sm text-gray-300">Explore cloud technologies and advanced security practices</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition duration-300">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Robotics & Automation</h4>
                      <p className="text-sm text-gray-300">Build and program robots for automation solutions</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition duration-300">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Digital Marketing & Content Creation</h4>
                      <p className="text-sm text-gray-300">Create compelling content and master digital marketing strategies</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition duration-300">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">UX Design & Graphic Design</h4>
                      <p className="text-sm text-gray-300">Design user experiences and create stunning visual content</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tool Access */}
            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
              <button 
                onClick={() => toggleSection(3)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00BFA5] rounded-full flex items-center justify-center text-black font-bold text-xl mr-6">3</div>
                  <h3 className="text-2xl font-bold text-white">Tool Access</h3>
                </div>
                <div className={`transform transition-transform duration-300 ${openSection === 3 ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-[#00BFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openSection === 3 && (
                <div className="px-6 pb-6">
                  <p className="text-lg leading-relaxed mb-8 text-gray-300">
                    Access to technology remains a significant barrier for many young people worldwide. EmpowerX DIGITAL works tirelessly to close this gap by providing essential resources and infrastructure.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Device Distribution</h4>
                      <p className="text-sm text-gray-300">Laptops and smart devices for those without access</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Internet Connectivity</h4>
                      <p className="text-sm text-gray-300">Reliable, affordable internet connection solutions</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Learning Resources</h4>
                      <p className="text-sm text-gray-300">Software, educational resources, and innovation lab facilities</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mentorship */}
            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
              <button 
                onClick={() => toggleSection(4)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00BFA5] rounded-full flex items-center justify-center text-black font-bold text-xl mr-6">4</div>
                  <h3 className="text-2xl font-bold text-white">Mentorship & Guidance</h3>
                </div>
                <div className={`transform transition-transform duration-300 ${openSection === 4 ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-[#00BFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openSection === 4 && (
                <div className="px-6 pb-6">
                  <p className="text-lg leading-relaxed mb-8 text-gray-300">
                    Knowledge alone is not enough. Young people thrive when guided by experienced mentors who can provide career counseling, entrepreneurship coaching, and networking opportunities.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Career Counseling</h4>
                      <p className="text-sm text-gray-300">Professional development advice and career pathway guidance</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Entrepreneurship Coaching</h4>
                      <p className="text-sm text-gray-300">Business incubation support and startup guidance</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Networking</h4>
                      <p className="text-sm text-gray-300">Connect with industry leaders and innovators</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Innovation Hubs */}
            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
              <button 
                onClick={() => toggleSection(5)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00BFA5] rounded-full flex items-center justify-center text-black font-bold text-xl mr-6">5</div>
                  <h3 className="text-2xl font-bold text-white">Innovation Hubs</h3>
                </div>
                <div className={`transform transition-transform duration-300 ${openSection === 5 ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-[#00BFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openSection === 5 && (
                <div className="px-6 pb-6">
                  <p className="text-lg leading-relaxed mb-8 text-gray-300">
                    Innovation is the engine of progress. Our innovation hubs serve as dynamic spaces where young people can collaborate on projects, develop startups, and create technology solutions with social impact.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Global Challenges</h4>
                      <p className="text-sm text-gray-300">Collaborate on projects addressing local and global challenges</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Startup Development</h4>
                      <p className="text-sm text-gray-300">Develop apps and technology solutions with social impact</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Resources & Support</h4>
                      <p className="text-sm text-gray-300">Access expert advice and peer support to bring ideas to life</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Community Building</h4>
                      <p className="text-sm text-gray-300">Nurture an entrepreneurial mindset and leadership skills</p>
                    </div>
                  </div>
                </div>
              )}
            </div>


          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Start Your Digital Journey?</h3>
            <p className="text-xl mb-8 text-gray-300">Join EmpowerX Digital and unlock your potential in the digital world</p>
            <button className="bg-[#00BFA5] hover:bg-amber-600 text-black font-bold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex items-center justify-center bg-black/80">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-bold mb-16 text-[#00BFA5]">Get In Touch</h2>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-8 text-[#FF7A00]">Connect With Us</h3>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
                  <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Email</h4>
                  <p className="text-gray-300">info@empowerxdigital.com</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
                  <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Phone</h4>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
                  <h4 className="text-lg font-bold mb-2 text-[#00BFA5]">Location</h4>
                  <p className="text-gray-300">Calgary, Alberta, Canada</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-8 text-[#FF7A00]">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#00BFA5] focus:bg-white/10 transition duration-300"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#00BFA5] focus:bg-white/10 transition duration-300"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows="5"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#00BFA5] focus:bg-white/10 transition duration-300 resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00BFA5] to-[#0056D2] hover:from-[#0056D2] hover:to-[#00BFA5] text-white font-bold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
