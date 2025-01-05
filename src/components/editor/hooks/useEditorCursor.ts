import { RefObject } from 'react';

export const useEditorCursor = (editorRef: RefObject<HTMLDivElement>) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection) return;

    // Get the clicked element
    const range = document.createRange();
    let node: Node | null = e.target as Node;
    
    // If clicked directly on the editor container, use its first child or create a text node
    if (node === editorRef.current) {
      if (editorRef.current.firstChild) {
        node = editorRef.current.firstChild;
      } else {
        const textNode = document.createTextNode('');
        editorRef.current.appendChild(textNode);
        node = textNode;
      }
    }

    try {
      // Calculate approximate position within the text node
      const rect = (node as Element).getBoundingClientRect();
      const offset = Math.round(
        ((e.clientX - rect.left) / rect.width) * (node.textContent?.length || 0)
      );

      // Set range at calculated position
      range.setStart(node, Math.min(offset, node.textContent?.length || 0));
      range.collapse(true);

      // Update selection
      selection.removeAllRanges();
      selection.addRange(range);
      
      // Ensure the editor maintains focus
      editorRef.current.focus();
    } catch (error) {
      console.log('Error setting cursor position:', error);
      // Fallback: place cursor at the end
      const lastChild = editorRef.current.lastChild || editorRef.current;
      range.selectNodeContents(lastChild);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return { handleClick };
};