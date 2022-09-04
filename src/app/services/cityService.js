import httpService from "./http.service";

const cityEndpoint = "/city";

const cityService = {
    get: async () => {
        const { data } = await httpService.get(cityEndpoint);
        return data;
    }
};
export default cityService;
