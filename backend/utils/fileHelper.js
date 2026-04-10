const cloudinary = require('cloudinary').v2;

// Extract Cloudinary public_id from a full URL
// e.g. https://res.cloudinary.com/demo/image/upload/v123/student-management/abc123.jpg
//   → student-management/abc123
const getPublicId = (url) => {
  if (!url || !url.includes('cloudinary.com')) return null;
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  if (uploadIndex === -1) return null;
  // skip version segment (v12345) if present
  const afterUpload = parts.slice(uploadIndex + 1);
  if (afterUpload[0] && afterUpload[0].startsWith('v')) afterUpload.shift();
  const withExt = afterUpload.join('/');
  return withExt.replace(/\.[^/.]+$/, ''); // remove extension
};

const deleteFile = async (photoUrl) => {
  if (!photoUrl) return;
  const publicId = getPublicId(photoUrl);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('Failed to delete Cloudinary image:', err.message);
  }
};

module.exports = { deleteFile };
