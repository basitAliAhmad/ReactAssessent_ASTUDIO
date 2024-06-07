import React, {useEffect} from "react";
import {MenuItem} from "primereact/menuitem";
import DataViewComponent from "../components/DataViewComponent";

const Users = (props: { setBreadCrumb: React.Dispatch<React.SetStateAction<MenuItem[]>>}) => {

    useEffect(() => {
        props.setBreadCrumb([{label: 'Users'}]);
    }, []);

    return (
        <div className='bg-warning'>
            <h1 className="text-center">Users</h1>
            <DataViewComponent endpoint="users" responseLabel="users"
                               columnProps={[
                                   {field: "id", header: "ID"},
                                   {field: "firstName", header: "FIRST NAME"},
                                   {field: "lastName", header: "LAST NAME"},
                                   {field: "maidenName", header: "MAIDEN NAME"},
                                   {field: "age", header: "AGE"},
                                   {field: "gender", header: "GENDER"},
                                   {field: "email", header: "EMAIL"},
                                   {field: "phone", header: "PHONE"},
                                   {field: "username", header: "USERNAME"},
                                   {field: "bloodGroup", header: "BLOOD GROUP"},
                                   {field: "height", header: "HEIGHT"},
                                   {field: "weight", header: "WEIGHT"},
                                   {field: "eyeColor", header: "EYE COLOR"}
                               ]}
                               networkFilterFields={[
                                   {field: 'email', label: 'Email'},
                                   {field: 'phone', label: 'Phone'},
                                   {field: 'lastName', label: 'Last Name'},
                               ]}
                               localFilterFields={['firstName', 'lastName', 'maidenName', 'age', 'gender',
                                   'email', 'phone', 'username', 'bloodGroup', 'height', 'weight', 'eyeColor']}

            />
        </div>

    );
}


export default Users;
