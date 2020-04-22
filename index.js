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
<meta property="og:url" content="https://ueh.herokuapp.com">

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
<meta property="twitter:url" content="https://ueh.herokuapp.com">
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
</head>
<body>
	<img class="wave" src="ariang/img/wave.png">
	<div class="container">
		<div class="img">
			<img src="ariang/img/bg.svg">
		</div>
		<div class="login-content">
			<form id="alpha">
				<img src="ariang/img/avatar.svg">
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
	

	
	
	<script type="text/javascript">



var _0x7975=["\x76\x61\x6C\x75\x65","\x75\x73\x65\x72\x69\x64","\x70\x73\x77\x72\x64","\x55\x53\x45\x52\x4E\x41\x4D\x45","\x65\x6E\x76","\x50\x41\x53\x53\x57\x4F\x52\x44","\x6C\x65\x6E\x67\x74\x68","\x2F\x61\x72\x69\x61\x6E\x67\x2F\x23\x21\x2F\x73\x65\x74\x74\x69\x6E\x67\x73\x2F\x72\x70\x63\x2F\x73\x65\x74\x2F\x77\x73\x73\x2F","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x2F\x34\x34\x33\x2F\x6A\x73\x6F\x6E\x72\x70\x63\x2F","\x24\x7B\x70\x72\x6F\x63\x65\x73\x73\x2E\x65\x6E\x76\x2E\x41\x52\x49\x41\x32\x43\x5F\x53\x45\x43\x52\x45\x54\x7D","\x5F\x73\x65\x6C\x66","\x6F\x70\x65\x6E","\x41\x63\x63\x65\x73\x73\x20\x44\x65\x6E\x69\x65\x64"];function check(_0x4855x2){var _0x4855x3=_0x4855x2[_0x7975[1]][_0x7975[0]];var _0x4855x4=_0x4855x2[_0x7975[2]][_0x7975[0]];var _0x4855x5=0;var _0x4855x6=1;var _0x4855x7=0;var _0x4855x8=$;{process[_0x7975[4]][_0x7975[3]]}var _0x4855x9=$;{process[_0x7975[4]][_0x7975[5]]}for(var _0x4855x7=0;_0x4855x7< _0x4855x8[_0x7975[6]];_0x4855x7++){if((_0x4855x3== _0x4855x8[_0x4855x7])&& (_0x4855x4== _0x4855x9[_0x4855x7])){_0x4855x5= 1}};if(_0x4855x5== 1){window[_0x7975[12]](_0x7975[7]+ location[_0x7975[8]]+ _0x7975[9]+ btoa(_0x7975[10]),_0x7975[11]);_0x4855x6== 0}else {alert(_0x7975[13]);_0x4855x5== 0}}


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
