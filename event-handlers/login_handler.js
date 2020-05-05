$(() => {

$("#login-form").on("submit", (e) => {
  e.preventDefault();

  $.ajax({
    url: "api/users/login",
    method: "POST",
    data: $("#login-form").serialize(),
  }).then((res) => {
    $("#login-form").css({ display = "none" });
    $(".logout-btn").css({ display: "inline" });
    $("#logout-form").css({ display: "inline" });
    $("#logout-form").text(
      `Logged in ${decodeURIComponent(document.cookie.slice(9))}`
    );
  }).then(()=>{
    renderedCallSneakers();
  });
});

// const renderedCallSneakers = () => {
//   $.ajax({
//     url: "/api",
//     method: "GET"
//   }).then(() => {
//     if (document.cookie.slice(9) === "lera_hahn%40dickens.org"){
//       $(".admin-btns").css({display: "inline"});
//      }
//    });
//   };
// });
