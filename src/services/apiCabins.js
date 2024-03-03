import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabins could not be loaded");

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  console.log(id);

  if (error) throw new Error("Cabin could not be deleted");
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) throw new Error("Cabin could not be created");

  // 2. Upload Image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // 3. Delete the cabin if there was an error uploading image

  if (storageError) {
    const { error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data[0].id);

    if (!error)
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );

    if (error)
      throw new Error(
        "Cabin was Created but Cabin image could not be uploaded"
      );
  }
  return data;
}
