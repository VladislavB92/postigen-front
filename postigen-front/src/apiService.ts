import axios, { AxiosError, AxiosResponse } from 'axios';
import { Customer, Locker, Parcel } from '../types/common';

const API_BASE_URL = `${process.env.REACT_APP_BASE_API_URL}/api/`;


const api = axios.create({
    baseURL: API_BASE_URL, timeout: 20000, headers: {
        'Content-Type': 'application/json',
    },
});

const handleApiError = (error: AxiosError<unknown>) => {
    if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
    } else if (error.request) {
        console.error('Request made, but no response received:', error.request);
    } else {
        console.error('Error setting up the request:', error.message);
    }
    console.error('Error config:', error.config);

    throw error;
};

export const fetchLockers = async (): Promise<AxiosResponse<Locker[]>> => {
    try {
        return await api.get<Locker[]>('lockers/');
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const fetchParcels = async (): Promise<AxiosResponse<Parcel[]>> => {
    try {
        return await api.get<Parcel[]>('parcels/');
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const fetchCustomers = async (): Promise<AxiosResponse<Customer[]>> => {
    try {
        return await api.get<Customer[]>('customers/');
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const fetchCustomer = async (
    customerID: string | undefined
): Promise<AxiosResponse<Customer>> => {
    try {
        return await api.get<Customer>(`customers/${customerID}/`);
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const fetchParcel = async (
    parcelId: string | undefined
): Promise<AxiosResponse<Parcel>> => {
    try {
        return await api.get<Parcel>(`parcels/${parcelId}/`);
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const fetchLocker = async (
    lockerId: string | undefined
): Promise<AxiosResponse<Locker>> => {
    try {
        return await api.get<Locker>(`lockers/${lockerId}/`);
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const putParcel = async (
    parcelId: string | undefined,
    selectedLocker: number
): Promise<AxiosResponse<Parcel>> => {
    try {
        return await api.put<Parcel>(
            `parcels/${parcelId}/put-parcel/`,
            { "locker_id": selectedLocker }
        );
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const moveParcel = async (
    parcelId: string | undefined,
    moveToLocker: number
): Promise<AxiosResponse<Parcel>> => {
    try {
        return await api.put<Parcel>(
            `parcels/${parcelId}/move-parcel/`,
            { 'new_locker_id': moveToLocker }
        );
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};

export const takeParcel = async (
    lockerId: number | undefined,
    parcelId: number | undefined,
): Promise<AxiosResponse<Parcel>> => {
    try {
        return await api.put<Parcel>(
            `lockers/${lockerId}/take-parcel/`,
            { 'parcel_id': parcelId },
        );
    } catch (error) {
        handleApiError(error as AxiosError<unknown>);
        throw error;
    }
};
