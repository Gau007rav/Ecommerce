export const getProducts = ()=> async(dispatch)=>{
    try {
        const data = await fetch("http://localhost:7000/getproducts",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
        });

        const res = await data.json();
         console.log(res +"this is new lot");
        dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res});
    } catch (error) {
        dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response});
    }
}