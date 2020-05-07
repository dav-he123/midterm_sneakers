$(() => {
  $("body").on("click", ".fav-add-btn", (item) => {
    $.ajax({
      url: "/users/addfavourite",
      method: "POST",
      dataType: "json",
      data: {
        item_id: $(item.currentTarget).data("id"),
      },
    });
  });
});
