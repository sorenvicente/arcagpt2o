interface EditorTitleProps {
  title: string;
  onTitleChange: (value: string) => void;
}

export const EditorTitle = ({ title, onTitleChange }: EditorTitleProps) => {
  return (
    <input
      type="text"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      placeholder="Digite seu título aqui..."
      className="w-full bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none mb-4 rounded-lg"
    />
  );
};