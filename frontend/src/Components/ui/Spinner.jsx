import { Rings } from "react-loader-spinner";
import '../../assets/css/spinner.css'

const spinnerSizes = {
  sm: { height: "30", width: "30", radius: "6" },  
  md: { height: "80", width: "80", radius: "9" },   
 
};

// The Spinner component now accepts a 'size' prop
const Spinner = ({ size = 'md' }) => { // Default to 'md' if no size is provided
  const { height, width, radius } = spinnerSizes[size] || spinnerSizes.md; // Fallback to md if invalid size

  return (
    <div className='spinnerbackground'>
      <Rings
        height={height}
        width={width}
        radius={radius}
        color='#71E1D4'
        ariaLabel='loading spinner' // Updated ariaLabel for better accessibility
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
};

export default Spinner;