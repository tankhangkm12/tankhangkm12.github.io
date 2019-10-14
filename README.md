# Happy

Happy save and don't worry about anything. Simplify your day-to-day Git workflow:

```
happy save
```

<img width="400px" src="https://raw.githubusercontent.com/franciscop/happy/master/img/happy.png" alt="screenshot" />

Basically, does these:

```bash
happy save

# Same as

git add . -A
git commit -m "Saved on ${time()}"
git pull origin master
git push
```

Run it with a string to use it as a commit string:

```bash
happy save "Added that new cool feature"

# Same as

git add . -A
git commit -m "Added that new cool featture"
git pull origin master
git push
```

Add a `--publish VERSION` flag to publish the current package to npm with [np](https://github.com/sindresorhus/np#readme):

```bash
happy --publish patch
happy --publish minor
happy --publish major

happy --publish 5.0.0
```
