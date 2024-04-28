import useApiRequest from "./useApiRequest";

const GetServices = async () => {
  const { get } = useApiRequest();
  return get("/services")
    .then((data) => data.services)
    .catch((error) => console.log(error));
};

const PostService = async (service) => {
  const { post } = useApiRequest();
  return post("/services", service)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const GetCategories = async () => {
  const { get } = useApiRequest();
  return get("/categories")
    .then((data) => data.categories)
    .catch((error) => console.log(error));
};

const GetCategory = async (categoryId) => {
  const { get } = useApiRequest();
  return get(`/services/category/${categoryId}`)
    .then((data) => data.services)
    .catch((error) => console.log(error));
};

const GetServiceByCategory = async (categoryId) => {
  const { get } = useApiRequest();
  return get(`/services/category/${categoryId}`)
    .then((data) => data.services)
    .catch((error) => console.log(error));
};

const PutService = async (serviceId, service) => {
  const { put } = useApiRequest();
  return put(`/services/${serviceId}`, service)
    .then((data) => data)
    .catch((error) => console.log(error));
};

const DeleteService = async (serviceId) => {
  const { del } = useApiRequest();
  return del(`/services/${serviceId}`)
    .then((data) => data)
    .catch((error) => console.log(error));
};

export {
  GetServices,
  PostService,
  GetCategories,
  GetCategory,
  GetServiceByCategory,
  PutService,
  DeleteService,
};
