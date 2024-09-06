
import user_icon from  '../assets/person.png'
import password_icon from  '../assets/password.png'
import email_icon from  '../assets/email.png'
import { useState } from 'react'

const Login = ()=>{

    const[action, setAction]  = useState("Login");

return( 
        <div className ="form-container">
            <div className='form-header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>

            </div>
            
            <div className='inputs'>
                {action === "Login"? <div></div>: <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Username' />
                    
                </div>}
                
                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input type="email"  placeholder='Email ID'/>

                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' />

                </div>
            </div>
            {action === "Sign Up"? <div></div> : <div className="forgot-password">Forgot Password ? <span>Click Here.</span></div>}
            
            <div className='submit-container'>
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div >


)
}

export default Login;