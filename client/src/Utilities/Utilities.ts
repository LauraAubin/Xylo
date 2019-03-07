export async function fetchRequest(type: string, path: string, body: {}) {
  return await fetch(path, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
    method: type.toUpperCase()
  });
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
