export const useRichTextEditor = () => {
  const formatText = (format: 'bold' | 'italic' | 'underline') => {
    document.execCommand(format, false);
  };

  const alignText = (alignment: 'left' | 'center' | 'right') => {
    document.execCommand(`justify${alignment}`, false);
  };

  return {
    formatText,
    alignText
  };
};