class AppConfig {
  // Backend urls:
  public readonly prefix = "http://localhost:4000/api/";
  public readonly vacationsUrl = `${this.prefix}vacations/`;
  public readonly likesUrl = `${this.prefix}likes/`;
  public readonly registerUrl = `${this.prefix}register/`;
  public readonly loginUrl = `${this.prefix}login/`;

  //Axios options:
  public readonly axiosOptions = {
    headers: {
      // Tell axios to also send the image:
      "Content-Type": "multipart/form-data", // We're sending also files.
    },
  };
}



export const appConfig = new AppConfig();
