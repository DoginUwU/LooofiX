import moment from "moment";

const formatElapsedTime = (seconds: number) => {
  return moment.utc(seconds * 1000).format("HH:mm:ss");
};

export { formatElapsedTime };
