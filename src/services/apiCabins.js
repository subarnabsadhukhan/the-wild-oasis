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
export async function editCabin(newCabin) {
  const { id, image, ...cabinData } = newCabin;
  const isOldCabinPhoto =
    typeof image === "string" && image.startsWith(supabaseUrl);

  const imageName = isOldCabinPhoto
    ? "NO-NEED"
    : `${Math.random()}-${image[0].name}`.replaceAll("/", "");

  const imagePath = !isOldCabinPhoto
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : image;

  // 1. Update Cabin

  const { data, error } = await supabase
    .from("cabins")
    .update(cabinData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Cabin could not be Updated");

  // 2. Upload Image
  if (!isOldCabinPhoto) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, image[0], {
        cacheControl: "3600",
        upsert: false,
      });
    // 3. Change the image path in the database

    if (!storageError) {
      const { error: photoUploadError } = await supabase
        .from("cabins")
        .update({ image: imagePath })
        .eq("id", id)
        .select()
        .single();

      if (photoUploadError)
        throw new Error(
          "Cabin Data was Updated but Cabin Photo Couldn't be changed"
        );
    }

    if (storageError)
      throw new Error(
        "Cabin Data was Updated but Cabin Photo Couldn't be changed"
      );
  }

  return data; // without Image Path
}

export async function duplicateCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select()
    .single();
  if (error) throw new Error("Cabin could not be duplicated");

  return data;
}
