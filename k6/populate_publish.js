import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: Number(__ENV.VUS) || 50, // adjust based on local machine
  duration: "5m", // or until all items are published
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const TOTAL_PROGRAMS = Number(__ENV.TOTAL_PROGRAMS) || 10000;

let token = "";

export function setup() {
  const loginRes = http.post(
    `${BASE_URL.replace(/3000/, "3001")}/auth/login`,
    JSON.stringify({
      email: "root@example.com",
      password: "password",
    }),
    { headers: { "Content-Type": "application/json" } },
  );

  token = loginRes.json("accessToken");
  return { token };
}

export default function (data) {
  const { token } = data;

  const programNumber = Math.floor(Math.random() * TOTAL_PROGRAMS);

  const createRes = http.post(
    `${BASE_URL}/programs`,
    JSON.stringify({
      title: `My Awesome Program ${programNumber}`,
      description: "This is a description of my awesome program.",
      mediaType: "podcast",
      categoryId: "28be2330-1c88-4c5b-9471-79bfeeb01394",
      language: "ar",
      publishDate: new Date().toISOString(),
      status: "draft",
      metadata: { author: "Mahmood Alnasser" },
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const programId = createRes.json("id");

  check(createRes, {
    "draft created": (r) => r.status === 201 || r.status === 200,
  });

  const publishRes = http.post(
    `${BASE_URL}/programs/${programId}/publish`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  check(publishRes, { "program published": (r) => r.status === 200 });

  sleep(0.05);
}
