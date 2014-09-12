SC.initialize({
  client_id: '67dea182f799fad710838ba838eecccb'
  // redirect_uri: 'http://127.0.0.1/callback.html'
});

$(document).ready(function(){
  $('#tracks').sortable()
  // Popup forms
  dialog_login = $('#login_form').dialog({
    autoOpen: false,
    height: 250,
    width: 100,
    modal: true
  });

  $('a.login').click(function(e){
    e.preventDefault();
    dialog_login.dialog("open");
  })

  dialog_signup = $('#signup_form').dialog({
    autoOpen: false,
    height: 350,
    width: 150,
    modal: true
  });

  $('a.signup').click(function(e){
    e.preventDefault();
    dialog_signup.dialog("open");
  })

  $('#track_form').submit(function(e){
    e.preventDefault();
    var $form = $(this);
    var formData = $("#track_form").serialize();
    var url = $form.attr('action');
    console.log(url);

    var ajaxRequest = $.ajax({
      url: url,
      type: 'POST',
      data: formData
    })

    ajaxRequest.done(function(data){
      console.log('success')
      var $tracks = $('#tracks')
      SC.oEmbed(data.permalink_url, function(oEmbed){
        $('#tracks').append("<li class='track'></li>")
        var track_number = $('#tracks').children('.track').length
        $('#tracks li:last').append("" + track_number + ". ")
        $('#tracks li:last').append(oEmbed.html)
        // $('#tracks').prepend("<li class='track'></li>")
        // $('#tracks li:first').append(oEmbed.html)
      })
      $('#track_form')[0].reset()
    })
    ajaxRequest.fail(function(){
      console.log('fail')
    })
  })

  $('#timer_form').submit(function(e){
    e.preventDefault();
    var $form = $(this);
    var formData = $("#timer_form").serialize();
    var url = $form.attr('action');
    console.log(url);

    var ajaxRequest = $.ajax({
      url: url,
      type: 'POST',
      data: formData
    })

    ajaxRequest.done(function(data){
      console.log('success')
      var $timers = $('#timer_list')
      $timers.append("<p><a href='#'>" + data + "</a> seconds</p>")
      $('#timer_form')[0].reset()
    })
    ajaxRequest.fail(function(){
      console.log('fail')
    })
  })

  $('#timer_list').delegate('a', 'click', function(e){
    e.preventDefault();
    track_num = prompt('Which song do you want to play?', 'Song Number (Integer)')
    var iframeElement = $(".track:nth-child(" + track_num + ") iframe")[0]
    while (!iframeElement) {
      track_num = prompt('Song does not exist, enter a new number.','Song Number (Integer)')
      var iframeElement = $(".track:nth-child(" + track_num + ") iframe")[0]
    }
    $link = $(this);
    time = parseInt($link[0].innerHTML);
    console.log(time);
    $('#timer_display').html("<p>" + time + " seconds</p>");
    var loop = setInterval(function(){
      time = (time - 1);
      $('#timer_display').html("<p>" + time + " seconds</p>");
      if (time == 0){
        clearInterval(loop);
        $('#timer_display').html(":D");
        setTimeout(function(){
          $('#timer_display').html("");
        }, 300);
        // var iframeElement = $("iframe")[0];
        var widget = SC.Widget(iframeElement);
        widget.play();
      }
    }, 1000)
  })
})



  // Failed AJAX login/ create user without refresh page

  // $('#login_submit').submit(function(e){
  //   e.preventDefault();
  //   var $form = $(this);
  //   var formData = $form.serialize();
  //   var url = $form.attr('action');
  //   console.log(url);

  //   var ajaxRequest = $.ajax({
  //     url: url,
  //     type: 'POST',
  //     data: formData
  //   })
  //   ajaxRequest.done(function(data){
  //     console.log('success')
  //     console.log(data)
  //     $form[0].reset();
  //     // $('header').api().ajax.reload();
  //     // dialog_login.dialog("close");
  //   })
  //   ajaxRequest.fail(function(){
  //     console.log('fail')
  //   })
  // })

  // $('#signup_submit').submit(function(e){
  //   e.preventDefault();
  //   var $form = $(this);
  //   var formData = $form.serialize();
  //   var url = $form.attr('action');
  //   console.log(url);

  //   var ajaxRequest2 = $.ajax({
  //     url: url,
  //     type: 'POST',
  //     data: formData
  //   })
  //   ajaxRequest2.done(function(data){
  //     console.log('success')
  //     console.log(data)
  //     $form[0].reset();
  //     // $('header').ajax.api().reload();
  //     // dialog_signup.dialog("close");
  //   })
  //   ajaxRequest2.fail(function(){
  //     console.log('fail')
  //   })
  // })
