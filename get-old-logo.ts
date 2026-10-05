async function run() {
  const configUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNY0WsrkDNsCxnnku-VqBCKP_BIV0XnLpXc6wjBoyjzb5vLjo7A4xCZWBgXJPvx2SdJgfY51g0DcZg/pub?gid=75733527&single=true&output=csv';
  try {
    const res = await fetch(configUrl);
    const text = await res.text();
    console.log("=== ORIGINAL CONFIG ===");
    console.log(text);
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}
run();
