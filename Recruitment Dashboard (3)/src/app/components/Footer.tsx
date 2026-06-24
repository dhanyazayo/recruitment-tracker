import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const sections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Roadmap', 'Changelog']
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Blog', 'Press', 'Partners']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'Community', 'API Reference', 'Status']
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms', 'Security', 'DPA', 'Compliance']
    }
  ];

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded"></div>
              </div>
              <span className="text-xl font-semibold text-white">PipelineHQ</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              The modern recruiting platform for teams who demand visibility and results.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 PipelineHQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
