const childProcess = require('child_process');
const os = require('os');
const path = require('path');
const readline = require('readline');

const child = childProcess.spawn('flake8');

readline.createInterface({ input: child.stdout }).addListener('line', line => {
  const match = line.match(/^(.*?):(\d+):(\d+): (.*)$/);

  console.log(line);

  if (match) {
    const file = path.normalize(match[1]);
    console.log(
      `::error file=${file},line=${match[2]},col=${match[3]}::${match[4]}`,
    );
  }
});

child.addListener('exit', (status, signal) =>
  process.exit(signal ? 128 - os.constants.signals[signal] : status),
);
