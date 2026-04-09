const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
  if (!filePath) return;
  const absolutePath = path.join(__dirname, '../', filePath);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error(`Failed to delete file: ${absolutePath}`, err.message);
    }
  });
};

module.exports = { deleteFile };
