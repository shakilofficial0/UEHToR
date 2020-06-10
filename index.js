const http = require('http')
const httpProxy = require('http-proxy')
const express = require('express')
const request = require('request')
const httpsrv = require('httpsrv')
const fs = require('fs')
const SECRET = /rpc-secret=(.*)/.exec(
	fs.readFileSync('aria2c.conf', 'utf-8')
)[1]
const ENCODED_SECRET = Buffer.from(SECRET).toString('base64')

const PORT = process.env.PORT || 1234
const app = express()
const proxy = httpProxy.createProxyServer({
	target: 'ws://localhost:6800',
	ws: true
})
const server = http.createServer(app)


// Proxy websocket
server.on('upgrade', (req, socket, head) => {
	proxy.ws(req, socket, head)
})

// Handle normal http traffic
app.use('/jsonrpc', (req, res) => {
	req.pipe(request('http://localhost:6800/jsonrpc')).pipe(res)
})
app.use(
	'/downloads/' + ENCODED_SECRET,
	httpsrv({
		basedir: __dirname + '/downloads'
	})
)




app.use('/ariang', express.static(__dirname + '/ariang'))
app.get('/', (req, res) => {
	res.send(`
<!DOCTYPE html>
<html>
<head>
	<title>UEH Torrent Login</title>
	<link rel="icon" href="/ariang/favicon.png" type="image/png">
	
	
	<!-- Primary Meta Tags -->
<meta name="title" content="UEHToR - Premium File Leecher">
<meta name="description" content="UEHTor is Online Torrent and File Downloading Site. Here You can Download Torrent, Can Download File From Any Server. You can Also Save it on Your Google Drive.">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://${process.env.HEROKU_APP_NAME}.herokuapp.com">

<script>
var allMetaElements = document.getElementsByTagName('meta');
//loop through and find the element you want
for (var i=0; i<allMetaElements.length; i++) { 
  if (allMetaElements[i].getAttribute("property") == "og:url") { 
     //make necessary changes
     allMetaElements[i].setAttribute('content',window.location.protocol + "//" + window.location.hostname); 
     //no need to continue loop after making changes.
     break;
  } 
} 
</script>

<meta property="og:title" content="UEHToR - Premium File Leecher">
<meta property="og:description" content="UEHTor is Online Torrent and File Downloading Site. Here You can Download Torrent, Can Download File From Any Server. You can Also Save it on Your Google Drive.">
<meta property="og:image" content="/ariang/og.jpg">
<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://${process.env.HEROKU_APP_NAME}.herokuapp.com">
<script>
var allMetaElements = document.getElementsByTagName('meta');
//loop through and find the element you want
for (var i=0; i<allMetaElements.length; i++) { 
  if (allMetaElements[i].getAttribute("property") == "twitter:url") { 
     //make necessary changes
     allMetaElements[i].setAttribute('content',window.location.protocol + "//" + window.location.hostname); 
     //no need to continue loop after making changes.
     break;
  } 
} 
</script>





<meta property="twitter:title" content="UEHToR - Premium File Leecher">
<meta property="twitter:description" content="UEHTor is Online Torrent and File Downloading Site. Here You can Download Torrent, Can Download File From Any Server. You can Also Save it on Your Google Drive.">
<meta property="twitter:image" content="/ariang/og.jpg">

 ${process.env.GOOGLE_SITE_VERIFICATION}
	<link rel="stylesheet" type="text/css" href="ariang/css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet">
	<script src="https://kit.fontawesome.com/a81368914c.js"></script>

<script language="javascript">
<!--
if (window.location.href == "https://${process.env.HEROKU_APP_NAME}.herokuapp.com/?download") {
   location.replace('/downloads/'+btoa('${process.env.ARIA2C_SECRET}')+'/');
}
-->
</script>



</head>
<body>
	<img class="wave" src="ariang/img/wave.png">
	<div class="container">
		<div class="img">
			<img src="ariang/img/bg.svg">
		</div>
		<div class="login-content">
			<form id="alpha">
				<img id="downloads" src="ariang/img/avatar.svg">
				<h2 class="title">Welcome</h2>
           		<div class="input-div one">
           		   <div class="i">
           		   		<i class="fas fa-user"></i>
           		   </div>
           		   <div class="div">
           		   		<h5>Username</h5>
           		   		<input type="text"  class="input"  name="userid" required>
           		   </div>
           		</div>
           		<div class="input-div pass">
           		   <div class="i"> 
           		    	<i class="fas fa-lock"></i>
           		   </div>
           		   <div class="div">
           		    	<h5>Password</h5>
           		    	<input type="password" class="input" name="pswrd" required>
            	   </div>
            	</div>
            	<a href="#">Forgot Password?</a>
            	<input type="button" class="btn" onclick="check(this.form)" value="Login">
            </form>
        </div>
    </div>
    <script type="text/javascript" src="ariang/js/main.js"></script>



<script>
	
downloads.onclick=function(){
	open('/downloads/'+btoa('${process.env.ARIA2C_SECRET}')+'/')
}
</script>
	

	
	
	<script type="text/javascript">



function check(form)/*function to check userid & password*/
{
	var userName = form.userid.value;
	var userPass = form.pswrd.value;
	var correct = 0;	// set variable of correct so that if its turned ON ( True ) it runs the statement bellow.
	var wrong = 1; // set variable of Wrong so that if wrong is switched false then it alerts the user.

	var i = 0
	var userarray = ${process.env.USERNAME}; // set usernames and passwords in the array ["alpha", "User2", "User3", "User4", "User5"].
	var passarray = ${process.env.PASSWORD};


	for (var i=0; i < userarray.length; i++)
		{
			if (( userName == userarray[i]) && ( userPass == passarray[i])) // if variables userName and userPass are equals to the array then correct = true.
				{
					correct = 1;
				}
		}	


	if (correct == 1) // when correct is true this statement is run.
		{
			window.open("/ariang/#!/settings/rpc/set/wss/"+location.hostname+"/443/jsonrpc/"+btoa('${process.env.ARIA2C_SECRET}'), "_self") // launches the bookings page.	
			wrong == 0;
		}

	else
		{
			alert ("Access Denied");
			correct == 0;
		}
}


</script>
	
	
	

	
</body>
</html>
`)
})
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

if (process.env.HEROKU_APP_NAME) {
	const readNumUpload = () =>
		new Promise((res, rej) =>
			fs.readFile('numUpload', 'utf-8', (err, text) =>
				err ? rej(err) : res(text)
			)
		)
	const APP_URL = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
	const preventIdling = () => {
		request.post(
			'http://localhost:6800/jsonrpc',
			{
				json: {
					jsonrpc: '2.0',
					method: 'aria2.getGlobalStat',
					id: 'preventIdling',
					params: [`token:${SECRET}`]
				}
			},
			async (err, resp, body) => {
				console.log('preventIdling: getGlobalStat response', body)
				const { numActive, numWaiting } = body.result
				const numUpload = await readNumUpload()
				console.log(
					'preventIdling: numbers',
					numActive,
					numWaiting,
					numUpload
				)
				if (
					parseInt(numActive) +
						parseInt(numWaiting) +
						parseInt(numUpload) >
					0
				) {
					console.log('preventIdling: make request to prevent idling')
					request(APP_URL)
				}
			}
		)
		setTimeout(preventIdling, 15 * 60 * 1000) // 15 min
	}
	preventIdling()
}
