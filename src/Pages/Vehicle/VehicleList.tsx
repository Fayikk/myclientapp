import React, { useEffect, useState } from 'react'
import { useGetVehiclesQuery } from '../../Api/vehicleApi'
import { vehicleModel } from '../../Interfaces/vehicleModel'
import './Styles/VehicleList.css'
import Circle from './Circle'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import { SD_FilterTypes } from '../../Interfaces/enums/SD_FilterTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../Storage/store'
function VehicleList( ) {
  const {data,isLoading} = useGetVehiclesQuery(null)
  const [filterResponse,setFilterResponse] = useState<vehicleModel[]>([])
  const [result,setResultState] = useState<vehicleModel[]>([]);
  const [vehicles,setVehicleState] = useState<vehicleModel[]>([]);
  const [currentPage,setCurrentPage] = useState<number>();
  const [setSearch,setSearchState] = useState("");
  let searchElement : string = useSelector((state:RootState) => state.vehicleStore.search);

  const defaultPaginationArr: number[] = []
  const filterOptions : Array<SD_FilterTypes> = [
    SD_FilterTypes.NAME_A_Z,
    SD_FilterTypes.NAME_Z_A,
    SD_FilterTypes.PRICE_HIGH_LOW,
    SD_FilterTypes.PRICE_LOW_HIGH,
    SD_FilterTypes.RemoveFilter,
  ]

  const handleFilterClick = (sortTypes:any,index?:number) => {
     let forSortArray = [...result];
     if (filterOptions[sortTypes] === SD_FilterTypes.PRICE_HIGH_LOW) {
        forSortArray.sort((a,b) => {return b.price - a.price} )
     }
     if (filterOptions[sortTypes] === SD_FilterTypes.PRICE_LOW_HIGH) {
      forSortArray.sort((a,b) => {return a.price - b.price} )
     }
     if (filterOptions[sortTypes] === SD_FilterTypes.NAME_A_Z) {
        forSortArray.sort((a,b) => a.brandAndModel.toLowerCase().localeCompare(b.brandAndModel.toLowerCase()))
     }
     if (filterOptions[sortTypes] === SD_FilterTypes.NAME_Z_A) {
      forSortArray.sort((a,b) => b.brandAndModel.toLowerCase().localeCompare(a.brandAndModel.toLowerCase()))
     }
     localStorage.setItem("myFilter",JSON.stringify(forSortArray));
     if (filterOptions[sortTypes] === SD_FilterTypes.RemoveFilter) {
      localStorage.removeItem("myFilter");
    
     }
     if (sortTypes === SD_FilterTypes.Pagination) {
      setCurrentPage(index!);
         const constantPage = 8;
         forSortArray = [];
         const reelResult = (index!*constantPage);
         for (let index = reelResult; index <= reelResult+constantPage-1; index++) {
            if (data.result[index]!==undefined) {
              forSortArray.push(data.result[index]);
            }
         }
     }

     setFilterResponse(forSortArray)
  }

  useEffect(()=>{
    if (data ) {
      setVehicleState(data.result);
      setResultState(data.result);

    }
   
  },[data])

  useEffect(()=>{
    const myArray:vehicleModel[] = [];
    setSearchState(searchElement);
    if (vehicles) {
      vehicles.forEach((element) =>{
        const response = element.brandAndModel.toLowerCase().includes(searchElement.toLocaleLowerCase());
        if (response === true) {
            myArray.push(element)
        }
      });
      if (setSearch!=="") {
        setFilterResponse(myArray);
      }
    }


    const storedArray = JSON.parse(localStorage.getItem('myFilter')!)
    if (data && storedArray===null && searchElement==="") {
      setFilterResponse(data.result)


    }
    if(storedArray!==null && searchElement===""){

      setFilterResponse(storedArray)
    }
  },[searchElement,vehicles,data])

  if (data) {
    const ceilCalc = Math.ceil(data.result.length/8);

    for (let index = 0; index < ceilCalc; index++) {
         defaultPaginationArr.push(index)
      
    }
  }







    return (
    <div className='container' >
      <Banner></Banner>
      <div className='row' >

      <div className='dropdown mt-3' >
        <button className='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle="dropdown" aria-expanded="false" >
          Filter
        </button>
      <ul className="dropdown-menu" >
          {
            filterOptions.map((filterTypes,index) => {
              return (
                <>
                <li><a className="dropdown-item" onClick={()=>handleFilterClick(index)}  > {filterTypes} </a></li>
                </>
              )
            })
          }
      </ul>
      </div>


      {filterResponse.map((vehicle:any, index:any) => (
            <div className='col' key={index}  >
              <div className='auction-card text-center'>
                <div className='card-image text-center'>
                  <img src={vehicle.image} alt={vehicle.brandAndModel} />
                </div>
                <div className='card-details text-center'>
                  <h2>{vehicle.brandAndModel}</h2>
                  <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
                  <p><strong>Color:</strong> {vehicle.color}</p>
                  <p><strong>Current Bid:</strong> ${vehicle.price}</p>
                  <p><strong>End Time:</strong> {vehicle.endTime}</p>
                </div>
                <div>
                  <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
                  <button className='btn btn-danger' >Detail</button>
                  
                  </Link>
                </div>
              <Circle vehicle={vehicle} ></Circle>

              </div>


            </div>
          ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" onClick={()=>handleFilterClick("Pagination",currentPage!-1)} >Previous</a></li>

        {
          defaultPaginationArr.map((key,index) => (
          <li className="page-item"><a className="page-link" key={index} onClick={()=>handleFilterClick("Pagination",index)}  > {key+1} </a></li>

          ))
        }

          <li className="page-item"><a className="page-link"onClick={()=>handleFilterClick("Pagination",currentPage!+1)}>Next</a></li>
        </ul>
      </nav>
    </div>
  
  
    );
    
    
    
    
    
    
    
    
}

export default VehicleList
