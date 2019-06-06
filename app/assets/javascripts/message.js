$(document).on('turbolinks:load', function(){
// コメントのHTML
  function buildHTMLtext(message){
    var html = `<ul class="right-group">
                  <li class="right-group__current-user">
                    ${message.user_name}
                  </li>
                  <li class="right-group__date-and-time">
                    ${message.created_at}
                  </li>
                </ul>
               <p class="group-message">
                ${message.content}
               </p>
               `
    return html;
  }
// アップロードする画像のHTML
  function buildHTMLimage(image){
    var html = `
                <img src=${image.image} class= 'group-message__content'>
            `
    return html;
  }
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
    .done(function(data){
      var html_text = buildHTMLtext(data);
      var html_image = buildHTMLimage(data);
      html = $('.right-lower').append(html_text)
      $('.right-lower').animate({scrollTop: $('.right-lower')[0].scrollHeight}, 'fast');
      $('.message-form__container__send-button').prop('disabled', false);

      // 画像がない場合、コメントのみ表示
      if (data['image'] == null){
        html
        $("form")[0].reset();
      }
      // 画像がある場合、コメントと画像を表示
      if (data['image'] != null){
        html.append(html_image)
        $("form")[0].reset();
      }
    })
// 非同期通信-失敗
    .fail(function(){
      alert('error'); 
    })
  });
});

