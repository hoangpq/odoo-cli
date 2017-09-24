const _ = require('underscore');
const fs = require('fs-extra')
const path = require('path');
const { spawn } = require('child_process');

function mkdirByCommand(path) {
  return new Promise((resolve, reject) => {
    const mkdir = spawn('mkdir', ['-p', path]);
    mkdir.on('error', (err) => {
      reject(err);
    });
    mkdir.on('close', (code) => {
      resolve(code);
    });
  });
}

const createModuleStructure = function createModuleStructure(module_name, dist = __dirname) {
  const mp = path.resolve(dist, module_name);
  const isExists = fs.existsSync(mp);
  const def = new Promise((resolve, reject) => {
    const rm = spawn('rm', ['-rf', mp]);
    rm.on('close', (code) => {
      resolve(mp);
    });
  });
  return def;
}

exports.createModule = async (dist, module_name, jsRaw, xmlRaw) => {
  const dest = await createModuleStructure(module_name, dist);
  try {
    fs.copySync(path.join(__dirname, 'templates/sample'), dest);
    // copy script to js folder
    fs.writeFileSync(path.join(dest, 'static/src/js/odoo.js'), jsRaw);
    fs.writeFileSync(path.join(dest, 'views/templates.xml'), xmlRaw);
  } catch (e) {
    throw new Error(`Something went wrong`);
  }
}
