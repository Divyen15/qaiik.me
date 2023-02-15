$(async () => {
  // make the logan class draggable around the screen
  $(document).mousedown((e) => {
    if (e.target.id === "logan") {
      $(document).mousemove((e) => {
        $("#logan").css({
          top: e.pageY - 50,
          left: e.pageX - 50,
        });
      });
    }
  });
  $(document).mouseup((e) => {
    $(document).off("mousemove");
  });
});
