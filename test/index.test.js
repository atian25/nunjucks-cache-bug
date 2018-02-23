'use strict';

const nunjucks = require('nunjucks');
const path = require('path');
const assert = require('assert');
const fs = require('mz/fs');

describe('test/index.test.js', () => {
  const baseDir = path.join(__dirname, 'fixtures');
  const tplPath = path.join(baseDir, 'test.tpl');
  const render = (tpl, locals) => {
    return new Promise((resolve, reject) => {
      nunjucks.render(tpl, locals, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  };

  before(() => {
    nunjucks.configure(baseDir, { noCache: false });
  });

  after(() => {
    fs.writeFileSync(tplPath, '{{ name }}', 'utf-8');
  });

  it('should work', async () => {
    let result = await render('test.tpl', { name: 'egg' });
    assert(result === 'egg');

    fs.writeFileSync(tplPath, '{{ name }} CHANGED', 'utf-8');

    result = await render('test.tpl', { name: 'egg' });
    assert(result === 'egg');
  });
});
