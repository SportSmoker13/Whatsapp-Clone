while(true){
    global.username = window.prompt("Enter UserName!!!\nUserName Should be Less than 10 Characters!!!");
    if(global.username.length<=7 && global.username.length>0){
        break;
    }
}
global.admin = false;
if(global.username==="Dhanesh" ||global.username==="Sonny" )
{
    global.admin = true;
}