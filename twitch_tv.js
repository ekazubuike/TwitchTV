
var users = ["ESL_SC2", "OgamingSC2", "Trihex", "freecodecamp", "heyitsBBG", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comter404"];
//get user ID from username
function getID (array) {
  for (let i= 0; i < array.length; i++) {
    $.ajax({
      "type" : "GET",
      "url" : "https://api.twitch.tv/kraken/users?login=" + users[i],
      "headers" : {
      "Accept" : "application/vnd.twitchtv.v5+json",
      "Client-ID" : "k0bh2yh35yc6tyfzzbmhjy7btzvqm0"
              },
    "success" : function (userData) {
      if(userData.users[0] === undefined){
        $("#display").append(
          '<div class=\"col-xs-4\">' + users[i] + "? No such user!" + '</div>');
      } else {
        return streamStatus(userData);
      }
    },
    "error" : function () {
      alert("Could not connect!");
      }
    });
  }
}
//get stream status from user ID
function streamStatus (userData) {
  var userID = userData["users"][0]["_id"];
  $.ajax({
    "type" : "GET",
    "url" : "https://api.twitch.tv/kraken/streams/" + userID,
    "headers" : {
      "Accept": "application/vnd.twitchtv.v5+json",
      "Client-ID" : "k0bh2yh35yc6tyfzzbmhjy7btzvqm0"
    },
    "success" : function (streamData) {
      if (streamData.stream === null) {
        $("#display").append(
         '<div class=\"col-xs-4\">' +
         '<img class=\".img-rounded\" width=\"25\" height=\"25\" src=' + userData.users[0].logo + '> ' +
         '<a href=\"https://www.twitch.tv\/' + userData.users[0].name + '\" target=_blank>' +
         userData.users[0].display_name + "</a>" + " Offline" +
         '</div>');
      }
      else {
      $("#display").append(
         '<div class=\"col-xs-4\">' +
         '<img class=\"img-rounded\" width=\"25\" height=\"25\" src=' + userData.users[0].logo + '> ' +
         '<a href=\"' + streamData.stream.channel.url + '\" target=_blank>' +
         userData.users[0].display_name + "</a>" + " Online" +
         "<p>Now playing: <span style=\"text-weight: bold\">" + streamData.stream.game + "</span></p>" +
         '</div>');
      }
    }
  });
}

$(document).ready(function() {
  getID(users);
});