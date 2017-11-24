angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$rootScope', 'SwapiService', '$http', '$speechSynthetis', '$speechRecognition', '$speechCorrection','$state','$modal',function ($scope,$rootScope,SwapiService,$http,$speechSynthetis, $speechRecognition, $speechCorrection,$state,$modal) {

    $scope.tapped = function () {
        console.log($scope.event); // the event object
        console.log('touchstart event called');
    }

    $scope.Sender_Name = $rootScope.Sender_Name;
    $scope.sub = $rootScope.subject;

    $scope.reply = {};
    $scope.reply.message = "";

    $scope.reply = function () {

        var message = {
            to: $rootScope.Sender_Name,
            subject: $rootScope.subject,
            message: $scope.reply.message
        }

        $rootScope.inbox = {
            Receiver_Name: $rootScope.Sender_Name,
            subject: $rootScope.subject,
            I_Message: $scope.reply.message,
            Sender_Name: $rootScope.uname,

        }

        var comp = SwapiService.posMessage($rootScope.uname, message);
        comp.then(function successCallBack(response) {

            /*$modal.open({
                templateUrl: 'views/popup/mstatus.html',
                controller: "closePopupsCtrl",
        
              })*/

            alert('Mail sent');

            var inbox = SwapiService.posInbox($rootScope.inbox);
            inbox.then(function successCallBack(response) {
                console.log(response);
            }, function errorCallback(response) {

            })

        }, function errorCallback(response) {
            if ('speechSynthesis' in window) {

                var speak = new SpeechSynthesisUtterance('Message not sent, please retry');
                speak.rate = 1.5;
                speak.volume = 1.6;
                console.log(speak.text);
                window.speechSynthesis.speak(speak);

            }
            else {
                alert("Speech not supported, please use google chrome instead");
            }
        })
    }


    $scope.logout = function(){

                if('speechSynthesis' in window)
                {
                    
                      var speak = new SpeechSynthesisUtterance('You are now logging out');
                      speak.rate = 1.5;
                      speak.volume = 1.6;
                      console.log(speak.text);
                      window.speechSynthesis.speak(speak);
                      
                }
                else{
                    alert('Speech not supported, please use google chrome instead');
                }

                
                
            }

            $rootScope.uname = $rootScope.details.U_Name;

            $scope.datas = {};
            $scope.datas.to = "";
            $scope.datas.subject = "";
            $scope.datas.message = "";

            $scope.compo = function() {

                var message = {
                    to : $scope.datas.to,
                    subject :$scope.datas.subject,
                    message : $scope.datas.message
                }
                $rootScope.inbox = {
                    Receiver_Name : $scope.datas.to,
                    subject: $scope.datas.subject,
                    I_Message : $scope.datas.message,
                    Sender_Name : $rootScope.uname,
                    
                }

                var comp = SwapiService.posMessage($rootScope.uname,message);
                comp.then(function successCallBack(response){
    
                    /*$modal.open({
                        templateUrl: 'views/popup/mstatus.html',
                        controller: "closePopupsCtrl",
                
                      })*/

                      alert('Mail sent');

                      var inbox = SwapiService.posInbox($rootScope.inbox);
                      inbox.then(function successCallBack(response){
                            console.log(response);
                      },function errorCallback(response){

                      })

                },function errorCallback(response){
                    if('speechSynthesis' in window)
                    {
                        
                          var speak = new SpeechSynthesisUtterance('Message not sent, please retry');
                          speak.rate = 1.5;
                          speak.volume = 1.6;
                          console.log(speak.text);
                          window.speechSynthesis.speak(speak);
                  
                    }
                    else{
                        alert("Speech not supported, please use google chrome instead");
                    }
                })
            }


            //*********************************************** */
           
            $scope.pemDel = function () {

                
                var messid = $rootScope.re._id;

                console.log(messid);

                var gotoTrash = SwapiService.deleteMess(messid);
                gotoTrash.then(function successCallBack(response) {
                    console.log(response);

                    if ('speechSynthesis' in window) {

                        var speak = new SpeechSynthesisUtterance('Message has been deleted, it will automatically redirect to inbox');
                        speak.rate = 1.5;
                        speak.volume = 1.6;
                        console.log(speak.text);
                        window.speechSynthesis.speak(speak);

                    }
                    else {
                        alert('Speech not supported, please use google chrome instead');
                    }
                    $state.reload();
                });



            }
                //************************************************* */


            $scope.tra = function (mess) {

            
                $rootScope.messa = mess;
                console.log($rootScope.messa);

                if ('speechSynthesis' in window) {

                    var speak = new SpeechSynthesisUtterance('Now click the delete button to delete or uncheck if you are not sure');
                    speak.rate = 1.5;
                    speak.volume = 1.6;
                    console.log(speak.text);
                    window.speechSynthesis.speak(speak);

                }
                else {
                    alert('Speech not supported, please use google chrome instead');
                }

            }

            $scope.del = function () {

                console.log(mess);
                //console.log(event);
                var mess = $rootScope.messa;
                $scope.username = mess.Receiver_Name + 'Trash';

                $scope.message = {
                    Receiver_Name: $scope.username,
                    I_Message: mess.I_Message,
                    Sender_Name: mess.Sender_Name,
                    _id: mess._id
                }

                console.log($scope.message);

                var gotoTrash = SwapiService.deleteMessage(mess._id, $scope.message);
                gotoTrash.then(function successCallBack(response) {
                    console.log(response);

                    if ('speechSynthesis' in window) {

                        var speak = new SpeechSynthesisUtterance('Message moved to trash, you can delete it permanently from there');
                        speak.rate = 1.5;
                        speak.volume = 1.6;
                        console.log(speak.text);
                        window.speechSynthesis.speak(speak);

                    }
                    else {
                        alert('Speech not supported, please use google chrome instead');
                    }
                    $state.reload();
                })


            }

            $scope.res = function (rest) {

                console.log(rest);
                //console.log(event);
                $rootScope.re = rest;

                if ('speechSynthesis' in window) {

                    var speak = new SpeechSynthesisUtterance('Now click the delete button to delete permanently or restore mail button, to restore it to your inbox');
                    speak.rate = 1.5;
                    speak.volume = 1.6;
                    console.log(speak.text);
                    window.speechSynthesis.speak(speak);

                }
                else {
                    alert('Speech not supported, please use google chrome instead');
                }

            }

            $scope.restore = function () {

                console.log($rootScope.re);
                var me = $rootScope.re;
                
                //console.log(event);
                $scope.username = $rootScope.uname;

                $scope.message = {
                    Receiver_Name: $scope.username,
                    I_Message: me.I_Message,
                    Sender_Name: me.Sender_Name,
                    _id: me._id
                }

                console.log($scope.message);

                var gotoTrash = SwapiService.deleteMessage(me._id, $scope.message);
                gotoTrash.then(function successCallBack(response) {
                    console.log(response);

                    if ('speechSynthesis' in window) {

                        var speak = new SpeechSynthesisUtterance('Message has been restored, it will automatically redirect to inbox');
                        speak.rate = 1.5;
                        speak.volume = 1.6;
                        console.log(speak.text);
                        window.speechSynthesis.speak(speak);

                    }
                    else {
                        alert('Speech not supported, please use google chrome instead');
                    }
                    $state.reload();
                })

            }


            var user = SwapiService.userInfo($rootScope.uname);
            user.then(function successCallBack(response){
                response.data;
                console.log(response.data[0]);

                $scope.message = response.data[0];
                $rootScope.usedetails = response.data;
                $rootScope.gMessage = response.data[0].inboxDetails;
                console.log($rootScope.gMessage);
                $rootScope.name = response.data[0].F_Name;
                console.log($scope.message);

                if('speechSynthesis' in window)
                {
                    
                      var speak = new SpeechSynthesisUtterance('Hi ' + $rootScope.name + ', welcome your mail');
                      speak.rate = 1.5;
                      speak.volume = 1.6;
                      console.log(speak.text);
                      window.speechSynthesis.speak(speak);
              
                      
                }
                else{
                    alert("Speech not supported, please use google chrome instead");
                }

                if (response.data[0].inboxDetails.length == 0) {
                    if ('speechSynthesis' in window) {

                        var speak = new SpeechSynthesisUtterance('Your email is empty');
                        speak.rate = 1.5;
                        speak.volume = 1.6;
                        console.log(speak.text);
                        window.speechSynthesis.speak(speak);

                    }
                    else {
                        alert('Speech not supported, please use google chrome instead');
                    }
                }
            });

 /* var recognition = new webKitSpeechRecognition();
  var interim = [];
  var final = '';
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;

  recognition.onresult = function(e){
      document.getElementById('usr').value = e.results[0][0].transcript;
      recognition.stop();
      document.getElementById('labnol').submit();
  }

  recognition.onerror = function(e)
  {
      recognition.stop();
  }*/

