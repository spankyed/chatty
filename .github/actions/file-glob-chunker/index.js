const core = require('@actions/core');
const glob = require('@actions/glob');
const chunk = require('lodash.chunk');
const shuffle = require('lodash.shuffle');

async function run() {
  const CHUNKS = Number(core.getInput('chunks'));
  const PATTERNS = core.getInput('patterns').split(/\r?\n/).map(p => p.trim());
  const SHUFFLE = core.getInput('shuffle') === 'true';

  const globber = await glob.create(PATTERNS.join('\n'));
  let files = await globber.glob();

  if (SHUFFLE) {
    files = shuffle(files);
  }

  const chunkLength = Math.max(Math.ceil(files.length / CHUNKS), 1);
  const result = chunk(files, chunkLength);

  result.forEach((chunk, index) => {
    core.setOutput(`chunk_${index + 1}`, chunk.join(','));
  });
}

run();
