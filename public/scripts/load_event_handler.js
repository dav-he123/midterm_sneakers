console.log("outside global");
$(() => {
  console.log("inside the jquery");

  $(".sms-sendbtn").on("click", (event) => {
    console.log("handler");

    event.preventDefault();
    callTextMessages(event.target);
  });
});

const callTextMessages = () => {
  $.ajax({
    url: "/sms/messageSent",
    method: "POST",
    dataType: "json",
    data: {
      message: "Get your sneakers right now because it is ready for pickup!!",
    },
  });
};

//   $.ajax({
//     url: "/sms/messagesent",
//     method: "POST",
//     dataType: "json",
//     data: {
//       message: "Get your sneakers right now",
//     },
// });
