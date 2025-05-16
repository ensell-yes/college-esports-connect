
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DemoButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      onClick={() => navigate("/demo")} 
      className="bg-gradient-to-r from-esports-orange to-esports-purple hover:opacity-90 transition-opacity"
    >
      Try Demo
    </Button>
  );
};

export default DemoButton;
