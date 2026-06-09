import { supabase } from "../utils/supabase";

export const getALLRecords = async () => {
  const { data } = await supabase.from("study-record").select("*");
  return data;
};

export const addRecord = async (title, time) => {
  const { data } = await supabase
    .from("study-record")
    .insert({ title: title, time: time })
    .select();
  return data[0];
};

export const deleteRecord = async (id) => {
  const { error } = await supabase.from("study-record").delete().eq("id", id);
  if (error) {
    throw new Error(error.massage);
  }
};
