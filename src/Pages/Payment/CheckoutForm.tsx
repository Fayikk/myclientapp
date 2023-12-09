import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Storage/store';
import { useCreatePaymentHistoryMutation } from '../../Api/paymentHistoryApi';
import orderModel from '../../Interfaces/orderModel';


function CheckoutForm() {


    const Navigate = useNavigate();
 const stripe = useStripe();
  const elements = useElements();
  const [isProcessing,setIsProcessing] = useState(false);
  const [createPaymentHistory] = useCreatePaymentHistoryMutation()
    const vehicleId : string = useSelector((state:RootState) => state.vehicleStore.vehicleId)
    const orderStore : orderModel = useSelector((state:RootState) => state.orderStore)
  
    const handleSubmit = async (event:React.ChangeEvent<HTMLFormElement>) => {




    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect:"if_required"
    });
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      setIsProcessing(false);
    } 

    if (result.paymentIntent?.status === "succeeded") {

      const response = createPaymentHistory({
          clientSecret:orderStore.clientSecret,
          stripePaymentIntentId:orderStore.stripePaymentIntentId,
          userid:orderStore.userId,
          vehicleId:orderStore.vehicleId
      
        })



        Navigate(`/Vehicle/VehicleId/${vehicleId}`)
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className='text-center mt-2' >
      <button disabled={!stripe || isProcessing} type='submit' className='btn btn-primary' >  {
                isProcessing ? "Processing...":"Submit Pay"
            }</button>
          
      </div>
    </form>
  )
}

export default CheckoutForm
