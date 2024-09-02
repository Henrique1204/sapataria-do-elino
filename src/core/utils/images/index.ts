export const generateImageSrc = (image: string) => {
	return process.env.NEXT_PUBLIC_APP_URL + `/images/${image}`;
};
