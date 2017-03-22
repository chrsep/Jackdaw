# Jackdaw (WIP)
Simple electron app for handling blog

I am trying to build a blog that requires no server, powered by Jekyll. The idea is to host the jekyll code on Gitlab with a Gitlab CI attached to it, with the final blog hosted on Google Cloud Storage. This way, it will be possible to host many blogs basically for free.

Here is how making a new blog post goes:
1. Writer writes a blog post
1. He commits the post into Gitlab repo
2. Gitlab CI runs and build the code on every commit
3. If build is successful, the CI will upload the completed website into Google Cloud Storage

With this setup, making a new article will still be easy but *only if you are familiar with git and such*. This app aims to abstract away the code and git from the user and make the experience smoother for non programmers. It will handle:
- Git commit
- Git push
- Git pull
- Jekyll Front Matter
- File naming
- ...
