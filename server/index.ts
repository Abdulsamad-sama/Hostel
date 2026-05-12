import app from "@/server/app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[server] HostelHub API running on http://localhost:${PORT}`);
});
