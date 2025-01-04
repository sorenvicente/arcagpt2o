import { FileUpload } from "./FileUpload";
import { FileList } from "./FileList";

interface FileSectionProps {
  promptId: string;
}

export function FileSection({ promptId }: FileSectionProps) {
  return (
    <div className="border-t border-chatgpt-border pt-4">
      <h3 className="text-sm font-medium text-white mb-2">Arquivos de Treinamento</h3>
      <FileUpload promptId={promptId} />
      <FileList promptId={promptId} />
    </div>
  );
}