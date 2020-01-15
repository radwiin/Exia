
#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy - pages'

# if you are deploying to https://<USERNAME>.github.io
# git push -f https://github.com/radwiin/radwiin.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/radwiin/Exia.git master:gh-pages

cd -

git add .

git commit -m 'deploy - repo - github'

git push
