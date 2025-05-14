
import { Users, GraduationCap, Gamepad, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserTypes = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three Paths, <span className="text-esports-purple">One Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform serves three distinct user groups, creating a comprehensive ecosystem for esports recruiting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Students */}
          <div className="bg-gradient-to-br from-esports-purple/5 to-esports-purple/10 rounded-xl p-8 border border-esports-purple/20 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 rounded-full bg-esports-purple/20 flex items-center justify-center mb-6 group-hover:bg-esports-purple/30 transition-colors">
              <Gamepad className="h-8 w-8 text-esports-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Student Gamers</h3>
            <p className="text-gray-700 mb-6">
              Create your gaming profile, showcase your skills, and connect with colleges looking for talented esports athletes.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-purple/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-purple" />
                </div>
                <span className="text-sm">Build your gaming resume</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-purple/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-purple" />
                </div>
                <span className="text-sm">Upload gameplay highlights</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-purple/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-purple" />
                </div>
                <span className="text-sm">Receive college interest</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-esports-purple text-esports-purple hover:bg-esports-purple/10">
              Student Sign Up
            </Button>
          </div>

          {/* Coaches */}
          <div className="bg-gradient-to-br from-esports-teal/5 to-esports-teal/10 rounded-xl p-8 border border-esports-teal/20 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 rounded-full bg-esports-teal/20 flex items-center justify-center mb-6 group-hover:bg-esports-teal/30 transition-colors">
              <Users className="h-8 w-8 text-esports-teal" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Esports Coaches</h3>
            <p className="text-gray-700 mb-6">
              Discover talented players, review their profiles, and recruit the perfect additions to your collegiate esports roster.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-teal/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-teal" />
                </div>
                <span className="text-sm">Search student database</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-teal/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-teal" />
                </div>
                <span className="text-sm">Direct message prospects</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-teal/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-teal" />
                </div>
                <span className="text-sm">Manage recruiting pipeline</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-esports-teal text-esports-teal hover:bg-esports-teal/10">
              Coach Sign Up
            </Button>
          </div>

          {/* Schools */}
          <div className="bg-gradient-to-br from-esports-orange/5 to-esports-orange/10 rounded-xl p-8 border border-esports-orange/20 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-16 h-16 rounded-full bg-esports-orange/20 flex items-center justify-center mb-6 group-hover:bg-esports-orange/30 transition-colors">
              <GraduationCap className="h-8 w-8 text-esports-orange" />
            </div>
            <h3 className="text-2xl font-bold mb-4">College Programs</h3>
            <p className="text-gray-700 mb-6">
              Showcase your esports program, highlight scholarships, and attract skilled players to build your competitive teams.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-orange/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-orange" />
                </div>
                <span className="text-sm">Create program profile</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-orange/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-orange" />
                </div>
                <span className="text-sm">List scholarships & opportunities</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-esports-orange/20 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-esports-orange" />
                </div>
                <span className="text-sm">Track application metrics</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-esports-orange text-esports-orange hover:bg-esports-orange/10">
              Program Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
