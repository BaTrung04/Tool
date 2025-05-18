import auth from "./auth";
import download from "./download";

const services = (() => {
  return {
    auth: auth(),
    download: download(),
  };
})();

export default services;
