import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// HOW TO RUN TESTS
// # 10k dataset, 200 VUs
// k6 run -e DATASET_SIZE=10000 -e VUS=200 load_test.js --out json=report_10k_200.json
//
// # 10k dataset, 500 VUs
// k6 run -e DATASET_SIZE=10000 -e VUS=500 load_test.js --out json=report_10k_500.json
//
// # 50k dataset, 500 VUs
// k6 run -e DATASET_SIZE=50000 -e VUS=500 load_test.js --out json=report_50k_500.json
//
// # 100k dataset, 1000 VUs
// k6 run -e DATASET_SIZE=100000 -e VUS=1000 load_test.js --out json=report_100k_1000.json

export let failureRate = new Rate("failed_requests");

const DATASET_SIZE = __ENV.DATASET_SIZE || 10000;
const BASE_URL = __ENV.BASE_URL || "http://localhost:3001";

export let options = {
  vus: Number(__ENV.VUS) || 200,
  duration: "1m",
  thresholds: {
    failed_requests: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

let token = "";

export function setup() {
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: "root@example.com",
      password: "password",
    }),
    { headers: { "Content-Type": "application/json" } },
  );

  token = loginRes.json("accessToken");

  let programIds = [];
  for (let i = 1; i <= DATASET_SIZE; i++) {
    programIds.push(i);
  }

  return { token, programIds };
}

export default function (data) {
  const { token, programIds } = data;

  const randomId = programIds[Math.floor(Math.random() * programIds.length)];

  const res = http.get(
    `${BASE_URL}/discovery/search?page=1&limit=10&keyword=${randomId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const success = check(res, { "status is 200": (r) => r.status === 200 });
  failureRate.add(!success);

  sleep(0.05);
}
