import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// 캐시를 위한 Map
const cache = new Map();

export const todoApi = {
  getTodos: async () => {
    // 캐시된 데이터가 있으면 반환
    if (cache.has("todos")) {
      return cache.get("todos");
    }

    try {
      const response = await api.get("/todos");
      // 데이터를 캐시에 저장
      cache.set("todos", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch todos");
    }
  },
};

// Suspense를 위한 리소스 생성 함수
export function createResource(asyncFn) {
  let status = "pending";
  let result;
  let suspender = asyncFn().then(
    (data) => {
      status = "success";
      result = data;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
