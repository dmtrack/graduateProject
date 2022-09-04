import httpService from "./http.service";
const segmentEndpoint = "/segment";

const segmentService = {
    fetchAll: async () => {
        const { data } = await httpService.get(segmentEndpoint);
        return data;
    }
};
export default segmentService;
