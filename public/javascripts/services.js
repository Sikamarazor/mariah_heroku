angular.module('app.services', [])

    .factory('SwapiService', function ($http) {

        return {
            register : function(user){
                var user = $http.post('http://localhost:3000/person',user);
                return user;
            },
            postLogin : function(login){
                var login = $http.post('http://localhost:3000/user',login);
                return login;
            },
            login : function (username,password){
                var logins = $http.get('http://localhost:3000/user/' + username + '/' + password);
                return logins;
            }
            ,
            updatePasswordL : function (username,data){
                var user = $http.put('http://localhost:3000/user/' + username,data);
                return user;
            },
            updatePasswordR : function (username,data){
                var user = $http.put('http://localhost:3000/person/' + username,data);
                return user;
            },
            userInfo : function (username){
                var user = $http.get('http://localhost:3000/person/userinfo/' + username);
                return user;
            }
            ,
            postMail : function (mail){
                var mail = $http.post('http://localhost:3000/sent',mail);
                return mail;
            },
            posMessage : function (username,message){
                var mail = $http.put('http://localhost:3000/sent/' + username,message);
                return mail;
            },
            getMessages : function (username){
                var message = $http.get('http://localhost:3000/sent/' + username);
                return message;
            },
            posInbox : function (inbox){
                var inbox = $http.post('http://localhost:3000/message/' ,inbox);
                return inbox;
            },
            emptyInbox : function (username){
                var empty = $http.delete('http://localhost:3000/message/' + username);
                return empty;
            },
            deleteMessage : function (id,data) {
                var res = $http.put('http://localhost:3000/message/' + id,data);
                return res;
            },
            deleteMess: function (id) {
                var res = $http.delete('http://localhost:3000/message/delete/' + id);
                return res;
            },
            getTrash: function (username) {
                var res = $http.get('http://localhost:3000/message/usern/' + username);
                return res;
            }
        }
    })
