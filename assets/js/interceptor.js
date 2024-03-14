const instance = axios.create({
  baseURL: `http://localhost:8080/users/token`,
  withCredentials: true,
  timeout: 1000,
});

const refreshToken = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(
      "http://localhost:8080/users/refresh",
      {
        Authorization: `Bearer ${accessToken}`,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          accessToken: accessToken,
          refreshToken: `${refreshToken}`,
          withCredentials: true,
        },
      }
    );
    // console.log("refresh요청에대한응답", response);
    const newToken = response.data.data.accessToken;

    return newToken;
  } catch (err) {
    // console.error("토큰 재발급에 실패했습니다.", err);
    res.status(401).json({ error: "RefreshToken expired" });
  }
};

function authInterceptor(instance) {
  instance.interceptors.request.use(
    async (config) => {
      //   console.log("interceptor request start!!");
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken || refreshToken) {
        config.headers["Content-Type"] = "application/json";
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["accessToken"] = `${accessToken}`;
        config.headers["refreshToken"] = `${refreshToken}`;
      }
      //   console.log("interceptor request end!");
      return config;
    },
    (error) => {
      console.error("error", error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      //   console.log("interceptor response error", error);
      if (error.response.data.error === "expired") {
        const newToken = await refreshToken();
        console.log("newToken", newToken);
        localStorage.setItem("Authorization", newToken);
        localStorage.setItem("accessToken", newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return instance(error.config);
      }
      return Promise.reject(error);
    }
  );
}

authInterceptor(instance);
