import http from "k6/http";
import { sleep } from "k6";
import { Rate } from "k6/metrics";

export let failureRate = new Rate("failed_requests");

const DATASET_SIZE = Number(__ENV.DATASET_SIZE) || 10000;
const BASE_URL = __ENV.BASE_URL || "http://localhost:3001";

// -----------------------
// k6 options
// -----------------------
export let options = {
  vus: Number(__ENV.VUS) || 200,
  duration: "1m",
  thresholds: {
    failed_requests: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
  metrics: {
    // disable heavy default metrics
    http_req_duration: false,
    http_req_failed: false,
    http_reqs: false,
    http_req_connecting: false,
    http_req_tls_handshaking: false,
    http_req_receiving: false,
    http_req_sending: false,
    http_req_blocked: false,
    http_req_waiting: false,
    checks: false,
  },
};

// -----------------------
// Setup: login only
// -----------------------
export function setup() {
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: "root@example.com",
      password: "password",
    }),
    { headers: { "Content-Type": "application/json" } },
  );

  const token = loginRes.json("access_token");
  if (!token) {
    throw new Error(
      `Login failed. Status: ${loginRes.status}, Body: ${loginRes.body}`,
    );
  }

  return { token };
}

// -----------------------
// Main VU function
// -----------------------
export default function (data) {
  const { token } = data;

  // Pick a random program ID without storing all IDs in memory
  const randomId = Math.floor(Math.random() * DATASET_SIZE) + 1;

  const res = http.get(
    `${BASE_URL}/discovery/search?page=1&limit=10&keyword=${randomId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      // group requests to avoid time series explosion
      tags: { name: "/discovery/search" },
      // discard body to save memory
      responseType: "none",
    },
  );

  // manually track failure
  failureRate.add(res.status !== 200);

  sleep(0.05);
}
