import { Button } from "@mui/material";

export default function Report(props) {
  const liff = props.liff;
  const liffError = props.liffError;

  if (liffError) {
    return <div>{liffError}</div>;
  }

  if (!liff) {
    return <div>liff is undefined...</div>;
  }

console.log({liff});

  // if (props.liff && props.liff.isLoggedIn()) {
    // alert("sendMessages", props.liff);
    liff
      .sendMessages([
        {
          type: "text",
          text: "Hello",
        },
      ])
      .then(() => {
        // alert("closeWindow");
        liff.closeWindow();
        return;
      })
      .catch((err) => {
        // alert("reject send messages: " + JSON.stringify(err));
        liff.closeWindow();
        return;
      });
    return <div>Loading...</div>;
  // }

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
