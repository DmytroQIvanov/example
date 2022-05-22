import Button from '@mui/material/Button';
import React, { useState } from 'react';

import AreaComponent from '../../components/ShowSimilar/Components/AreaComponent';
import Locations from '../../components/ShowSimilar/Components/Locations';
import OrganizationsComponent from '../../components/ShowSimilar/Components/OrganizationsComponent';
import Phone from '../../components/ShowSimilar/Components/Phone';
import PiComponent from '../../components/ShowSimilar/Components/PiComponent';

import ShowSimilarTable from '../../components/ShowSimilar/Table';


const SimilarViewTable = () => {
    const [type, setType] = useState(0);

    const handleType = (t: number) => {
        setType(t);
    };

    return (
        <div className="relative flex h-screen w-screen flex-col gap-3 overflow-x-hidden">
            <div className="absolute w-full px-8 pt-8 text-center text-2xl xl:text-left">
                Show Similar
            </div>
            <div className="flex flex-col items-center justify-center gap-3 px-3 pt-20 md:flex-row md:gap-5 md:px-0 xl:pt-8">
                <Button
                    className={
                        type === 0
                            ? `green-button w-full text-white md:w-32`
                            : `blue-button w-full text-white md:w-32`
                    }
                    variant="contained"
                    onClick={() => handleType(0)}
                >
                    Organizations
                </Button>
                <Button
                    className={
                        type === 1
                            ? `green-button w-full text-white md:w-32`
                            : `blue-button w-full text-white md:w-32`
                    }
                    variant="contained"
                    onClick={() => handleType(1)}
                >
                    Locations
                </Button>
                <Button
                    className={
                        type === 2
                            ? `green-button w-full text-white md:w-32`
                            : `blue-button w-full text-white md:w-32`
                    }
                    variant="contained"
                    onClick={() => handleType(2)}
                >
                    Phone
                </Button>
                <Button
                    className={
                        type === 3
                            ? `green-button w-full text-white md:w-32`
                            : `blue-button w-full text-white md:w-32`
                    }
                    variant="contained"
                    onClick={() => handleType(3)}
                >
                    PI
                </Button>
                <Button
                    className={
                        type === 4
                            ? `green-button w-full text-white md:w-32`
                            : `blue-button w-full text-white md:w-32`
                    }
                    variant="contained"
                    onClick={() => handleType(4)}
                >
                    Area
                </Button>
            </div>
            <div className="flex flex-col pt-3">
                {/* Organization */}
                {type === 0 && <OrganizationsComponent />}
                {/* Location */}
                {type === 1 && <Locations />}
                {/* Phone Number */}
                {type === 2 && <Phone />}
                {/* PI */}
                {type === 3 && <PiComponent />}
                {/* Area */}
                {type === 4 && <AreaComponent />}
            </div>
            <div className="w-full px-3 pt-6 md:px-8">
                <ShowSimilarTable />
            </div>
            <div className="flex flex-row justify-end p-5">
                <Button
                    className="green-button w-full text-white md:w-60"
                    variant="contained"
                >
                    Export to Drive
                </Button>
            </div>
        </div>
    );
};

export default React.memo(SimilarViewTable);
