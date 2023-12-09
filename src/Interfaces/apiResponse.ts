export interface apiResponse {
    data?:{
        statusCode?: number
        isSuccess?: boolean
        errorMessages?: string[]
        result: {
            [key:string]:string
        }
    };
    error?:any;

 
  }
  