import React, {useEffect} from "react";
import {MenuItem} from "primereact/menuitem";

const Home = (props: { setBreadCrumb: React.Dispatch<React.SetStateAction<MenuItem[]>> }) => {
    useEffect(() => {
        props.setBreadCrumb([]);
    }, [])

    return (
        <div className='bg-warning'>

            <h1>Lorem Ipsum</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
        </div>

    );
}


export default Home;