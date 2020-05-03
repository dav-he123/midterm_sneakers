$(() => {
  $.ajax({
    method: "POST",
    url: "/api/users",
  }).done((users) => {
    console.log(users);
    for (user of users) {
      $("<div>").text(user[0].name).appendTo($("body"));
    }
  });
});
