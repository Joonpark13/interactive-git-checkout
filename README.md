# Interactive Git Checkout

Check out branches through an interactive CLI. When run, you will be prompted with a list of your local branches, ordered from most to least recently checked out. Use your arrow or "j" and "k" keys to make your selection and check out that branch.

Built using inquirer.js

## Install

For now, you'll have to clone the repo. NPM instructions coming shortly!

## Usage

```
(navigate to your repo)
node path/to/index.js
```

I recommend setting an alias in your bash profile. For example,

```
alias gc="node ~/jpark1/interactive-git-checkout/index.js"
```

### Options

Run the script with the `--recentOnly` option to list only your recently checked out branches.

