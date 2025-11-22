import React, { memo, useState } from "react";
import { Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPlaceNameAndCoordinates } from "@/lib/getPlaceNameAndCoordinates";
import { setParentDetails } from "@/app/store/features/applyIgnite/applyIgniteSlice";

const PlaceSearch = () => {
    const dispatch = useDispatch();
    const parentDetails = useSelector((state: any) => state.applyIgnite.parentDetails);
    const [options, setOptions] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value: string) => {
        if (!value) return;
        setLoading(true);
        const result = await getPlaceNameAndCoordinates(value);
        setLoading(false);

        if (result) {
            setOptions([
                {
                    value: JSON.stringify(result),
                    label: result.name
                }
            ]);
        }
    };

    const handleSelect = (value: string) => {
        const place = JSON.parse(value);

        dispatch(
            setParentDetails({
                addressName: place.name,
                location: {
                    type: "Point",
                    coordinates: [place.longitude, place.latitude]
                }
            })
        );
    };

    return (
        <div>
            <label className="font-semibold">Search Address</label>
            <Select
                size="large"
                showSearch
                value={parentDetails.addressName || undefined}
                placeholder="Search a place"
                style={{ width: "100%" }}
                onSearch={handleSearch}
                onSelect={handleSelect}
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : null}
                options={options}
            />
        </div>
    );
};

export default memo(PlaceSearch);
