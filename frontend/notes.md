to create a simple chat application using React and Vite.
# Simple Chat Application with React and Vite
start by getting a input field and a button to send messages. and a response dialoguebox
done using usestate hook becuase both will be changing
then create a function to handle the send button click
first we checked its working by simply displaying the user input in the response box
then we added a fetch call to the backend api to get the response from the server
the ui is made within the return statement of the functional component and css will be added later on 

now basic layout and functioning is done 
# connect with backend

for this imported axios 
and created a separate file api.js to make the api call to the backend
made a post request to the backend with the user input as the body
then got the response from the backend and returned it
exported that response
then imported that function in app.jsx and called it in the handle send function

# changin the handle send function
3 things to do 
- check if the input is empty or not
- make await request to llm and get teh response within a try cath and set error 
- set input to empty 
