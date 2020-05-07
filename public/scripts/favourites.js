$(() => {
  $(".fav-add-btn").on("click", (event) => {
    event.preventDefault();
    callSneakers(event.target);
  });

  $(".favourites-btn").on("click", () => {
    console.log("AAAA");
    window.location.href = "/users/favourites";
  });
});

const callSneakers = () => {
  const item = $(event.target);
  console.log(item.attr("item_id"));
  console.log(event.target.attributes);

  console.log($("div.card-body").attr("data-item"));

  // let name = item.data("item_id");

  // let name1 = item.text();
  // console.log(name1);

  $.ajax({
    url: "/users/addfavourite",
    method: "POST",
    // dataType: "json",
    data: {
      item_id: item.attr("item_id"),
    },
  });
};
