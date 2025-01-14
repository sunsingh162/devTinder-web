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

- Backend
    - updated DB password
    - allowed ec2 instance public IP on mongodb server
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"

# NGINX Config

Frontend = http://43.204.96.49/
    Backend = http://43.204.96.49:7777/

    Domain name = devtinder.com => 43.204.96.49

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api

    nginx config : 

    server_name 43.204.96.49;

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

# Adding a custom domain name
- purchased domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- DNS record: A devtinder.in 43.204.96.49
- Enable SSL for website 

# Sending email via SES
- Create a IAM user
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK - v3 
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup SesClient
- Access Credentials should be created in IAm under SecurityCredentials Tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for Sending email address
- Make the email dynamic by passing more params to the run function