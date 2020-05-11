$(() => {
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
