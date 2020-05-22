downloads.onclick=function(){
	open('/downloads/'+btoa(' ${process.env.ARIA2C_SECRET} ')+'/')
}
