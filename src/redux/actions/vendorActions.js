import * as types from "./actionTypes";
import * as vendorApi from "../../api/vendorApi";


export function loadVendorsSuccess(vendors){
    return {type: types.LOAD_VENDORS_SUCCESS, vendors};
}

export function loadVendors(){
    return function(dispatch){
        return vendorApi.getVendors()
        .then(vendors => {
            dispatch(loadVendorsSuccess(vendors));
        })
        .catch(error => {
            throw error;
        })
    }
}