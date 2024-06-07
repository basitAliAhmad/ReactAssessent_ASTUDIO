import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React, {useContext, useEffect, useState} from "react";
import {FilterMatchMode} from "primereact/api";
import {DataViewComponentProps, NetworkContextProps, NetworkFilterButtonProps, TableColumnProps} from "../types";
import {NetworkStateContext} from "../context/NetworkStateContext";
import axiosInstance from "../axiosConfig";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Paginator, PaginatorPageChangeEvent} from "primereact/paginator";
import {ProgressSpinner} from "primereact/progressspinner";

const DataViewComponent = (props: DataViewComponentProps) => {

    const {
        endpoint,
        responseLabel,
        columnProps,
        networkFilterFields,
        localFilterFields,
        responseMappingFunction
    } = props;
    const networkContext: NetworkContextProps | undefined = useContext(NetworkStateContext);

    const [pageSize, setPageSize] = useState<number>(5);

    const [showSearchField, setShowSearchField] = useState<boolean>(false);

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    });

    const makeNetworkCall = (isFiltered: boolean, limit: number, skip: number | undefined,
                             filterField: any, searchValue: any) => {
        networkContext?.setNetworkState({...networkContext?.networkState, status: "loading"});
        axiosInstance.get(endpoint + (isFiltered ? '/filter' : ''), {
            params: !isFiltered ? {
                limit, skip, select: columnProps.map((prop: TableColumnProps) => prop.field).join()
            } : {
                select: columnProps.map((prop: TableColumnProps) => prop.field).join(),
                key: filterField,
                value: searchValue
            }
        }).then(response => {
            const data = response.data;

            let _state: any = {...networkContext?.networkState}
            _state = {
                ..._state,
                status: 'success',
                total: data.total,
                offset: data.skip,
                count: data[responseLabel].length,
                totalPages: Math.ceil(data.total / _state.pageSize),
                currentPage: data.skip / _state.pageSize + 1,
                data: responseMappingFunction === undefined ? data[responseLabel] : data[responseLabel].map(responseMappingFunction),
            }

            networkContext?.setNetworkState(_state);
        }).catch(err => console.error(err));
    }

    useEffect(() => {
        makeNetworkCall(false, pageSize, networkContext?.networkState.offset, null, null);
    }, []);

    const updatePageSize = (newValue: number) => {
        setPageSize(newValue);
        setShowSearchField(false);
        makeNetworkCall(false, newValue, networkContext?.networkState.offset, null, null);
    }



    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters: any = {...filters};

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        let _state: any = {...networkContext?.networkState};
        _state = {..._state, offset: event.first};
        networkContext?.setNetworkState(_state);
        setShowSearchField(false);
        makeNetworkCall(false, pageSize, event.first, null, null);
    };
    const onNetworkFilter = (field: string) => {
        const _filterValue = globalFilterValue;
        setGlobalFilterValue('');
        makeNetworkCall(true, 0, 0, field, _filterValue);
    }

    if (networkContext?.networkState.status === "success")
        return (
            <div className="card mx-4">
                <Dropdown className="my-2 border-none" dropdownIcon="pi pi-sort-down-fill"
                          value={pageSize} onChange={(e) => updatePageSize(e.target.value)}
                          options={[5, 10, 20, 50]}/>
                <p className="text-lg inline m-2">Entries</p>
                {showSearchField && <InputText value={globalFilterValue} onChange={onGlobalFilterChange}/>}
                <Button className="m-2" icon="pi pi-search" rounded text onClick={() => setShowSearchField(true)}
                        severity="secondary"/>

                {networkFilterFields.map((networkFilterField: NetworkFilterButtonProps, index: number) =>
                    <Button key={index} className="m-2 network-search-btn" label={networkFilterField.label} text
                            severity="secondary" onClick={() => onNetworkFilter(networkFilterField.field)} />
                )}

                <DataTable value={networkContext?.networkState.data} tableStyle={{minWidth: '50rem'}} filters={filters}
                           globalFilterFields={localFilterFields}
                           emptyMessage="No records found.">

                    {columnProps.map((prop: TableColumnProps, index: number) =>
                        <Column key={index} field={prop.field} header={prop.header}/>
                    )}

                </DataTable>

                <Paginator first={networkContext?.networkState.offset} rows={pageSize}
                           totalRecords={networkContext?.networkState.total}
                           template={{
                               layout: 'PrevPageLink PageLinks NextPageLink',
                               PrevPageLink: (options) => {
                                   return (
                                       <button type="button" className="p-paginator-prev p-paginator-element p-link"
                                               onClick={options.onClick} disabled={options.disabled}>
                                                   <span className="p-paginator-icon pi pi-fw"><i
                                                       className="pi pi-arrow-left"></i></span>
                                       </button>
                                   )
                               },
                               NextPageLink: (options) => {
                                   return (
                                       <button type="button" className="p-paginator-prev p-paginator-element p-link"
                                               onClick={options.onClick} disabled={options.disabled}>
                                                   <span className="p-paginator-icon pi pi-fw"><i
                                                       className="pi pi-arrow-right"></i></span>
                                       </button>
                                   )
                               },

                           }} onPageChange={onPageChange}
                />
            </div>
        );

    else if (networkContext?.networkState.status === 'error')
        return <h1>Something Went Wrong!</h1>
    else return <ProgressSpinner className="mx-auto w-full"/>
}

DataViewComponent.defaultProps = {
    responseMappingFunction: undefined,
}

export default DataViewComponent;


