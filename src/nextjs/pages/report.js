export default function Report(props) {
  if (props.liff && props.liff.isLoggedIn()) {
    props.liff.sendMessages([
        {
          type: "text",
          text: "Hello",
        },
      ])
      .then(() => {
        props.liff.closeWindow();
      });
  }
  return (
    <>
      <div>Loading...</div>
    </>
  );
}
