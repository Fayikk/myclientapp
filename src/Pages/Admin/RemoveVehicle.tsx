import React from 'react'
import { useRemoveVehicleMutation } from '../../Api/vehicleApi'
import { apiResponse } from '../../Interfaces/apiResponse';
import { ToastrNotify } from '../../Helper';
function RemoveVehicle(props:{vehicleId:number}) {

    const [removeVehicleMutation] = useRemoveVehicleMutation();

    const handleRemoveVehicleEvent = () => {
            const response : any = removeVehicleMutation(props.vehicleId).then((response) => {
            })
            if (response.data?.isSuccess) {
                ToastrNotify("Remove process is success","success");
            }
    }


  return (
    <div>
      <button className='btn btn-danger' onClick={()=>handleRemoveVehicleEvent()} >
      <i className="bi bi-trash-fill"></i>
      </button>
    </div>
  )
}

export default RemoveVehicle
