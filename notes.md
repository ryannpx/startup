Hello, these are my notes for this class.

Make sure you commit and push your work!

1/10
- learned a lot about how git and github works. 

1/12
HTML - structure
css - style
javascript - interaction
service - web service endpoints
database/login - persisted app and auth data
websocket - data pushed from server, chat: shows on simon who starts the game and when they finish
react - web framework


for project, every other day, 3-5 commits each session

startup specification
- elevation pitchs
    - 30 seconds, casual, opportunity, value, tease
- visual sketch/ representation
- has to have something in it that uses all the technologies mentioned above

1/19
-tech stack
    - react over server: caddy, over node js, over mongoDB(database)

1/22
- secure website

1/24
~ commands ~
- echo - Output the parameters of the command
- cd - Change directory
- mkdir - Make directory
- rmdir - Remove directory
- rm - Remove file(s)
- mv - Move file(s)
- cp - Copy files
- ls - List files
- curl - Command line client URL browser
- grep - Regular expression search
- find - Find files
- top - View running processes
- df - View disk statistics
- cat - Output file
- less - Interactive file output
- wc - Count words
- ps - View processes
- kill - Kill a process
- sudo - Execute as admin
- ssh - Remote shell
- scp - Securely copy files to a remote computer
- history - Show history of commands
- ping - Test connection
- tracert - Trace network
- dig - DNS information
- man - Look in the manual


1/26
index.html can open in the browser (made one in the aws folder)

elements and tags:
-  starts with doctype
- language
- head
- first html or title
- head

- body 
- hello world
- body

html

1/31
- css!!!


2/20
- javascript is single threaded
    - everything bust be asynchronous
 
3/11
- production deployment
- 
3/18
-login datebase
- hashing passwords, the clear text is not store (ex : password ---> fjsldjfslk24325fjeiwjf)
- salted hash passwords password --> saltyieurow: kdjfi34i3jlkfjlsdfjg
- Bcrypt does salt, hash, and compare
- authentication uuid
- token for user, random string stored in database uuid (const uuid = require('uuid')
- cookies: things that happened previous sessions with the client

4/3
- react
- propxerties to components
- - states to componants




### KEYS!!!!
- my ip server 44.217.189.226
- website url http://44.217.189.226/
- remote shell into ubuntu server: ssh -i /Users/ryann/[keypairdestination including keypair] ubuntu@44.217.189.226

### how to deploy
nav to startup 
./deployFiles.sh -k /Users/ryann/[keypairdestination including keypair] -h porostudy.com -s startup
