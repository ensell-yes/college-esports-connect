
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Gamepad } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad className="h-8 w-8 text-esports-purple" />
          <span className="font-gaming text-xl font-bold text-esports-dark">EsportsRecruit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-esports-dark hover:text-esports-purple font-medium transition-colors">
            Home
          </Link>
          <Link to="#features" className="text-esports-dark hover:text-esports-purple font-medium transition-colors">
            Features
          </Link>
          <Link to="#how-it-works" className="text-esports-dark hover:text-esports-purple font-medium transition-colors">
            How It Works
          </Link>
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline">Sign In</Button>
            <Button className="bg-esports-purple hover:bg-esports-purple/80">Register</Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-esports-dark" />
          ) : (
            <Menu className="h-6 w-6 text-esports-dark" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-esports-dark hover:text-esports-purple font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="#features" 
                className="text-esports-dark hover:text-esports-purple font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link 
                to="#how-it-works" 
                className="text-esports-dark hover:text-esports-purple font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                How It Works
              </Link>
              <div className="flex flex-col gap-3 py-2">
                <Button variant="outline" className="w-full">Sign In</Button>
                <Button className="w-full bg-esports-purple hover:bg-esports-purple/80">Register</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
