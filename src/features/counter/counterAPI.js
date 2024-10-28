// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080");
    return {
      data: response.json(),
    };
  });
}
