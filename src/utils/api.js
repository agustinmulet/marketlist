const delay = require("delay");

export async function getItems() {
  const result = await delay(1200, {
    value: ["Cerveza", "Detergente", "Jamón"]
  });
  return result;
}
