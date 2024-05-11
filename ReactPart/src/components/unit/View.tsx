import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ChartOne from '../Charts/ChartOne';


import DefaultLayout from '../../layout/DefaultLayout';
import Viewpage from './Viewpage';

const View: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Unit List" />

      
        <Viewpage/>
      
      
    </DefaultLayout>
  );
};

export default View;
