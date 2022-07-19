export const getSoundText = async (text: string) => {
   const data = await fetch(
      `https://voicerss-text-to-speech.p.rapidapi.com/?key=${
         process.env.NEXT_PUBLIC_TEXT_TO_SPEED_API_KEY
      }&src=${decodeURI(text)}&hl=en-us&r=0&c=mp3&f=8khz_8bit_mono&b64=true`,
      {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
            'X-RapidAPI-Host': process.env
               .NEXT_PUBLIC_RAPID_HOST_TEXT_TO_SPEED as string,
         },
      }
   )
      .then((value) => value.json())
      .then((value) => {
         console.log(value);
      })
      .catch((error) => {
         console.log(error);
      });

   return data;
};
