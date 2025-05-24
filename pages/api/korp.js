export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const response = await fetch("https://dashboard.oriondrift.net/index");
    const data = await response.json();

    if (data?.error === false && data?.userData?.username === username) {
      const { user_id, username, platform, created } = data.userData;
      return res.status(200).json({ user_id, username, platform, created });
    }

    return res.status(404).json({ error: "User not found" });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