/*$speechRecognition.onstart(function(e){
    console.log("Started")
    $speechSynthetis.speak('Yes? How can I help you?', 'en-US');
  });
  $speechRecognition.onerror(function(e){
    var error = (e.error || '');
    alert('An error occurred ' + error);
  });
  // $speechRecognition.setLang($scope.LANG);
  $speechRecognition.listen();*/
  //var inputTxt = document.querySelector('.txt').textContent;

  //=================


  $scope.delete = function(){

    var delet = SwapiService.emptyInbox($rootScope.uname);
    delet.then(function successCallBack(response){
        console.log(response)
        if(response.data == null)
        {
            alert('Mail is empty');
        }
        else{
            alert('DELETED');
        }
    })
  }

  $scope.inbox = true;
  $scope.trash = false;
  $scope.sent = false;

  $scope.inbo = function(){
    $scope.inbox = true;
    $scope.trash = false;
    $scope.sent = false;

    if ('speechSynthesis' in window) {

        var speak = new SpeechSynthesisUtterance('Mail box, you can delete or read your mails!!');
        speak.rate = 1.5;
        speak.volume = 1.6;
        console.log(speak.text);
        window.speechSynthesis.speak(speak);

    }
    else {
        alert('Speech not supported, please use google chrome instead');
    }
    var user = SwapiService.userInfo($rootScope.uname);
    user.then(function successCallBack(response){

        $scope.message = response.data[0];
        console.log($scope.message);
        if ($scope.message.inboxDetails.length == 0)
        {
            if ('speechSynthesis' in window) {

                var speak = new SpeechSynthesisUtterance('Your email is empty');
                speak.rate = 1.5;
                speak.volume = 1.6;
                console.log(speak.text);
                window.speechSynthesis.speak(speak);

            }
            else {
                alert('Speech not supported, please use google chrome instead');
            }
        }

    })
  }

  $scope.tras = function(){

      if ('speechSynthesis' in window) {

          var speak = new SpeechSynthesisUtterance('Trash mail, you can delete or restore the emails from here!!!');
          speak.rate = 1.5;
          speak.volume = 1.6;
          console.log(speak.text);
          window.speechSynthesis.speak(speak);

      }
      else {
          alert('Speech not supported, please use google chrome instead');
      }

    $scope.inbox = false;
    $scope.trash = true;
    $scope.sent = false;
    var usern = $rootScope.uname + 'Trash';

    var trashh = SwapiService.getTrash(usern);
    trashh.then(function successCallBack(response){
        

        $scope.trashed = response.data;
        console.log($scope.trashed);
    })
  }

  $scope.sen = function(){
    $scope.inbox = false;
    $scope.trash = false;
    $scope.sent = true;
    
    if ('speechSynthesis' in window) {

        var speak = new SpeechSynthesisUtterance('Sent mails');
        speak.rate = 1.5;
        speak.volume = 1.6;
        console.log(speak.text);
        window.speechSynthesis.speak(speak);

    }
    else {
        alert('Speech not supported, please use google chrome instead');
    }

    var sent = SwapiService.getMessages($rootScope.uname);
    sent.then(function successCallBack(response){
        $scope.messages = response.data;
        console.log($scope.messages);

    });

  }


  var r = document.getElementById('result');

  $scope.subject = function () {

      if ('SpeechRecognition' in window) {
          var recognition = new webkitSpeechRecognition();

          recognition.continuous = true;
          recognition.lang = 'en-GB';
          recognition.interimResults = true;

          console.log("I have been activated");
          var recognition = new SpeechRecognition();

          recognition.onresult = function (event) {
              console.log(event);
              if (event.results.length > 0) {
                  $scope.datas.subject = event.results[0][0].transcript;
                  
                  
                  $scope.$apply()
              }
          };

          recognition.onerror = function (event) {
              console.log(event);
          };
          recognition.start();
          recognition.onerror = function (event) {
              console.log(event);
          };

          recognition.onspeechend = function () {
              recognition.stop();
          }
          /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc

           Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com

           Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

      }
      else {
          alert("Not supported");
      }

  }

  //***************************************** */
  
  $scope.to = function () {

      if ('SpeechRecognition' in window) {
          var recognition = new webkitSpeechRecognition();

          recognition.continuous = true;
          recognition.lang = 'en-GB';
          recognition.interimResults = true;

          console.log("I have been activated");
          var recognition = new SpeechRecognition();

          recognition.onresult = function (event) {
              console.log(event);
              if (event.results.length > 0) {
                  $scope.datas.to = event.results[0][0].transcript;
                  
                  $scope.$apply()
              }
          };

          recognition.onerror = function (event) {
              console.log(event);
          };
          recognition.start();
          recognition.onerror = function (event) {
              console.log(event);
          };

          recognition.onspeechend = function () {
              recognition.stop();
          }
          /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc

           Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com

           Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

      }
      else {
          alert("Not supported");
      }

  }

  //********************** */

    $scope.messag = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.datas.message = event.results[0][0].transcript;
    
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
  
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
  
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    $scope.sending = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    //$scope.datas.password = event.results[0][0].transcript;
                    if (event.results[0][0].transcript.includes('send')) {
                        console.log('Sending in');
                        $scope.compo();
                        //$state.go('home');
                    }
                    
                    //$scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc

             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com

             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }


}])
.controller('loginCtrl', ['$scope','$rootScope','SwapiService','$http','$state',function ($scope,$rootScope,SwapiService,$http,$state) {
    
    /*window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    let p = document.createElement('p');
    const words = document.querySelector('.words');
    words.appendChild(p);


    recognition.addEventListener('result', e =>{
        console.log(e);
    })

    recognition.start();*/




    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    //recognition.maxAlternatives = 1;

    var r = document.getElementById('result');

    $scope.usernam = function () {
        //console.log(event)
        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.datas.username = event.results[0][0].transcript;
                    //alert($rootScope.datas.username)
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc

             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com

             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    $scope.password = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.datas.password = event.results[0][0].transcript;
                    //$scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc

             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com

             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }


    $scope.activate = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    //$scope.datas.password = event.results[0][0].transcript;
                    if (event.results[0][0].transcript.includes('login')){
                        console.log('Loggin in');
                        $scope.login();
                        //$state.go('home');
                    }
                    else if (event.results[0][0].transcript.includes('register'))
                    {
                        console.log('Registering');
                        $state.go('register');
                    }
                    else if (event.results[0][0].transcript.includes('forgot'))
                    {
                        console.log('Retrieving password');
                        $state.go('forgot');
                    }
                    //$scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc

             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com

             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }
    

     /* recognition.onspeechend = function() {
        recognition.stop();
      }
      recognition.onnomatch = function(event) {
        diagnostic.textContent = "I didn't recognise that voice.";
      }*/
      

     



      /*var recognizer = new SpeechRecognition();
      recognizer.addEventListener('result',function(event){
          console.log('Recognition completed');

          for (var i = event.resultIndex; i < event.resuls.length; i++)
          {
              if(event.results[i].isFinal)
              {
                  resolve(event.resuls[i][0].transcript);

              }
          }
      });

      recognizer.addEventListener('error', function(event){
          console.log('Recognition error');
          reject('An error has occurred while recognizing ' + event.error);

      })

      recognizer.addEventListener('nomatch', function(event){
          console.log('Recognition ended because of no match');
          reject('Error: sorry but I could not find a match ');
          
      })

      recognizer.addEventListener('end', function(event){
          console.log('Recognition ended');
          reject('Error: sorry but I could not recognize your speech');
          
      })

      console.log('Recognition started');
      recognizer.start();*/

      if('speechSynthesis' in window)
      {
          
            var speak = new SpeechSynthesisUtterance('Please fill all your details, when you are done, click anywhere on the screen to login using voice command or click the login button to login');
            speak.rate = 1.5;
            speak.volume = 1.6;
            console.log(speak.text);
            window.speechSynthesis.speak(speak);
    
            
      }
      else{
          alert("Speech not supported, please use google chrome instead");
      }
      
    $scope.datas = {};
        
                $scope.login = function(datas){
        
                var username = $scope.datas.username;
                var password = $scope.datas.password;
                    if(!$scope.datas.username || !$scope.datas.password)
                    {
                        window.alert("Please fill the text fields");
                        var speak = new SpeechSynthesisUtterance('Please fill all the text fields');
                        speak.rate = 1.5;
                        speak.volume = 1.6;
                        console.log(speak.text);
                        window.speechSynthesis.speak(speak);
                    }
                    else{
                        console.log(username + ' ' + password);
                        var loginn = SwapiService.login(username,password);
                        
                                    loginn.then(function successCallBack(response) {
                           
                                        if(response.data.length == 0)
                                        {
                                            window.alert("Wrong password or username");
                                            var speak = new SpeechSynthesisUtterance('Wrong password or username');
                                            speak.rate = 1.5;
                                            speak.volume = 1.6;
                                            console.log(speak.text);
                                            window.speechSynthesis.speak(speak);
                                        }
                                        else
                                        {
                                            if(username == response.data[0].U_Name && password == response.data[0].U_Pass)
                                            {
                                                $rootScope.details = response.data[0];
                                                console.log($rootScope.details);
                                               /* $rootScope.name = response.data[0].name;
                                                $rootScope.profileNum = response.data[0].profileNum;
                                                console.log($rootScope.name);
                                                $scope.person = "successfully logged in";
                                                window.alert($scope.person);*/
                                                console.log(response);
                                                $state.go("home");
                                            }
                                        }
                                        
                                    }, function errorCallback(response) {
                        
                                        $scope.regist = response;
                                        window.alert("Error");
                                    })
                        
                    }
                    
                }
    
    

   /* var inputTxt = document.querySelector('.txt').textContent;
    var username = document.querySelector('#username').textContent;
    var pass = document.querySelector('#password').textContent;
    console.log(inputTxt);

    if('speechSynthesis' in window)
    {
        
          var speak = new SpeechSynthesisUtterance(inputTxt);
          speak.rate = 1.5;
          console.log(speak);
          window.speechSynthesis.speak(speak);
    }
    else{
        alert("Speech not supported, please use google chrome instead");
    }

    if('SpeechRecognition' in window)
    {

    }
    else
    {
        alert('Not available')
    }

    if('speechSynthesis' in window)
    {
        
          var susername = new SpeechSynthesisUtterance('What is your ' + username);
          susername.rate = 1.6;
          $rootScope.username = susername;
          console.log(susername);
          window.speechSynthesis.speak(susername);
    }
    else{
        alert("Speech not supported, please use google chrome instead");
    }

    console.log($rootScope.username);
    $scope.datas = {};
    
    $scope.sub = function(){

        var username = $scope.datas.username;
        console.log(username);
        if('speechSynthesis' in window)
        {
            
              var speak = new SpeechSynthesisUtterance('You have entered ' + username);
              console.log(speak.text);
              window.speechSynthesis.speak(speak);
        }
        else{
            alert("Speech not supported, please use google chrome instead");
        }

    }
*/
   

     /*  var recognition = new SpeechRecognition();
        var interim = [];
        var final = '';
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
      
        recognition.onresult = function(e){
            document.getElementById('usr').value = e.results[0][0].transcript;
            recognition.stop();
            document.getElementById('labnol').submit();
        }
      
        recognition.onerror = function(e)
        {
            recognition.stop();
        }

    }
   var inputTxt = document.querySelector('.txt');
        console.log(inputTxt)*/
    

    //==============================================

    
    /*var fieldLabels = [].slice.call(document.querySelectorAll('label'));

    function formData(i){
        return promise.then(function(){
            return Speech.speak(fieldLabels[i].dataset.question);
        }).then(function(){
            return Speech.recognize().then(function(text){
                document.getElementById(fieldLabels[i].getAttribute('for')).value = text;

            })
        })
    }

    for(var i = 0; i < fieldLabels.length; i++){
        promise = formData(i);
    }
    var promise = new Promise(function(resolve){
        resolve();
    })

    promise.then(function(){
        return Speech.speak('Thank you for filling the form')
    }).catch(function(error){
        alert(error);
    })

    var Speech = {
        speak : function(text){
            return new Promise(function(resolve,reject){
                if(!SpeechSynthesisUtterance){
                    reject('API not supported');
                }

                var utterance = new SpeechSynthesisUtterance(text);

                utterance.addEventListener('end',function(){
                    console.log('Synthesizing completed');
                    resolve();
                });

                utterance.addEventListener('error',function(event){
                    console.log('Synthesizing error');
                    reject('An error has occured while speaking: ' + event.error);
                });
                console.log('Synthesizing the text: ' + text);

                speechSynthesis.speak(utterance);
            });
        },
        recognize : function(){
            return new Promise(function(resolve,reject){
                var SpeechRecognition = SpeechRecognition || webKitSpeechRecognition || null;
                if (SpeechRecognition === null)
                {
                    reject('API not supported');

                }
                var recognizer = new SpeechRecognition();
                recognizer.addEventListener('result',function(event){
                    console.log('Recognition completed');

                    for (var i = event.resultIndex; i < event.resuls.length; i++)
                    {
                        if(event.results[i].isFinal)
                        {
                            resolve(event.resuls[i][0].transcript);

                        }
                    }
                });

                recognizer.addEventListener('error', function(event){
                    console.log('Recognition error');
                    reject('An error has occurred while recognizing ' + event.error);

                })

                recognizer.addEventListener('nomatch', function(event){
                    console.log('Recognition ended because of no match');
                    reject('Error: sorry but I could not find a match ');
                    
                })

                recognizer.addEventListener('end', function(event){
                    console.log('Recognition ended');
                    reject('Error: sorry but I could not recognize your speech');
                    
                })

                console.log('Recognition started');
                recognizer.start();
            })
        }
    }*/
    
}])
.controller('registerCtrl', ['$scope','$state','$rootScope','SwapiService','$http',function ($scope, $state,$rootScope,SwapiService,$http) {
    

    if('speechSynthesis' in window)
    {
        
          var speak = new SpeechSynthesisUtterance('Please fill all your details, when you are done, move mouse to the right, or left to cancel');
          speak.rate = 1.5;
          speak.volume = 1.6;
          console.log(speak.text);
          window.speechSynthesis.speak(speak);
  
          
    }
    else{
        alert("Speech not supported, please use google chrome instead");
    }


    $scope.data = {};
    $scope.data.U_Name = "";
    $scope.data.U_Pass = "";
    $scope.data.confirm = "";
    $scope.data.F_Name = "";
    $scope.data.L_Name = "";
    $scope.data.ID_Number = "";
    $scope.data.U_Country = "";
    $scope.data.DOB = "";
    $scope.data.Gender = "";
    $scope.data.Email_address = "";
    $scope.data.Cell_no = "";
    $scope.data.question = "";
    $scope.data.answer = "";
        
                $scope.registe = function () {


                    var Id_num = $scope.data.ID_Number;

                    var date = Id_num.substring(0, 6);
                    console.log(date);
                    var year = date.substring(0, 2);
                    var month = date.substring(2, 4);
                    var day = date.substring(4, 6);
                    if (year.substring(0, 1) == 0 || year.substring(0, 1) == 1)
                    {
                        var concat = "20" + year;
                    }
                    else if (year.substring(0, 1) >= 2 && (year.substring(0, 1) <= 9))
                    {
                        var concat = "19" + year;
                    }
                    
                    //console.log(parseInt(concat));

                    var newAge = parseInt(concat);
                    var yourAge = 2017 - newAge;

                    console.log(yourAge);

                    var newAge = parseInt(concat);
                    var DOB = concat + '-' + month + '-' + day;
                    $rootScope.DOB = DOB;
                    console.log($rootScope.DOB);

                    var Gender = parseInt(Id_num.substring(6, 10));
                    console.log(Gender);

                    if (Gender >= 0 && Gender <= 4999) {
                        $scope.gen = "Female";
                        console.log($scope.gen);
                    }
                    else if (Gender >= 5000 && Gender <= 9999) {
                        $scope.gen = "Male";
                        console.log($scope.gen);
                    }

                    var citizen = parseInt(Id_num.substring(10, 11));
                    console.log(citizen);
                    
                        if (!/^[a-zA-Z]+$/.test($scope.data.U_Name || $scope.data.F_Name || $scope.data.L_Name || $scope.data.U_Country || $scope.data.Gender)) {
                            alert("Not a string");
                        }
                        else if (/^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/.test($scope.data.ID_Number) ==false) {
                            alert("ID not valid ");
                        }

                        else if (isNaN($scope.data.U_Pass || $scope.data.confirm || $scope.data.ID_Number || $scope.data.Cell_no)) {
                            alert("Not a number");
                        }
                        else if (!$scope.data.U_Pass )
                        {
                            alert("Password cant be empty");
                            $scope.pass = true;
                        }
                        else if (!$scope.data.confirm) 
                        {
                            alert("Confirm password cant be empty");
                        }
                        else if (!$scope.data.ID_Number) 
                        {
                            alert("ID No. cant be empty");
                        }
                        else if (!$scope.data.Cell_no) 
                        {
                            alert("Cell no cant be empty");
                        }
                        else if (!$scope.data.U_Name) 
                        {
                            alert("Username cant be empty");
                        }
                        else if (!$scope.data.F_Name) 
                        {
                            alert("Name cant be empty");
                        }
                        else if (!$scope.data.L_Name) 
                        {
                            alert("Surname cant be empty");
                        }
                        else if (!$scope.data.U_Country)
                        {
                            alert("Country cant be empty");
                        }
                        else if (!$scope.data.Gender) {
                            alert("Gender cant be empty");
                        } 
                        else if ($scope.gen != $scope.data.Gender) 
                        {
                            alert("Gender selected does not match the one on ID");
                        }
                        else if (!$scope.data.Email_address)
                        {
                            alert("Email adddress cant be empty");
                        } 
                        else if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test($scope.data.Email_address)) {
                            alert("Email invalid");
                        } 
                        else if (!$scope.data.question)
                        {
                            alert("Security has to be selected");
                        } 
                        else if ( !$scope.data.answer) {
                            alert("Answer cant be empty");
                        }
                        else if ($scope.data.ID_Number.length <= 12 || $scope.data.ID_Number.length >= 14)
                        {
                            console.log($scope.data.ID_Number.length)
                            alert("ID incomplete or too long")
                        }
                        else if ($scope.data.Cell_no.length <= 9 || $scope.data.Cell_no.length >= 11) {
                            alert("Invalid phone number")
                        }
                        else if ($scope.data.U_Pass.length < 5) {
                            alert("Password too short")
                        }
                        else if (citizen == 0) {
                            var password = $scope.data.U_Pass;
                            var confirmPasswdord = $scope.data.confirm;

                            var person = {
                                U_Name: $scope.data.U_Name + '@mail.com',
                                U_Pass: $scope.data.U_Pass,
                                F_Name: $scope.data.F_Name,
                                L_Name: $scope.data.L_Name,
                                ID_Number: $scope.data.ID_Number,
                                U_Country: $scope.data.U_Country,
                                Age: yourAge,
                                Gender: $scope.data.Gender,
                                Contact_details: {
                                    Email_address: $scope.data.Email_address,
                                    Cell_no: $scope.data.Cell_no,
                                },
                                Security_question: {
                                    question: $scope.data.question,
                                    answer: $scope.data.answer
                                }
                            }


                            $rootScope.login = {

                                U_Name: person.U_Name,
                                U_Pass: person.U_Pass,
                            }

                            $rootScope.mail = {
                                from: person.U_Name
                            }

                            console.log($rootScope.login);
                            console.log(person);
                            console.log("Im working");
                            if (password == confirmPasswdord) {
                                var perso = SwapiService.register(person);

                                perso.then(function successCallBack(response) {
                                    $scope.person = response;
                                    console.log($rootScope.login);
                                    var logins = SwapiService.postLogin($rootScope.login);
                                    logins.then(function successCallBack(response) {
                                        $scope.logs = response;
                                        console.log($scope.logs);
                                        var mail = SwapiService.postMail($rootScope.mail);
                                        mail.then(function successCallBack(response) {
                                            console.log(response);
                                        }, function errorCallback(response) {
                                            console.log('Error');
                                        })

                                    }, function errorCallback(response) {
                                        $scope.logs = response;
                                        console.log('Error');
                                    })

                                    $state.go("login");
                                    alert($scope.person.data);
                                }, function errorCallback(response) {
                                    $scope.regist = response;
                                    console.log($scope.regist.data);
                                })
                            }
                            else {
                                alert("Passwords dont match");
                            }

                        }
                        else{
                            alert("Not South african")
                        }

                    
                    
                    }
                    
    
                
                $scope.U_Name = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.U_Name = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }
                $scope.U_Pass = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.U_Pass = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                $scope.confirm = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.confirm = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                $scope.F_Name = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.F_Name = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }


                //**********************************************

                $scope.L_Name = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.L_Name = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //*****************************************************

                $scope.F_Name = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.F_Name = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //*********************************************************

                $scope.DOBs = function () {

                    var Id_num = $scope.data.ID_Number;

                    var date = Id_num.substring(0, 6);
                    console.log(date);
                    var year = date.substring(0, 2);
                    var month = date.substring(2, 4);
                    var day = date.substring(4, 6);
                    if (year.substring(0, 1) == 0 || year.substring(0, 1) == 1) {
                        var concat = "20" + year;
                    }
                    else if (year.substring(0, 1) >= 2 && (year.substring(0, 1) <= 9)) {
                        var concat = "19" + year;
                    }

                    //console.log(parseInt(concat));

                    var newAge = parseInt(concat);
                    var yourAge = 2017 - newAge;

                    console.log(yourAge);

                    var newAge = parseInt(concat);
                    var DOB = concat + '-' + month + '-' + day;
                    $rootScope.DOB = DOB;
                    console.log($rootScope.DOB);

                    var Gender = parseInt(Id_num.substring(6, 10));
                    console.log(Gender);

                    if (Gender >= 0 && Gender <= 4999) {
                        $scope.gen = "Female";
                        console.log($scope.gen);
                    }
                    else if (Gender >= 5000 && Gender <= 9999) {
                        $scope.gen = "Male";
                        console.log($scope.gen);
                    }

                    var citizen = parseInt(Id_num.substring(10, 11));
                    console.log(citizen);

                    $scope.DOB = $rootScope.DOB;
                }


                $scope.ID_Number = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.ID_Number = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //*********************************************************


                $scope.U_Country = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.U_Country = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //***************************************************************

              /*  $scope.DOB = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.DOB = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                   /* }
                    else {
                        alert("Not supported");
                    }

                }*/

                //******************************************************************************************** 


                $scope.Gender = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.Gender = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //******************************************************************************************** 

                $scope.Email_address = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.contactDetails.Email_address = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //******************************************************************************************** 


                $scope.Cell_no = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.contactDetails.Cell_no = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //******************************************************************************************** 

                $scope.question = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.Security_question.question = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                //******************************************************************************************** 

                $scope.answer = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.Security_question.answer = event.results[0][0].transcript;
                                $scope.$apply()
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }

                $scope.reg = function () {

                    if ('SpeechRecognition' in window) {
                        var recognition = new webkitSpeechRecognition();

                        recognition.continuous = true;
                        recognition.lang = 'en-GB';
                        recognition.interimResults = true;

                        console.log("I have been activated");
                        var recognition = new SpeechRecognition();

                        recognition.onresult = function (event) {
                            console.log(event);
                            if (event.results.length > 0) {
                                $scope.data.Security_question.answer = event.results[0][0].transcript;
                                if (event.results[0][0].transcript.includes('register'))
                                {
                                    $scope.registe();
                                }
                                else if (event.results[0][0].transcript.includes('cancel'))
                                {
                                    $state.go('login');
                                }
                            }
                        };

                        recognition.onerror = function (event) {
                            console.log(event);
                        };
                        recognition.start();
                        recognition.onerror = function (event) {
                            console.log(event);
                        };

                        recognition.onspeechend = function () {
                            recognition.stop();
                        }
                        /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
   
                         Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
   
                         Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

                    }
                    else {
                        alert("Not supported");
                    }

                }


                //************************* */
}])
.controller('balancesCtrl', ['$scope','$state','$rootScope','SwapiService','$http',function($scope, $state,$rootScope,SwapiService,$http){

    $scope.name = $rootScope.name;

}])
.controller('contactCtrl', ['$scope','$state','$rootScope','SwapiService','$http',function($scope, $state,$rootScope,SwapiService,$http){
    
       
}])
.controller('resetPasswordCtrl', ['$scope','$state','$rootScope','SwapiService','$http',function($scope, $state,$rootScope,SwapiService,$http){
    
    if('speechSynthesis' in window)
    {
        
          var speak = new SpeechSynthesisUtterance('Hi, this is the final step of retriving your password');
          speak.rate = 1.5;
          speak.volume = 1.6;
          console.log(speak.text);
          window.speechSynthesis.speak(speak);
          
    }
    else{
        alert("Speech not supported, please use google chrome instead");
    }
    
    $scope.details = $rootScope.userinfo;
       
    $scope.data = {};
    $scope.data.password = "";
    $scope.data.confirmPasswdord = "";

    $scope.reset = function(){

        var password = $scope.data.password;
        var confirmPasswdord = $scope.data.confirmPasswdord;
  
        var newpassword = {
          U_Name: $scope.details[0].U_Name,
          U_Pass: password,
          F_Name: $scope.details[0].F_Name,
          L_Name: $scope.details[0].L_Name,
          ID_Number : $scope.details[0].ID_Number,
          U_Country: $scope.details[0].U_Country,
            Age: $scope.details[0].Age,
          Gender : $scope.details[0].Gender,
          Contact_details : {
              
                Cell_no :  $scope.details[0].Contact_details.Cell_no,
              Email_address : $scope.details[0].Contact_details.Email_address,
          },
          Security_question : {
              question : $scope.details[0].Security_question.question,
              answer : $scope.details[0].Security_question.answer
            }
      }

      var newpasswordL = {
        U_Id : 2000,
        U_Name: $scope.details[0].U_Name,
        U_Pass: password,
        
    }
      console.log(newpassword);

      if(password == confirmPasswdord)
      {
            var newPassword = SwapiService.updatePasswordR($scope.details[0].U_Name,newpassword);
            newPassword.then(function successCallBack(response){
                var passL = SwapiService.updatePasswordL($scope.details[0].U_Name,newpasswordL);
                passL.then(function successCallBack(response){
                    $state.go("login");
                })
                    
            });

        }
        else
        {
            alert("Password do not match");
        }
    }

}])
.controller('resetQCtrl', ['$scope','$state','$rootScope','SwapiService','$http',function($scope, $state,$rootScope,SwapiService,$http){
    
    if('speechSynthesis' in window)
    {
        
          var speak = new SpeechSynthesisUtterance('Select a question to retrive your password, that you once selected.');
          speak.rate = 1.5;
          speak.volume = 1.6;
          console.log(speak.text);
          window.speechSynthesis.speak(speak);
          
    }
    else{
        alert("Speech not supported, please use google chrome instead");
    }
    
    $scope.details = $rootScope.userinfo;
    console.log($scope.details);
    $scope.person = {};

    $scope.person.question = "";
    $scope.person.answer = "";

    $scope.check = function() {
        var question = $scope.person.question;
        var answer = $scope.person.answer;
        console.log(question);

        if($scope.details[0].Security_question.question == question && $scope.details[0].Security_question.answer == answer)
        {
            console.log("congrats");
            $state.go("resetPassword")
        }
        else{
            alert("Wrong answer, try to remember");
        }
    }

       
}])
.controller('forgotCtrl', ['$scope','$state','$rootScope','SwapiService','$http',function($scope, $state,$rootScope,SwapiService,$http){
    

    $scope.sub = function(event)
    {

        console.log(event)
    }
    if('speechSynthesis' in window)
    {
        
          var speak = new SpeechSynthesisUtterance('Hi, Please enter your email to retrieve your password');
          speak.rate = 1.5;
          speak.volume = 1.6;
          console.log(speak.text);
          window.speechSynthesis.speak(speak);
          
    }
    else{
        alert("Speech not supported, please use google chrome instead");
    }

    $scope.data = {};
    
           $scope.data.username = "";
        
    
        $scope.forgotPassword = function(){
    
            var username = $scope.data.username;
            console.log(username)
            var user = SwapiService.userInfo(username);
            user.then(function successCallBack(response){
                $rootScope.userinfo = response.data;
                console.log(response);
                $state.go("resetQ");
            });
        }
       
    
}])
.controller('monthlyCtrl', ['$scope','$state','$rootScope','SwapiService','$http',function($scope, $state,$rootScope,SwapiService,$http){
    $scope.disable = true;
    $scope.name = $rootScope.name;
    $scope.details  = $rootScope.details;

    $scope.waterReadings = $rootScope.allusers.data[0].waterReadings[0];
    $scope.electricReadings = $rootScope.allusers.data[0].electricityReadings[0];
    console.log($scope.waterReadings);
    console.log($scope.electricReadings);
    
}])
.controller('profileCtrl', ['$scope','$state','$rootScope','SwapiService','$http','$modal',function($scope, $state,$rootScope,SwapiService,$http,$modal){
    $scope.disable = true;
    $scope.details = $rootScope.usedetails;
    console.log($scope.details);
    $scope.data = {};
    $scope.data.U_Name = $scope.details[0].U_Name;
    $scope.data.U_Pass = $scope.details[0].U_Pass;
    $scope.data.F_Name = $scope.details[0].F_Name;
    $scope.data.L_Name = $scope.details[0].L_Name;
    $scope.data.ID_Number = $scope.details[0].ID_Number;
    $scope.data.U_Country = $scope.details[0].U_Country;
    $scope.data.DOB = $scope.details[0].DOB;
    $scope.data.Gender = $scope.details[0].Gender;
    $scope.data.Email_address = $scope.details[0].Contact_details.Email_address;
    $scope.data.Cell_no = $scope.details[0].Contact_details.Cell_no;

    $scope.update = function () {
        
                var password = $scope.data.U_Pass;

                var newpassword = {
                    U_Name: $scope.data.U_Name,
                    U_Pass: password,
                    F_Name: $scope.data.F_Name,
                    L_Name: $scope.data.L_Name,
                    ID_Number: $scope.details[0].ID_Number,
                    U_Country: $scope.details[0].U_Country,
                    Age: $scope.details[0].Age,
                    Gender: $scope.details[0].Gender,
                    Contact_details: {

                        Cell_no: $scope.data.Cell_no,
                        Email_address: $scope.data.Email_address,
                    },
                    Security_question: {
                        question: $scope.details[0].Security_question.question,
                        answer: $scope.details[0].Security_question.answer
                    }
                }
                console.log(newpassword)
                var newpasswordL = {
                    U_Id: 2000,
                    U_Name: $scope.details[0].U_Name,
                    U_Pass: password,

                }

                var newPassword = SwapiService.updatePasswordR($scope.details[0].U_Name, newpassword);
                newPassword.then(function successCallBack(response) {
                    console.log(response);
                    var passL = SwapiService.updatePasswordL($scope.details[0].U_Name, newpasswordL);
                    passL.then(function successCallBack(response) {
                        console.log(response);
                        alert("Successfully updated")
                    })

                });

}


    $scope.U_Name = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.U_Name = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }
    $scope.U_Pass = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.U_Pass = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    $scope.confirm = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.confirm = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    $scope.F_Name = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.F_Name = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }


    //**********************************************

    $scope.L_Name = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.L_Name = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //*****************************************************

    $scope.F_Name = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.F_Name = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //*********************************************************

    $scope.DOBs = function () {

        var Id_num = $scope.data.ID_Number;

        var date = Id_num.substring(0, 6);
        console.log(date);
        var year = date.substring(0, 2);
        var month = date.substring(2, 4);
        var day = date.substring(4, 6);
        if (year.substring(0, 1) == 0 || year.substring(0, 1) == 1) {
            var concat = "20" + year;
        }
        else if (year.substring(0, 1) >= 2 && (year.substring(0, 1) <= 9)) {
            var concat = "19" + year;
        }

        //console.log(parseInt(concat));

        var newAge = parseInt(concat);
        var yourAge = 2017 - newAge;

        console.log(yourAge);

        var newAge = parseInt(concat);
        var DOB = concat + '-' + month + '-' + day;
        $rootScope.DOB = DOB;
        console.log($rootScope.DOB);

        var Gender = parseInt(Id_num.substring(6, 10));
        console.log(Gender);

        if (Gender >= 0 && Gender <= 4999) {
            $scope.gen = "Female";
            console.log($scope.gen);
        }
        else if (Gender >= 5000 && Gender <= 9999) {
            $scope.gen = "Male";
            console.log($scope.gen);
        }

        var citizen = parseInt(Id_num.substring(10, 11));
        console.log(citizen);

        $scope.DOB = $rootScope.DOB;
    }


    $scope.ID_Number = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.ID_Number = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //*********************************************************


    $scope.U_Country = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.U_Country = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //***************************************************************

    /*  $scope.DOB = function () {

          if ('SpeechRecognition' in window) {
              var recognition = new webkitSpeechRecognition();

              recognition.continuous = true;
              recognition.lang = 'en-GB';
              recognition.interimResults = true;

              console.log("I have been activated");
              var recognition = new SpeechRecognition();

              recognition.onresult = function (event) {
                  console.log(event);
                  if (event.results.length > 0) {
                      $scope.data.DOB = event.results[0][0].transcript;
                      $scope.$apply()
                  }
              };

              recognition.onerror = function (event) {
                  console.log(event);
              };
              recognition.start();
              recognition.onerror = function (event) {
                  console.log(event);
              };

              recognition.onspeechend = function () {
                  recognition.stop();
              }
              /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
               Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
               Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

    /* }
     else {
         alert("Not supported");
     }

 }*/

    //******************************************************************************************** 


    $scope.Gender = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.Gender = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //******************************************************************************************** 

    $scope.Email_address = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.Email_address = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //******************************************************************************************** 


    $scope.Cell_no = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.Cell_no = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //******************************************************************************************** 

    $scope.question = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.Security_question.question = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    //******************************************************************************************** 

    $scope.answer = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.Security_question.answer = event.results[0][0].transcript;
                    $scope.$apply()
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    $scope.updateV = function () {

        if ('SpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.lang = 'en-GB';
            recognition.interimResults = true;

            console.log("I have been activated");
            var recognition = new SpeechRecognition();

            recognition.onresult = function (event) {
                console.log(event);
                if (event.results.length > 0) {
                    $scope.data.Security_question.answer = event.results[0][0].transcript;
                    if (event.results[0][0].transcript.includes('update')) {
                        $scope.update();
                    }
                    else if (event.results[0][0].transcript.includes('cancel')) {
                        $state.go('profile');
                    }
                }
            };

            recognition.onerror = function (event) {
                console.log(event);
            };
            recognition.start();
            recognition.onerror = function (event) {
                console.log(event);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            }
            /* API_KEY = AIzaSyBHTbggBb0qr_4q-m_7VU26pjodzAzhvRc
 
             Client_ID = 384496146322-1plkm5cqbs8h4sjepknmqcuiq9haqo63.apps.googleusercontent.com
 
             Client_secret = i2oz0tOy1Pm4-l3ZSIeQQmHL*/

        }
        else {
            alert("Not supported");
        }

    }

    
}])
.controller('wmeterCtrl', ['$scope','$state','$rootScope','SwapiService','$http','$modal',function($scope, $state,$rootScope,SwapiService,$http,$modal){
    $scope.disable = true;
    $scope.name = $rootScope.name;
    $scope.details  = $rootScope.details;

    var waterNumber = $scope.details.waterM;

    var wreading = {
        readingsW: "",
    }

    $scope.wreadings = function (wreading) {
        
                    console.log(wreading);
        
                    var wread = SwapiService.putWaterReadings(waterNumber,wreading);
        
                    wread.then(function successCallBack(response) {
                        
                        $scope.wread = response;

                        $modal.open({
                          templateUrl: "templates/popup/wstatus.html",
                          scope: $scope,
                          controller: "closePopupsCtrl"
                        })
                        console.log($scope.wread);
                    }, function errorCallback(response) {
                        $scope.wread = response;
                        console.log($scope.wread);
                    })
                }

}])
    .controller('popupsCtrl', function ($scope, $state, $modal, $rootScope) {

    $scope.compose = function () {
        $modal.open({
          templateUrl: '/templates/popup/compose.html',
          controller: "closePopupsCtrl",
  
        })
  
      }

    $scope.reply = function (x) {
        console.log(x);
        $rootScope.Sender_Name = x.Sender_Name;
        $rootScope.subject = x.subject;
        console.log($rootScope.Sender_Name)
        $modal.open({
            templateUrl: '/templates/popup/reply.html',
            controller: "closePopupsCtrl",

        })

    }

})
.controller('closePopupsCtrl', function ($scope, $state, $modal,$modalStack) {

    $scope.close = function () {

        $modalStack.dismissAll('cancel');
      
        $state.reload();
      };
})