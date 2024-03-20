const getAsyncData = async () => {
  try {
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      if (position && position.coords) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        return {
          latitude,
          longitude,
        };
      } else {
        throw new Error("Geolocation is not supported.");
      }
    } else {
      throw new Error("Geolocation is not supported.");
    }
  } catch (error) {
    // console.error("Error when getting position:", error.message);
    alert(`Error when getting position: ${error.message}`);
    return "error";
  }
};

export default getAsyncData;
