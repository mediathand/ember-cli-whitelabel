var Path = require('path');

var entities = new (require('html-entities').AllHtmlEntities);

function EmberCLIWhitelabel(project) {
  this.project = project;
  this.name = 'Ember CLI Whitelabel';
}

EmberCLIWhitelabel.prototype.included = function included(app) {
  this.app = app;
  this.options = app.options.whitelabel || {};
};

EmberCLIWhitelabel.prototype.contentFor = function contentFor(type/*, config*/) {
  if (type === 'head') {
    var head = [];

    if (this.options.title) {
      head.push('    <title>' + entities.encode(this.options.title) + '</title>');
    }
    if (this.options.description) {
      head.push('    <meta name="description" content="' + entities.encode(this.options.description) + '"')
    }

    return head;
  }
};

EmberCLIWhitelabel.prototype.treeFor = function treeFor(type) {
  var label = this.options.label || 'default';
  if (type === 'styles') {
    return Path.join('config', 'labels', label, 'styles');
  }

  if (type === 'public') {
    return Path.join('config', 'labels', label, 'public');
  }
};

module.exports = EmberCLIWhitelabel;