# startup
This is my startup web application for cs 260!
## Elevator Pitch
  Have you ever had zero amounts of motivation to study? Like everytime you sit down to get something done, you are suddenly distracted? Introducing Study Timer (undecided on name), the ultimate study companion for all your unfocused needs! Tired of losing track of time while studying? Our website offers a customizable study timer with breaks of varying durations, allowing you to tailor your focus sessions to your needs. With relaxing background music and real time updates on others' study sessions, you can feel more motivated to get what you need to accomplished!
### Design

![Login](https://github.com/ryannpx/startup/assets/100808014/9cfd9106-b629-4164-91eb-3b5234b43355)

![Home](https://github.com/ryannpx/startup/assets/100808014/57ee7843-0d17-4566-a9ee-d29e882d32d1)


### Key Features
- Pomodero Timer 
- Join notifications
- Motivational cat
- Difference themes and colors
- To do list
- Music
- Uplifting messages

### Technologies
Here's how I will be using the following technologies:
- HTML: Two HTML pages, one for log in, one for the main page. Size of Youtube video. To do list
- CSS: Styling for the website, colors and styling of text, white space, timers, to do list
- JavaScript: Create the countdown timer, to do list. Dynamics on To do list, clicking on cat to change the message
- Service: Save the data of the accounts timers, time of video
- DG/Login/Authentication: user authentication for peoples accounts, 
- Websocket: Notifs when people join, finish sessions, chat sessions
- React: deploy onto react website 


Heres the link to my notes: [Here!](notes.md)


# HTML Deliverable
For this deliverable I built out the structure of my application using HTML.
- started with an index.hmtl, which will be my login page
- the page includes a color theme picker which may be removed, some info, a cat picture that i need to draw and update, and a login
- login button takes you to home.html
- home.html has a navbar to reload the page for home or to the login page
- added the color picker in, when you change color it changes the background color, might make presents so i can custom make the themes
- websocket connection placeholder, tells people when they study and finish, as well as a placeholder for a chat
- made the html for the countdown clock, going to implement functionality with js
- start and pause buttons
- added an imbedded youtube playlist, will update later to make it better
- another cat that can be clicked to say different sayings, will update later
- added a to do list, so far with just an add box and check boxes
- added info page for information about the pomodoro timer

- HTML pages - 3 HTML pages

# CSS Deliverable
For this deliverable I styled my HTML.
- Styled index.html, added a banner, and login box, and footer
- Navbar at the top
- Home, styled all of my things on my home page
- Trying to get my page responsive all the way, having troubles with the footer, will work on fixing
- Background colors fading and photos and youtube playlist embedded

# JAVASCRIPT Deliverable
For this deliverable I added the functionality of my website.
- Collects login info from login screen, user is displayed above timer
- Database js for keeping your to-do list and timer the same
- Websocket chat bar works, and placeholder to display the name of the user before the chat, and js support for the websocket connection
- Timer counts down from 25 minutes, start and pause buttons work, plays a sound at 0, and starts a 5 minute timer
- Functional to do list
- Clicking on the cat changes the picture and the motivational saying. 
- Working on hamburger on small screen, and layout of resizing as well
- Changed background and added button that changes the background

# Service Deliverable
For this deliverable I created an HTTP Service using node and express
- Created working service with local host
- Login has enpoints for user and logging in, no longer takes from storage. Button doesnt work because it needs working login info
- Pulls 3rd party quotes when clicking on cat in the home page
- To do list: Made endpoints for my to do list to take and save users own tasks, right now I kept local storage for demo purposes though.
- Updated some JS, burger now works when screen is made smaller, havent fixed all of the CSS yet to restyle there yet.
- Timer works a little differently now
# Login Deliverable
For this deliverable I made a working login seervice
- Connected to my atlas database
- Endpoints for adding, updating, and deleting data
- Keeps data in MongoDB
- Displays the users name above the stop clock
- Allows new creating accounds
- Encripted credentials are stoed
- Existing users can log in
- Can authenticate users, will not go into home until authenticated
# Websocket Deliverable
For this deliverable I made a chatbox with websocket!
- Listens to requests on the backend
- Connects on the frontend
- Stores messages in both database and local storage to save all the messages
- Displays 4 messages at a time
- Displays the users name before the message
- Users can chat back and forth with one another
- Added endpoints for the websocket
- Fixed some spacing issues on the chatbox
- Working on database connecction
- It sends it over websocket, database is being worked on to store and keep it there. But the websocket is connected and sends information
  # React Deliverable
For this deliverable I bundled my website with Vite
- bundled website with Vite
- Can run and debug frontend and backend with Vite
