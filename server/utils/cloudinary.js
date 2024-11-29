// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dztilubhi",
  api_key: "439744379624474",
  api_secret: "Eg467bp0pG0fMv_7NKJSr_q7Lrk", // Click 'View API Keys' above to copy your API secret
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

module.exports = handleUpload;
