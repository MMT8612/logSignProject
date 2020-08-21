const form = document.getElementById('myForm');

document.addEventListener('keyup',function(event){
    if((event.code==='Enter')&&((checkUsername()==false)||(checkPassword()==false))){
        event.preventDefault();
        return false;
    }
})

form.addEventListener('submit',(e)=>{
    if((checkUsername()==true)&&(checkPassword()==true)){
        e.preventDefault();
        let data = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/~mmt8612/login.php',true);
        xhr.onload = function() {
            alert(this.responseText);
            if(this.readyState == 4 && this.status == 200){
                if(this.responseText==="Username_or_Password_is_incorrect")
                {
                    //console.log("Entered")
                    document.getElementById("div3").innerHTML="Username or Password is incorrect !!";
                    document.getElementById("div3").style.color="Red";
                    e.preventDefault();
                    return false;
                }
                else{
                    form.innerHTML="You have successfully logged up";
                    document.getElementById('para').innerHTML="";
                }
            }
        }
        xhr.send(data);
    }
    else{
        e.preventDefault();
        return false;
    }
});

function checkUsername(){
    const uname = document.getElementById("uname");
    let c=uname.value.charAt(0);
    if(uname.value==="")
    {
        document.getElementById("div1").innerHTML="Enter a value";
        document.getElementById("div1").style.color="Red";
        f=0;
        uname.focus();
    }
    else if(c=='_' || c.match(/[0-9]/g)!=null)
    {
        document.getElementById("div1").innerHTML="Username should not start with '_' and numbers";
        document.getElementById("div1").style.color="Red";
        f=0;
        uname.focus();
    }
    else{
        document.getElementById("div1").innerHTML="";
        uname.blur();
        return true;
    }
  return false;
}

function checkPassword(){
    const pwd   = document.getElementById("pwd");
    if(pwd.value=="")
    {
        document.getElementById("div2").innerHTML="Enter a password";
        document.getElementById("div2").style.color="Red";
        pwd.focus();
    }
    else if(pwd.value.length<6||(!(/[a-z]/.test(pwd.value)))||(!(/[A-Z]/.test(pwd.value)))||(!(/[0-9]/.test(pwd.value)))||((/^[A-Za-z0-9 ]+$/).test(pwd.value)))
    {
        document.getElementById("div2").innerHTML="Password should have atleat 6 characters that comprises of atleast\n"+
        ">1 upperCase(A-Z)\n>1 lowerCase(a-z)\n>1 number\n>1 symbol";
        document.getElementById("div2").style.color="Red";
        pwd.focus();
    }
    else
    {
        document.getElementById("div2").innerHTML="";
        pwd.blur();
        return true;
    }
  return false;
}

