import Home from './home'
import Login from './login'
import Signup from './signup'
import { useState } from 'react'
import {useCookies} from 'react-cookie'

function App() {

    //main hook for changing components between log-in page and sign-up page

    var [log, success] = useState(<Login login_func={() => { check_login() }} change_to_sign = {()=>{change_sign()}}/>)
    var [cookies,setCookie] = useCookies(['user_inf']);



    //functions for  changing to signup or login page
    var change_sign = ()=>{
        success(<Signup change_to_log = {()=>{change_log()}} logf = {()=>{add_user()}}/>)
    }
    var change_log = ()=>{
        success(<Login login_func={() => { check_login() }} change_to_sign = {()=>{change_sign()}}/>)
    }



    //login logic (depends on db for auth)
    var check_login = async () => {
        var email = document.getElementById('logip1').value;
        var password = document.getElementById('logip2').value;
        var epass = { email: email, password: password };

        await fetch('https://pinkstagram-server.herokuapp.com/login_post', {
            method: 'POST',
            body: JSON.stringify(epass),
            headers: { 'Content-Type': 'application/json' },
            credentials:'same-origin'
        })
        .then(res => res.json())
        .then(data => {
            var chk = data.chk_status;
            if (chk === 0) {
                success(<Login login_func={() => { check_login() }} errmsg = {"The email you entered doesn't belong to an account.Please check your email and try again."} change_to_sign = {()=>{change_sign()}}/>)
            }
            else if (chk === 2) {
                success(<Login login_func={() => { check_login() }} errmsg = {"Sorry, your password was incorrect.Please double-check your password."} change_to_sign = {()=>{change_sign()}}/>)
            }
            else if (chk === 1) {
                setCookie('email',email,{path:"/"})
                success(<Home finename = {email} />)
            }
        });
    }



    var add_user = ()=>{
        var user_data = {
            name:document.getElementById('logip2').value.toLowerCase(),
            email:document.getElementById('logip1').value,
            password:document.getElementById('logip3').value
        }

        fetch('https://pinkstagram-server.herokuapp.com/new_user_add',
        {
            method:"POST",
            body:JSON.stringify(user_data),
            headers:{ 'Content-Type': 'application/json' }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status_add === 0){
                success(<Signup logf={() => { add_user() }} change_to_sign = {()=>{change_log()}} errmsg = "user with same email-id already exists"/>)
            }
            else{
                success(<Signup logf={() => { add_user() }} change_to_sign = {()=>{change_log()}} errmsg = "user added successfully."/>)
                setTimeout(()=>{
                    success(<Login login_func={() => {check_login() }} change_to_sign = {()=>{change_sign()}}/>)
                },2000)
            }
        })
    }



    return (
        <div className="w-screen h-screen border-0">
            {log}
        </div>
    );
}

export default App;
