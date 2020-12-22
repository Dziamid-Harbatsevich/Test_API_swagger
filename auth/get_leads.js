/**
 * Event listener
 */
$( document ).ready(function() {
    sendAjaxReq('msg_response', 'lead_list', 'https://lgt-app.disposed.xyz:443/api/lead_list');
    return false;
  }
);

/**
 * Prepairing data
 * @return {object} ["authHeader": {token and other auth data}, ["param"]: {parameters for request}]
 */
function data() {
  var data = {}
  data["authHeader"] = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')  // $("#access_token").val()
    };
  return data;
}

/**
 * Send Ajax request and response handle
 * @param  {output DOM id, string}  msg_response
 * @param  {input DOM id, string}   login_form
 * @param  {action, string}         url
 * @return {object}                 response
 */
function sendAjaxReq(msg_response, login_form, url) {
  data = data();
  $.ajax({
      url: url,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      data: data["param"],
      timeout: 100000,
      headers: data["authHeader"],
      success: function(response) {$('#msg_response').html(IterJsonHtml(response))},  // $('#msg_response2').html(JSON.stringify(response))
      error: function(response) {$('#msg_response').html("Can`t get data right now.")}
  });
}

/**
 * JSON object iteration and output handle (html)
 * @param {object}  response   data sent by server
 */
function IterJsonHtml(response) {
  var result = "";

  for (var i = 0; i < response.length; i++){
    iter = i;
    result += ("<p><b>Lead # " + ++iter + "</b>");
    var obj = response[i];
    for (var key in obj){
      var value = obj[key];
      if (typeof(value) === 'object') { result += "<br> - <b>" + key + ":</b> " + value }
        else { result += ("<br> - <b>" + key + ":</b> " + value) }
    }
    result += ("</p>");
  }
  // Output
  $('#msg_response').html(result);
}