import jsSHA from "jssha";
import Url from "../models/url.model.js";

function generateRandomString(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);

    result += charset.charAt(randomIndex);
  }

  return result;
}
const generateShortId = (url, attemp) => {
  if (attemp > 0) {
    url += generateRandomString(5);
  }
  // if (attemp == 0) return "brihjrihr";
  try {
    const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    shaObj.update(url);
    const hash = shaObj.getHash("HEX");
    const shortHash = hash.substring(0, 7);

    return shortHash;
  } catch (error) {
    console.log(error);
    return null;
  }
  //   console.log(shortHash);
};

const shortenUrl = async (req, res) => {
  console.log(req.body);
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      message: "Url missing",
    });
  }

  let [findExistingUrl] = await Url.find({ longUrl: url });

  if (findExistingUrl) {
    return res.status(200).json({
      message: "Url already found",
      url: "http://localhost:5000/" + findExistingUrl?.shortId,
    });
  }

  let attempt = 0;

  let shortID;
  while (attempt < 5) {
    shortID = generateShortId(url, attempt);
    const newUrl = new Url({
      longUrl: url,
      shortId: shortID,
    });

    try {
      let savedUrl = await newUrl.save();
      shortID = savedUrl.shortId;
      console.log("Successfully created short URL:", savedUrl.shortId);
      break;
    } catch (error) {
      if (error.code === 11000) {
        console.log(`Collision detected for ${shortID}. Retrying...`);
        attempt++;
      } else {
        throw error;
      }
    }
  }

  return res.status(200).json({
    message: "Url shortend success",
    url: "http://localhost:5000/" + shortID,
  });
};

const findLongUrl = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  let [response] = await Url.find({ shortId: id });
  if(!response){
     return res.status(200).json({
      message: "Url not found",
    });
  }

   return res.redirect(302, response.longUrl);
};
export { shortenUrl, findLongUrl };
