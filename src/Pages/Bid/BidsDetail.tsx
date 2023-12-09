import React, { useEffect, useState } from 'react'
import { useGetBidByVehicleIdQuery } from '../../Api/bidApi';
import { Loader } from '../../Helper';
import './Styles/bid.css'
import { useCheckStatusAuctionPriceMutation } from '../../Api/paymentHistoryApi';
import { checkStatus } from '../../Interfaces/checkStatus';
import userModel from '../../Interfaces/userModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/store';
import CreateBid from './CreateBid';
import { useGetVehicleByIdQuery } from '../../Api/vehicleApi';
import { useNavigate } from 'react-router-dom';
import { bidModel } from '../../Interfaces/bidModel';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { apiResponse } from '../../Interfaces/apiResponse';
import { newBidModelResponse } from '../../Interfaces/newBidModelResponse';

function BidsDetail(props:{vehicleId:string}) {

    const {data,isLoading } = useGetBidByVehicleIdQuery( parseInt(props.vehicleId) )
    const userStore : userModel = useSelector((state:RootState) => state.authenticationStore);
    const bidStore : any = useSelector((state:RootState) => state.bidStore);
    const [hubConnection,setHubConnection] = useState<HubConnection>();
    const [triggerConnection,setTriggerConnectionState] = useState<boolean>();
    const [checkStatusAuction] = useCheckStatusAuctionPriceMutation();
    const [variable,setVariableState] = useState();
    const [bidState,setBidState] = useState<newBidModelResponse[]>([]);
    var model : any = {}
    const [result,setResultState] = useState();
    const response_data = useGetVehicleByIdQuery(parseInt(props.vehicleId));
    
    const Navigate = useNavigate();


    if (response_data) {
    }

    useEffect(()=>{
        if (data) {
            setBidState(data.result)
        }
    },[data])

    useEffect(()=>{
        
        createHubConnection();
    },[])

    const createHubConnection = async () => {
        const hubConnection = new HubConnectionBuilder().withUrl("https://localhost:7206/BidUpdate/Hub").configureLogging(LogLevel.Information).build();

        try {
            await hubConnection.start();
        } catch (error) {
        }
        setHubConnection(hubConnection);

    }


  

    useEffect( ()  =>  {

     
        if (hubConnection) {
            const checkModel : checkStatus = {
                userId : userStore.nameid!,
                vehicleId:parseInt(props.vehicleId) 
            }
         checkStatusAuction(checkModel).then((response : any) => {
            setResultState( response!.data?.isSuccess)
        
         }).catch((err) => {
            console.error(err)
         })

         hubConnection.send("NewBid",parseInt(props.vehicleId) ).catch((err) => console.error(err));
         setTriggerConnectionState(true);
        }

     


    },[props.vehicleId,userStore.nameid,checkStatusAuction,hubConnection,bidStore])


    useEffect(()=>{
        if (hubConnection) {
                hubConnection.on("messageReceived",(message : any) => {
                    setBidState(message);
                })
        }
    },[hubConnection,triggerConnection])



    const handleBidCheckout = (props:any) => {
        const token = localStorage.getItem("token");
        if (!token) {
            Navigate("/login");
        }
        Navigate(`/Vehicle/BidCheckout/${props}`)
    }



    if (!data) {
        return (
            <Loader></Loader>
        )
    }
  return (
<>

    {
        result ? (
            <div className='container mb-5' >
            <CreateBid vehicleId={parseInt(props.vehicleId)} ></CreateBid>

            </div>


        ) : (

            <div className='container mb-5'  >
                <button className='btn btn-warning' type='button' onClick={()=>handleBidCheckout(props.vehicleId)} >Pay PreAuction Price ${response_data.currentData?.result.auctionPrice} </button>
            </div>
        )
    }



    <div className='bid-list' >
    <h1> {variable} </h1>
    {
        bidState?.slice().sort((a:bidModel,b:bidModel) =>  b.bidAmount - a.bidAmount).map((bid:any,key:any) => {return (
            <>
        <div className='mt-4'  >

            <div className='bid'   >
            <span className='bid-number' > {key} </span>
            <span className='bid-date' > {bid.bidDate} </span>
            <span className='bid-amount' > ${bid.bidAmount} </span>
        </div>
        <br></br>
        </div>
        </>
        )})
    }

          
       
    </div>
    </>
  )
}

export default BidsDetail
