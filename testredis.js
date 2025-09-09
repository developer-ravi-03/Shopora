import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redis.on("connect", () => console.log("✅ Connected to Redis (Memurai)"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

const run = async () => {
  await redis.set("foo", "bar");
  const val = await redis.get("foo");
  console.log("Stored & retrieved:", val);
  process.exit(0);
};

run();
