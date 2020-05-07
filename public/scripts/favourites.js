$(() => {
  $(".fav-add-btn").on("click", (event) => {
    event.preventDefault();
    callSneakers();
  });

  $(".favourites-btn").on("click", () => {
    console.log("AAAA");
    window.location.href = "/users/favourites";
  });
});

const callSneakers = () => {
  // const item = $(this);
  // console.log("Hello favourites");
  const item = $(event.target);
  const parent = item.parent();

  // console.log($(this).attr("data-item"));
  console.log($("div.card-body").attr("data-item"));

  // console.log(parent);
  // console.log(item.attr("class"));
  // console.log(item.data("item_id"));

  // let data = parent.find(".favouriteData");
  // console.log(data);
  // console.log(this);
  // console.log($(this.currentTarget).data("id"));

  let name = $("div.card-body").data("item_id");
  // console.log(name);

  let name1 = $("div.card-body").text();
  console.log(name1);

  $.ajax({
    url: "/users/addfavourite",
    method: "POST",
    dataType: "json",
    data: {
      item_id: $("div.card-body").attr("data-item"),
    },
  });
};

// const callRenderedItems = () => {
//   console.log("success");
//   $.ajax({ url: "/users/favourites", method: "GET" })
//     .then((res) => {
//       renderItems(res);
//     })
//     .then(() => {
//       if (document.cookie.slice(9) === "lera_hahn%40dickens.org") {
//         $(".fav-add-btn").css({ display: "none" });
//       }
//     });
// };

// const sneakersPrepend = (res) => {

//   $("#displaySneakers").empty();
//   for(let sneaker of res.favSneakers){

//     $("displaySneakers").prepend(images??);

//   }

// }
