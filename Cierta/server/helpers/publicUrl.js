// src/utils/publicUrl.js
function publicUrlFromKey(key) {
  const base = process.env.PUBLIC_ASSET_BASE?.replace(/\/+$/, "");
  return `${base}/${encodeURIComponent(key).replace(/%2F/g,'/')}`;
}
module.exports = { publicUrlFromKey };
