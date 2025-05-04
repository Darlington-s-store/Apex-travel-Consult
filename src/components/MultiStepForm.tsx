import React from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  isStepValid: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
  isStepValid,
  isLastStep,
  isFirstStep,
  isSubmitting = false,
  children
}) => {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div key={step.id} className="flex-1 relative">
              <div className="flex items-center">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-medium z-10
                    ${currentStep > step.id ? 'bg-green-500 text-white' : ''}
                    ${currentStep === step.id ? 'bg-[#F59E0B] text-white' : ''}
                    ${currentStep < step.id ? 'bg-gray-200 text-gray-500' : ''}
                  `}
                >
                  {currentStep > step.id ? <Check size={16} /> : step.id}
                </div>
                <div 
                  className={`
                    h-1 flex-grow
                    ${step.id === steps.length ? 'hidden' : 'block'}
                    ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                ></div>
              </div>
              <div className="text-xs mt-2 font-medium text-center w-max">
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Form content */}
      <div className="mb-8">
        {children}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstStep}
          className={`
            flex items-center px-4 py-2 rounded-md transition-colors
            ${isFirstStep ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
          `}
        >
          <ChevronLeft size={16} className="mr-1" />
          Previous
        </button>
        
        <button
          type="button"
          onClick={onNext}
          disabled={!isStepValid || isSubmitting}
          className={`
            flex items-center px-4 py-2 rounded-md transition-colors
            ${!isStepValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            ${isLastStep ? 'bg-[#0F172A] hover:bg-[#1E293B] text-white' : 'bg-[#F59E0B] hover:bg-[#E8A317] text-white'}
          `}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Processing...
            </>
          ) : (
            <>
              {isLastStep ? 'Complete Booking' : 'Next Step'}
              <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Step indicator component for mobile view
export const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="text-sm text-gray-500 mb-4">
      Step {currentStep} of {totalSteps}
    </div>
  );
};

export default MultiStepForm; 