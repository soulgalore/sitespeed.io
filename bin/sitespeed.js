#!/usr/bin/env node

/*eslint no-console: 0*/

'use strict';

const cli = require('../lib/cli/cli');
const sitespeed = require('../lib/sitespeed');

async function run(options) {
  let budgetFailing = false;
  process.exitCode = 1;
  try {
    const result = await sitespeed.run(options);
    if (result.errors.length > 0) {
      throw new Error('Errors while running:\n' + result.errors.join('\n'));
    }

    if (options.budget && Object.keys(result.budgetResult.failing).length > 0) {
      process.exitCode = 1;
      budgetFailing = true;
    }

    if (!budgetFailing || (options.budget && options.budget.suppressExitCode)) {
      process.exitCode = 0;
    }
  } catch (e) {
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}
let parsed = cli.parseCommandLine();
// hack for getting in the unchanged cli options
parsed.options.explicitOptions = parsed.explicitOptions;
parsed.options.urls = parsed.urls;
parsed.options.urlsMetaData = parsed.urlsMetaData;

run(parsed.options);
