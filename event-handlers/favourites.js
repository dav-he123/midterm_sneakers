const callRenderedItems = () => {
  console.log("success");
  $.ajax({ url: "/users/favourites", method: "GET" }).then((res) => {
    renderItems(res);
  });
};
