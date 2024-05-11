import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import DefaultLayout from '../layout/DefaultLayout';
import Productpageexpired from '../components/Chat/Productpageexpired';

const Expiredproducts: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Expired Product List" />

      
        <Productpageexpired />
      
      
    </DefaultLayout>
  );
};

export default Expiredproducts;
