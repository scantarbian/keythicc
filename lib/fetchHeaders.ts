export const shipper = () => {
  const head = new Headers();

  head.append("X-API-Key", process.env.SHIPPER_API_KEY!);

  return head;
};
