$(document).on('turbolinks:load', function(){
  var search_list_user = $("#user-search-result");
  var search_list_add_group_user = $(".chat-group-user__name");

// インクリメント検索結果
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `
    search_list_user.append(html);
  }
// インクリメント検査でユーザー見つからない時  
  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  ${ msg }
                </div>`
    search_list_user.append(html);
  }
// インクリメント検索したユーザーをメンバーに加える処理
  function appendAddToHTML(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${user_id}>
                    <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${user_id}" data-user-name="${user_name}">削除</div>
                </div>`
    search_list_add_group_user.append(html);
  }
// インクリメント検索したユーザーをメンバーに加える処理。イベント生成
  $('#user-search-result').on("click", ".chat-group-user__btn--add", function () {
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    appendAddToHTML(user_id, user_name);
    $(this).parent('.chat-group-user').remove();
  });
// メンバーに加えたユーザーを削除する処理
  $('.chat-group-user__name').on("click", ".chat-group-user__btn--remove", function () {
    $(`#chat-group-user-8`).remove();
  });
// メインアクション
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  // 非同期通信-成功  
    .done(function(users){
      $("#user-search-result").empty();

  // インクリメント検索結果有り
      if (users.length !== 0 && input.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
  // インクリメント検索結果無し
      else {
        appendErrMsgToHTML("一致するユーザーはおりません。");
      }
    })
  // 非同期通信-失敗
    .fail(function(){
      alert('ユーザー検索に失敗しました。');
    })
  })
});