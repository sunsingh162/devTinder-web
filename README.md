# Dev Tinder Frontend

- Create a vite application using npm create vite@latest devTinder-web -- --template react
- Install tailwind and inject the dependancies
- Install Daisy UI as npm i -D daisyui@latest
- Use Router components as routing in this project, earlier we ad used createBrowserRouter
- Keep Navbar and footer as intact and keep others in <Outlet/>

- Install axios and send POST request to server for login
- To get rid of CORS error, install npm cors
- Use like app.use(cors({origin:"http:localhost:5777,credentials:true}))
- Need to pass origin and crdentials as true as above to whitelist the frontend IP
- Because its a HTTP not HTTPS, browser wont store the cookies
- For that we need to pass {withCredentials: true} inside axios
- Install redux toolkit and react-redux
- Configure store => Provider => createSlice => add reducer to store

- We should be not able to access other routes without login
- If token is not present, redirect user to login page
- Build Logout Feature
- Build Feed Feature
- Build User Card
- Build my profile section with edit part(PATCH request)
- Build Connections page
- Build Requests recieved page
- Accept and reject an incoming request
- mark interested and uninterested to other users profile in feed page
- Made SignUp Page
- Did End to End testing for our app



# Deployment

- Signup on AWS 
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend    
    - npm install  -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance