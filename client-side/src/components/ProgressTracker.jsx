import React from 'react';

const steps = [
  { label: 'Encrypting files', icon: '🔐' },
  { label: 'Uploading to IPFS', icon: '📤' },
  { label: 'Encrypting AES key', icon: '🔑' },
  { label: 'Confirm transaction in Phantom', icon: '👻' },
];

const ProgressTracker = ({ currentStep, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-all duration-500 ${
                  index < currentStep
                    ? 'bg-[var(--accent-primary)] text-black scale-110'
                    : index === currentStep
                    ? 'bg-[var(--accent-primary)] text-black animate-pulse scale-110'
                    : 'bg-[var(--bg-border)] text-[var(--accent-secondary)] scale-90'
                }`}
              >
                {index < currentStep ? '✓' : step.icon}
              </div>
              <p className={`text-xs font-mono text-center transition-colors duration-300 ${
                index <= currentStep ? 'text-[var(--accent-primary)]' : 'text-[var(--accent-secondary)]'
              }`}>
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 mt-[-24px] transition-colors duration-500 ${
                  index < currentStep ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-border)]'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;