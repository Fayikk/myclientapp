import React, { useEffect, useState } from 'react'
import { ToastrNotify } from '../../Helper';
import { createVehicleModel } from '../../Interfaces/createVehicleModel';
import userModel from '../../Interfaces/userModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/store';
import { useCreateVehicleMutation } from '../../Api/vehicleApi';
import { useParams } from 'react-router-dom';
import { useUpdateVehicleMutation } from '../../Api/vehicleApi';
import { useGetVehicleByIdQuery } from '../../Api/vehicleApi';
import {format,parseISO} from "date-fns"
import { apiResponse } from '../../Interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';
function CreateVehicle() {
    const Navigate = useNavigate();
    const [imageToBeStore,setImageToBeStore] = useState<any>(); 
    const [imageToBeDisplay,setImageToBeDisplay] = useState<any>();
    const userStore : userModel = useSelector((state:RootState) => state.authenticationStore);
    const {vehicleId} = useParams();
    const [updateVehicleModel,setUpdateVehicleModelState] = useState<FormData>();
    const [createVehicleMutation] = useCreateVehicleMutation();
    const [updateVehicleMutation] = useUpdateVehicleMutation();
    const [response,setResponseState] = useState<apiResponse>();

        const {data,isLoading} = useGetVehicleByIdQuery(vehicleId);


        const vehicleData  = {
            brandAndModel:"",
            manufacturingYear:0,
            color:"",
            engineCapacity:0,
            price:0,
            millage:0,
            plateNumber:"",
            auctionPrice:0,
            additionalInformation:"",
            startTime:"",
            endTime:"",
            isActive:true,
            image:"",
            sellerId:"",
            file:File
        }
    
    
    
        const [vehicleModel,setVehicleModelState] = useState(vehicleData)
        const [isActive,setIsActiveState] = useState<boolean>();
    
    useEffect(()=> {
        if (data) {
            setVehicleModelState(data.result);

        }

    },[data])





    var formData = new FormData();
    const handleCreateOrUpdateChange = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        


        formData.append("BrandAndModel",vehicleModel.brandAndModel);
        formData.append("ManufacturingYear",vehicleModel.manufacturingYear.toString());
        formData.append("Color",vehicleModel.color);
        formData.append("EngineCapacity",vehicleModel.engineCapacity.toString());
        formData.append("Price",vehicleModel.price.toString());
        formData.append("Millage",vehicleModel.millage.toString());
        formData.append("PlateNumber",vehicleModel.plateNumber);
        formData.append("AdditionalInformation",vehicleModel.additionalInformation);
        formData.append("StartTime",vehicleModel.startTime);
        formData.append("AuctionPrice",vehicleModel.auctionPrice.toString());
        formData.append("EndTime",vehicleModel.endTime);
        formData.append("IsActive",vehicleModel.isActive.toString());
        formData.append("SellerId",userStore!.nameid || "");
        formData.append("File",imageToBeStore !==undefined ? imageToBeStore : "file");

        if (vehicleId === undefined) {
        formData.append("Image",imageToBeDisplay);

        createVehicleMutation(formData)

        }

        if (vehicleId !== undefined && data) {
            setUpdateVehicleModelState(
                formData
            )

            
            formData.append("Image",data?.result.image)
           updateVehicleMutation( {createVehicle:formData, vehicleId}  ).then((response:any) =>
           setResponseState(response)
           
       );


                if (response?.data!.isSuccess === true) {
                      ToastrNotify("Update process is success ","success")
                        Navigate("/Admin/VehicleIndex");
                }

        }

    }



    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imgType = file.type.split("/")[1];
            const validImgTypes = ["jpeg","jpg","png"]

            const isImageTypeValid = validImgTypes.filter((e)=> {
                return e === imgType
            })

            if (file.size > 1000 * 1024) {
                    ToastrNotify("File Must be less than 1 MB ","error");
                    setImageToBeStore("");
                    return;
            }
            else if(isImageTypeValid.length === 0){
                    ToastrNotify("File must be type in jpeg,jpg,png","error")
                    setImageToBeStore("");

                    return
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setImageToBeStore(file);
            reader.onload = (e) => {
                const imgUrl = e.target?.result as string;
                setImageToBeDisplay(imgUrl);
            }
            
        }
    }



  return (
    <div className='container ' style={{border: '1px solid black',position:"absolute"}} >
        <form encType='multipart/form-data' onSubmit={handleCreateOrUpdateChange} >

        <div className='text-center' >
          <div className="mb-3">
                <label  className="form-label">Brand And Model</label>
                <input type="text" className="form-control"  placeholder="Brand And Model"
                defaultValue={data?.result.brandAndModel}
                onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,brandAndModel:e.target.value}})}}/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Manufacturing Year</label>
                <input type="number" className="form-control"
                       defaultValue={data?.result.manufacturingYear }
                placeholder="Year" name='manufacturing' required onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,manufacturingYear: parseInt(e.target.value) }})}}/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Color</label>
                <input type="text" className="form-control" 
                   defaultValue={data?.result?.color}
                placeholder="Color"  onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,color:e.target.value}})}} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Engine Capacity</label>
                <input type="number" className="form-control"
                   defaultValue={data?.result.engineCapacity}
                placeholder="Engine Capacity" required name='engine' onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,engineCapacity: parseInt(e.target.value) }})}} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Price</label>
                <input type="number" className="form-control"
                   defaultValue={data?.result?.price}
                placeholder="Price" onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,price: parseInt(e.target.value) }})}} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Millage</label>
                <input type="number" className="form-control"
                defaultValue={data?.result?.millage}
                placeholder="Millage" onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,millage: parseInt(e.target.value) }})}} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Plate Number</label>
                <input type="text" className="form-control" 
                   defaultValue={data?.result?.plateNumber}
                placeholder="Plate Number" onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,plateNumber:e.target.value}})}} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Auction Price</label>
                <input type="number" className="form-control" 
                         defaultValue={data?.result?.auctionPrice}
                placeholder="Auction Price" onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,auctionPrice:parseInt(e.target.value) }})}}/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Additional Information</label>
                <input type="text" className="form-control" 
                         defaultValue={data?.result?.additionalInformation}
                
                placeholder="Additional Information"  onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,additionalInformation:e.target.value}})}}  />
            </div>
            <div className="mb-3">
                <label  className="form-label">Start Time</label>
                <input type="date" className="form-control" 
                         defaultValue={data?.result?.startTime ? format(parseISO(data?.result?.startTime), 'yyyy-MM-dd' ) : '' }
                
                placeholder="Start Time"  onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,startTime:e.target.value}})}}  />
            </div>
            <div className="mb-3">
                <label  className="form-label">End Time</label>
                <input type="date" className="form-control"
                            defaultValue={data?.result?.endTime ? format(parseISO(data?.result?.endTime), 'yyyy-MM-dd' ) : '' }
                
                placeholder="End Time"  onChange={(e) => {setVehicleModelState((prevState) => {return { ...prevState,endTime:e.target.value}})}}  />
            </div>
            <div className='text-center row' >
                <span>Is Active</span>
            <div className="mb-3 col">
                <label  className="form-label">true</label>
                <input type="radio" className="form-control" 
                
                placeholder="true" onClick={()=>setIsActiveState(true)} />
            </div>
            <div className="mb-3 col">
                <label  className="form-label">false</label>
                <input type="radio" className="form-control"  placeholder="true" onClick={()=>setIsActiveState(false)} />
            </div>
            </div>
            <div className="mb-3">
                <label  className="form-label">Image</label>
                <input type="file" className="form-control" onChange={handleFileChange} placeholder="Image"/>
            </div>
            
        </div>
        <div className='text-center' >
                <button type='submit' className='btn btn-success' >
                        Save
                </button>
        </div>
        </form>

    </div>
  )
}

export default CreateVehicle
