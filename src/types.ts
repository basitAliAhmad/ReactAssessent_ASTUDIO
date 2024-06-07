import React from "react";
import {MenuItem} from "primereact/menuitem";

export interface NetworkContextProps {
    networkState: NetworkState,
    setNetworkState: React.Dispatch<React.SetStateAction<NetworkState>>;
}
export interface LocalContextProps {
    localState: LocalState;
    setLocalState: React.Dispatch<React.SetStateAction<LocalState>>;
}

export interface NetworkState {
    data: User[] | Product[] | undefined,
    total: number, // total records in server
    offset: number, // skips
    count: number, // length of current response
    totalPages: number, // total pages required based on total records and page size
    currentPage: number, //
    status: 'initial' | 'loading' | 'success' | 'error' | undefined,
}

export interface LocalState {
    searchKeyWord: string,
    pageSize: number,
}

export interface BreadCrumbState {
    breadCrumb: MenuItem[],
    setBreadCrumb:  React.Dispatch<React.SetStateAction<MenuItem[]>>,
}

export interface User {
    id: number
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string | 'male' | 'female';
    email: string;
    phone: string;
    username: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;

}

export interface Product {
    id: number;
    title: string;
    brand: string;
    category: string;
    stock: number;
    rating: number;
    price: number;
    warrantyInformation: string;
    returnPolicy:string;
    minimumOrderQuantity: number;
}

export interface NetworkFilterButtonProps {
    field: string, label: string
}

export interface TableColumnProps {
    field: string, header: string
}


export interface DataViewComponentProps {
    endpoint: string,
    responseLabel: string,
    columnProps: TableColumnProps[],
    localFilterFields: string[],
    networkFilterFields: NetworkFilterButtonProps[],
    responseMappingFunction: any
}




