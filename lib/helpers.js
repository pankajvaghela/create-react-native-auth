const fs = require('fs');
const path = require('path');


module.exports = {
  integrations : {
    google : "Google Login",
    fb : "Facebook Login"
  },
  getLibDir: () => {
    return __dirname;
  },

  getProcessDir: () => {
    return process.cwd();
  },

  existsDir: (filePath) => {
    return fs.existsSync(filePath);
  }
};