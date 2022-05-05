export const shipper = () => {
  const head = new Headers();

  head.append("X-API-Key", process.env.SHIPPER_API_KEY!);

  return head;
};

export const shipperPost = () => {
  const head = new Headers();

  head.append("X-API-Key", process.env.SHIPPER_API_KEY!);
  head.append("Content-Type", "application/json");

  return head;
};