# Contributing

## General Workflow

1. Fork the repo.
2. Clone to local computer.
1. Make commits to your feature branch. Commits are written in present tense.
1. Add upstream remote
  
  `$ git remote add upstream https://github.com/Fire-Devil/Archivr/`
1. Make a new branch for the issue/feature you are working on.
  1. Feature branches are cut from `develop`
    - `feature-<name>-#<issueNumber>`
  1. Hotfix branches are cut from `develop`
    - `hotfix-<name>`
  
  **NOTE**: Make sure to test your changes:

  1. Run the server and leave it watching: `nodemon server/index.js`

  2. In another terminal window, rebuild the dist files: `gulp build-development`

  3. Point your browser to `localhost:3000`
1. Add and commit to your feature branch. (don't push)
  `$git add .`
  `$git commit -m 'short description of changes made'`

1. When you've finished with your fix or feature, rebase upstream changes into your branch.
  1. Add upstream commits to feature branch (make sure you are on feature branch).
  
  `$ git pull --rebase upstream development`

  _If there is a merge conflict, resolve the conflicts and proceed._
  
  `$git --rebase continue`
  
  `$git add .`
  
  _After merge conflicts resolves/no conflicts originally._
  
  `$git push origin <branch name>` where <branch name> is your branch's name

  1. Submit a pull request to the branch from which yours was cut (i.e. `develop`). Include a description of your changes. (See below for more information on pull requests)

1. Update your local master.

  `$ git pull upstream development`


##Github Submission

Go to GitHub and send pull request to the fire-devil organization branch.

Please reference in the pull request comment the corresponding issue using the [supported keywords](https://help.github.com/articles/closing-issues-via-commit-messages/).

For example: 'This closes #27 and closes #5.'

2 people from the organization must read before a pull of lengthy or important code is accepted. 1 person only can accept code that is short or trivial.

###Reviewing Code
To test someone's pull request on your local machine:

1. `$ git remote add <remote name> <remote url>` e.g. `<remote name>` is dan, `<remote url>` is https://github.com/teachrdan/Archivr.git

2. `$ git fetch <remote name> <their branch>:<your branch>` e.g. `$ git fetch dan feature-fixLogin-#3:feature-fixLogin-#3`

3. `$ git checkout <your branch>` and test out the code on your local repo, e.g. `$ git checkout feature-fixLogin-#3`


##References

http://www.thumbtack.com/engineering/linear-git-history/
