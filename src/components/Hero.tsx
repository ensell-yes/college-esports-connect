
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-esports-purple/10 to-esports-teal/10">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-grid-pattern grid-background opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-esports-purple/10 mb-6">
              <Trophy className="h-4 w-4 text-esports-purple" />
              <span className="text-sm font-medium text-esports-purple">The #1 Esports Recruiting Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-esports-dark mb-6">
              <span className="font-gaming">Level Up</span> Your College 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-esports-purple to-esports-teal ml-2">
                Esports Career
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
              Connect student gamers with college coaches and programs. Showcase your skills, discover opportunities, and make your mark in collegiate esports.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-esports-purple hover:bg-esports-purple/90 text-white px-8 py-6">
                Get Started 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-esports-purple text-esports-purple hover:bg-esports-purple/10 px-8 py-6">
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-esports-purple flex items-center justify-center text-white text-xs">JD</div>
                <div className="w-8 h-8 rounded-full bg-esports-teal flex items-center justify-center text-white text-xs">KL</div>
                <div className="w-8 h-8 rounded-full bg-esports-orange flex items-center justify-center text-white text-xs">MN</div>
                <div className="w-8 h-8 rounded-full bg-esports-dark flex items-center justify-center text-white text-xs">+</div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">500+</span> students matched last season
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 relative z-10 animate-glow">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Esports team playing" 
                className="w-full h-64 object-cover object-center" 
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-esports-purple flex items-center justify-center text-white font-gaming text-lg">
                      TC
                    </div>
                    <div>
                      <h3 className="font-bold">Tech University</h3>
                      <p className="text-sm text-gray-500">Division I Esports</p>
                    </div>
                  </div>
                  <Trophy className="h-6 w-6 text-esports-orange" />
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-2 py-1 bg-esports-purple/10 rounded-full text-xs text-esports-purple">League of Legends</span>
                  <span className="px-2 py-1 bg-esports-teal/10 rounded-full text-xs text-esports-teal">Valorant</span>
                  <span className="px-2 py-1 bg-esports-orange/10 rounded-full text-xs text-esports-orange">Rocket League</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm" className="text-xs">View Profile</Button>
                  <p className="text-xs text-gray-500">4 Scholarships Available</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-esports-teal/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-48 h-48 bg-esports-purple/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 py-8 bg-gradient-to-r from-esports-purple to-esports-teal">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-8 items-center text-white">
            <div className="text-center md:text-left">
              <p className="text-xl font-medium">Trusted by top collegiate esports programs</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="font-gaming text-2xl font-bold opacity-80 hover:opacity-100 transition-opacity">GAME U</div>
              <div className="font-gaming text-2xl font-bold opacity-80 hover:opacity-100 transition-opacity">ESV</div>
              <div className="font-gaming text-2xl font-bold opacity-80 hover:opacity-100 transition-opacity">PRO TECH</div>
              <div className="font-gaming text-2xl font-bold opacity-80 hover:opacity-100 transition-opacity">GAMEWAVE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
