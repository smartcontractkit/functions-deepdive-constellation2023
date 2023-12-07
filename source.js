const carbonResponse = await Functions.makeHttpRequest({
  url: "https://nfe-service-hackathon-e1676ada9c11.herokuapp.com/v1/api/nfes/ncm/44011000/carbon-free-calculation",
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

if (carbonResponse.error) {
  throw new Error(JSON.stringify(carbonResponse));
}

const result = carbonResponse.data;

console.log(result);
return Functions.encodeString(result);
