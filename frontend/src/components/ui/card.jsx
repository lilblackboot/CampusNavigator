import * as React from "react";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`
      rounded-lg   text-card-foreground
       transition-all duration-300
      dark:bg-gray-800 
     backdrop-blur-sm
      
      ${className}`}
    {...props}
  />
));
Card.displayName = "Card";



const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`
      p-6 pt-0
      transition-all duration-300
      animate-slideUp
      ${className}`} 
    {...props} 
  />
));
CardContent.displayName = "CardContent";

// Add custom animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideDown {
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }

  .animate-slideDown {
    animation: slideDown 0.5s ease-out;
  }

  .animate-slideUp {
    animation: slideUp 0.5s ease-out;
  }

  /* Add glass morphism effect */
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* Add subtle hover state animations */
  .card-hover {
    transition: all 0.3s ease;
  }

  .card-hover:hover {
    transform: translateY(-5px);
  }
`;
document.head.appendChild(style);

export { Card, CardContent };