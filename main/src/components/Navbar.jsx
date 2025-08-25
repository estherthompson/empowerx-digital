import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../assets/fonts/DMSerifText-Regular.ttf';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false); // Close mobile menu after clicking
    };

    return (
        <>
            <div className="bg-white rounded-full mx-6 mt-6 fixed top-0 left-0 right-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo with black background and rounded frame */}
                        <div className="flex items-center space-x-3">
                            <div className="bg-black p-1 rounded-full border-blue-900 border-3">
                                <img src={logo} alt="Logo" className="h-10 w-auto" />
                            </div>
                            <h1 className="text-black text-xl font-bold">EMPOWERX DIGITAL</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <ul className="flex space-x-2">
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('home')} 
                                        className="bg-black text-white hover:bg-amber-500 hover:text-black px-4 py-2 rounded-full transition-all duration-300 font-bold transform hover:scale-105 hover:shadow-lg"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('about')} 
                                        className="bg-black text-white hover:bg-amber-500 hover:text-black px-4 py-2 rounded-full transition-all duration-300 font-bold transform hover:scale-105 hover:shadow-lg"
                                    >
                                        About
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('programs')} 
                                        className="bg-black text-white hover:bg-amber-500 hover:text-black px-4 py-2 rounded-full transition-all duration-300 font-bold transform hover:scale-105 hover:shadow-lg"
                                    >
                                        Programs
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('contact')} 
                                        className="bg-black text-white hover:bg-amber-500 hover:text-black px-4 py-2 rounded-full transition-all duration-300 font-bold transform hover:scale-105 hover:shadow-lg"
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
                                className="bg-black text-white hover:bg-amber-500 hover:text-black p-2 rounded-full transition-all duration-300 transform hover:scale-105"
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

            {/* Full Screen Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Blurred Background */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
                    
                    {/* Close Button */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white hover:text-amber-300 transition-colors duration-300 z-10"
                    >
                        <span className="text-4xl font-bold">×</span>
                    </button>
                    
                    {/* Menu Content */}
                    <div className="relative h-full flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6">
                            <h2 className="text-white text-2xl font-bold">EMPOWERX DIGITAL</h2>
                        </div>
                        
                        {/* Navigation Links */}
                        <div className="flex-1 flex items-center justify-center">
                            <ul className="space-y-8 text-center">
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('home')} 
                                        className="text-white text-6xl hover:text-amber-300 transition-colors duration-300 tracking-wide"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('about')} 
                                        className="text-white text-6xl hover:text-amber-300 transition-colors duration-300 tracking-wide"
                                        style={{ fontFamily: 'Radley-Regular, serif' }}
                                    >
                                        About
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('programs')} 
                                        className="text-white text-6xl hover:text-amber-300 transition-colors duration-300 tracking-wide"
                                        style={{ fontFamily: 'Radley-Regular, serif' }}
                                    >
                                        Programs
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => scrollToSection('contact')} 
                                        className="text-white text-6xl hover:text-amber-300 transition-colors duration-300 tracking-wide"
                                        style={{ fontFamily: 'Radley-Regular, serif' }}
                                    >
                                        Contact
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
