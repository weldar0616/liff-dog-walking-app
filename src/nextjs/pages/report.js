import { Button } from "@mui/material";

export default function Report(props) {
  if (props.liff && props.liff.isLoggedIn()) {
    alert("sendMessages");
    props.liff
      .sendMessages([
        {
          type: "text",
          text: "Hello",
        },
      ])
      .then(() => {
        alert("closeWindow")
        // props.liff.closeWindow();
      })
      .reject(() => {
        alert("reject send messages");
      });
  }

  const onClick = () => {
    if (props.liff && !props.liff.isLoggedIn()) {
      props.liff.login();
    }
  };
  return (
    <>
      <div>
        <Button variant="outlined" onClick={onClick}>
          Login
        </Button>
      </div>
    </>
  );
}
