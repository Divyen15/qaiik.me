$(async () => {
  var explode = new Audio("/mp3/explode.mp3");
  var whistle = new Audio("/mp3/teapot.mp3");
  var womp = new Audio("/mp3/womp.mp3");

  $("#logan").swingdrag({
    showShadow: false,
    pickUpScaleFactor: 1.5,
    maxRotationAngleDeg: 360,
    speedInfluenceFactor: 3,
  });

  $("#logan").one("click", () => {
    var tl = new TimelineMax();
    setTimeout(() => {
      explode.play();
    }, 5800);
    tl.from("#logan", {
      filter: "contrast(100%)",
    })
      .call(() => {
        whistle.play();
        $("#logan").addClass("shake-hard shake-constant");
      })
      .to("#logan", {
        ease: Power4.easeIn,
        width: "50%",
        left: "25vw",
        top: "0",
        filter: "contrast(4)",
        duration: 6.1,
      })
      .call(() => {
        $("#logan").explode({
          minWidth: 8,
          maxWidth: 25,
          radius: 500,
          minRadius: 500,
          release: true,
          fadeTime: 60,
          recycle: true,
          recycleDelay: 100,
          explodeTime: 479,
          round: false,
          minAngle: 0,
          maxAngle: 360,
          gravity: 1,
          groundDistance: window.innerHeight * 0.5,
        });
        setTimeout(() => {
          womp.play();
        }, 2000);
      });
  });
});
