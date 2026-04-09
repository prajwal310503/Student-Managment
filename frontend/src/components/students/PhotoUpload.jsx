import { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Upload, X, Camera, ZoomIn, RotateCw, RotateCcw, Check, Crop } from 'lucide-react';

// ─── canvas helper ───────────────────────────────────────────────────────────
async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);
  ctx.drawImage(image, safeArea / 2 - image.width / 2, safeArea / 2 - image.height / 2);

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg', 0.92);
  });
}

// ─── Slider ──────────────────────────────────────────────────────────────────
const Slider = ({ label, value, min, max, step, onChange, icon: Icon }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-1.5 w-24 flex-shrink-0">
      {Icon && <Icon size={14} className="text-gray-400" />}
      <span className="text-xs text-gray-500 font-medium">{label}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="flex-1 h-1.5 rounded-full accent-blue-600 cursor-pointer"
    />
    <span className="text-xs text-gray-400 w-10 text-right">{value}{label === 'Zoom' ? 'x' : '°'}</span>
  </div>
);

// ─── CropModal ───────────────────────────────────────────────────────────────
const CropModal = ({ imageSrc, onDone, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApply = async () => {
    setProcessing(true);
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    const previewUrl = URL.createObjectURL(blob);
    onDone(file, previewUrl);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-stretch sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full sm:rounded-2xl sm:max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Crop size={15} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Crop Photo</h3>
          </div>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Crop area */}
        <div className="relative bg-gray-900 flex-1 sm:flex-none" style={{ height: 'clamp(220px, 40vh, 320px)' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="px-4 py-3 sm:px-5 sm:py-4 space-y-2.5 flex-shrink-0">
          <Slider label="Zoom" value={zoom} min={1} max={3} step={0.05} onChange={setZoom} icon={ZoomIn} />
          <Slider label="Rotate" value={rotation} min={-180} max={180} step={1} onChange={setRotation} icon={RotateCw} />

          <div className="flex items-center justify-end gap-1 pt-0.5">
            <button type="button" onClick={() => setRotation((r) => r - 90)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Rotate -90°">
              <RotateCcw size={15} />
            </button>
            <button type="button" onClick={() => setRotation((r) => r + 90)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="Rotate +90°">
              <RotateCw size={15} />
            </button>
            <button type="button" onClick={() => { setZoom(1); setRotation(0); }} className="px-2.5 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              Reset
            </button>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex gap-2 px-4 pb-4 sm:px-5 sm:pb-5 flex-shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={processing}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Check size={15} /> {processing ? 'Applying...' : 'Apply Crop'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── PhotoUpload ─────────────────────────────────────────────────────────────

const PhotoUpload = ({ currentPhotoUrl, onChange }) => {
  const [preview, setPreview] = useState(currentPhotoUrl || null);
  const [rawSrc, setRawSrc] = useState(null); // original for cropper
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState('');
  const inputRef = useRef(null);

  const handleFile = (file) => {
    setLocalError('');
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setLocalError('Only JPG, PNG, and WEBP images are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setLocalError('Image must be less than 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setRawSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleCropDone = (file, previewUrl) => {
    setPreview(previewUrl);
    setRawSrc(null);
    onChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setRawSrc(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      {rawSrc && (
        <CropModal
          imageSrc={rawSrc}
          onDone={handleCropDone}
          onCancel={() => { setRawSrc(null); if (inputRef.current) inputRef.current.value = ''; }}
        />
      )}

      <div>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          {preview ? (
            <div className="flex items-center gap-4 sm:flex-col sm:gap-3">
              <div className="relative group flex-shrink-0">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200 shadow"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera size={16} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-500 sm:text-center">Click to change photo</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:flex-col sm:gap-2">
              <div className="p-2.5 sm:p-3 bg-blue-50 rounded-full flex-shrink-0">
                <Upload size={18} className="text-blue-400 sm:hidden" />
                <Upload size={22} className="text-blue-400 hidden sm:block" />
              </div>
              <div className="text-left sm:text-center">
                <p className="text-sm font-medium text-gray-700">Click or drag photo here</p>
                <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP · up to 10MB</p>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleInputChange}
            className="hidden"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {preview && (
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); if (inputRef.current) { inputRef.current.value = ''; inputRef.current.click(); } }}
              className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium"
            >
              <Crop size={12} /> Re-crop
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
            >
              <X size={12} /> Remove
            </button>
          </div>
        )}

        {localError && <p className="mt-1 text-xs text-red-500">{localError}</p>}
      </div>
    </>
  );
};

export default PhotoUpload;
