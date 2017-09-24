const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const structure = require('./structure');

module.exports = function genTemplate(name, depends, dist) {
  if (!name) {
    throw new Error('You must specify the module name!');
  }
  if (!dist) {
    throw new Error('You must specify the module directory!')
  }
  const config = {
    module_name: name,
    module_dependencies: depends ? depends.split(',') : [],
  };
  if (config.module_dependencies && config.module_dependencies.length) {
    const dependencies = config.module_dependencies.map(m => {
      let parts = [];
      let name = m;
      if (m.includes('.') && (parts = m.split('.')).length >= 2) {
        name = parts.slice(-1)[0];
      }
      return `var ${name} = require('${m}');`;
    }).join('\n  ');
    // assign to config
    Object.assign(config, {
      module_dependencies: dependencies,
    });
  }
  // read template
  const jsTmpl = fs.readFileSync(path.join(__dirname, 'templates/tmpl/odoo.js')).toString();
  const jsRaw = _.template(jsTmpl)(config);
  const xmlTmpl = fs.readFileSync(path.join(__dirname, 'templates/tmpl/templates.xml')).toString();
  const xmlRaw = _.template(xmlTmpl)(config);
  structure.createModule(dist, config.module_name, jsRaw, xmlRaw);
}
