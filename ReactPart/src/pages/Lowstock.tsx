import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import DefaultLayout from '../layout/DefaultLayout';
import Productpage from '../components/Chat/Productpage';
import Productpagelowstock from '../components/Chat/Productpagelowstock';

const Lowstock: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Low Stock Product List" />

      
        <Productpagelowstock />
      
      
    </DefaultLayout>
  );
};

export default Lowstock;
