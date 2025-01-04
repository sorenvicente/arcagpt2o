export const keyframes = {
  marquee: {
    '0%': { 
      transform: 'translateX(0%)',
      opacity: '0'
    },
    '10%': {
      opacity: '1'
    },
    '90%': {
      opacity: '1'
    },
    '100%': { 
      transform: 'translateX(-50%)',
      opacity: '0'
    },
  },
  marqueeReverse: {
    '0%': { 
      transform: 'translateX(-50%)',
      opacity: '0'
    },
    '10%': {
      opacity: '1'
    },
    '90%': {
      opacity: '1'
    },
    '100%': { 
      transform: 'translateX(0%)',
      opacity: '0'
    },
  },
  sidebarSlideIn: {
    '0%': { 
      opacity: '0'
    },
    '100%': { 
      opacity: '1'
    },
  },
  sidebarSlideOut: {
    '0%': { 
      opacity: '1'
    },
    '100%': { 
      opacity: '0'
    }
  },
  gradientFlow: {
    '0%': { 
      backgroundPosition: '0% 50%',
      backgroundSize: '400% 400%'
    },
    '50%': {
      backgroundPosition: '100% 50%',
      backgroundSize: '400% 400%'
    },
    '100%': {
      backgroundPosition: '0% 50%',
      backgroundSize: '400% 400%'
    }
  }
};

export const animation = {
  marquee: 'marquee 40s linear infinite',
  marqueeReverse: 'marqueeReverse 40s linear infinite',
  sidebarIn: 'sidebarSlideIn 0.5s ease-in-out',
  sidebarOut: 'sidebarSlideOut 0.5s ease-in-out',
  gradient: 'gradientFlow 8s ease infinite'
};