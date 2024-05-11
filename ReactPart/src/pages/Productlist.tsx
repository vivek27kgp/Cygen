import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import DefaultLayout from '../layout/DefaultLayout';
import Productpage from '../components/Chat/Productpage';

const Productlist: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product List" />

      
        <Productpage />
      
      
    </DefaultLayout>
  );
};

export default Productlist;
