import getInfo from "../../../../lib/getInfo";

export default async function handler(req, res) {
  const url = req.query.url;
   res.json(await getInfo(url));
}