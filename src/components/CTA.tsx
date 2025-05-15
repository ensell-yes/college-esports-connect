import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad } from "lucide-react";
const CTA = () => {
  return <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-esports-purple/90 to-esports-teal/90 clip-path-slant"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to <span className="font-gaming">Level Up</span> Your Esports Career?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of students, coaches, and programs already connecting on the leading collegiate esports recruiting platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-esports-purple hover:bg-white/90 px-8 py-6">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white px-8 py-6 text-esports-purple bg-white">
                Request Demo
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-esports-orange/30 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-esports-purple/30 animate-pulse-slow"></div>
              
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <Gamepad className="h-8 w-8 text-esports-purple" />
                  <h3 className="text-xl font-bold">Create Your Profile</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="w-full h-10 bg-gray-100 rounded flex items-center px-4 text-gray-500">
                    your.email@example.com
                  </div>
                  <div className="w-full h-10 bg-gray-100 rounded flex items-center px-4 text-gray-500">
                    ••••••••••
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-esports-purple/80"></div>
                    <span className="text-sm">Student Gamer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-gray-300"></div>
                    <span className="text-sm">Coach</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-gray-300"></div>
                    <span className="text-sm">College Program</span>
                  </div>
                </div>
                
                <Button className="w-full bg-esports-purple hover:bg-esports-purple/90">
                  Create Account
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By signing up, you agree to our Terms of Service & Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;