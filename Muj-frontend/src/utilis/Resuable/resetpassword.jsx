import Styles from "./resetpassword.module.css";

let ResetPassword = () =>{


return<>

<div  className={Styles.container}>
  
<div className={Styles.whitediv}>
<span style={{fontSize:"2rem"}}>Reset Password</span>

<div>
<input type="email" placeholder="email" />

<input type="text"   placeholder="otp"/>


</div>
<div>
<input type="text" placeholder="password"/>

<input type="text" placeholder="Confirm password"/>


</div>

<button className={Styles.signin} >Sign in</button>

</div>


</div>

</>

}


export default ResetPassword;