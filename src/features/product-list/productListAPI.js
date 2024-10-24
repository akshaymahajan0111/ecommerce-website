// A mock function to mimic making an async request for data
export default function productListAPI(amount = 1) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://loaclhost:8080");
    return {
      data: response.json(),
    };
  });
}
