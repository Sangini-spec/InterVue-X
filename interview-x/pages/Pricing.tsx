
import React, { useState } from 'react';
import { Check, X, Zap, Star, Crown, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

const FaqItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className="font-medium text-zinc-900 dark:text-white pr-8 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{q}</span>
                {isOpen ? <ChevronUp size={16} className="text-purple-600 shrink-0" /> : <ChevronDown size={16} className="text-zinc-400 shrink-0 group-hover:text-purple-600" />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{a}</p>
            </div>
        </div>
    );
};

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for testing your skills.",
      features: [
        "5 min Interview Sessions",
        "Basic Performance Analysis",
        "Standard Avatar Interviewers",
        "1 Practice Role",
        "Community Support"
      ],
      notIncluded: [
        "Resume Builder",
        "Detailed Feedback Report",
        "Video Recordings",
        "ATS Optimization",
        "Veo Video Scenarios"
      ],
      icon: Zap,
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: isAnnual ? "$15" : "$19",
      period: "/month",
      description: "Everything you need to prep effectively.",
      features: [
        "30 min Interview Sessions",
        "Detailed Interview Analysis",
        "Resume Builder Access",
        "Unlimited Practice Roles",
        "Video Recording & Playback",
        "Email Support"
      ],
      notIncluded: [
        "ATS Optimization Tools",
        "60 min Extended Sessions",
        "Veo Video Scenarios"
      ],
      icon: Star,
      cta: "Upgrade to Pro",
      popular: true,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Premium",
      price: isAnnual ? "$39" : "$49",
      period: "/month",
      description: "Maximum power for career acceleration.",
      features: [
        "60 min Interview Sessions",
        "Advanced Behavioral Analysis",
        "ATS-Friendly Resume Builder",
        "Priority Support (24/7)",
        "Veo Video Scenarios",
        "Custom Company Scenarios",
        "Unlimited History"
      ],
      notIncluded: [],
      icon: Crown,
      cta: "Go Premium",
      popular: false
    }
  ];

  const faqs = [
    { q: "Does the subscription cost vary by country?", a: "No, our pricing is standard globally, billed in USD, but regional parity pricing may apply during checkout." },
    { q: "Will I receive a tax invoice after payment?", a: "Yes, a compliant tax invoice is sent to your registered email immediately after payment processing." },
    { q: "Can I try out the platform before subscribing?", a: "Yes, we offer a Free plan with 5-minute sessions to test the platform capabilities and avatar interactions." },
    { q: "Is there a refund once I pay for a week or month?", a: "We offer a 7-day money-back guarantee if you are not satisfied with the Pro or Premium plans, no questions asked." },
    { q: "Which platforms manage payments for InterVue X?", a: "We use Stripe and PayPal to ensure secure and reliable payment processing for all transactions." },
    { q: "Can I take more than one 30-min mock interview session per day?", a: "Yes, Pro and Premium plans allow for multiple sessions per day, subject to our fair usage policy." },
    { q: "Can I take all types of interviews for up to 30 minutes if I purchase Pro?", a: "Yes, the Pro plan includes all interview types (Behavioral, Technical, System Design) with a 30-minute limit per session." },
    { q: "How can I verify if my payment was successful?", a: "You will receive a confirmation email, and the plan status will be updated to 'Active' in your Profile settings instantly." },
    { q: "How are the mock interview questions curated?", a: "Questions are curated from real interview experiences at top tech companies, open-source repositories, and updated weekly by our content team." },
    { q: "Are the ‘company interviews’ verified and supported by the respective companies?", a: "Our questions are based on community contributions and public data; we are not officially affiliated with these companies." },
    { q: "Is my data secure when using the platform?", a: "Absolutely. We use enterprise-grade encryption and do not store video/audio permanently unless you explicitly save a session." },
    { q: "Can our AI make mistakes in providing feedback?", a: "While highly accurate, AI can occasionally hallucinate. We recommend using the feedback as a strong guide rather than absolute truth." },
    { q: "Do you provide options for business integrations for your services?", a: "Yes, check our 'For Business' page for API, Widget, and LMS integration details for enterprises." },
    { q: "Is the fee for one interview or unlimited sessions?", a: "The subscription provides unlimited sessions within the fair usage limits of your chosen plan duration." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 py-12 px-6 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">
            
            {/* Back Button */}
            <button 
                onClick={() => navigate('/')} 
                className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
                <ArrowLeft size={20} /> Back
            </button>

            {/* Header */}
            <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Invest in your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Future</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
                Choose the plan that fits your interview preparation needs. Cancel anytime.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-medium ${!isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>Monthly</span>
                <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full relative transition-colors focus:outline-none"
                >
                <div className={`absolute top-1 w-6 h-6 bg-purple-600 rounded-full transition-all duration-300 shadow-md ${isAnnual ? 'left-7' : 'left-1'}`} />
                </button>
                <span className={`text-sm font-medium ${isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
                Yearly <span className="text-xs text-green-500 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full ml-1">-20%</span>
                </span>
            </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
                <div 
                key={plan.name}
                className={`relative bg-white dark:bg-zinc-900 rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                    plan.popular 
                    ? 'border-purple-500 shadow-2xl shadow-purple-500/10 z-10 md:scale-105' 
                    : 'border-zinc-200 dark:border-zinc-800 shadow-xl hover:shadow-2xl'
                }`}
                >
                {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                    </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${plan.popular ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                    <plan.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">{plan.price}</span>
                    {plan.price !== '$0' && <span className="text-zinc-500 dark:text-zinc-400">{plan.period}</span>}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">{plan.description}</p>

                <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-50">
                        <X size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-zinc-500 dark:text-zinc-500">{feature}</span>
                    </div>
                    ))}
                </div>

                <button 
                    onClick={() => navigate('/login')}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                >
                    {plan.cta} <ArrowRight size={16} />
                </button>
                </div>
            ))}
            </div>

            {/* Trusted Companies */}
            <div className="mt-24 text-center">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-8">Trusted by candidates landing jobs at</h3>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {['Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta'].map(company => (
                        <span key={company} className="text-xl font-bold text-zinc-400 dark:text-zinc-600 hover:text-purple-500 dark:hover:text-purple-400 cursor-default transition-colors">{company}</span>
                    ))}
                </div>
            </div>

            {/* University & Org Discounts */}
            <div className="mt-24 py-16 px-6 bg-purple-100 dark:bg-purple-900/20 rounded-2xl text-center border border-purple-200 dark:border-purple-900/30">
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">Check for University & Organization Discounts</h2>
                <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                    We have partnered with multiple universities and organizations for discounted pricing. If you are a Student or a Professional, do check your eligibility for a discount.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg shadow-purple-500/20 transition-colors uppercase tracking-wide text-sm">
                        Student Discount
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:text-white font-bold rounded-lg transition-colors uppercase tracking-wide text-sm">
                        Professional Discount
                    </button>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-24 mb-12">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <div className="flex flex-col">
                        {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, i) => (
                            <FaqItem key={i} {...faq} />
                        ))}
                    </div>
                    <div className="flex flex-col">
                        {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, i) => (
                            <FaqItem key={i} {...faq} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
        </div>
        
        <Footer />
    </div>
  );
};
