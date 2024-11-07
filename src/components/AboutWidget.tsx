import React from 'react';
import { User, Briefcase, Award, Mail } from 'lucide-react';

const AboutWidget = () => {
  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 w-80 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">John Doe</h2>
          <p className="text-white/80">Full Stack Developer</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Briefcase className="w-5 h-5" />
          <div>
            <p className="font-medium">Senior Developer</p>
            <p className="text-sm text-white/70">Tech Corp Inc.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white">
          <Award className="w-5 h-5" />
          <div>
            <p className="font-medium">10+ Years Experience</p>
            <p className="text-sm text-white/70">Web & Mobile Development</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white">
          <Mail className="w-5 h-5" />
          <div>
            <p className="font-medium">Contact</p>
            <p className="text-sm text-white/70">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-semibold text-white">50+</p>
            <p className="text-sm text-white/70">Projects</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">100+</p>
            <p className="text-sm text-white/70">Clients</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">15+</p>
            <p className="text-sm text-white/70">Awards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWidget;