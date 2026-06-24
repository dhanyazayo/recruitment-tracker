export function SocialProof() {
  const companies = [
    'Stripe', 'Linear', 'Notion', 'Figma', 'Vercel', 'Anthropic'
  ];

  return (
    <div className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 mb-8">TRUSTED BY MODERN RECRUITING TEAMS</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {companies.map((company) => (
              <div key={company} className="text-2xl font-semibold text-gray-300 hover:text-gray-600 transition-colors">
                {company}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FEF3E8] rounded-full">
            <span className="text-sm text-gray-700">Reducing hiring delays by</span>
            <span className="text-2xl font-bold text-[#F47920]">42%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
