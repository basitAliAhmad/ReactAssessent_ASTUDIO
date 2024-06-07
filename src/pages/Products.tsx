import React, {useEffect} from "react";
import {BreadCrumbProps} from "primereact/breadcrumb";
import {MenuItem} from "primereact/menuitem";
import DataViewComponent from "../components/DataViewComponent";

const Products = (props: { setBreadCrumb: React.Dispatch<React.SetStateAction<MenuItem[]>>}) => {

    useEffect(() => {
        props.setBreadCrumb([{label: 'Products'}]);
    }, []);

    return (
        <div className='bg-warning'>
            <h1 className="text-center">Products</h1>
            <DataViewComponent endpoint="products" responseLabel="products"
                               columnProps={[
                                   {field: "id", header: "ID"},
                                   {field: "title", header: "TITLE"},
                                   {field: "brand", header: "BRAND"},
                                   {field: "category", header: "CATEGORY"},
                                   {field: "stock", header: "STOCK"},
                                   {field: "rating", header: "RATING"},
                                   {field: "price", header: "PRICE"},
                                   {field: "warrantyInformation", header: "WARRANTY INFORMATION"},
                                   {field: "returnPolicy", header: "RETURN POLICY"},
                                   {field: "minimumOrderQuantity", header: "MINIMUM ORDER QTY"}
                               ]}
                               networkFilterFields={[
                                   {field: 'title', label: 'Title'},
                                   {field: 'brand', label: 'Brand'},
                                   {field: 'category', label: 'Category'},
                               ]}
                               localFilterFields={['title', 'brand', 'category', 'stock', 'rating', 'price',
                                   'warrantyInformation', 'returnPolicy', 'minimumOrderQuantity']}

            />
        </div>

    );
}


export default Products;