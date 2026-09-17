import UrlModel from "../models/UrlModel.js";
import { generateShortCode } from "../utils/generateShortCode.js";

export const createShortURL = async (req, res) => {
  const { url } = req.body;
  let found = true;
  try {
    if (!url) return res.status(400).json({ message: "please enter url " });
    if (url.startsWith("http") === false && url.startsWith("https") === false)
      return res.status(400).json({ message: "please enter valid url " });

    while (found) {
      const shortCode = generateShortCode();
      const urlLink = await UrlModel.findOne({ shortCode });

      if (urlLink) {
        console.log("shortcode already exists generating again");
      } else {
        const urlData = await UrlModel.create({
          originalUrl: url,
          shortCode,
        });
        found = false;
        return res.status(201).json({
          message: "url created successfully ",
          url: urlData,
        });
      }
    }
  } catch (error) {
    console.log("Error while creating link ", error.message);
    return res.status(500).json({
      message: `error while creating link ${error.message}`,
    });
  }
};

export const getAllLink = async (req, res) => {
  try {
    let allLinks = await UrlModel.find();
    return res
      .status(200)
      .json({ message: "all links fetched successfully ", urls: allLinks });
  } catch (error) {
    console.log("Error while getting all  link ", error.message);
    return res.status(500).json({
      message: `error while getting all link ${error.message}`,
    });
  }
};

export const getLink = async (req, res) => {
  const { code } = req.params;
  try {
    const urlData = await UrlModel.findOne({ shortCode: code });
    if (!urlData) {
      return res.status(404).json({ message: "url not found " });
    }
    res.redirect(302, urlData.originalUrl);
    await UrlModel.findOneAndUpdate(
      { shortCode: code },
      {
        $inc: { click: 1 },
      },
    );
  } catch (error) {
    console.log("Error while getting specific  link ", error.message);
    return res.status(500).json({
      message: `error while specific link ${error.message}`,
    });
  }
};

export const deleteUrl = async (req, res) => {
  const { id } = req.params;
  try {
    const url = await UrlModel.findById(id);
    if (!url)
      return res.status(404).json({
        message: "url link not found ",
      });
    await UrlModel.findOneAndDelete({ _id: id });
    return res.status(200).json({
      message: "url link deleted successfully ",
    });
  } catch (error) {
    console.log("Error while Deleting  link ", error.message);
    return res.status(500).json({
      message: `error while Deleting link ${error.message}`,
    });
  }
};
