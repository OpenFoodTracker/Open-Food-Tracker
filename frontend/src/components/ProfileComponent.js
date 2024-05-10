import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilComponent = () => {
  console.log("Profil");
  return (
    <div className="ProfileComponent">
      <div className="WellcomeUser">Hallo </div>
      
      <label>Hier sieht man das Profil</label>
    </div>
  )
};

export default ProfilComponent;
