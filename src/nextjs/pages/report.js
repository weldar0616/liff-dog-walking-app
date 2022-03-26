import { Button } from "@mui/material";

export default function Report(props) {
  if (props.liff && props.liff.isLoggedIn()) {
    props.liff
      .sendMessages([
        {
          type: "text",
          text: "Hello",
        },
      ])
      .then(() => {
        props.liff.closeWindow();
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
