import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import DefaultLayout from '../layout/DefaultLayout';
import Addproductpage from '../components/Chat/Addproductpage';

const Addproduct: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product List" />

      
        <Addproductpage />
      
      
    </DefaultLayout>
  );
};

export default Addproduct;
