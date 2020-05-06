$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users",
  // }).done((users) => {
  //   console.log(users);
  //   for (user of users) {
  //     $("<div>").text(user.email).appendTo($("body"));
  //   }
  // });

  $("#message-form").submit(function (event) {
    event.preventDefault();
    const message = $(".message-text").val();
    console.log(message);

    $.ajax({
      url: `/messages`,
      type: "POST",
      dataType: "text",
      data: { message_text: message },
    }).then((response) => {
      // console.log()
      // $('.message-text').val('').change();
    });
  });
});
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users",
//   }).done((users) => {
//     console.log(users);
//     console.log(typeof users);
//     for (user of users) {
//       $("<div>").text(user.email).appendTo($("body"));
//     }
//   });
// });

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/favourites",
//   }).done((favourites) => {
//     console.log(favourites);
//     for (let i of favourites) {
//       $("<div>").text(i.item_id).appendTo($("body"));
//     }
//   });
// });
