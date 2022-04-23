const axios = require('axios');

exports.handler = async (event) => {
  const message = event.queryStringParameters && event.queryStringParameters.message ? event.queryStringParameters.message : "";
  const response = {
      statusCode: 200,
      headers: {"Access-Control-Allow-Origin" : "*"},
      body: message
  };
  const headers = {
    Content: "application/json",
    Authorization: `Bearer ${process.env.MESSAGING_API_CHANNEL_ACCESS_TOKEN}`,
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const res = await axios({
      method: "post",
      url: "https://api.line.me/v2/bot/message/broadcast",
      headers,
      data: {
        messages: [{ type: "text", text: message }],
      },
    });
  } catch (err) {
    response.statusCode = 500;
    response.body = err.message;
  }
  return response;
};
