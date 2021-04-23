export default class AnotherExample {
  static fetchExample() {
    return fetch(`https://hello.com/hi?api_key=${process.env.API_KEY}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}