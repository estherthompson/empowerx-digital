import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
                <nav className="max-w-6xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img src={logo} alt="Logo" className="h-16 w-auto" />
                            <span className="text-white text-lg font-medium">EmpowerX Digital</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <ul className="flex space-x-8">
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('home')} 
                                        className="text-white/80 hover:text-[#FF7A00] transition-colors duration-300 text-sm font-medium"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('about')} 
                                        className="text-white/80 hover:text-[#2ECC71] transition-colors duration-300 text-sm font-medium"
                                    >
                                        About
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('programs')} 
                                        className="text-white/80 hover:text-[#00BFA5] transition-colors duration-300 text-sm font-medium"
                                    >
                                        Programs
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('contact')} 
                                        className="text-white/80 hover:text-[#0056D2] transition-colors duration-300 text-sm font-medium"
                                    >
                                        Contact
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-white/80 hover:text-white transition-colors duration-300"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
                    
                    <div className="relative h-full flex flex-col justify-center items-center">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors duration-300"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <ul className="space-y-8 text-center">
                            <li>
                                <button 
                                    onClick={() => scrollToSection('home')} 
                                    className="text-white/80 hover:text-[#FF7A00] transition-colors duration-300 text-2xl font-medium"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('about')} 
                                    className="text-white/80 hover:text-[#2ECC71] transition-colors duration-300 text-2xl font-medium"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('programs')} 
                                    className="text-white/80 hover:text-[#00BFA5] transition-colors duration-300 text-2xl font-medium"
                                >
                                    Programs
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('contact')} 
                                    className="text-white/80 hover:text-[#0056D2] transition-colors duration-300 text-2xl font-medium"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
