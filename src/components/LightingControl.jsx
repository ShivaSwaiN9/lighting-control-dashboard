import React, { useState } from "react";
import axios from "axios";
import { HiOutlineLightningBolt } from "react-icons/hi";

const LightingControl = () => {
  const [miniserverAddress, setMiniserverAddress] = useState("");
  const [controllerName, setControllerName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [isLightOn, setIsLightOn] = useState(false);

  const handleToggleLight = async () => {
    try {
      console.log("Miniserver Address:", miniserverAddress);
      console.log("Controller Name:", controllerName);

      const response = await axios.post(
        `http://localhost:5173/Shiva/addoredituser`,
        {
          json: {
            name: controllerName,
          },
        }
      );

      if (response.data.uuid) {
        setIsLightOn(!isLightOn);
      } else {
        console.error("Failed to toggle light");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-gradient-to-r from-pink-500 to-orange-500 relative">
      <div className="slider-thumb-before"></div>

      <h2 className="text-xl font-bold mb-4 text-white">Lighting Control</h2>
      <label className="block mb-2 text-white">
        Miniserver Address:
        <input
          type="text"
          value={miniserverAddress}
          onChange={(e) => setMiniserverAddress(e.target.value)}
          className="block w-full border rounded-md p-2 text-black"
        />
      </label>
      <label className="block mb-2 text-black">
        Lighting Controller:
        <input
          type="text"
          value={controllerName}
          onChange={(e) => setControllerName(e.target.value)}
          className="block w-full border rounded-md p-2"
        />
      </label>
      <label className="block mb-2 text-black">
        Icon URL:
        <input
          type="text"
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          className="block w-full border rounded-md p-2"
        />
      </label>
      <button
        onClick={handleToggleLight}
        className={`bg-blue-500 text-white p-2 rounded-md ${
          isLightOn ? "bg-red-500" : ""
        }`}
      >
        {isLightOn ? "Turn Off" : "Turn On"} Light
      </button>
      <HiOutlineLightningBolt
        alt="Light Icon"
        style={{ maxWidth: "100px" }}
        className="mt-4"
      />
    </div>
  );
};

export default LightingControl;
