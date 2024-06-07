import React, {useState} from 'react';

import '../node_modules/primereact/resources/themes/saga-blue/theme.css';
import '../node_modules/primereact/resources/primereact.min.css';
import '../node_modules/primeicons/primeicons.css';
import '../node_modules/primeflex/primeflex.css';

import {Menubar} from "primereact/menubar";

import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Products from "./pages/Products";
import Users from "./pages/Users";
import {BreadCrumb} from "primereact/breadcrumb";
import {MenuItem} from "primereact/menuitem";

function App() {
    const [breadCrumbs, setBreadCrumbs] = useState<MenuItem[]>([]);
    const items = [
        {
            label: 'Home',
            template: (item: any, options: any) => (
                <Link to="/" className={options.className}>
                    <span className={options.iconClassName}></span>
                    <span className={options.labelClassName}>{item.label}</span>
                </Link>
            ),
        },
        {
            label: 'User',
            template: (item: any, options: any) => (
                <Link to="/users" className={options.className}>
                    <span className={options.iconClassName}></span>
                    <span className={options.labelClassName}>{item.label}</span>
                </Link>
            ),
        },
        {
            label: 'Product',
            template: (item: any, options: any) => (
                <Link to="/products" className={options.className}>
                    <span className={options.iconClassName}></span>
                    <span className={options.labelClassName}>{item.label}</span>
                </Link>
            ),
        }
    ];

    return (

        <Router>

            <div>
                <Menubar className='bg-cyan-500' model={items}/>
                <BreadCrumb style={{height: 'px'}} model={breadCrumbs} home={{label: 'Home'}}
                            pt={{
                                label: {
                                    style: {
                                        fontFamily: 'Neutra Text',}
                                },
                                menuitem: {
                                    style: {
                                        boxShadow: 'inset 0px -8px #fdc936'
                                    }
                                }
                            }}
                />
                <Routes>
                    <Route path="/" element={<Home setBreadCrumb={setBreadCrumbs}/>}/>
                    <Route path="/users" element={<Users setBreadCrumb={setBreadCrumbs}/>}/>
                    <Route path="/products" element={<Products setBreadCrumb={setBreadCrumbs}/>}/>
                </Routes>

            </div>
        </Router>
    );
}

export default App;
