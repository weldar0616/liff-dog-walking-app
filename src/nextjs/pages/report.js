import { Button } from "@mui/material";

export default function Report(props) {
  console.log({props});
  const liff = props.liff;
  const liffError = props.liffError;

  const XXX = (props) => {
    console.log("sendMessages", JSON.stringify(props.liff));
    const liff = props.liff;
    liff.getProfile().then((profile) => {
      console.log({ profile });
      liff
        .sendMessages([
          {
            type: "text",
            text: "Hello:" + JSONs.stringify(profile),
          },
        ])
        .then((res) => {
          console.log("closeWindow", JSON.stringify(res));
          liff.closeWindow();
        })
        .catch((err) => {
          console.log("reject send messages: " + JSON.stringify(err));
          liff.closeWindow();
        });
    });
    return <span>Loading...</span>;
  };

  console.log({ liff });
  const content = (
    <div>
      {liffError ? liffError : !liff ? "liff is undefined..." : <XXX liff={liff} />}
    </div>
  );

  return content;
  // const onClick = () => {
  //   if (props.liff && !props.liff.isLoggedIn()) {
  //     props.liff.login();
  //   }
  // };
  // return (
  //   <>
  //     <div>
  //       <Button variant="outlined" onClick={onClick}>
  //         Login
  //       </Button>
  //     </div>
  //   </>
  // );
}
