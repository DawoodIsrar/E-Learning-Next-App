const getRedirects = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/redirects`;
  const res = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });
  const redirects = await res.json();
  const newData = redirects.map(({ id, ...rest }) => rest);
  return newData;
};

module.exports = { getRedirects };
