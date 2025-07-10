export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).json({ error: 'Missing URL' });
    return;
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);

    const data = await response.arrayBuffer();
    res.status(200).send(Buffer.from(data));
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed', details: error.toString() });
  }
}
