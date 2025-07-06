import api from "../axios.config";

export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/v1/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    });
  
    if (response.status !== 200) throw new Error('Upload failed');
  
    const data = response.data;
    return data.imgUrl; 
}
  