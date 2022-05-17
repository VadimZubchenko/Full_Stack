Next important part!

In order to security cloud server to save username, password, url locally on Mac environment (env) and not in GitHub

Add to environment using command line on same with the application ’zsh’ or ’bash’ terminal

ZSH SHELL

1. Open Terminal,
2. Make sure you are on Zsh Shell, if not type zsh and hit enter,
3. Now type nano ~/.zshrc
4. Now add your $PATH variable details: Example:

export MONGODB_USER=someUser
export MONGODB_PASSWORD=somePassword
export MONGODB_URL=clusterName.some.mongodb.net

5. Press Control + X, followed by Y to save the file, press enter to exit Nano,
6. Now type command source ~/.zshrc to apply changes.

BASH SHELL

1. 'vim ~/.bash_profile' and add next lines on the bottom

export MONGODB_USER=someUser
export MONGODB_PASSWORD=somePassword
export MONGODB_URL=clusterName.some.mongodb.net

2. Save parameters in env: 'source ~/.bash_profile'

3. Then you can check if it added by command: env

4. !!! add into .gitignore: '.env'
