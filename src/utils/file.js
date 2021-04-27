import { getTextureData } from "idbTextureStore";

export const fileToBase64 = (file) => {
  if (!file) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const getImageBitmap = async (name) => {
  try {
    const fileData = await getTextureData(name);
    if (!fileData.file) {
      return null;
    }

    return createImageBitmap(fileData.file);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  // JvB: Very buggy, /textyle/jitsi_at_scale/static/media/tilesets_deviant_milkian_1.745f0e79.png filename=tilesets_deviant_milkian_1.png
  if (arr.length >= 2) {
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } else {
    return new File(dataurl, filename, { type: 'image/png' }); // Only used for PNG tilesets for now
  }
};

//export const getFileName = (fullpath) => {
//return fullpath.split('\\').pop().split('/').pop();
//}

//const base64ToFile = (data) => {
//const raw = window.atob(data);
//const rawLength = raw.length;
//const bytes = new Uint8Array(rawLength);

//for (let i = 0; i < rawLength; i++) {
//bytes[i] = raw.charCodeAt(i);
//}

//return bytes;
//}
