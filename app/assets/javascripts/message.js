$().on('turbolinks:load', function(){
  var old_message = [];
// コメント表示用HTML

  var messageDataHTML = function(message) {
    var html = `<div class="message_get" data-id="${message.id}" >
                  <ul class="right-group">
                    <li class="right-group__current-user">
                      ${message.user_name}
                    </li>
                    <li class="right-group__date-and-time">
                      ${message.created_at}
                    </li>
                  </ul>
                `
    return html;
  };

  var messageTextHTML = function(message) {
    var html = `<p class="group-message">
                  ${message.content}
                </p>
                `
    return html;
  };

  var messageImageHTML = function(message){
    var html = `<p class="group-message__content">
                  <img src=${message.image.url} class= 'group-message__content'>
                </p>
              `
    return html;
  };

  var buildMessageHTML = function(message) {
    if (message.content != null && message.image.url != null) {
      var html = messageDataHTML(message) + messageTextHTML(message) + messageImageHTML(message);
      return html;

    } else if (message.content != null) {
      var html = messageDataHTML(message) + messageTextHTML(message);
      return html;

    } else if (message.image.url != null) {
      var html = messageDataHTML(message) + messageImageHTML(message);
      return html;
  }
};

// メッセージ投稿機能
  $('.message-form__container').on('submit', function(e){
    e.preventDefault();  
    var formData = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

  // 非同期通信-成功
    .done(function(messages){
      html = buildMessageHTML(messages)
      $('.right-lower').append(html)
      $('.right-lower').animate({scrollTop: $('.right-lower')[0].scrollHeight}, 'fast');
      $('.message-form__container__send-button').prop('disabled', false);
      $("form")[0].reset();
    })
  // 非同期通信-失敗
    .fail(function(){
      alert('error'); 
    })
  });

// 自動更新
  var reloadMessages = function(){
    var user_url = document.location.pathname;  
    var last_message_id = $(".message_get").filter(':last').data('id');

    if (user_url.match(/messages/)) {    
      $.ajax({
        url: './api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
    // 自動更新-成功
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessageHTML(message);
          $('.right-lower').append(insertHTML);
          $('.right-lower').animate({scrollTop: $('.right-lower')[0].scrollHeight}, 'fast');
        })
      })
    // 自動更新-失敗
      .fail(function(){
        console.log('error');
      })
    }
  }
// 5秒ごとに更新
  setInterval(reloadMessages, 5000);
});

