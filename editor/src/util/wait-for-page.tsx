const MAX_RETRIES = 5;
export const waitForPageToExist = async (url: string): Promise<void> => {
  const result = await fetch(url, { method: "HEAD" });
  if (result.ok) {
    return;
  } else {
    for (let i = 1; i < MAX_RETRIES; i++) {
      const delay = 500 * i * i;
      console.warn(
        `Page ${url} doesn't exist yet! Waiting ${delay} for retry ${i}`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      const result = await fetch(url, { method: "HEAD" });
      if (result.ok) {
        return;
      }
    }
    throw new Error(
      `Page ${url} couldn't be found after ${MAX_RETRIES} tries!`
    );
  }
};
