const City = require("../models/City");
const Segment = require("../models/Segment");
const citiesMock = require("../mock/cities.json");
const segmentsMock = require("../mock/segments.json");
const Episode = require("../models/Episode");
const episodeMock = require("../mock/episodes.json");

module.exports = async () => {
  const cities = await City.find();
  if (cities.length !== citiesMock.length) {
    await createInitialEntity(City, citiesMock);
  }

  const segments = await Segment.find();
  if (segments.length !== segmentsMock.length) {
    await createInitialEntity(Segment, segmentsMock);
  }

  const episodes = await Episode.find();
  if (episodes.length !== episodeMock.length) {
    await createInitialEntity(Episode, episodeMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
