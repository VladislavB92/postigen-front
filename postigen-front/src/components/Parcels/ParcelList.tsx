import React, { useState, useEffect } from "react";
import api from "../../api";

type ParcelListProps = {
    sender: string;
    receiver: string;
    size: string;
    locker: number;
};

const ParcelList: React.FC = () => {
    const [parcelData, setParcelData] = useState<ParcelListProps | null>(null);

    useEffect(() => {
        api
            .get("/api/parcels/")
            .then((response) => {
                setParcelData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <label>Sender: {parcelData?.sender}</label>
            <label>Receiver: {parcelData?.receiver}</label>
            <label>Size: {parcelData?.size}</label>
            <label>Locker: {parcelData?.locker}</label>
        </div>
    );
};

export default ParcelList;
