export default async function handler(req, res) {
  const { station, platform } = req.query;

  if (!station) {
    return res.status(400).json({ error: "Missing station code" });
  }

  try {
    if (!platform) {
      const response = await fetch("https://metro-rti.nexus.org.uk/api/stations/platforms");
      const data = await response.json();
      return res.status(200).json(data);
    }

    const response = await fetch(`https://metro-rti.nexus.org.uk/api/times/${station}/${platform}`);
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Metro API fetch failed" });
  }
}
