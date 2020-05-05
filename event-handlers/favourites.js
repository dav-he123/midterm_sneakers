const callRenderedItems = () => {
  console.log("success");
  $.ajax({ url: "/api/favourites", method: "GET" }).then((res) => {
    renderItems(res);
  });
};
