import httpService from "../services/http.service";
import localStorageService from "../services/localStorageService";

const userEndpoint = "/user";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    console.log(data, "dataService");
    return data;
  },
};
export default userService;
