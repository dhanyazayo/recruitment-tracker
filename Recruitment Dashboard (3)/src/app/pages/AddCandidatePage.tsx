import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Building2, Briefcase, Clock, Link2, Linkedin, ChevronRight, CheckCircle } from 'lucide-react';

type FormData = {
  name: string; email: string; phone: string; location: string;
  currentCompany: string; currentTitle: string; yearsExp: string;
  source: string; jobRole: string; resumeLink: string; linkedin: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const SOURCES = ['LinkedIn', 'Referral', 'Job Board', 'Company Website', 'Recruiter', 'Campus Hire', 'Other'];
const JOB_ROLES = [
  'Senior Software Engineer', 'Frontend Developer', 'Backend Engineer',
  'Full Stack Developer', 'Product Manager', 'UX Designer', 'UI Designer',
  'Data Scientist', 'DevOps Engineer', 'QA Engineer', 'Security Engineer',
];

export function AddCandidatePage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', location: '',
    currentCompany: '', currentTitle: '', yearsExp: '',
    source: '', jobRole: '', resumeLink: '', linkedin: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const required: (keyof FormData)[] = ['name', 'email', 'phone', 'currentCompany', 'currentTitle', 'source', 'jobRole'];

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = 'Name is required';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email';
    if (!data.phone.trim()) e.phone = 'Phone is required';
    if (!data.currentCompany.trim()) e.currentCompany = 'Current company is required';
    if (!data.currentTitle.trim()) e.currentTitle = 'Current title is required';
    if (!data.source) e.source = 'Please select a source';
    if (!data.jobRole) e.jobRole = 'Please select a job role';
    return e;
  };

  const set = (field: keyof FormData, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const e = validate(updated);
      setErrors(prev => ({ ...prev, [field]: e[field] }));
    }
  };

  const blur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const e = validate(form);
    setErrors(prev => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(required.map(k => [k, true]));
    setTouched(allTouched);
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length === 0) {
      setSubmitted(true);
      setTimeout(() => navigate('/candidates'), 2200);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidate Created</h2>
          <p className="text-gray-500 mb-2">
            <span className="font-medium text-gray-800">{form.name}</span> has been added to the pipeline.
          </p>
          <p className="text-sm text-gray-400">Redirecting to Candidates list…</p>
        </div>
      </div>
    );
  }

  const Field = ({ label, field, icon: Icon, type = 'text', placeholder, req = false }: {
    label: string; field: keyof FormData; icon: React.ElementType;
    type?: string; placeholder?: string; req?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{req && <span className="text-[#F47920] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type={type}
          value={form[field]}
          onChange={e => set(field, e.target.value)}
          onBlur={() => blur(field)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none
            ${errors[field] && touched[field]
              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 bg-white focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8]'
            }`}
        />
      </div>
      {errors[field] && touched[field] && (
        <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const Select = ({ label, field, options, req = false }: {
    label: string; field: keyof FormData; options: string[]; req?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{req && <span className="text-[#F47920] ml-0.5">*</span>}
      </label>
      <select
        value={form[field]}
        onChange={e => set(field, e.target.value)}
        onBlur={() => blur(field)}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none appearance-none
          ${errors[field] && touched[field]
            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
            : 'border-gray-200 bg-white focus:border-[#F47920] focus:ring-2 focus:ring-[#FEF3E8]'
          }`}
      >
        <option value="">Select {label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[field] && touched[field] && (
        <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <span className="hover:text-[#F47920] cursor-pointer" onClick={() => navigate('/candidates')}>Candidates</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-700 font-medium">Add New Candidate</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Candidate</h1>
          <p className="text-sm text-gray-500">Fill in the details below to add a candidate to the pipeline. Fields marked <span className="text-[#F47920]">*</span> are required.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F47920] text-white text-xs font-bold flex items-center justify-center">1</div>
                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Basic Information</h2>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" field="name" icon={User} placeholder="e.g. Sarah Chen" req />
              <Field label="Email Address" field="email" icon={Mail} type="email" placeholder="e.g. sarah@company.com" req />
              <Field label="Phone Number" field="phone" icon={Phone} placeholder="e.g. +1 555 000 0000" req />
              <Field label="Location" field="location" icon={MapPin} placeholder="e.g. San Francisco, CA" />
            </div>
          </div>

          {/* Section 2: Professional Details */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F47920] text-white text-xs font-bold flex items-center justify-center">2</div>
                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Professional Details</h2>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Current Company" field="currentCompany" icon={Building2} placeholder="e.g. Acme Corp" req />
              <Field label="Current Title" field="currentTitle" icon={Briefcase} placeholder="e.g. Software Engineer" req />
              <Field label="Years of Experience" field="yearsExp" icon={Clock} placeholder="e.g. 5" type="number" />
              <Field label="LinkedIn Profile" field="linkedin" icon={Linkedin} placeholder="linkedin.com/in/username" />
            </div>
          </div>

          {/* Section 3: Source Details */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F47920] text-white text-xs font-bold flex items-center justify-center">3</div>
                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Source Details</h2>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select label="Source" field="source" options={SOURCES} req />
              <Select label="Job Role / Requisition" field="jobRole" options={JOB_ROLES} req />
              <div className="sm:col-span-2">
                <Field label="Resume Link" field="resumeLink" icon={Link2} placeholder="https://drive.google.com/..." />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 pb-8">
            <button
              type="button"
              onClick={() => navigate('/candidates')}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#F47920] text-white text-sm font-semibold hover:bg-[#D96510] transition-colors shadow-sm"
            >
              Create Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
