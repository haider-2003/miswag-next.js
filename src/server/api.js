export async function getItems() {
  try {
    // the base url is better stored in a .env file and imported here,
    // like ${NEXT_PUBLIC_BASE_URL}, which would be something like https://miswag.com/api/v1,
    // then either saved to a variable or injected directly into the url.
    // but since this is just a test url, i kept it like this so you don't have to do extra work.

    const res = await fetch(
      "https://run.mocky.io/v3/f37b5d0d-ee4c-4d81-b91e-09c30ed62bb8"
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}
