function makeMemo(key, memo) {
  var $li = $('<li class="memo-item" data-key="' + key + '" />');
  var $p = $('<p class="memo">' + memo + "</p>");
  var $div = $('<div class="controls" />');
  var $editBtn = $('<button type="button" onclick="edit(\'' + key + "')\">수정</button>");
  var $removeBtn = $('<button type="button" onclick="remove(\'' + key + "')\">삭제</button>");

  $div.append($editBtn, " ", $removeBtn);
  $li.append($p, $div);

  return $li;
}

function addMemo(form) {
  var memo = form.memo.value;
  var $memoItem = makeMemo(new Date().getTime(), memo);

  $("#memo-list").append($memoItem);

  form.reset();
}

function remove(key) {
  var $target = $("li.memo-item[data-key=" + key + "]");
  $target.remove();

  doneEdit();
}

function edit(key) {
  $("li.memo-item").removeClass("active");
  var $target = $("li.memo-item[data-key=" + key + "]");
  $target.addClass("active");

  var memo = $target.find("p.memo").text();

  $("#edit-form input[name=memo]").val(memo);

  $("#add-form").hide();
  $("#edit-form").show();
}

function editMemo(form) {
  var memo = form.memo.value;

  var $target = $("li.memo-item.active p.memo");
  $target.text(memo);

  form.reset();
  doneEdit();
}

function doneEdit() {
  $("li.memo-item").removeClass("active");
  $("#add-form").show();
  $("#edit-form").hide();
}
