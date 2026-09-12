import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'stacked' | 'light';
  theme?: 'blue' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'blue',
  size = 'md',
  showTagline = false,
}) => {
  const isWhite = theme === 'white' || variant === 'light';
  const blueColor = isWhite ? '#FFFFFF' : '#001FB5';

  // Dimension scaling
  const iconDimensions = {
    sm: { box: 26, text: 'text-base', gap: 'gap-2.5' },
    md: { box: 36, text: 'text-xl', gap: 'gap-3' },
    lg: { box: 44, text: 'text-2xl', gap: 'gap-3.5' },
    xl: { box: 54, text: 'text-3xl', gap: 'gap-4' },
  }[size];

  // Exact vector reproduction of the emblem from the official logo mark
  const IconSvg = (
    <svg 
      width={iconDimensions.box} 
      height={iconDimensions.box} 
      viewBox="0 0 90 90" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Outer Square Border Frame with Bottom Cut Opening */}
      <path 
        d="M 46 84 H 6 V 6 H 84 V 84 H 62" 
        stroke={blueColor} 
        strokeWidth="6" 
        strokeLinecap="butt" 
        strokeLinejoin="miter" 
      />

      {/* Upper Horizontal Bar */}
      <line 
        x1="20" 
        y1="24" 
        x2="70" 
        y2="24" 
        stroke={blueColor} 
        strokeWidth="6" 
        strokeLinecap="butt" 
      />

      {/* Lower Horizontal Bar */}
      <line 
        x1="20" 
        y1="36" 
        x2="70" 
        y2="36" 
        stroke={blueColor} 
        strokeWidth="6" 
        strokeLinecap="butt" 
      />

      {/* Left Vertical Stem (starts at lower bar, stops before bottom) */}
      <line 
        x1="33" 
        y1="36" 
        x2="33" 
        y2="72" 
        stroke={blueColor} 
        strokeWidth="6" 
        strokeLinecap="butt" 
      />

      {/* Right Vertical Stem (starts at upper bar, connects flush to bottom wall) */}
      <line 
        x1="46" 
        y1="24" 
        x2="46" 
        y2="84" 
        stroke={blueColor} 
        strokeWidth="6" 
        strokeLinecap="butt" 
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{IconSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center ${iconDimensions.gap} select-none ${className}`}>
      {IconSvg}
      
      <div className="flex flex-col">
        <span 
          className={`font-black tracking-normal uppercase leading-none font-sans ${iconDimensions.text} ${
            isWhite ? 'text-white' : 'text-[#001FB5]'
          }`}
          style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            letterSpacing: '0.035em'
          }}
        >
          TAARINI IMPEX
        </span>
        {showTagline && (
          <span 
            className={`text-[9px] font-bold tracking-widest uppercase mt-1 ${
              isWhite ? 'text-blue-100' : 'text-slate-500'
            }`}
            style={{ letterSpacing: '0.12em' }}
          >
            Cookware & Global Export
          </span>
        )}
      </div>
    </div>
  );
};
