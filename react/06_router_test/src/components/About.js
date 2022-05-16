import { useNavigate } from "react-router-dom";

const About = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is the router test app</h1>
      <button onClick={() => navigate("/secret")}>Go to secret page!</button>
    </div>
  );
};
export default About;
