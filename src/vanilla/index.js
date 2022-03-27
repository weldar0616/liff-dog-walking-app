import "./index.css";
import liff from "@line/liff";

document.addEventListener("DOMContentLoaded", function () {
  alert(JSON.stringify(liff));
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      console.log("Success! you can do something with LIFF API here.");
      alert("Success! you can do something with LIFF API here.");
      liff
        .sendMessages([
          {
            type: "text",
            text: "Hello:" + JSON.stringify({}),
          },
        ])
        .then((res) => {
          alert(JSON.stringify(res));
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    })
    .catch((error) => {
      console.log(error);
      alert(JSON.stringify(error));
    });
});
