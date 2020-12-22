/**
 * Event listener
 */
$( document ).ready(function() {
    $("#btn_login").click(
    function(){
      sendAjaxLogin('msg_response', 'login_form', 'https://lgt-app.disposed.xyz:443/api/login');
      return false;
    }
  );
});

/**
 * Prepairing data
 * @return {object} [email & oassword]
 */
function data() {
  var data = {}
    data["email"] = $("#email").val();
    data["password"] = $("#password").val();
  return JSON.stringify(data);
}

/**
 * Send Ajax request and response handle
 * @param  {output DOM id, string}  msg_response
 * @param  {input DOM id, string}   login_form
 * @param  {action, string}         url
 * @return {object}                 response
 */
function sendAjaxLogin(msg_response, login_form, url) {
  $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: data(),
      timeout: 100000,
      success: function(response) {
        // Save data to sessionStorage
        sessionStorage.setItem('access_token', response['access_token']);
        // redirect
        location.href = 'leads.html' },
      error: function(response) {$('#msg_response').html("Please, check the form data!")}
  });
}