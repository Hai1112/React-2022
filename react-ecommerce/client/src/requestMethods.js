import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjhlZTIyZGI2YTRlMGY1M2JjZmNhZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTA2MjcxNywiZXhwIjoxNjUxMzIxOTE3fQ.Wj43zlQnkqI5i1rG80ghy2S-S9x0gypI8BiKswrB4eQ";

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
