import  {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const Daypicker = ({ onDatesChange }) => {
    const [value, setValue] = useState({
      startDate: new Date(),
      endDate: new Date().setMonth(11)
    });
  
    const handleValueChange = (newValue) => {
    //   console.log("newValue:", newValue);
      setValue(newValue);
      onDatesChange(newValue.startDate, newValue.endDate);
    };
  
    return (
      <Datepicker value={value} onChange={handleValueChange} />
    );
  };
  
  export default Daypicker;
  