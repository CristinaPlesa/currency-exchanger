export default class Example {
  static promiseExample() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://hello.com/hi?api_key=${process.env.API_KEY}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}