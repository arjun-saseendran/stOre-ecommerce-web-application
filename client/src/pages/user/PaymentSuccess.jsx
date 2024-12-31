import {Container, Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';


export const PaymentSuccess = () => {

// Get current theme
const {theme} = useSelector((state) => state.theme)


  

return (
  <Container>
    <div className="d-flex justify-content-center align-items-center mx-auto vh-100">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-white"
          height="400px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <div>
        <h1 className="text-white text-center mt-5">Payment success!</h1>
        <Button variant={theme ? 'warning' : 'dark'} className='text-white'>Back to home</Button>
      </div>
    </div>
  </Container>
);
}
