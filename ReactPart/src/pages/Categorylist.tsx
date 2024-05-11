import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import DefaultLayout from '../layout/DefaultLayout';
import Categorypage from '../components/Chat/Categorypage';

const Categorylist: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category List" />

      
        <Categorypage/>
      
      
    </DefaultLayout>
  );
};

export default Categorylist;
