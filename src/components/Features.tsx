import { Trophy, Users, MessageSquare, Search, CalendarCheck, GraduationCap } from "lucide-react";
const Features = () => {
  return <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-esports-purple">Powerful Features</span> for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform offers specialized tools for students, coaches, and college programs, creating an efficient recruiting ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-esports-purple/20 flex items-center justify-center mb-6">
              <Trophy className="h-6 w-6 text-esports-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">Sizzle Reels</h3>
            <p className="text-gray-600">
              Upload and share your best gameplay moments. Let your skills speak for themselves and catch the attention of top programs.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-esports-teal/20 flex items-center justify-center mb-6">
              <Search className="h-6 w-6 text-esports-teal" />
            </div>
            <h3 className="text-xl font-bold mb-3">Advanced Filtering</h3>
            <p className="text-gray-600">
              Find exactly what you're looking for with powerful search filters. Filter by game, skill level, location, and more.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-esports-orange/20 flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6 text-esports-orange" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Messaging</h3>
            <p className="text-gray-600">
              Stay connected with direct messaging between students, coaches, and programs, all within our secure platform.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-esports-purple/20 flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-esports-purple" />
            </div>
            <h3 className="text-xl font-bold mb-3">Team Management</h3>
            <p className="text-gray-600">
              Organize your roster, track player stats, and manage team dynamics all in one centralized dashboard.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-esports-teal/20 flex items-center justify-center mb-6">
              <CalendarCheck className="h-6 w-6 text-esports-teal" />
            </div>
            <h3 className="text-xl font-bold mb-3">Scheduling Tools</h3>
            <p className="text-gray-600">
              Coordinate tryouts, interviews, and campus visits with our easy-to-use scheduling system for seamless recruitment.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-esports-orange/20 flex items-center justify-center mb-6">
              <GraduationCap className="h-6 w-6 text-esports-orange" />
            </div>
            <h3 className="text-xl font-bold mb-3">Scholarship Listings</h3>
            <p className="text-gray-600">
              Browse available esports scholarships or create listings for your program to attract the best talent.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Features;