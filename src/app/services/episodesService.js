import httpService from "./http.service";

const episodesEndpoint = "/episode";

const episodesService = {
  get: async ({ page, count }) => {
    const { data } = await httpService.get(episodesEndpoint);

    return data;
  },
};

export default episodesService;
