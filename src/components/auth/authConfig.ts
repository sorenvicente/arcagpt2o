export const authAppearance = {
  variables: {
    default: {
      colors: {
        brand: '#9b87f5',
        brandAccent: '#8B5CF6',
        brandButtonText: "white",
        inputBackground: "#40414F",
        inputText: "white",
        inputPlaceholder: "#9CA3AF",
        messageText: "white",
        anchorTextColor: "#9b87f5",
        dividerBackground: "#4E4F60",
      },
      borderWidths: {
        buttonBorderWidth: '1px',
        inputBorderWidth: '1px',
      },
      radii: {
        borderRadiusButton: '0.75rem',
        buttonBorderRadius: '0.75rem',
        inputBorderRadius: '0.75rem',
      },
    },
  },
  className: {
    container: 'text-white',
    label: 'text-white',
    button: 'bg-primary hover:bg-primary/90 text-white',
    input: 'bg-chatgpt-input border-chatgpt-border text-white placeholder-gray-400',
  },
};