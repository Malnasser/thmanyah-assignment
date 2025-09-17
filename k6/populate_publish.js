import http from "k6/http";
import { sleep } from "k6";
import { Trend, Counter } from "k6/metrics";

// -----------------------
// Custom aggregated metrics
// -----------------------
let createDuration = new Trend("program_create_duration");
let publishDuration = new Trend("program_publish_duration");
let createSuccess = new Counter("program_create_success");
let publishSuccess = new Counter("program_publish_success");

// -----------------------
// Options
// -----------------------
export let options = {
  vus: Number(__ENV.VUS) || 50,
  duration: "5m",
  // Disable all default metrics to avoid 40k+ time series
  metrics: {
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
// Config
// -----------------------
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const TOTAL_PROGRAMS = Number(__ENV.TOTAL_PROGRAMS) || 10000;

// -----------------------
// Setup: login and return token
// -----------------------
export function setup() {
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: "root@example.com",
      password: "password",
    }),
    {
      headers: { "Content-Type": "application/json" },
      // Keep body for parsing access_token
    },
  );

  if (loginRes.status !== 200) {
    throw new Error(
      `Login failed! Status: ${loginRes.status}, body: ${loginRes.body}`,
    );
  }

  const body = loginRes.json();
  if (!body.access_token) {
    throw new Error(`Login response missing access_token: ${loginRes.body}`);
  }

  return { token: body.access_token };
}

// -----------------------
// Main VU function
// -----------------------
export default function (data) {
  const token = data.token;
  const programNumber = Math.floor(Math.random() * TOTAL_PROGRAMS);

  // --- CREATE PROGRAM ---
  const createRes = http.post(
    `${BASE_URL}/programs`,
    JSON.stringify({
      title: `Program ${programNumber}`,
      description: "This is a description of my program.",
      mediaType: "podcast",
      categoryId: "ddbb431a-500a-4abc-b136-73130372ac0e",
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

  createDuration.add(createRes.timings.duration);

  const programId = createRes.json()?.id;
  if (programId) {
    createSuccess.add(1);
  } else {
    console.error(
      `Program creation failed. Status: ${createRes.status}, body: ${createRes.body}`,
    );
    return; // skip publishing if creation failed
  }

  // --- PUBLISH PROGRAM ---
  const publishRes = http.post(
    `${BASE_URL}/programs/${programId}/publish`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  publishDuration.add(publishRes.timings.duration);
  if (publishRes.status === 200) {
    publishSuccess.add(1);
  } else {
    console.error(
      `Program publish failed. Status: ${publishRes.status}, body: ${publishRes.body}`,
    );
  }

  sleep(0.05);
}
