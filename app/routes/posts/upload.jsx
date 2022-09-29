import {
  Form,
} from "@remix-run/react";
import {
    unstable_createFileUploadHandler,
    unstable_parseMultipartFormData,
    unstable_composeUploadHandlers,
    unstable_createMemoryUploadHandler,
    redirect,
  } from "@remix-run/node";




export async function action(props) {
    const {request} = props  

     const uploadHandler = unstable_composeUploadHandlers(
        unstable_createFileUploadHandler({
          avoidFileConflicts: true,
          maxPartSize: 10_000_000,
          directory: "public/uploads",
          file: ({ filename }) => filename,
        }),
        unstable_createMemoryUploadHandler(),
      );

  
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    ) 
    const image = formData.get('image') 
    
    if (image) {
      console.log(`File uploaded to server/public/uploads/${image.name}`)
    } else {
      console.log("No file uploaded");
    } 
    return redirect('/')
}

const Upload = () => {
  return (
    <>
      <input type="file" name="upload" />
      <button type="submit">upload</button>
    </>
  );
};

export default Upload;
