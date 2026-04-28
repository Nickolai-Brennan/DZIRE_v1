export const track = (event: string, metadata?: Record<string, unknown>) => {
  console.log("[DZIRE Track]", event, metadata);
  // TODO: Connect to API - POST to /api/track/event
};
