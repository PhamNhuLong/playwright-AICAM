const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const isWin = process.platform === 'win32';

console.log(`\n🚀 [Allure Runner] Running Playwright tests...`);

const testProcess = spawnSync(isWin ? 'npx.cmd' : 'npx', ['playwright', 'test', ...args], {
  stdio: 'inherit',
  shell: isWin,
});

console.log('\n📊 [Allure Runner] Generating Allure Report...');
spawnSync(isWin ? 'npm.cmd' : 'npm', ['run', 'allure:generate'], {
  stdio: 'inherit',
  shell: isWin,
});

// Exit with original test process exit code so CI/CD accurately tracks pass/fail
process.exit(testProcess.status ?? 0);
