import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ChartOne from '../Charts/ChartOne';

import Brandpage from './Brandpage';
import DefaultLayout from '../../layout/DefaultLayout';

const View: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Brand List" />

      
        <Brandpage/>
      
      
    </DefaultLayout>
  );
};

export default View;
