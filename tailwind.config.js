export default {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#10B981',
        accent: '#F8FAFB',
        orange: {
          DEFAULT: '#FF6B35',
          light: '#FF8C5A',
          glow: 'rgba(255, 107, 53, 0.6)',
        },
        green: {
          DEFAULT: '#10B981',
          light: '#34D399',
        },
        dark: '#1F2937',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
        'scale-up': 'scaleUp 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'counter': 'counter 2s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-orange': 'glowOrange 2s ease-in-out infinite',
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
        'rotate-360': 'rotate360 0.6s ease-in-out',
        'flip-3d': 'flip3d 0.8s ease-out',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-stagger': 'fadeInStagger 0.6s ease-out both',
        'ripple': 'ripple 0.6s ease-out',
        'bounce-icon': 'bounceIcon 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.8)' }
        },
        glowOrange: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.8)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' },
        },
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        flip3d: {
          '0%': { opacity: '0', transform: 'rotateY(-90deg)' },
          '100%': { opacity: '1', transform: 'rotateY(0deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInStagger: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        bounceIcon: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
}
