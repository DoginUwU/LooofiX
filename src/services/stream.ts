import api from "./api";

export interface IStream {
  id: number;
  title: string;
  url: string;
}

export async function getAllStreams() {
  const { data } = await api.get<IStream[]>('/streams')

  return data
}
