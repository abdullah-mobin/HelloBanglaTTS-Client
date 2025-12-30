import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const plans = [
  {
    name: "Free",
    price: "৳0",
    description: "For testing and personal projects",
    features: [
      "5,000 characters / month",
      "Single voice",
      "Standard quality",
      "No commercial use",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "৳499",
    description: "For creators and developers",
    features: [
      "100,000 characters / month",
      "Multiple voices",
      "High quality voice",
      "Commercial use",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale applications",
    features: [
      "Unlimited characters",
      "Custom voices",
      "Priority support",
      "Dedicated API limits",
      "Custom SLA",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Choose a plan that fits your needs. No hidden fees.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 shadow-sm transition ${
                plan.highlighted
                  ? "border-indigo-600 scale-105"
                  : "border-gray-200 dark:border-gray-800"
              } bg-white dark:bg-gray-900`}
            >
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-gray-500 mb-4">{plan.description}</p>

              <div className="text-4xl font-bold mb-6">{plan.price}</div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-indigo-600">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold ${
                  plan.highlighted
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
