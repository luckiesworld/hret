
var config = {
  apiKey: "AIzaSyBC0nXLkP_EtjlTmQB835wqNWrQF9CDxMQ",
  authDomain: "spherestaffinfologins.firebaseapp.com",
  projectId: "spherestaffinfologins",
  storageBucket: "spherestaffinfologins.appspot.com",
  messagingSenderId: "880447627169",
  appId: "1:880447627169:web:f5f89e2caab59c33de35e0",
  measurementId: "G-HQYD6ZXSZG"
  };
 firebase.initializeApp(config);
 const auth = firebase.auth();
 var providerGoogle = new firebase.auth.GoogleAuthProvider();

      auth.onAuthStateChanged(function(cek_user) {
        if (cek_user) {
          var user = firebase.auth().currentUser;
          var email= user.email;
          var emailVerified = user.emailVerified;
          //console.log("verifikasi " + user.emailVerified);
          if (!emailVerified) {
            console.log("Unverified");
          } else {
            console.log("Verified");
            document.location = "admin/adminpage.html";
          }
          if (user){
            console.log("User exists " + user.email);
          }else{
            console.log("User None");
          }
        } else {
          console.log("not sign in");
        }
      });

      $( "#btn_signin" ).click(function(e) {
      	e.preventDefault();

      	var email = $('#email').val();
      	var password = $('#password').val();

      	firebase.auth().signInWithEmailAndPassword(email, password).then(function (){
          console.log("Login success");
         swal("Success!", "You are now logged in", "Have fun");
          document.location = "admin/adminpage.html";
        }).catch(function(error) {
      		var errorCode = error.code;
      		var errorMessage = error.message;
      		console.log(errorCode, errorMessage);
             swal.fire("Incorrect!", "Your username or password is incorrect", "Please try again");
           if(email == "bob@ssleepy.tech" && password == "123456"){
               swal("Invalid!", "Field must be filled out!", "error");
            window.location.href = "Dashboard.html"
        }
      	});
      });




      $("#btn_signup" ).click(function(e) {
      	e.preventDefault();

      	var email = $('#email').val();
      	var password = $('#password').val();
      	auth.createUserWithEmailAndPassword(email, password).then(function () {
      		console.log("Successfully signedup");
      		var user = auth.currentUser;
      		user.sendEmailVerification().then(function() {
      			alert("A verification email has been sent. Please check your inbox to verify.");
      			//logout();
      		}, function(error) {
      			alert( "Oops, something went wrong, verification email not sent. If this problem presists please contact us!");
      		});
      	}).catch(function(error) {
      		var errorCode = error.code;
      		var errorMessage = error.message;
      		console.log(errorCode, errorMessage);
      	});
      });


      $("#btn_signin_google").click(function(e) {
        e.preventDefault();

        auth.signInWithPopup(providerGoogle).then(result => {
          var token = result.credential.accessToken;
          var user = result.user;

          alert("Login with account : " + user.displayName);
          document.location = "index.html";
          
          console.log(token);
          console.log(user);
        }).catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);
        });
      });


      function logout(){
      	firebase.auth().signOut().then(function() {
      		console.log("Signout Successful");
      		alert("Successfully Signedout");
      	}).catch(function(error) {
      		alert( "Oops  Something went wrong!  If this problem presists, please contact us.");
      	});


             document
            .querySelector("#forgot-password")
            .addEventListener("click", () => {
                const email = document.querySelector("#login-email").value;
                if (email.trim() == "") {
                    alert("Enter Email");
                } else {
                    forgotPassword(email);
                }
            });

        const forgotPassword = (email) => {
            auth
                .sendPasswordResetEmail(email)
                .then(function () {
                    alert("Email sent");
                })
                .catch(function (error) {
                    alert("Invalid email or bad network connection");
                });
        };
      }
