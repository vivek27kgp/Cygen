import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Productlist from './components/product/View';
import Categorylist from './components/category/View';
import Categoryadd from './components/category/Add';
import Brandadd from './components/brand/Add';
 import Brandlist from './components/brand/view';
import Bannerviewpage from './components/banner/View';
import Banneradd from './components/banner/Add';

import Addproduct from './components/product/Add';
import Lowstock from './pages/Lowstock';
import Taxlist from './components/tax/view';
import Taxadd from './components/tax/add';

import Unitlist from './components/unit/view';
import Unitadd from './components/unit/add';

import Supplierlist from './components/supplier/View';
import Supplieradd from './components/supplier/Add';
import SubcategoryList from './components/subcategory/View';
import Addsubcategory from './components/subcategory/Add';
import Bnnerlist from './components/banner/View';
import Saleslist from './components/sale/View';

import Storelist from './components/store/View';

import Addstore from './components/store/Add';
import Purchaselist from './components/purchase/View';
import Addpurchase from './components/purchase/Add';
import Addstock from './components/purchase/Addstock';

import Customerlist from './components/customer/View';
import CustomerAdd from './components/customer/Add';
import Useradd from './components/user/Add';
import Userlist from './components/user/View';
import Returnlist from './components/salereturn/View';

import Lowstockproduct from './components/product/Lowstock';

import Expiredproducts from './components/product/Expired';
import Productdetail from './components/product/Productdetail';
import StockEntry from './components/report/Stockentry';
import ItemsalesReport from './components/report/ItemsalesReport';
import Full from './components/purchase/Full';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Cygen retail" />
              <SignIn />
            </>
          }
        />


<Route
          path="/productlist"
          element={
            <>
              <PageTitle title="Product List" />
              <Productlist />
            </>
          }
        />
        <Route
          path="/categorylist"
          element={
            <>
              <PageTitle title="Category List List" />
              <Categorylist />
            </>
          }
        />
        
         <Route
          path="/addcategory"
          element={
            <>
              <PageTitle title="Add Category" />
              <Categoryadd />
            </>
          }
        />
        <Route
          path="/addbrand"
          element={
            <>
              <PageTitle title="Add Brand" />
              <Brandadd />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Add Brand" />
              <ECommerce />
            </>
          }
        />
 <Route
          path="/brandview"
          element={
            <>
              <PageTitle title="Vew Brand" />
              <Brandlist />
            </>
          }
        />
<Route
          path="/taxlist"
          element={
            <>
              <PageTitle title="Vew Taxlist" />
              <Taxlist />
            </>
          }
        />

<Route
          path="/addtax"
          element={
            <>
              <PageTitle title="Add Tax" />
              <Taxadd />
            </>
          }
        />



<Route
          path="/addsupplier"
          element={
            <>
              <PageTitle title="Add Supplier " />
              <Supplieradd />
            </>
          }
        />

<Route
          path="/supplietlist"
          element={
            <>
              <PageTitle title="Supplier List" />
              <Supplierlist />
            </>
          }
        />


<Route
          path="/customerlist"
          element={
            <>
              <PageTitle title="Customer List" />
              <Customerlist />
            </>
          }
        />

<Route
          path="/addcustomer"
          element={
            <>
              <PageTitle title="Customer Add" />
              <CustomerAdd />
            </>
          }
        />

<Route
          path="/adduser"
          element={
            <>
              <PageTitle title="Add User" />
              <Useradd />
            </>
          }
        />

<Route
          path="/userlist"
          element={
            <>
              <PageTitle title=" User List" />
              <Userlist />
            </>
          }
        />



<Route
          path="/addsubcategory"
          element={
            <>
              <PageTitle title="Add Subcategory List" />
              <Addsubcategory />
            </>
          }
        />
<Route
          path="/subcategorylist"
          element={
            <>
              <PageTitle title="Subcategory List" />
              <SubcategoryList />
            </>
          }
        />

<Route
          path="/bannerlist"
          element={
            <>
              <PageTitle title="Banner List" />
              <Bnnerlist />
            </>
          }
        />
        <Route
          path="/saleslist"
          element={
            <>
              <PageTitle title="Sales List" />
              <Saleslist />
            </>
          }
        />
        
        <Route
          path="/returnlist"
          element={
            <>
              <PageTitle title="Return List" />
              <Returnlist />
            </>
          }
        />




        
     <Route
          path="/storelist"
          element={
            <>
              <PageTitle title="Store List" />
              <Storelist />
            </>
          }
        />
     <Route
          path="/addstore"
          element={
            <>
              <PageTitle title="Add Store" />
              <Addstore />
            </>
          }
        />

<Route
          path="/Addstock"
          element={
            <>
              <PageTitle title="Stock List" />
              <Addstock />
            </>
          }
        />

          <Route
          path="/purchaselist"
          element={
            <>
              <PageTitle title="Purchase List" />
              <Purchaselist />
            </>
          }
        />
        <Route
          path="/addpurchase"
          element={
            <>
              <PageTitle title="Add Purchase " />
              <Addpurchase />
            </>
          }
        />
<Route
          path="/expired-products"
          element={
            <>
              <PageTitle title="Expired products List " />
              <Expiredproducts />
            </>
          }
        />
        <Route
          path="/addproduct"
          element={
            <>
              <PageTitle title="Add product " />
              <Addproduct />
            </>
          }
        />
        <Route
  path="/productdetail/:id"
  element={
    <>
      <PageTitle title="Product Detail" />
      <Productdetail />
    </>
  }
/>
         <Route
          path="/viewbanner"
          element={
            <>
              <PageTitle title="View Banner " />
              <Bannerviewpage />
            </>
          }
        />
         <Route
          path="/addbanner"
          element={
            <>
              <PageTitle title="Add Banner " />
              <Banneradd />
            </>
          }
        />
 <Route
          path="/unitlist"
          element={
            <>
              <PageTitle title="Unit List " />
              <Unitlist />
            </>
          }
        />
 <Route
          path="/addunit"
          element={
            <>
              <PageTitle title="Unit Add " />
              <Unitadd />
            </>
          }
        />


        <Route
          path="/lowstock"
          element={
            <>
              <PageTitle title="Low Stock Products" />
              <Lowstockproduct />
            </>
          }
        />


<Route
          path="/stockEntry"
          element={
            <>
              <PageTitle title="Stock Trasfer report" />
              <StockEntry />
            </>
          }
        />

<Route
          path="/full"
          element={
            <>
              <PageTitle title="Stock Trasfer report" />
              <Full />
            </>
          }
        />
<Route
          path="/itemsalesReport"
          element={
            <>
              <PageTitle title="ItemWise Sales Report report" />
              <ItemsalesReport />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
