AUTHENTICATED COMPLETED

ROUTES:-

1. Get otp for signup
   Route : http://localhost:8000/api/v1/auth/getotp (post)
   Request example : { universityEmail : "sumit.2222222222@mujonline.edu.in"}
   SUCCESS Response example : {success : true, message : "OTP sent successfully"}
   ERROR Response example : {success : false, message : "This is an error"}

2. Sinup
   Route: http://localhost:8000/api/v1/auth/signup (post)
   Request example : {name : "Sumit", universityEmail : "sumit.33333333@mujonline.edu.in", "password" : "SUmit@2222", phone : 8888888888, batch : 5, "course" : "mca"}
   Response example : {success : true, message : "Sign up successful. Sign in to continue"}
   Error response example : {success : false, message : "All options are required"}

3. Sign in
   Route: http://localhost:8000/api/v1/auth/signin (post)
   Request example : { universityEmail : "sumit222222@mujonline.edu.in", password : "Sumit333@"}
   Response example : {success : true, message : "Signed in as Sumit", userInfo : {name : "Sumit", universityEmail : "sumit.33333333@mujonline.edu.in", "password" : "SUmit@2222", phone : 8888888888, batch : 5, "course" : "mca", role: "user"}}
   TOKEN WILL SET IN RESPONSE WITH TITLE TOKEN
   Error response example : {success : false, message : "Invalid password"}

4. Sign out
   Route: http://localhost:8000/api/v1/auth/signout (get)
   Request example : {}
   Response example : {success : true, message : "Signed out successfully"}
   TOKEN WILL BE DELETED FROM COOKIE
   Error response example : {success : false, message : "Please try again later"}

5. Reset password otp
   Route: http://localhost:8000/api/v1/auth/resetpassword (post)
   Request example : { universityEMail : "sumit.333333@mujonline.edu.in"}
   Response example : {success : true, message : "OTP to reset password sent to email id"}
   Response error example : {success : false, message : "Unable to send otp please try againlater"}

6. Submit new password
   Route: http://localhost:8000/api/v1/auth/newpassword (put)
   Request example : { universityEMail : "sumit.333333@mujonline.edu.in", otp : 449494, newPassword : "Sumit#444o4o"}
   Response example : {success : true, message : "Password changed successfully, Please Signin to continue"}
   TOKEN WILL BE DELETED FROM COOKIE
   Response error example : {success : false, message : "Invalid OTP or otp expired"}
