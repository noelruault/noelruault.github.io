#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project
# You may need to use some of the below options:
#   * -b=http://<your-username>.github.io/<your-project>
#   * --theme=<your-theme-name>
#   * --buildDrafts   # include drafts
#   * -d=<static-pages-dir>
#   * -v   # verbose
#
# Example: hugo -b=http://jhirniak.github.io/ --theme=hugo-steam-theme --buildDrafts -d=public/ -v
hugo

git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin code
# Example:
# git subtree push --prefix=public git@github.com:jhirniak/jhirniak.github.io.git main
git subtree push --prefix=public git@github.com:noelruault/noelruault.github.io.git main
