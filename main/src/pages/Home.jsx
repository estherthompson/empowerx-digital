import React, { useEffect, useRef } from 'react';

const Home = () => {
  const canvasRef = useRef(null);

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
      <section id="home" className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
            EmpowerX <span className="font-light italic">Digital</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Empowering Tomorrow's Digital Leaders
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 min-h-screen flex items-center justify-center bg-black/50">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-bold mb-8">About Us</h2>
          <p className="text-xl leading-relaxed mb-8">
            EmpowerX Digital is a forward-thinking organization dedicated to fostering the next generation of digital innovators. 
            We provide cutting-edge programs and resources to help individuals and organizations thrive in the digital age.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p>Pushing boundaries and exploring new possibilities in digital technology.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Education</h3>
              <p>Comprehensive learning programs designed for the modern digital landscape.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p>Building a network of passionate digital professionals and enthusiasts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="relative z-10 min-h-screen flex items-center justify-center bg-black/50">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-bold mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Digital Leadership</h3>
              <p className="mb-6">Develop essential leadership skills for the digital era.</p>
              <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-full transition duration-300">
                Learn More
              </button>
            </div>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Tech Innovation</h3>
              <p className="mb-6">Explore cutting-edge technologies and innovation strategies.</p>
              <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-full transition duration-300">
                Learn More
              </button>
            </div>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
              <h3 className="text-2xl font-bold mb-4">Digital Marketing</h3>
              <p className="mb-6">Master modern digital marketing techniques and strategies.</p>
              <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-full transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex items-center justify-center bg-black/50">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-bold mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4 text-left">
                <p className="flex items-center">
                  <span className="mr-3">📧</span>
                  info@empowerxdigital.com
                </p>
                <p className="flex items-center">
                  <span className="mr-3">📱</span>
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center">
                  <span className="mr-3">📍</span>
                  Calgary, Alberta, Canada
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-amber-500"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-amber-500"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows="4"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-amber-500"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-full transition duration-300"
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
