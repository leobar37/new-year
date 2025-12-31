import { useState, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

interface PhotoUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe exceder 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removePhoto = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80 flex items-center gap-2">
        <ImageIcon size={16} className="text-yellow-400" />
        Tu foto (opcional)
      </label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/20">
          <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          <button
            onClick={removePhoto}
            type="button"
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-red-500/80 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-yellow-400 bg-yellow-400/10'
              : 'border-white/20 hover:border-white/40'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <ImageIcon className="mx-auto mb-2 text-white/40" size={28} />
          <p className="text-white/50 text-sm">
            Click o arrastra tu foto
          </p>
          <p className="text-white/30 text-xs mt-1">
            Máximo 5MB
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
}
