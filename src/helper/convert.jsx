// convert image to base64
const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		/* FILEREADER() Lets web applications asynchronously read the contents of files (or raw data buffers)
        stored on the user's computer. */
		const fileReader = new FileReader();
        // new filereader will read file that was input
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
  	});
};

export default convertToBase64;
