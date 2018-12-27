const fs = require('fs');
const path = require('path');

const readManifestFile = (filename, assetPath = '') => {
  const manifest = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '..', '..', 'dist', filename),
      'utf-8'
    )
  );

  return Object.entries(manifest).reduce(
    (res, [key, value]) => ({
      ...res,
      [key]: assetPath ? value.replace('/assets/', assetPath) : value,
    }),
    {}
  );
};

module.exports = () => {
  const client = readManifestFile('manifest.client.json');
  const server = readManifestFile('manifest.server.json', '/dist/');

  return {
    client,
    server,
  };
};
