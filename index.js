const inquirer = require('inquirer');
const shell = require('shelljs');

const branches = shell.exec('git branch', { silent: true }).stdout;

function removeCurrentBranch(branch) {
    return branch[0] !== '*';
}

const branchNames = branches
    .split('\n')
    .filter(removeCurrentBranch)
    .filter(branch => Boolean(branch))
    .map(branch => branch.trim());

const reflog = shell.exec('git reflog', { silent: true }).stdout;
const records = reflog.split('\n').slice(0, 200);

const orderedBranchNames = [];
let unorderedBranchNames = branchNames;
records.forEach(record => {
    if (record.includes('checkout: ')) {
        const branchNameFound = unorderedBranchNames.find(branchName => record.includes(` to ${branchName}`));
        if (branchNameFound) {
            orderedBranchNames.push(branchNameFound);
            unorderedBranchNames = unorderedBranchNames.filter(branchName => branchNameFound !== branchName);
        }
    }
});

let recentOnly = false;
if (process.argv.length > 2 && process.argv[2] === '--recentOnly') {
    recentOnly = true;
}

const choices = recentOnly ? orderedBranchNames : [
    new inquirer.Separator('----- Recent: -----'),
    ...orderedBranchNames,
    new inquirer.Separator('----- Stale: -----'),
    ...unorderedBranchNames,
];

inquirer.prompt([{
    type: 'list',
    name: 'branch',
    message: 'Select a branch',
    choices: [
        ...choices,
        new inquirer.Separator('--------------------')
    ]
}]).then(({ branch }) => {
    shell.exec(`git checkout ${branch}`);
});
